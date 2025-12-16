// 前端静态逻辑（无打包）
let chartInstance = null;
let vocabIndex = 0;
const sampleVocab = [
  { word: "earthquake", meaning: "地震", meaning_en: "sudden shaking of the ground", phrases: "earthquake zone; minor tremor", root: "earth + quake", freq: "高频", category: "geography" },
  { word: "sustainable", meaning: "可持续的", meaning_en: "able to be maintained", phrases: "sustainable development", root: "sustain + able", freq: "高频", category: "nature" },
  { word: "biodiversity", meaning: "生物多样性", meaning_en: "variety of life in habitat", phrases: "conserve biodiversity", root: "bio + diversity", freq: "中频", category: "nature" },
];

// 雅思单词书数据（示例数据，实际应该从数据库或API获取）
const ieltsWordBook = [
  // 地理类
  { word: "earthquake", meaning: "地震", meaning_en: "sudden shaking of the ground", phrases: "earthquake zone", category: "geography", freq: "高频" },
  { word: "volcano", meaning: "火山", meaning_en: "mountain that erupts lava", phrases: "active volcano", category: "geography", freq: "高频" },
  { word: "tsunami", meaning: "海啸", meaning_en: "large ocean wave", phrases: "tsunami warning", category: "geography", freq: "中频" },
  { word: "peninsula", meaning: "半岛", meaning_en: "land surrounded by water on three sides", phrases: "Iberian peninsula", category: "geography", freq: "中频" },
  // 自然类
  { word: "sustainable", meaning: "可持续的", meaning_en: "able to be maintained", phrases: "sustainable development", category: "nature", freq: "高频" },
  { word: "biodiversity", meaning: "生物多样性", meaning_en: "variety of life", phrases: "conserve biodiversity", category: "nature", freq: "高频" },
  { word: "ecosystem", meaning: "生态系统", meaning_en: "biological community", phrases: "marine ecosystem", category: "nature", freq: "高频" },
  { word: "habitat", meaning: "栖息地", meaning_en: "natural environment", phrases: "natural habitat", category: "nature", freq: "中频" },
  // 教育类
  { word: "curriculum", meaning: "课程", meaning_en: "subjects taught", phrases: "school curriculum", category: "education", freq: "高频" },
  { word: "tuition", meaning: "学费", meaning_en: "money paid for education", phrases: "tuition fees", category: "education", freq: "高频" },
  { word: "scholarship", meaning: "奖学金", meaning_en: "financial aid for students", phrases: "apply for scholarship", category: "education", freq: "高频" },
  // 科技类
  { word: "innovation", meaning: "创新", meaning_en: "new idea or method", phrases: "technological innovation", category: "technology", freq: "高频" },
  { word: "artificial", meaning: "人工的", meaning_en: "made by humans", phrases: "artificial intelligence", category: "technology", freq: "高频" },
  // 文化类
  { word: "heritage", meaning: "遗产", meaning_en: "valued traditions", phrases: "cultural heritage", category: "culture", freq: "高频" },
  { word: "tradition", meaning: "传统", meaning_en: "customs passed down", phrases: "cultural tradition", category: "culture", freq: "高频" },
  // 商业类
  { word: "entrepreneur", meaning: "企业家", meaning_en: "person who starts business", phrases: "successful entrepreneur", category: "business", freq: "高频" },
  { word: "investment", meaning: "投资", meaning_en: "money put into business", phrases: "foreign investment", category: "business", freq: "高频" },
];
const sampleIdioms = [
  { phrase: "spill the tea", cn: "爆料/说八卦", en: "to gossip or share juicy info", examples: "Come on, spill the tea!" },
  { phrase: "hit the books", cn: "刻苦学习", en: "to begin studying hard", examples: "I need to hit the books for IELTS." },
];
const notebook = [];

function $(id) { return document.getElementById(id); }
function setText(id, val) { const el = $(id); if (el) el.textContent = val; }

