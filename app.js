// 纯前端演示逻辑：页面切换 + 四科学习柱状图 + 单词本 + 真题单独计时

let chartInstance = null;
let currentRange = 'day'; // day/week/month/quarter/year/custom
let vocabIndex = 0;
let mockTimerId = null;

const sampleVocab = [
  { word: "earthquake",  meaning: "地震",     meaning_en: "sudden shaking of the ground", phrases: "earthquake zone; minor tremor", root: "earth + quake",   freq: "高频" },
  { word: "sustainable", meaning: "可持续的", meaning_en: "able to be maintained",        phrases: "sustainable development",      root: "sustain + able", freq: "高频" },
  { word: "biodiversity",meaning: "生物多样性",meaning_en: "variety of life in habitat",   phrases: "conserve biodiversity",        root: "bio + diversity",freq: "中频" },
];

const sampleIdioms = [
  { phrase: "spill the tea", cn: "爆料 / 说八卦", en: "to gossip or share juicy info", examples: "Come on, spill the tea!" },
  { phrase: "hit the books", cn: "刻苦学习",       en: "to begin studying hard",         examples: "I need to hit the books for IELTS." },
];

function $(id) { return document.getElementById(id); }
function setText(id, val) { const el = $(id); if (el) el.textContent = val; }

/* ===== 页面切换 ===== */
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(`page-${pageId}`);
  if (page) page.classList.add('active');

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });
}

function bindPageSwitch() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.page));
  });
  document.querySelectorAll('[data-go]').forEach(btn => {
    btn.addEventListener('click', () => showPage(btn.dataset.go));
  });
}

/* ===== 考试倒计时 ===== */
function updateCountdown(dateStr) {
  const target = dateStr ? new Date(dateStr) : null;
  const out1 = $("examCountdown");
  if (!target || isNaN(target.getTime())) {
    out1 && (out1.textContent = "未设置");
    return;
  }
  const diff = target - new Date();
  const days = Math.ceil(diff / 86400000);
  const text = diff <= 0 ? "考试日已到" : `${days} 天`;
  out1 && (out1.textContent = text);
}

function bindDateInputs() {
  const handler = e => {
    const val = e.target.value;
    if (!val) return;
    localStorage.setItem("examDate", val);
    updateCountdown(val);
  };
  $("examDateInput")?.addEventListener("change", handler);
}

/* ===== 柱状图（只听说读写） ===== */
function getRangeData(range) {
  // 顺序：听力 / 口语 / 阅读 / 写作
  switch (range) {
    case 'day':     return [20, 15, 25, 18];
    case 'week':    return [120, 90, 150, 100];
    case 'month':   return [480, 360, 520, 400];
    case 'quarter': return [1200, 900, 1500, 1100];
    case 'year':    return [4800, 3600, 5200, 4000];
    case 'custom':  return [60, 45, 70, 50];
    default:        return [20, 15, 25, 18];
  }
}

function renderChart() {
  const data = getRangeData(currentRange);
  const ctx = $("timeChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["听力", "口语", "阅读", "写作"],
      datasets: [{
        data,
        backgroundColor: ["#60a5fa", "#a78bfa", "#34d399", "#f59e0b"],
      }],
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });
}

function bindRangeTabs() {
  document.querySelectorAll(".range-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".range-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      currentRange = tab.dataset.range;
      renderChart();
    });
  });
}

/* ===== 单词学习 & 生词本 ===== */
function getNotebook() {
  try {
    return JSON.parse(localStorage.getItem("notebook") || "[]");
  } catch { return []; }
}
function saveNotebook(list) {
  localStorage.setItem("notebook", JSON.stringify(list));
}

function renderVocab() {
  const item = sampleVocab[vocabIndex % sampleVocab.length];
  setText("vocabWord", item.word);
  setText("vocabFreq", item.freq);

  const options = shuffle([item.meaning, "无害的", "独特的", "鼓舞人心的"]);
  const box = $("vocabOptions");
  box.innerHTML = "";
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => btn.classList.add(opt === item.meaning ? "correct" : "wrong");
    box.appendChild(btn);
  });

  $("vocabDetail").innerHTML = `
    <div>中文：${item.meaning}</div>
    <div>英文：${item.meaning_en}</div>
    <div>短语：${item.phrases}</div>
    <div>词根：${item.root}</div>
    <div>词频：${item.freq}</div>
  `;
}

