// 纯前端演示逻辑（无后端依赖）
let chartInstance = null;
let vocabIndex = 0;
const sampleVocab = [
  { word: "earthquake", meaning: "地震", meaning_en: "sudden shaking of the ground", phrases: "earthquake zone; minor tremor", root: "earth + quake", freq: "高频" },
  { word: "sustainable", meaning: "可持续的", meaning_en: "able to be maintained", phrases: "sustainable development", root: "sustain + able", freq: "高频" },
  { word: "biodiversity", meaning: "生物多样性", meaning_en: "variety of life in habitat", phrases: "conserve biodiversity", root: "bio + diversity", freq: "中频" },
];
const sampleIdioms = [
  { phrase: "spill the tea", cn: "爆料/说八卦", en: "to gossip or share juicy info", examples: "Come on, spill the tea!" },
  { phrase: "hit the books", cn: "刻苦学习", en: "to begin studying hard", examples: "I need to hit the books for IELTS." },
];
const notebook = [];

function $(id) { return document.getElementById(id); }
function setText(id, val) { const el = $(id); if (el) el.textContent = val; }

// 导航滚动
function bindNav() {
  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.scroll);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

// 考试倒计时
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

// 渲染时间柱状图（示例数据）
function renderChart(data) {
  const ctx = $("timeChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["听力", "口语", "阅读", "写作", "词汇", "真题"],
      datasets: [{
        data,
        backgroundColor: ["#60a5fa", "#a78bfa", "#34d399", "#f59e0b", "#22d3ee", "#f97316"],
      }],
    },
    options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } },
  });
}

// 词汇
function shuffle(arr) { return arr.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]); }
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
function addToNotebook(item) {
  const exist = notebook.find(x => x.word === item.word);
  if (exist) exist.clicks = (exist.clicks || 1) + 1;
  else notebook.push({ ...item, clicks: 1 });
}

// 地道英语
function renderIdioms(list) {
  const box = $("idiomList");
  box.innerHTML = "";
  if (!list.length) { box.innerHTML = `<div class="hint">未找到结果</div>`; return; }
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
  renderIdioms(sampleIdioms.filter(it => it.phrase.toLowerCase().includes(q) || (it.cn && it.cn.includes(q))));
}

// 导出
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

// 计时器
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

// 入站测试/登录浮层
function showOverlay() {
  $("authOverlay").classList.add("show");
}
function hideOverlay() {
  $("authOverlay").classList.remove("show");
}
function bindTestSliders() {
  ["testListening","testSpeaking","testReading","testWriting"].forEach(id=>{
    $(id).addEventListener("input", ()=>{
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

// 考试日期
function bindDateInputs() {
  const d1 = $("examDateInput");
  const d2 = $("examDateInput2");
  const handler = (e)=>{
    const val = e.target.value;
    if (!val) return;
    localStorage.setItem("examDate", val);
    updateCountdown(val);
  };
  d1 && d1.addEventListener("change", handler);
  d2 && d2.addEventListener("change", handler);
}

// 初始化数据
function initData() {
  const avg = localStorage.getItem("targetAvg") || "7.0";
  setText("targetAverage", avg);
  setText("avgDisplay", avg);
  setText("coinCount", localStorage.getItem("coins") || "0");
  updateCountdown(localStorage.getItem("examDate"));
  // 单词目标
  const tgt = localStorage.getItem("wordTarget") || "30";
  $("wordTarget").value = tgt;
  $("wordTarget").addEventListener("input", ()=>{
    const v = Math.max(1, Math.min(200, parseInt($("wordTarget").value||"30",10)));
    $("wordTarget").value = v;
    localStorage.setItem("wordTarget", v);
  });
}

// 首页按钮
function bindHomeActions() {
  $("ctaEnter").onclick = () => document.getElementById("targets").scrollIntoView({ behavior: "smooth" });
  $("ctaVocab").onclick = () => document.getElementById("vocab").scrollIntoView({ behavior: "smooth" });
  $("btnReview").onclick = () => alert("复习占位：后续可接入听写/释义模式");
  $("startMock").onclick = () => alert("真题演练占位：后续接入完整评分");
  $("btnAuth").onclick = showOverlay;
}

// 验证码/登录演示（不调短信）
function bindAuthDemo() {
  $("sendOtp").onclick = () => alert("演示用，不发送真实短信。");
  $("verifyOtp").onclick = () => alert("演示登录成功（未对接真实认证）");
}

// 入口
function bootstrap() {
  bindNav();
  bindHomeActions();
  bindTestSliders();
  bindDateInputs();
  bindAuthDemo();
  initData();
  renderVocab();
  renderIdioms(sampleIdioms);
  renderChart([20, 18, 25, 22, 15, 10]);
  document.querySelectorAll(".start-btn").forEach(btn => btn.onclick = () => startTimer(btn.dataset.module));
  $("knowBtn").onclick = () => { vocabIndex++; renderVocab(); };
  $("dontKnowBtn").onclick = () => { vocabIndex++; renderVocab(); };
  $("addNotebookBtn").onclick = () => addToNotebook(sampleVocab[vocabIndex % sampleVocab.length]);
  $("searchIdiom").onclick = searchIdioms;
  $("exportExcel").onclick = exportExcel;
  $("exportPdf").onclick = exportPdf;

  // 首次加载显示浮层
  if (!localStorage.getItem("targetAvg")) showOverlay();
  $("saveProfile").onclick = saveProfile;
}
document.addEventListener("DOMContentLoaded", bootstrap);