// 每日鸡汤句子
const dailyQuotes = [
  { en: "The journey of a thousand miles begins with a single step.", cn: "千里之行，始于足下" },
  { en: "Success is the sum of small efforts repeated day in and day out.", cn: "成功是日复一日微小努力的总和" },
  { en: "The only way to do great work is to love what you do.", cn: "成就伟大事业的唯一途径就是热爱你所做的事" },
  { en: "Believe you can and you're halfway there.", cn: "相信自己能行，你就已经成功了一半" },
  { en: "Don't watch the clock; do what it does. Keep going.", cn: "不要看时钟，做它该做的事。继续前进" },
  { en: "The future belongs to those who believe in the beauty of their dreams.", cn: "未来属于那些相信梦想之美的人" },
  { en: "Hard work beats talent when talent doesn't work hard.", cn: "当天赋不努力时，努力会战胜天赋" },
  { en: "You are never too old to set another goal or to dream a new dream.", cn: "设定新目标或做新梦永远不会太晚" },
  { en: "The only limit to our realization of tomorrow will be our doubts of today.", cn: "实现明天的唯一限制是我们今天的疑虑" },
  { en: "It does not matter how slowly you go as long as you do not stop.", cn: "只要你不停止，走得慢一点也没关系" },
  { en: "Success is not final, failure is not fatal: it is the courage to continue that counts.", cn: "成功不是终点，失败不是致命的：重要的是继续前进的勇气" },
  { en: "The way to get started is to quit talking and begin doing.", cn: "开始的方法就是停止空谈，开始行动" },
  { en: "Innovation distinguishes between a leader and a follower.", cn: "创新区分了领导者和追随者" },
  { en: "Life is 10% what happens to you and 90% how you react to it.", cn: "生活10%是发生在你身上的事，90%是你如何应对" },
  { en: "The best time to plant a tree was 20 years ago. The second best time is now.", cn: "种树的最佳时间是20年前，其次是现在" },
  { en: "You miss 100% of the shots you don't take.", cn: "你不尝试，就100%会错过" },
  { en: "The only person you are destined to become is the person you decide to be.", cn: "你注定要成为的唯一的人，就是你决定成为的那个人" },
  { en: "Go confidently in the direction of your dreams. Live the life you have imagined.", cn: "自信地朝着梦想的方向前进，过你想象的生活" },
  { en: "The two most important days in your life are the day you are born and the day you find out why.", cn: "你生命中最重要的两天是你出生的那一天和你发现为什么的那一天" },
  { en: "Whatever you can do, or dream you can, begin it. Boldness has genius, power and magic in it.", cn: "无论你能做什么，或梦想你能做什么，开始吧。大胆中蕴含着天才、力量和魔力" },
  { en: "The greatest glory in living lies not in never falling, but in rising every time we fall.", cn: "生活中最大的荣耀不在于从不跌倒，而在于每次跌倒后都能站起来" },
  { en: "In the middle of difficulty lies opportunity.", cn: "在困难中蕴含着机遇" },
  { en: "The only impossible journey is the one you never begin.", cn: "唯一不可能的旅程是你从未开始的旅程" },
  { en: "Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.", cn: "不要被心中的恐惧所左右，要被心中的梦想所引导" },
  { en: "The secret of getting ahead is getting started.", cn: "成功的秘诀就是开始行动" },
  { en: "You don't have to be great to start, but you have to start to be great.", cn: "你不必很伟大才能开始，但你必须开始才能变得伟大" },
  { en: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", cn: "与我们内心的东西相比，我们身后和面前的东西都是微不足道的" },
  { en: "The best preparation for tomorrow is doing your best today.", cn: "为明天做的最好准备就是今天尽力而为" },
  { en: "It is during our darkest moments that we must focus to see the light.", cn: "正是在最黑暗的时刻，我们必须集中精力看到光明" },
  { en: "Quality is not an act, it is a habit.", cn: "品质不是一种行为，而是一种习惯" }
];

function getDailyQuote() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return dailyQuotes[dayOfYear % dailyQuotes.length];
}

function updateDailyQuote() {
  const quote = getDailyQuote();
  const quoteEn = document.querySelector(".quote-en");
  const quoteCn = document.querySelector(".quote-cn");
  if (quoteEn) quoteEn.textContent = `"${quote.en}"`;
  if (quoteCn) quoteCn.textContent = quote.cn;
}

