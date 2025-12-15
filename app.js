// 简易前端 SPA，使用 supabase-js CDN（无需打包）
const SUPABASE_URL = "https://admazpzjskimyrwczjus.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbWF6cHpqc2tpbXlyd2N6anVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3OTg4MjgsImV4cCI6MjA4MTM3NDgyOH0.CP3_qYwIJaWlgaBV7xUREC88XjNJotdZFPzui2ihoeI";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

let currentUser = null;
let profile = null;
let chartInstance = null;
let vocabIndex = 0;

const sampleQuotes = [
  { en: "Keep going, your 7.0 is loading...", cn: "坚持下去，你的 7 分正在赶来！" },
  { en: "One more set today, one less regret tomorrow.", cn: "今天多练一组，明天少留遗憾。" },
  { en: "Small steps, big gains.", cn: "小步快走，积跬步至千里。" }
];

const sampleVocab = [
  {
    word: "earthquake",
    meaning: "地震",
    meaning_en: "a sudden shaking of the ground",
    phrases: "earthquake zone; minor tremor",
    root: "earth + quake",
    freq: "高频",
    theme: "自然",
  },
  {
    word: "sustainable",
    meaning: "可持续的",
    meaning_en: "able to be maintained at a certain rate or level",
    phrases: "sustainable development; sustainable energy",
    root: "sustain + able",
    freq: "高频",
    theme: "科技/环境",
  },
  {
    word: "biodiversity",
    meaning: "生物多样性",
    meaning_en: "variety of life in the world or a particular habitat",
    phrases: "conserve biodiversity; biodiversity loss",
    root: "bio + diversity",
    freq: "中频",
    theme: "自然",
  },
];

const sampleIdioms = [
  { phrase: "spill the tea", cn: "爆料/说八卦", en: "to gossip or share juicy info", examples: "Come on, spill the tea!" },
  { phrase: "hit the books", cn: "刻苦学习", en: "to begin studying hard", examples: "I need to hit the books for IELTS." },
];

function $(id) { return document.getElementById(id); }

function setText(id, text) {
  const el = $(id);
  if (el) el.textContent = text;
}

function updateSliders() {
  setText("valListening", $("testListening").value);
  setText("valSpeaking", $("testSpeaking").value);
  setText("valReading", $("testReading").value);
  setText("valWriting", $("testWriting").value);
}

function calcTargetAverage() {
  const vals = [
    parseFloat($("testListening").value),
    parseFloat($("testSpeaking").value),
    parseFloat($("testReading").value),
    parseFloat($("testWriting").value),
  ];
  const avg = (vals.reduce((a, b) => a + b, 0) / 4).toFixed(1);
  setText("targetAverage", avg);
  return avg;
}

function updateCountdown(dateStr) {
  if (!dateStr) {
    setText("examCountdown", "未设置");
    return;
  }
  const target = new Date(dateStr);
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    setText("examCountdown", "考试日已到，加油冲刺！");
    return;
  }
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  setText("examCountdown", `${days} 天`);
}

function pickQuote() {
  const q = sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
  setText("dailyQuoteEn", q.en);
  setText("dailyQuoteCn", q.cn);
}

function renderChart(data) {
  const ctx = $("timeChart").getContext("2d");
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["听力", "口语", "阅读", "写作", "词汇", "真题"],
      datasets: [{
        label: "学习分钟",
        data,
        backgroundColor: ["#22d3ee", "#38bdf8", "#818cf8", "#a78bfa", "#34d399", "#f97316"],
      }]
    },
    options: { plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true } } }
  });
}

async function sendOtp() {
  const phone = $("phoneInput").value.trim();
  if (!phone) return alert("请输入手机号（含国家码）");
  const { error } = await supabase.auth.signInWithOtp({ phone });
  if (error) alert("发送失败：" + error.message);
  else alert("验证码已发送，请查收短信。");
}

async function verifyOtp() {
  const phone = $("phoneInput").value.trim();
  const token = $("otpInput").value.trim();
  if (!phone || !token) return alert("请输入手机号和验证码");
  const { data, error } = await supabase.auth.verifyOtp({ phone, token, type: "sms" });
  if (error) return alert("登录失败：" + error.message);
  currentUser = data.user;
  setText("authStatus", "已登录");
  await loadProfile();
}

async function loadProfile() {
  if (!currentUser) return;
  const { data, error } = await supabase.from("profiles").select("*").eq("id", currentUser.id).single();
  if (error && error.code !== "PGRST116") console.warn(error);
  profile = data || null;
  if (profile) {
    $("testListening").value = profile.target_listening ?? 5;
    $("testSpeaking").value = profile.target_speaking ?? 5;
    $("testReading").value = profile.target_reading ?? 5;
    $("testWriting").value = profile.target_writing ?? 5;
    if (profile.target_exam_date) $("examDateInput").value = profile.target_exam_date.split("T")[0];
    updateSliders();
    calcTargetAverage();
    updateCountdown(profile.target_exam_date);
  }
}