function shuffle(arr) {
  return arr.map(x => [Math.random(), x])
            .sort((a, b) => a[0] - b[0])
            .map(x => x[1]);
}

function addToNotebook(item) {
  const list = getNotebook();
  const now = new Date().toISOString();
  const exist = list.find(x => x.word === item.word);
  if (exist) {
    exist.clicks = (exist.clicks || 0) + 1;
    exist.lastClickedAt = now;
  } else {
    list.unshift({
      word: item.word,
      meaning: item.meaning,
      freq: item.freq,
      createdAt: now,
      lastClickedAt: now,
      clicks: 1,
    });
  }
  saveNotebook(list);
  renderNotebook(currentNotebookSort);
}

let currentNotebookSort = "recent"; // recent | count

function renderNotebook(sortBy = "recent") {
  currentNotebookSort = sortBy;
  const list = getNotebook();
  if (!list.length) {
    $("notebookList").innerHTML = `<div class="hint">还没有任何生词，去各模块多多点击生词吧～</div>`;
    return;
  }
  let data = [...list];
  if (sortBy === "count") {
    data.sort((a,b) => (b.clicks||0) - (a.clicks||0));
  } else {
    data.sort((a,b) => new Date(b.lastClickedAt) - new Date(a.lastClickedAt));
  }

  $("notebookList").innerHTML = data.map(item => `
    <div class="list-item">
      <div>
        <div><strong>${item.word}</strong> <span class="hint">(${item.freq})</span></div>
        <div class="hint">中文：${item.meaning}</div>
        <div class="hint">收录日期：${item.createdAt.slice(0,10)} / 点击次数：${item.clicks || 0}</div>
      </div>
    </div>
  `).join("");
}

function bindNotebookSort() {
  document.querySelectorAll(".nb-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nb-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderNotebook(btn.dataset.sort);
    });
  });
}

/* 单词本导出 */
function exportNotebookExcel() {
  const data = getNotebook();
  if (!data.length) { alert("单词本为空"); return; }
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "notebook");
  XLSX.writeFile(wb, "notebook.xlsx");
}
function exportNotebookPdf() {
  const data = getNotebook();
  if (!data.length) { alert("单词本为空"); return; }
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("IELTS 单词本", 10, 10);
  let y = 20;
  data.slice(0,40).forEach(item => {
    doc.text(`${item.word}  (${item.freq})  ${item.meaning}  点击:${item.clicks||0}`, 10, y);
    y += 6;
  });
  doc.save("notebook.pdf");
}

/* ===== 地道英语 ===== */
function renderIdioms(list) {
  const box = $("idiomList");
  box.innerHTML = "";
  if (!list.length) {
    box.innerHTML = `<div class="hint">未找到结果</div>`;
    return;
  }
  list.forEach(it => {
    const row = document.createElement("div");
    row.className = "list-item";
    row.innerHTML = `
      <div>
        <div><strong>${it.phrase}</strong></div>
        <div class="hint">${it.cn}</div>
        <div class="hint">${it.en}</div>
        <div class="hint">示例：${it.examples || "N/A"}</div>
      </div>
    `;
    box.appendChild(row);
  });
}

function searchIdioms() {
  const q = $("idiomSearch").value.trim().toLowerCase();
  if (!q) return renderIdioms(sampleIdioms);
  renderIdioms(sampleIdioms.filter(it =>
    it.phrase.toLowerCase().includes(q) || (it.cn && it.cn.includes(q))
  ));
}

/* ===== 导出（生词本以外的全局导出占位） ===== */
function exportExcel() {
  alert("导出占位：可扩展为导出全部学习记录。");
}
function exportPdf() {
  alert("导出占位：可扩展为导出综合学习报告。");
}

/* ===== 计时器（四科） & 真题计时 ===== */
const timers = {};
function startTimer(module) {
  if (timers[module]) clearInterval(timers[module]);
  let sec = 0;
  const el = document.querySelector(`.timer[data-module="${module}"]`);
  timers[module] = setInterval(() => {
    sec += 1;
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    el.textContent = `${m}:${s}`;
  }, 1000);
}