// 页面切换功能
function showPage(pageId) {
  // 隐藏所有详细页面
  document.querySelectorAll(".detail-page").forEach(page => {
    page.classList.remove("active");
  });
  
  // 显示目标页面
  const targetPage = document.getElementById(pageId);
  if (targetPage) {
    targetPage.classList.add("active");
  }
  
  // 更新导航激活状态
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.scroll === pageId);
  });
  
  // 如果是首页，滚动到顶部
  if (pageId === "hero") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // 其他页面滚动到对应位置
    if (targetPage) {
      targetPage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

// 导航切换
function bindNav() {
  document.querySelectorAll("[data-scroll]").forEach(btn => {
    btn.addEventListener("click", () => {
      const pageId = btn.dataset.scroll;
      showPage(pageId);
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
function setExamDate() {
  const dateInput = $("examDateInput");
  if (dateInput) {
    // 显示日期输入框
    dateInput.style.display = "block";
    // 如果已有日期，设置默认值
    const savedDate = localStorage.getItem("examDate");
    if (savedDate) {
      dateInput.value = savedDate;
    }
    // 触发日期选择器
    setTimeout(() => {
      dateInput.showPicker ? dateInput.showPicker() : dateInput.click();
    }, 100);
  }
}

// 时间柱状图（只显示L/S/R/W）
function renderChart(data, range = "today") {
  const canvas = $("timeChart");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (chartInstance) chartInstance.destroy();
  
  // 只显示听说读写4项
  const labels = ["听力", "口语", "阅读", "写作"];
  const colors = ["#60a5fa", "#a78bfa", "#34d399", "#f59e0b"];
  const chartData = data.slice(0, 4); // 只取前4项
  
  chartInstance = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        data: chartData,
        backgroundColor: colors,
        borderRadius: 8,
        borderSkipped: false,
      }]
    },
    options: {
      plugins: { 
        legend: { display: false },
      },
      scales: { 
        y: { 
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return value + '分钟';
            }
          }
        },
        x: {
          grid: {
            display: false
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// 获取时间范围数据
function getRangeData(range) {
  // 从localStorage获取学习时长数据
  const studyData = JSON.parse(localStorage.getItem("studyData") || "{}");
  const today = new Date().toISOString().split('T')[0];
  
  // 默认示例数据
  let data = [20, 18, 25, 22]; // 听力、口语、阅读、写作（分钟）
  
  if (studyData[today]) {
    data = [
      studyData[today].listening || 0,
      studyData[today].speaking || 0,
      studyData[today].reading || 0,
      studyData[today].writing || 0
    ];
  }
  
  // 根据不同范围聚合数据（简化版，实际应该按日期聚合）
  if (range === "week") {
    // 本周数据聚合
    data = data.map(d => d * 7);
  } else if (range === "month") {
    data = data.map(d => d * 30);
  } else if (range === "quarter") {
    data = data.map(d => d * 90);
  } else if (range === "year") {
    data = data.map(d => d * 365);
  }
  
  return data;
}

// 绑定时间范围切换
function bindRangeTabs() {
  document.querySelectorAll(".range-tab").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".range-tab").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const range = btn.dataset.range;
      const data = getRangeData(range);
      renderChart(data, range);
    });
  });
}

// 词汇学习数据管理
function getVocabData() {
  return JSON.parse(localStorage.getItem("vocabData") || "{}");
}
function saveVocabData(data) {
  localStorage.setItem("vocabData", JSON.stringify(data));
}

// 累积复习机制：每天复习之前所有天学习的新词
// 第1天：学习新词（无复习）
// 第2天：学习新词 + 复习第1天的新词
// 第3天：学习新词 + 复习第2天和第1天的新词
// 第4天：学习新词 + 复习第3、2、1天的新词
// 以此类推，无上限

// 检查单词是否需要复习（累积复习机制）
function shouldReviewWord(word) {
  if (!word.learnedDate) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const learnedDate = new Date(word.learnedDate);
  learnedDate.setHours(0, 0, 0, 0);
  
  // 如果是今天刚学的，不需要复习
  if (learnedDate.getTime() === today.getTime()) {
    return false;
  }
  
  // 获取上次复习日期
  let lastReviewDate = word.lastReviewDate ? new Date(word.lastReviewDate) : learnedDate;
  lastReviewDate.setHours(0, 0, 0, 0);
  
  // 如果今天已经复习过，不需要再复习
  if (lastReviewDate.getTime() === today.getTime()) {
    return false;
  }
  
  // 累积复习：学习日期早于今天的所有单词都需要复习
  return learnedDate < today;
}

// 计算需要复习的单词列表和数量
function getReviewWords() {
  const vocabData = getVocabData();
  const allWords = vocabData.words || [];
  
  const reviewList = allWords.filter(word => shouldReviewWord(word));
  return {
    count: reviewList.length,
    list: reviewList
  };
}

// 获取新词/复习词比例设置
function getVocabRatio() {
  const ratio = localStorage.getItem("vocabRatio") || "1:2";
  const [newRatio, reviewRatio] = ratio.split(":").map(Number);
  return { newRatio, reviewRatio };
}

// 计算今日复习词目标数量（基于比例）
function getReviewTarget() {
  const target = parseInt(localStorage.getItem("wordTarget") || "30");
  const { newRatio, reviewRatio } = getVocabRatio();
  return Math.floor(target * reviewRatio / newRatio);
}

// 更新单词学习进度显示
function updateVocabProgress() {
  const vocabData = getVocabData();
  const today = new Date().toISOString().split('T')[0];
  const todayWords = vocabData.dailyWords?.[today] || [];
  const target = parseInt(localStorage.getItem("wordTarget") || "30");
  const reviewInfo = getReviewWords();
  const reviewTarget = getReviewTarget();
  
  setText("wordToday", todayWords.length);
  setText("wordTarget", target);
  setText("wordReview", reviewInfo.count);
  setText("wordReviewTarget", reviewTarget);
  
  // 更新比例显示
  const { newRatio, reviewRatio } = getVocabRatio();
  const ratioText = `${newRatio}:${reviewRatio}`;
  const ratioEl = $("vocabRatioDisplay");
  if (ratioEl) {
    ratioEl.textContent = `新词:复习 = ${ratioText}`;
  }
}

// 词汇
function shuffle(arr) { return arr.map(x => [Math.random(), x]).sort((a, b) => a[0] - b[0]).map(x => x[1]); }
function renderVocab() {
  const item = sampleVocab[vocabIndex % sampleVocab.length];
  setText("vocabWord", item.word);
  setText("vocabFreq", item.freq);
  const opts = shuffle([item.meaning, "无害的", "独特的", "鼓舞人心的"]);
  const box = $("vocabOptions");
  box.innerHTML = "";
  opts.forEach(opt => {
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
  
  // 同时记录到词汇学习数据
  const vocabData = getVocabData();
  if (!vocabData.words) vocabData.words = [];
  const wordExist = vocabData.words.find(w => w.word === item.word);
  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toISOString();
  
  if (!wordExist) {
    vocabData.words.push({
      word: item.word,
      meaning: item.meaning,
      meaning_en: item.meaning_en,
      phrases: item.phrases,
      root: item.root,
      freq: item.freq,
      learnedDate: now,  // 使用ISO格式存储完整时间
      lastReviewDate: now,
      reviewLevel: 0  // 从0开始，对应第一次复习（5分钟后）
    });
    
    // 更新今日学习单词
    if (!vocabData.dailyWords) vocabData.dailyWords = {};
    if (!vocabData.dailyWords[today]) vocabData.dailyWords[today] = [];
    if (!vocabData.dailyWords[today].includes(item.word)) {
      vocabData.dailyWords[today].push(item.word);
    }
  }
  
  saveVocabData(vocabData);
  updateVocabProgress();
}

// 标记单词已复习（累积复习机制）
function markWordReviewed(word) {
  const vocabData = getVocabData();
  const wordData = vocabData.words.find(w => w.word === word.word || w.word === word);
  if (wordData) {
    // 累积复习：只需要更新最后复习日期，不需要记录复习级别
    wordData.lastReviewDate = new Date().toISOString();
    saveVocabData(vocabData);
    updateVocabProgress();
  }
}

// 设置新词/复习词比例
function setVocabRatio() {
  const current = localStorage.getItem("vocabRatio") || "1:2";
  const options = ["1:1", "1:2", "1:3", "2:3"];
  const currentIndex = options.indexOf(current);
  
  let message = "请选择新词:复习词的比例：\n";
  options.forEach((opt, idx) => {
    const [newR, reviewR] = opt.split(":").map(Number);
    const target = parseInt(localStorage.getItem("wordTarget") || "30");
    const reviewTarget = Math.floor(target * reviewR / newR);
    message += `${idx + 1}. ${opt} (新词${target}个，复习${reviewTarget}个)${idx === currentIndex ? ' ← 当前' : ''}\n`;
  });
  
  const choice = prompt(message + "\n请输入选项编号（1-4）：", currentIndex + 1);
  const selectedIndex = parseInt(choice) - 1;
  
  if (selectedIndex >= 0 && selectedIndex < options.length) {
    localStorage.setItem("vocabRatio", options[selectedIndex]);
    updateVocabProgress();
    alert(`已设置学习比例为 ${options[selectedIndex]}`);
  }
}

// 地道英语
function renderIdioms(list) {
  const box = $("idiomList");
  box.innerHTML = "";
  if (!list.length) { box.innerHTML = `<div class="hint">未找到结果</div>`; return; }
  list.forEach(it => {
    const row = document.createElement("div");
    row.className = "list-item";
    row.innerHTML = `<div><div><strong>${it.phrase}</strong></div><div class="hint">${it.cn}</div><div class="hint">${it.en}</div><div class="hint">示例：${it.examples || "N/A"}</div></div>`;
    box.appendChild(row);
  });
}
function searchIdioms() {
  const q = $("idiomSearch").value.trim().toLowerCase();
  if (!q) return renderIdioms(sampleIdioms);
  renderIdioms(sampleIdioms.filter(it => it.phrase.toLowerCase().includes(q) || (it.cn && it.cn.includes(q))));
}

// 雅思单词书功能
let wordbookCurrentPage = 1;
const wordbookPageSize = 20;

function renderWordBook(page = 1, category = "", search = "") {
  wordbookCurrentPage = page;
  const container = $("wordbookList");
  if (!container) return;
  
  let filteredWords = [...ieltsWordBook];
  
  // 按分类筛选
  if (category) {
    filteredWords = filteredWords.filter(w => w.category === category);
  }
  
  // 按搜索关键词筛选
  if (search) {
    const searchLower = search.toLowerCase();
    filteredWords = filteredWords.filter(w => 
      w.word.toLowerCase().includes(searchLower) || 
      w.meaning.includes(search) ||
      (w.meaning_en && w.meaning_en.toLowerCase().includes(searchLower))
    );
  }
  
  // 分页
  const totalPages = Math.ceil(filteredWords.length / wordbookPageSize);
  const startIndex = (page - 1) * wordbookPageSize;
  const pageWords = filteredWords.slice(startIndex, startIndex + wordbookPageSize);
  
  if (pageWords.length === 0) {
    container.innerHTML = `<div class="hint">未找到匹配的单词</div>`;
    $("wordbookPagination").innerHTML = "";
    return;
  }
  
  container.innerHTML = pageWords.map(word => `
    <div class="wordbook-item">
      <div class="wordbook-word">
        <strong>${word.word}</strong>
        <span class="pill ${word.category}">${getCategoryName(word.category)}</span>
        <span class="pill ghost">${word.freq}</span>
      </div>
      <div class="wordbook-meaning">
        <div>中文：${word.meaning}</div>
        <div>英文：${word.meaning_en || ""}</div>
        ${word.phrases ? `<div>短语：${word.phrases}</div>` : ""}
      </div>
      <button class="btn-link" onclick="addWordToLearning('${word.word}')">加入学习</button>
    </div>
  `).join("");
  
  // 渲染分页
  renderWordBookPagination(totalPages, page);
}

function renderWordBookPagination(totalPages, currentPage) {
  const container = $("wordbookPagination");
  if (!container || totalPages <= 1) {
    container.innerHTML = "";
    return;
  }
  
  const category = $("wordbookCategory")?.value || "";
  const search = $("wordbookSearch")?.value || "";
  
  let html = "";
  if (currentPage > 1) {
    html += `<button class="page-btn" onclick="renderWordBookWithParams(${currentPage - 1}, '${category}', '${search}')">上一页</button>`;
  }
  html += `<span class="page-info">第 ${currentPage} / ${totalPages} 页</span>`;
  if (currentPage < totalPages) {
    html += `<button class="page-btn" onclick="renderWordBookWithParams(${currentPage + 1}, '${category}', '${search}')">下一页</button>`;
  }
  container.innerHTML = html;
}

// 全局函数，用于分页按钮调用
window.renderWordBookWithParams = function(page, category, search) {
  renderWordBook(page, category, search);
};

function bindWordBook() {
  const searchInput = $("wordbookSearch");
  const categorySelect = $("wordbookCategory");
  
  if (searchInput) {
    let searchTimeout;
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        const category = categorySelect ? categorySelect.value : "";
        renderWordBook(1, category, e.target.value);
      }, 300);
    });
  }
  
  if (categorySelect) {
    categorySelect.addEventListener("change", (e) => {
      const search = searchInput ? searchInput.value : "";
      renderWordBook(1, e.target.value, search);
    });
  }
}