async function saveProfile() {
  if (!currentUser) return alert("请先登录");
  const payload = {
    id: currentUser.id,
    phone: $("phoneInput").value.trim(),
    target_listening: $("testListening").value,
    target_speaking: $("testSpeaking").value,
    target_reading: $("testReading").value,
    target_writing: $("testWriting").value,
    target_exam_date: $("examDateInput").value || null,
    voice_gender: "female",
    voice_accent: "en-uk",
    playback_speed: 1.0,
  };
  const { error } = await supabase.from("profiles").upsert(payload);
  if (error) return alert("保存失败：" + error.message);
  alert("保存成功！");
  profile = payload;
  calcTargetAverage();
  updateCountdown(payload.target_exam_date);
}

function renderVocab() {
  const item = sampleVocab[vocabIndex % sampleVocab.length];
  setText("vocabWord", item.word);
  setText("vocabFreq", item.freq);
  $("vocabImage").textContent = "🖼️";
  const optionsEl = $("vocabOptions");
  optionsEl.innerHTML = "";
  const options = shuffle([item.meaning, "无害的", "独特的", "鼓舞人心的"]);
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = opt;
    btn.onclick = () => {
      if (opt === item.meaning) btn.classList.add("correct");
      else btn.classList.add("wrong");
    };
    optionsEl.appendChild(btn);
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
  return arr.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]);
}

const notebook = [];
function addToNotebook(wordItem) {
  if (!notebook.find(x => x.word === wordItem.word)) notebook.push({ ...wordItem, clicks: 1 });
  else notebook.find(x => x.word === wordItem.word).clicks += 1;
  renderNotebook();
}

function renderNotebook() {
  const box = $("notebookList");
  if (!notebook.length) {
    box.innerHTML = `<div class="hint">还没有生词，点击“加入生词本”试试</div>`;
    return;
  }
  box.innerHTML = "";
  notebook.forEach(item => {
    const row = document.createElement("div");
    row.className = "list-item";
    row.innerHTML = `
      <div>
        <div><strong>${item.word}</strong> (${item.freq})</div>
        <div class="hint">${item.meaning}</div>
      </div>
      <div class="pill ghost">点击 ${item.clicks} 次</div>
    `;
    box.appendChild(row);
  });
}

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
  const filtered = sampleIdioms.filter(it =>
    it.phrase.toLowerCase().includes(q) || (it.cn && it.cn.includes(q)));
  renderIdioms(filtered);
}

// 导出示例：生词本 → Excel
function exportExcel() {
  const data = notebook.length ? notebook : [{ word: "demo", meaning: "示例", freq: "中频", clicks: 1 }];
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Notebook");
  XLSX.writeFile(wb, "notebook.xlsx");
}

// 导出示例：PDF
function exportPdf() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("雅思学习报告 (demo)", 10, 10);
  doc.text("目标平均分: " + ($("targetAverage").textContent || "-"), 10, 20);
  doc.text("考试倒计时: " + ($("examCountdown").textContent || "-"), 10, 30);
  doc.save("report.pdf");
}

function bindEvents() {
  ["testListening", "testSpeaking", "testReading", "testWriting"].forEach(id => {
    $(id).addEventListener("input", () => { updateSliders(); calcTargetAverage(); });
  });
  $("sendOtp").onclick = sendOtp;
  $("verifyOtp").onclick = verifyOtp;
  $("saveProfile").onclick = saveProfile;
  $("knowBtn").onclick = () => { vocabIndex++; renderVocab(); };
  $("dontKnowBtn").onclick = () => { vocabIndex++; renderVocab(); };
  $("addNotebookBtn").onclick = () => addToNotebook(sampleVocab[vocabIndex % sampleVocab.length]);
  document.querySelectorAll("[data-review]").forEach(btn => btn.onclick = () => alert("复习模式占位：" + btn.dataset.review));
  document.querySelectorAll(".start-btn").forEach(btn => btn.onclick = () => startTimer(btn.dataset.module));
  $("reviewNotebook").onclick = () => alert("本页复习占位，可切换听写/释义模式");
  $("searchIdiom").onclick = searchIdioms;
  $("exportExcel").onclick = exportExcel;
  $("exportPdf").onclick = exportPdf;
  $("quotePlay").onclick = () => alert("发音播放占位，可接入 TTS");
  $("quoteSave").onclick = () => alert("已收藏到句式库");
}

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

function bootstrap() {
  bindEvents();
  updateSliders();
  calcTargetAverage();
  pickQuote();
  renderVocab();
  renderNotebook();
  renderIdioms(sampleIdioms);
  renderChart([20, 18, 25, 22, 15, 10]); // demo data
  // 监听登录状态
  supabase.auth.getSession().then(({ data }) => {
    if (data.session?.user) {
      currentUser = data.session.user;
      setText("authStatus", "已登录");
      loadProfile();
    }
  });
  supabase.auth.onAuthStateChange((event, session) => {
    if (session?.user) {
      currentUser = session.user;
      setText("authStatus", "已登录");
      loadProfile();
    } else {
      currentUser = null;
      profile = null;
      setText("authStatus", "未登录");
    }
  });
}

document.addEventListener("DOMContentLoaded", bootstrap);