function startMockTimer() {
  if (mockTimerId) clearInterval(mockTimerId);
  let sec = 0;
  const el = document.querySelector("#page-mock .timer");
  mockTimerId = setInterval(() => {
    sec += 1;
    const m = String(Math.floor(sec / 60)).padStart(2, "0");
    const s = String(sec % 60).padStart(2, "0");
    el.textContent = `${m}:${s}`;
  }, 1000);
}

/* ===== 登录 / 水平测试浮层 ===== */
function showOverlay() { $("authOverlay").classList.add("show"); }
function hideOverlay() { $("authOverlay").classList.remove("show"); }

function bindTestSliders() {
  ["testListening","testSpeaking","testReading","testWriting"].forEach(id => {
    const input = $(id);
    input.addEventListener("input", () => {
      setText("valListening", $("testListening").value);
      setText("valSpeaking", $("testSpeaking").value);
      setText("valReading", $("testReading").value);
      setText("valWriting", $("testWriting").value);
    });
  });
}

function saveProfile() {
  const ls = parseFloat($("testListening").value)||0;
  const sp = parseFloat($("testSpeaking").value)||0;
  const rd = parseFloat($("testReading").value)||0;
  const wr = parseFloat($("testWriting").value)||0;
  const avg = ((ls+sp+rd+wr)/4).toFixed(1);
  localStorage.setItem("targetAvg", avg);
  setText("targetAverage", avg);
  setText("avgDisplay", avg);
  hideOverlay();
}

/* ===== 初始化数据 ===== */
function initData() {
  const avg = localStorage.getItem("targetAvg") || "7.0";
  setText("targetAverage", avg);
  setText("avgDisplay", avg);

  const exam = localStorage.getItem("examDate");
  updateCountdown(exam);

  const tgt = localStorage.getItem("wordTarget") || "30";
  $("wordTarget").value = tgt;
  $("wordTarget").addEventListener("input", () => {
    const v = Math.max(1, Math.min(200, parseInt($("wordTarget").value || "30", 10)));
    $("wordTarget").value = v;
    localStorage.setItem("wordTarget", v);
  });

  renderNotebook(currentNotebookSort);
}

/* ===== 绑定首页按钮 & 登录演示 ===== */
let currentNotebookSort = "recent";

function bindHomeActions() {
  $("btnAuth").onclick = showOverlay;
  $("sendOtp").onclick = () => alert("演示模式：不发送真实短信。");
  $("verifyOtp").onclick = () => alert("演示登录成功～");

  $("searchIdiom")?.addEventListener("click", searchIdioms);
  $("exportExcel")?.addEventListener("click", exportExcel);
  $("exportPdf")?.addEventListener("click", exportPdf);
  $("startMock")?.addEventListener("click", () => {
    startMockTimer();
    alert("真题演练计时已开始（不计入上方学习时长）");
  });

  document.querySelectorAll(".start-btn").forEach(btn => {
    btn.addEventListener("click", () => startTimer(btn.dataset.module));
  });

  $("knowBtn")?.addEventListener("click", () => { vocabIndex++; renderVocab(); });
  $("dontKnowBtn")?.addEventListener("click", () => { vocabIndex++; renderVocab(); });
  $("addNotebookBtn")?.addEventListener("click", () => {
    const item = sampleVocab[vocabIndex % sampleVocab.length];
    addToNotebook(item);
    alert("已加入单词本");
  });

  $("exportNotebookExcel")?.addEventListener("click", exportNotebookExcel);
  $("exportNotebookPdf")?.addEventListener("click", exportNotebookPdf);

  document.querySelectorAll(".nb-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".nb-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderNotebook(btn.dataset.sort);
    });
  });
}

/* ===== 入口 ===== */
function bootstrap() {
  bindPageSwitch();
  bindDateInputs();
  bindRangeTabs();
  bindTestSliders();
  bindHomeActions();
  initData();

  renderVocab();
  renderIdioms(sampleIdioms);
  renderChart();

  if (!localStorage.getItem("targetAvg")) showOverlay();
  $("saveProfile").onclick = saveProfile;
}

document.addEventListener("DOMContentLoaded", bootstrap);