// 全局函数，用于分页
window.renderWordBook = function(page) {
  const category = $("wordbookCategory")?.value || "";
  const search = $("wordbookSearch")?.value || "";
  renderWordBook(page, category, search);
};

function getCategoryName(category) {
  const names = {
    geography: "地理",
    nature: "自然",
    education: "教育",
    technology: "科技",
    culture: "文化",
    business: "商业"
  };
  return names[category] || category;
}

// 将单词加入学习
window.addWordToLearning = function(word) {
  const wordData = ieltsWordBook.find(w => w.word === word);
  if (wordData) {
    addToNotebook(wordData);
    alert(`已将 "${word}" 加入学习列表！`);
  }
};

// 单词查询功能（调用有道翻译API）
async function searchWord(word) {
  const resultContainer = $("wordSearchResult");
  if (!resultContainer) return;
  
  if (!word || !word.trim()) {
    resultContainer.innerHTML = `<div class="hint">请输入要查询的单词</div>`;
    return;
  }
  
  resultContainer.innerHTML = `<div class="loading">查询中...</div>`;
  
  try {
    // 注意：有道翻译API需要API Key，这里使用公开的API示例
    // 实际使用时需要替换为你的API Key或使用其他翻译服务
    const query = encodeURIComponent(word.trim());
    
    // 使用免费的翻译API（示例：使用MyMemory翻译API作为备选）
    // 实际项目中应该使用有道翻译API，需要配置API Key
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${query}&langpair=en|zh`);
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
      resultContainer.innerHTML = `
        <div class="word-result-card">
          <div class="word-result-header">
            <h3>${word}</h3>
            <button class="btn-link" onclick="addWordToLearning('${word}')">加入学习</button>
          </div>
          <div class="word-result-content">
            <div class="result-item">
              <strong>翻译：</strong>${data.responseData.translatedText}
            </div>
            ${data.responseData.match ? `<div class="result-item"><strong>匹配度：</strong>${data.responseData.match}%</div>` : ""}
          </div>
        </div>
      `;
    } else {
      // 如果API失败，使用本地数据
      const localWord = ieltsWordBook.find(w => 
        w.word.toLowerCase() === word.toLowerCase() || 
        w.meaning === word
      );
      
      if (localWord) {
        resultContainer.innerHTML = `
          <div class="word-result-card">
            <div class="word-result-header">
              <h3>${localWord.word}</h3>
              <button class="btn-link" onclick="addWordToLearning('${localWord.word}')">加入学习</button>
            </div>
            <div class="word-result-content">
              <div class="result-item"><strong>中文：</strong>${localWord.meaning}</div>
              <div class="result-item"><strong>英文释义：</strong>${localWord.meaning_en || ""}</div>
              ${localWord.phrases ? `<div class="result-item"><strong>短语：</strong>${localWord.phrases}</div>` : ""}
              <div class="result-item"><strong>分类：</strong>${getCategoryName(localWord.category)}</div>
              <div class="result-item"><strong>词频：</strong>${localWord.freq}</div>
            </div>
          </div>
        `;
      } else {
        resultContainer.innerHTML = `<div class="hint">未找到该单词，请检查拼写或尝试其他单词</div>`;
      }
    }
  } catch (error) {
    console.error("查询失败:", error);
    resultContainer.innerHTML = `<div class="hint">查询失败，请稍后重试。提示：可以尝试使用雅思单词书功能查找单词。</div>`;
  }
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

function bootstrap() {
  bindNav();
  $("ctaEnter").onclick = () => document.getElementById("targets").scrollIntoView({ behavior: "smooth" });
  $("ctaVocab").onclick = () => document.getElementById("vocab").scrollIntoView({ behavior: "smooth" });
  $("ctaExamDate").onclick = setExamDate;
  $("btnSetExam").onclick = setExamDate;
  $("startMock").onclick = () => alert("真题演练功能占位，后续接入完整评分");
  $("searchIdiom").onclick = searchIdioms;
  $("exportExcel").onclick = exportExcel;
  $("exportPdf").onclick = exportPdf;
  document.querySelectorAll(".start-btn").forEach(btn => btn.onclick = () => startTimer(btn.dataset.module));
  $("knowBtn").onclick = () => { 
    vocabIndex++; 
    renderVocab();
    // 记录学习进度
    const item = sampleVocab[(vocabIndex - 1) % sampleVocab.length];
    addToNotebook(item);
  };
  $("dontKnowBtn").onclick = () => { vocabIndex++; renderVocab(); };
  $("addNotebookBtn").onclick = () => addToNotebook(sampleVocab[vocabIndex % sampleVocab.length]);
  // 设置比例按钮
  if ($("btnSetVocabRatio")) {
    $("btnSetVocabRatio").onclick = setVocabRatio;
  }
  if ($("btnSetRatio")) {
    $("btnSetRatio").onclick = setVocabRatio;
  }
  
  // 复习功能
  $("btnReview").onclick = () => {
    const reviewInfo = getReviewWords();
    if (reviewInfo.count === 0) {
      alert("太棒了！目前没有需要复习的单词～ 🎉");
      return;
    }
    
    // 显示复习单词列表（简化版，后续可以扩展为完整复习界面）
    const reviewList = reviewInfo.list.slice(0, 10).map(w => w.word).join("、");
    const more = reviewInfo.count > 10 ? `等${reviewInfo.count}个` : "";
    const confirmMsg = `今日需要复习 ${reviewInfo.count} 个单词\n\n${reviewList}${more}\n\n开始复习吗？`;
    
    if (confirm(confirmMsg)) {
      // 这里可以跳转到复习页面或开始复习流程
      alert("复习功能开发中，将支持听写/释义/选择等多种复习模式～");
    }
  };

  // 分数/目标值示例（5的倍数：5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0）
  const avg = localStorage.getItem("targetAvg") || "7.0";
  // 确保是5的倍数格式
  const validScores = [5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];
  const numAvg = parseFloat(avg);
  const closestScore = validScores.reduce((prev, curr) => 
    Math.abs(curr - numAvg) < Math.abs(prev - numAvg) ? curr : prev
  );
  setText("targetAverage", closestScore.toFixed(1));
  setText("coinCount", localStorage.getItem("coins") || "0");

  // 倒计时
  updateCountdown(localStorage.getItem("examDate"));
  
  // 设置考试日期输入框
  const dateInput = $("examDateInput");
  if (dateInput) {
    const savedDate = localStorage.getItem("examDate");
    if (savedDate) {
      dateInput.value = savedDate;
    }
    dateInput.addEventListener("change", function() {
      if (this.value) {
        localStorage.setItem("examDate", this.value);
        updateCountdown(this.value);
      }
    });
  }

  // 每日鸡汤句子
  updateDailyQuote();

  // 单词查询功能
  if ($("btnWordSearch")) {
    $("btnWordSearch").onclick = () => {
      const word = $("wordSearchInput")?.value.trim();
      searchWord(word);
    };
    // 支持回车查询
    if ($("wordSearchInput")) {
      $("wordSearchInput").addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          searchWord(e.target.value.trim());
        }
      });
    }
  }
  
  // 单词书功能
  bindWordBook();
  renderWordBook(1);
  
  // 渲染
  renderVocab();
  renderIdioms(sampleIdioms);
  updateVocabProgress();
  bindRangeTabs();
  const initialData = getRangeData("today");
  renderChart(initialData, "today");
}

document.addEventListener("DOMContentLoaded", bootstrap);
