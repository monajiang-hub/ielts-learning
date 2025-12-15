// 纯前端演示逻辑：听说读写学习时长柱状图 + 各板块切换 + 真题单独计时

let chartInstance = null;
let currentRange = 'day'; // day / week / month / quarter / year / custom
let vocabIndex = 0;

const sampleVocab = [
  { word: "earthquake",  meaning: "地震",     meaning_en: "sudden shaking of the ground", phrases: "earthquake zone; minor tremor", root: "earth + quake",   freq: "高频" },
  { word: "sustainable", meaning: "可持续的", meaning_en: "able to be maintained",        phrases: "sustainable development",      root: "sustain + able", freq: "高频" },
  { word: "biodiversity",meaning: "生物多样性",meaning_en: "variety of life in habitat",   phrases: "conserve biodiversity",        root: "bio + diversity",freq: "中频" },
];

const sampleIdioms = [
  { phrase: "spill the tea", cn: "爆料 / 说八卦", en: "to gossip or share juicy info", examples: "Come on, spill the tea!" },
  { phrase: "hit the books", cn: "刻苦学习",       en: "to begin studying hard",         examples: "I need to hit the books for IELTS." },
];

const notebook = [];

function $(id) { return document.getElementById(id); }
function setText(id, val) { const el = $(id); if (el) el.textContent = val; }

/* ===== 导航 + 快捷入口：显示对应 detail-page，再滚动 ===== */
function bindNav() {
  const detailPages = document.querySelectorAll(".detail-page");

  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetId = btn.dataset.scroll;
      const target = document.getElementById(targetId);
      if (!target) return;

      if (targetId === 'hero') {
        // 首页按钮：隐藏所有 detail 区块
        detailPages.forEach(sec => sec.classList.add('hidden'));
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        document.querySelectorAll('.nav-item')
          .forEach(b => b.classList.toggle('active', b.dataset.scroll === 'hero'));
        return;
      }

      // 其他：显示对应 detail 区块，隐藏其他
      if (target.classList.contains('detail-page')) {
        detailPages.forEach(sec => {
          if (sec.id === targetId) sec.classList.remove('hidden');
          else sec.classList.add('hidden');
        });
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" });

      document.querySelectorAll('.nav-item')
        .forEach(b => b.classList.toggle('active', b.dataset.scroll === targetId));
    });
  });
}

/* ===== 考试倒计时 ===== */
function updateCountdown(dateStr) {
  const target = dateStr ? new Date(dateStr) : null;
  const out1 = $("examCountdown");
  const out2 = $("countValue");
  if (!target || isNaN(target.getTime())) {
    out1 && (out1.textContent = "未设置");
    out2 && (out2.textContent = "未设置");
    return;
  }
  const diff = target - new Date();
  const days = Math.ceil(diff / 86400000);
  const text = diff <= 0 ? "考试日已到" : `${days} 天`;
  out1 && (out1.textContent = text);
  out2 && (out2.textContent = text);
}

function bindDateInputs() {
  const handler = (e) => {
    const val = e.target.value;
    if (!val) return;
    localStorage.setItem("examDate", val);
    updateCountdown(val);
  };
  $("examDateInput")?.addEventListener("change", handler);
  $("examDateInput2")?.addEventListener("change", handler);
}

/* ===== 柱状图时间范围 tabs ===== */
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

/* 只显示听说读写四根柱子 */
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

/* ===== 单词学习逻辑 ===== */
function shuffle(arr) {
  return arr.map(x => [Math.random(), x])
            .sort((a, b) => a[0] - b[0])
            .map(x => x[1]);
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
    btn.onclick = () =>
      btn.classList.add(opt === item.meaning ? "correct" : "wrong");
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

function addToNotebook(item) {
  const exist = notebook.find(x => x.word === item.word);
  if (exist) exist.clicks = (exist.clicks || 1) + 1;
  else notebook.push({ ...item, clicks: 1 });
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

/* ===== 导出 ===== */
function exportExcel() {
  const data = notebook.length ? notebook : [{ word: "demo", meaning: "示例", freq: "中频", clicks: 1 }];
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Notebook");
  XLSX.writeFile(wb, "notebook.xlsx");
}

function exportPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("雅思学习报告", 10, 10);
  doc.text("目标平均分: " + (localStorage.getItem("targetAvg") || "7.0"), 10, 20);
  doc.text("考试倒计时: " + ($("examCountdown").textContent || "-"), 10, 30);
  doc.save("report.pdf");
}

/* ===== 四科计时器 & 真题计时（真题不进柱状图） ===== */
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

let mockTimerId = null;
function startMockTimer() {
  if (mockTimerId) clearInterval(mockTimerId);
  let sec = 0;
  const el = $("mockTimer");
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

/* ===== 日期 & 单词目标初始化 ===== */
function initData() {
  const avg = localStorage.getItem("targetAvg") || "7.0";
  setText("targetAverage", avg);
  setText("avgDisplay", avg);

  updateCountdown(localStorage.getItem("examDate"));

  const tgt = localStorage.getItem("wordTarget") || "30";
  $("wordTarget").value = tgt;
  $("wordTarget").addEventListener("input", () => {
    const v = Math.max(1, Math.min(200, parseInt($("wordTarget").value || "30", 10)));
    $("wordTarget").value = v;
    localStorage.setItem("wordTarget", v);
  });
}

/* ===== 首页按钮 & 登录演示 ===== */
function bindHomeActions() {
  $("ctaEnter").onclick = () => {
    document.getElementById("modules")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  $("ctaVocab").onclick = () => {
    const vocabSec = $("vocab");
    if (vocabSec) {
      vocabSec.classList.remove("hidden");
      vocabSec.scrollIntoView({ behavior: "smooth", block: "start" });
      document.querySelectorAll('.nav-item')
        .forEach(b => b.classList.toggle('active', b.dataset.scroll === 'vocab'));
    }
  };
  $("btnReview").onclick = () => alert("复习占位：后续可接入听写 / 释义模式");

  $("startMock").onclick = () => {
    startMockTimer();
    alert("真题演练计时已开始（不计入上方学习时长）");
  };

  $("searchIdiom").onclick = searchIdioms;
  $("exportExcel").onclick = exportExcel;
  $("exportPdf").onclick = exportPdf;
  $("btnAuth").onclick = showOverlay;

  $("sendOtp").onclick = () => alert("演示模式：不发送真实短信。");
  $("verifyOtp").onclick = () => alert("演示登录成功～");
}

/* ===== 入口 ===== */
function bootstrap() {
  bindNav();
  bindHomeActions();
  bindTestSliders();
  bindDateInputs();
  bindRangeTabs();
  initData();

  renderVocab();
  renderIdioms(sampleIdioms);
  renderChart();

  document.querySelectorAll(".start-btn").forEach(btn =>
    btn.addEventListener("click", () => startTimer(btn.dataset.module))
  );

  $("knowBtn").onclick       = () => { vocabIndex++; renderVocab(); };
  $("dontKnowBtn").onclick   = () => { vocabIndex++; renderVocab(); };
  $("addNotebookBtn").onclick= () => addToNotebook(sampleVocab[vocabIndex % sampleVocab.length]);

  // 首次没有 targetAvg 时，弹出水平测试
  if (!localStorage.getItem("targetAvg")) showOverlay();
  $("saveProfile").onclick = saveProfile;
}

document.addEventListener("DOMContentLoaded", bootstrap);
