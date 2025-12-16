// Supabase 配置（如果需要）
const SUPABASE_URL = 'https://admazpzjskimyrwczjus.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkbWF6cHpqc2tpbXlyd2N6anVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3OTg4MjgsImV4cCI6MjA4MTM3NDgyOH0.CP3_qYwIJaWlgaBV7xUREC88XjNJotdZFPzui2ihoeI';

// 每日鸡汤句子
const dailyQuotes = [
  { en: "The journey of a thousand miles begins with a single step.", cn: "千里之行，始于足下" },
  { en: "The greatest glory in living lies not in never falling, but in rising every time we fall.", cn: "生活中最大的荣耀不在于从不跌倒，而在于每次跌倒后都能站起来" },
  { en: "Success is not final, failure is not fatal: it is the courage to continue that counts.", cn: "成功不是终点，失败不是致命的：继续前进的勇气才是最重要的" },
  { en: "The only way to do great work is to love what you do.", cn: "做出伟大工作的唯一方法就是热爱你所做的事" },
  { en: "Believe you can and you're halfway there.", cn: "相信你能做到，你就已经成功了一半" },
  { en: "Don't watch the clock; do what it does. Keep going.", cn: "不要看时钟；做它做的事。继续前进" },
  { en: "The future belongs to those who believe in the beauty of their dreams.", cn: "未来属于那些相信梦想之美的人" },
  { en: "It is during our darkest moments that we must focus to see the light.", cn: "正是在最黑暗的时刻，我们必须集中精力看到光明" },
  { en: "The only impossible journey is the one you never begin.", cn: "唯一不可能的旅程是你从未开始的旅程" },
  { en: "In the middle of difficulty lies opportunity.", cn: "在困难中蕴藏着机遇" },
  { en: "You are never too old to set another goal or to dream a new dream.", cn: "你永远不会太老，无法设定另一个目标或梦想一个新的梦想" },
  { en: "Life is what happens to you while you're busy making other plans.", cn: "生活就是你在忙于制定其他计划时发生的事情" },
  { en: "The way to get started is to quit talking and begin doing.", cn: "开始的方法就是停止说话，开始行动" },
  { en: "Innovation distinguishes between a leader and a follower.", cn: "创新区分了领导者和追随者" },
  { en: "The person who says it cannot be done should not interrupt the person who is doing it.", cn: "说不可能的人不应该打断正在做的人" },
  { en: "There are no traffic jams along the extra mile.", cn: "在额外的一英里上没有交通堵塞" },
  { en: "It is our choices that show what we truly are, far more than our abilities.", cn: "是我们的选择显示了我们的真实面貌，远超过我们的能力" },
  { en: "The only person you are destined to become is the person you decide to be.", cn: "你注定要成为的唯一的人就是你决定成为的人" },
  { en: "Fall seven times, stand up eight.", cn: "跌倒七次，站起来八次" },
  { en: "You miss 100% of the shots you don't take.", cn: "你不投篮就错过了100%的投篮" },
  { en: "Whether you think you can or you think you can't, you're right.", cn: "无论你认为你能还是不能，你都是对的" },
  { en: "The two most important days in your life are the day you are born and the day you find out why.", cn: "你生命中最重要的两天是你出生的那一天和你发现原因的那一天" },
  { en: "Limitations live only in our minds. But if we use our imaginations, our possibilities become limitless.", cn: "限制只存在于我们的脑海中。但如果我们运用想象力，我们的可能性就会变得无限" },
  { en: "You can't use up creativity. The more you use, the more you have.", cn: "你不能用完创造力。你用得越多，你拥有的就越多" },
  { en: "Dream big and dare to fail.", cn: "大胆梦想，敢于失败" },
  { en: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", cn: "与我们内心相比，我们身后和面前的东西都是微不足道的" },
  { en: "The best time to plant a tree was 20 years ago. The second best time is now.", cn: "种树的最佳时间是20年前。第二好的时间是现在" },
  { en: "Eighty percent of success is showing up.", cn: "成功的百分之八十是出现" },
  { en: "Your time is limited, don't waste it living someone else's life.", cn: "你的时间是有限的，不要浪费在过别人的生活上" },
  { en: "If you are not willing to risk the usual, you will have to settle for the ordinary.", cn: "如果你不愿意冒常规的风险，你将不得不满足于平凡" },
  { en: "The only way to do great work is to love what you do.", cn: "做出伟大工作的唯一方法就是热爱你所做的事" }
];

// 获取每日句子
function getDailyQuote() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  return dailyQuotes[dayOfYear % dailyQuotes.length];
}

// 更新每日句子
function updateDailyQuote() {
  const quote = getDailyQuote();
  const quoteEn = document.querySelector(".quote-en");
  const quoteCn = document.querySelector(".quote-cn");
  if (quoteEn) quoteEn.textContent = `"${quote.en}"`;
  if (quoteCn) quoteCn.textContent = quote.cn;
}

// 页面切换功能
function showPage(pageId) {
  const homepageContent = document.querySelector(".homepage-content");
  const allDetailPages = document.querySelectorAll(".detail-page");
  
  // 如果是首页
  if (pageId === "hero") {
    // 显示首页内容
    if (homepageContent) {
      homepageContent.classList.remove("hidden");
    }
    // 隐藏所有详细页面
    allDetailPages.forEach(page => {
      page.classList.remove("active");
    });
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    // 隐藏首页内容
    if (homepageContent) {
      homepageContent.classList.add("hidden");
    }
    // 隐藏所有详细页面
    allDetailPages.forEach(page => {
      page.classList.remove("active");
    });
    // 显示目标页面
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
      targetPage.classList.add("active");
      // 滚动到对应位置
      targetPage.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  
  // 更新导航激活状态
  document.querySelectorAll(".nav-item").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.scroll === pageId);
  });
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

// 用户数据管理
function getUserData() {
  const data = localStorage.getItem("ieltsUserData");
  return data ? JSON.parse(data) : {
    targetAvg: 7.0,
    reading: 7.5,
    listening: 7,
    speaking: 6.5,
    writing: 6.5,
    examDate: null,
    coins: 0,
    vocabTarget: 30,
    vocabRatio: { new: 1, review: 2 }
  };
}

function saveUserData(data) {
  localStorage.setItem("ieltsUserData", JSON.stringify(data));
}

// 更新目标平均分显示
function updateTargetAverage() {
  const data = getUserData();
  const validScores = [5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0];
  let targetAvg = parseFloat(data.targetAvg) || 7.0;
  
  // 找到最接近的有效分数
  let closest = validScores[0];
  let minDiff = Math.abs(targetAvg - closest);
  validScores.forEach(score => {
    const diff = Math.abs(targetAvg - score);
    if (diff < minDiff) {
      minDiff = diff;
      closest = score;
    }
  });
  
  targetAvg = closest;
  const targetEl = document.getElementById("targetAverage");
  if (targetEl) {
    targetEl.textContent = targetAvg.toFixed(1);
  }
  
  // 更新问候语中的分数
  const helloEl = document.querySelector(".hello");
  if (helloEl) {
    helloEl.textContent = `早安，准${targetAvg.toFixed(1)}分选手！👋`;
  }
  
  // 更新各科分数
  const readingEl = document.getElementById("readingScore");
  const listeningEl = document.getElementById("listeningScore");
  const speakingEl = document.getElementById("speakingScore");
  const writingEl = document.getElementById("writingScore");
  
  if (readingEl) readingEl.textContent = data.reading || 7.5;
  if (listeningEl) listeningEl.textContent = data.listening || 7;
  if (speakingEl) speakingEl.textContent = data.speaking || 6.5;
  if (writingEl) writingEl.textContent = data.writing || 6.5;
}

// 考试日期管理
function updateExamCountdown() {
  const data = getUserData();
  const examDate = data.examDate;
  const countdownEl = document.getElementById("examCountdown");
  const countValueEl = document.getElementById("countValue");
  
  if (!examDate) {
    if (countdownEl) countdownEl.textContent = "未设置";
    if (countValueEl) countValueEl.textContent = "未设置";
    return;
  }
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const exam = new Date(examDate);
  exam.setHours(0, 0, 0, 0);
  const diff = Math.ceil((exam - today) / (1000 * 60 * 60 * 24));
  
  if (diff < 0) {
    if (countdownEl) countdownEl.textContent = "已过期";
    if (countValueEl) countValueEl.textContent = "已过期";
  } else if (diff === 0) {
    if (countdownEl) countdownEl.textContent = "今天";
    if (countValueEl) countValueEl.textContent = "今天";
  } else {
    if (countdownEl) countdownEl.textContent = `${diff}天`;
    if (countValueEl) countValueEl.textContent = `${diff}天`;
  }
}

function setExamDate() {
  const examDateInput = document.getElementById("examDateInput");
  if (examDateInput) {
    examDateInput.style.display = "block";
    examDateInput.showPicker?.();
    examDateInput.focus();
  }
}

// 词汇学习数据管理
function getVocabData() {
  const data = localStorage.getItem("ieltsVocabData");
  return data ? JSON.parse(data) : {
    notebook: [],
    learning: [],
    learnedToday: 0,
    reviewedToday: 0
  };
}

function saveVocabData(data) {
  localStorage.setItem("ieltsVocabData", JSON.stringify(data));
}

// 判断单词是否需要复习（累积复习机制，无上限）
function shouldReviewWord(word) {
  if (!word.learnedDate) return false;
  
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const learned = new Date(word.learnedDate);
  learned.setHours(0, 0, 0, 0);
  const lastReview = word.lastReviewDate ? new Date(word.lastReviewDate) : null;
  if (lastReview) lastReview.setHours(0, 0, 0, 0);
  
  // 如果学习日期在今天之前，且今天还没有复习过，则需要复习
  return learned < today && (!lastReview || lastReview < today);
}

// 获取需要复习的单词
function getReviewWords() {
  const vocabData = getVocabData();
  const reviewWords = vocabData.notebook.filter(shouldReviewWord);
  return {
    count: reviewWords.length,
    words: reviewWords
  };
}

// 获取词汇比例
function getVocabRatio() {
  const data = getUserData();
  return data.vocabRatio || { new: 1, review: 2 };
}

function setVocabRatio(newRatio, reviewRatio) {
  const data = getUserData();
  data.vocabRatio = { new: newRatio, review: reviewRatio };
  saveUserData(data);
  updateVocabProgress();
}

// 计算复习目标数量
function getReviewTarget() {
  const data = getUserData();
  const ratio = data.vocabRatio || { new: 1, review: 2 };
  const newTarget = data.vocabTarget || 30;
  return Math.floor(newTarget * ratio.review / ratio.new);
}

// 更新词汇进度显示
function updateVocabProgress() {
  const vocabData = getVocabData();
  const userData = getUserData();
  const ratio = getVocabRatio();
  const reviewInfo = getReviewWords();
  
  const todayEl = document.getElementById("wordToday");
  const targetEl = document.getElementById("wordTarget");
  const reviewEl = document.getElementById("wordReview");
  const reviewTargetEl = document.getElementById("wordReviewTarget");
  const ratioEl = document.getElementById("vocabRatioDisplay");
  
  if (todayEl) todayEl.textContent = vocabData.learnedToday || 0;
  if (targetEl) targetEl.textContent = userData.vocabTarget || 30;
  if (reviewEl) reviewEl.textContent = reviewInfo.count;
  if (reviewTargetEl) reviewTargetEl.textContent = getReviewTarget();
  if (ratioEl) ratioEl.textContent = `新词:复习 = ${ratio.new}:${ratio.review}`;
}

// 设置词汇比例
function bindVocabRatio() {
  const btnSetRatio = document.getElementById("btnSetRatio");
  const btnSetVocabRatio = document.getElementById("btnSetVocabRatio");
  
  const showRatioDialog = () => {
    const userData = getUserData();
    const ratio = getVocabRatio();
    const newTarget = userData.vocabTarget || 30;
    
    const options = [
      { new: 1, review: 1, label: `1:1 (新词${newTarget}个, 复习${newTarget}个)` },
      { new: 1, review: 2, label: `1:2 (新词${newTarget}个, 复习${newTarget * 2}个)` },
      { new: 1, review: 3, label: `1:3 (新词${newTarget}个, 复习${newTarget * 3}个)` },
      { new: 2, review: 3, label: `2:3 (新词${newTarget}个, 复习${Math.floor(newTarget * 3 / 2)}个)` }
    ];
    
    const currentIndex = options.findIndex(opt => 
      opt.new === ratio.new && opt.review === ratio.review
    );
    
    let message = "请选择新词复习词的比例:\n";
    options.forEach((opt, idx) => {
      const marker = idx === currentIndex ? " ← 当前" : "";
      message += `${idx + 1}. ${opt.label}${marker}\n`;
    });
    
    const choice = prompt(message + "\n请输入选项编号 (1-4):");
    if (choice && choice >= "1" && choice <= "4") {
      const selected = options[parseInt(choice) - 1];
      setVocabRatio(selected.new, selected.review);
      alert(`已设置为 ${selected.new}:${selected.review}`);
    }
  };
  
  if (btnSetRatio) {
    btnSetRatio.addEventListener("click", showRatioDialog);
  }
  if (btnSetVocabRatio) {
    btnSetVocabRatio.addEventListener("click", showRatioDialog);
  }
}

// 添加到生词本
function addToNotebook(word, meaning, category, frequency) {
  const vocabData = getVocabData();
  const existing = vocabData.notebook.find(w => w.word === word);
  
  if (existing) {
    existing.clickCount = (existing.clickCount || 0) + 1;
    existing.lastClickDate = new Date().toISOString();
  } else {
    vocabData.notebook.push({
      word,
      meaning,
      category,
      frequency,
      clickCount: 1,
      addedDate: new Date().toISOString(),
      lastClickDate: new Date().toISOString(),
      learnedDate: null,
      lastReviewDate: null,
      reviewLevel: 0
    });
  }
  
  saveVocabData(vocabData);
  return existing ? "已更新点击次数" : "已加入生词本";
}

// 标记单词已学习
function markWordLearned(word) {
  const vocabData = getVocabData();
  const wordObj = vocabData.notebook.find(w => w.word === word);
  
  if (wordObj) {
    const today = new Date().toISOString().split("T")[0];
    if (!wordObj.learnedDate) {
      wordObj.learnedDate = today;
      vocabData.learnedToday = (vocabData.learnedToday || 0) + 1;
    }
    saveVocabData(vocabData);
    updateVocabProgress();
  }
}

// 标记单词已复习
function markWordReviewed(word) {
  const vocabData = getVocabData();
  const wordObj = vocabData.notebook.find(w => w.word === word);
  
  if (wordObj) {
    const today = new Date().toISOString().split("T")[0];
    wordObj.lastReviewDate = today;
    wordObj.reviewLevel = (wordObj.reviewLevel || 0) + 1;
    vocabData.reviewedToday = (vocabData.reviewedToday || 0) + 1;
    saveVocabData(vocabData);
    updateVocabProgress();
  }
}

// 图表数据管理
function getTimeData(range = "today") {
  const data = localStorage.getItem("ieltsTimeData");
  const allData = data ? JSON.parse(data) : {};
  const today = new Date();
  
  let startDate, endDate;
  switch (range) {
    case "today":
      startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "week":
      const dayOfWeek = today.getDay();
      startDate = new Date(today);
      startDate.setDate(today.getDate() - dayOfWeek);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
      break;
    case "month":
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0, 23, 59, 59, 999);
      break;
    case "quarter":
      const quarter = Math.floor(today.getMonth() / 3);
      startDate = new Date(today.getFullYear(), quarter * 3, 1);
      endDate = new Date(today.getFullYear(), (quarter + 1) * 3, 0, 23, 59, 59, 999);
      break;
    case "year":
      startDate = new Date(today.getFullYear(), 0, 1);
      endDate = new Date(today.getFullYear(), 11, 31, 23, 59, 59, 999);
      break;
    default:
      startDate = new Date(today);
      startDate.setHours(0, 0, 0, 0);
      endDate = new Date(today);
      endDate.setHours(23, 59, 59, 999);
  }
  
  const filtered = {};
  Object.keys(allData).forEach(dateStr => {
    const date = new Date(dateStr);
    if (date >= startDate && date <= endDate) {
      filtered[dateStr] = allData[dateStr];
    }
  });
  
  return filtered;
}

// 渲染图表
let timeChart = null;
function renderChart(range = "today") {
  const ctx = document.getElementById("timeChart");
  if (!ctx) return;
  
  const data = getTimeData(range);
  const labels = ["听力", "口语", "阅读", "写作"];
  const values = [0, 0, 0, 0];
  
  Object.values(data).forEach(dayData => {
    if (dayData.listening) values[0] += dayData.listening;
    if (dayData.speaking) values[1] += dayData.speaking;
    if (dayData.reading) values[2] += dayData.reading;
    if (dayData.writing) values[3] += dayData.writing;
  });
  
  if (timeChart) {
    timeChart.destroy();
  }
  
  timeChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "学习时长（分钟）",
        data: values,
        backgroundColor: [
          "rgba(99, 102, 241, 0.8)",
          "rgba(139, 92, 246, 0.8)",
          "rgba(236, 72, 153, 0.8)",
          "rgba(251, 146, 60, 0.8)"
        ],
        borderColor: [
          "rgba(99, 102, 241, 1)",
          "rgba(139, 92, 246, 1)",
          "rgba(236, 72, 153, 1)",
          "rgba(251, 146, 60, 1)"
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 10
          }
        }
      }
    }
  });
}

// 绑定图表时间范围切换
function bindChartTabs() {
  document.querySelectorAll(".range-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".range-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      const range = tab.dataset.range;
      renderChart(range);
    });
  });
}

// 计时器管理
const timers = {};
function startTimer(module) {
  if (timers[module]) {
    clearInterval(timers[module]);
  }
  
  let seconds = 0;
  const timerEl = document.querySelector(`.timer[data-module="${module}"]`);
  const startBtn = document.querySelector(`.start-btn[data-module="${module}"]`);
  
  if (startBtn) {
    startBtn.textContent = "暂停";
    startBtn.onclick = () => stopTimer(module);
  }
  
  timers[module] = setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (timerEl) {
      timerEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }
  }, 1000);
}

function stopTimer(module) {
  if (timers[module]) {
    clearInterval(timers[module]);
    delete timers[module];
  }
  
  const timerEl = document.querySelector(`.timer[data-module="${module}"]`);
  const startBtn = document.querySelector(`.start-btn[data-module="${module}"]`);
  const seconds = timerEl ? parseInt(timerEl.textContent.split(":")[0]) * 60 + parseInt(timerEl.textContent.split(":")[1]) : 0;
  
  if (startBtn) {
    startBtn.textContent = "开始";
    startBtn.onclick = () => startTimer(module);
  }
  
  // 保存学习时长
  if (seconds > 0) {
    const today = new Date().toISOString().split("T")[0];
    const timeData = JSON.parse(localStorage.getItem("ieltsTimeData") || "{}");
    if (!timeData[today]) {
      timeData[today] = {};
    }
    timeData[today][module] = (timeData[today][module] || 0) + Math.floor(seconds / 60);
    localStorage.setItem("ieltsTimeData", JSON.stringify(timeData));
    renderChart();
  }
}

function bindTimers() {
  document.querySelectorAll(".start-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const module = btn.dataset.module;
      startTimer(module);
    });
  });
}

// 雅思单词书数据
const ieltsWordBook = [
  { word: "earthquake", meaning: "地震", category: "geography", frequency: "高频" },
  { word: "tsunami", meaning: "海啸", category: "geography", frequency: "中频" },
  { word: "volcano", meaning: "火山", category: "geography", frequency: "高频" },
  { word: "climate", meaning: "气候", category: "nature", frequency: "高频" },
  { word: "ecosystem", meaning: "生态系统", category: "nature", frequency: "中频" },
  { word: "biodiversity", meaning: "生物多样性", category: "nature", frequency: "中频" },
  { word: "curriculum", meaning: "课程", category: "education", frequency: "高频" },
  { word: "syllabus", meaning: "教学大纲", category: "education", frequency: "中频" },
  { word: "innovation", meaning: "创新", category: "technology", frequency: "高频" },
  { word: "artificial intelligence", meaning: "人工智能", category: "technology", frequency: "高频" },
  { word: "heritage", meaning: "遗产", category: "culture", frequency: "中频" },
  { word: "entrepreneur", meaning: "企业家", category: "business", frequency: "高频" }
];

// 渲染单词书
let wordbookCurrentPage = 1;
const wordbookPageSize = 10;

function renderWordBook() {
  const listEl = document.getElementById("wordbookList");
  const paginationEl = document.getElementById("wordbookPagination");
  if (!listEl) return;
  
  const searchTerm = document.getElementById("wordbookSearch")?.value.toLowerCase() || "";
  const category = document.getElementById("wordbookCategory")?.value || "";
  
  let filtered = ieltsWordBook.filter(word => {
    const matchSearch = !searchTerm || word.word.toLowerCase().includes(searchTerm) || word.meaning.includes(searchTerm);
    const matchCategory = !category || word.category === category;
    return matchSearch && matchCategory;
  });
  
  const totalPages = Math.ceil(filtered.length / wordbookPageSize);
  const start = (wordbookCurrentPage - 1) * wordbookPageSize;
  const end = start + wordbookPageSize;
  const pageData = filtered.slice(start, end);
  
  listEl.innerHTML = pageData.map(word => `
    <div class="wordbook-item">
      <div class="wordbook-word">
        <strong>${word.word}</strong>
        <span class="pill ${word.category === "geography" ? "blue" : word.category === "nature" ? "green" : word.category === "education" ? "purple" : word.category === "technology" ? "orange" : word.category === "culture" ? "red" : "blue"}">${word.frequency}</span>
      </div>
      <div class="wordbook-meaning">
        <div><strong>中文：</strong>${word.meaning}</div>
        <div><strong>主题：</strong>${getCategoryName(word.category)}</div>
      </div>
      <button class="btn ghost btn-sm" onclick="addWordToLearning('${word.word}')">加入学习</button>
    </div>
  `).join("");
  
  if (paginationEl) {
    renderWordBookPagination(totalPages);
  }
}

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

function renderWordBookPagination(totalPages) {
  const paginationEl = document.getElementById("wordbookPagination");
  if (!paginationEl) return;
  
  if (totalPages <= 1) {
    paginationEl.innerHTML = "";
    return;
  }
  
  let html = "";
  if (wordbookCurrentPage > 1) {
    html += `<button class="page-btn" onclick="wordbookCurrentPage = ${wordbookCurrentPage - 1}; renderWordBook();">上一页</button>`;
  }
  html += `<span class="page-info">第 ${wordbookCurrentPage} / ${totalPages} 页</span>`;
  if (wordbookCurrentPage < totalPages) {
    html += `<button class="page-btn" onclick="wordbookCurrentPage = ${wordbookCurrentPage + 1}; renderWordBook();">下一页</button>`;
  }
  paginationEl.innerHTML = html;
}

function addWordToLearning(word) {
  const wordObj = ieltsWordBook.find(w => w.word === word);
  if (wordObj) {
    addToNotebook(wordObj.word, wordObj.meaning, wordObj.category, wordObj.frequency);
    alert(`"${word}" 已加入学习列表！`);
  }
}

function bindWordBook() {
  const searchInput = document.getElementById("wordbookSearch");
  const categorySelect = document.getElementById("wordbookCategory");
  
  if (searchInput) {
    searchInput.addEventListener("input", () => {
      wordbookCurrentPage = 1;
      renderWordBook();
    });
  }
  
  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      wordbookCurrentPage = 1;
      renderWordBook();
    });
  }
}

// 单词查询
async function searchWord(query) {
  const resultEl = document.getElementById("wordSearchResult");
  if (!resultEl) return;
  
  if (!query.trim()) {
    resultEl.innerHTML = "<div class='loading'>请输入要查询的单词</div>";
    return;
  }
  
  resultEl.innerHTML = "<div class='loading'>查询中...</div>";
  
  try {
    // 使用 MyMemory API 作为占位符（实际应该使用有道翻译API）
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(query)}&langpair=en|zh`);
    const data = await response.json();
    
    if (data.responseData && data.responseData.translatedText) {
      const translation = data.responseData.translatedText;
      resultEl.innerHTML = `
        <div class="word-result-card">
          <div class="word-result-header">
            <h3>${query}</h3>
            <button class="btn primary" onclick="addWordToLearning('${query}')">加入学习</button>
          </div>
          <div class="word-result-content">
            <div class="result-item"><strong>翻译：</strong>${translation}</div>
          </div>
        </div>
      `;
    } else {
      throw new Error("未找到翻译结果");
    }
  } catch (error) {
    // 如果API失败，使用本地数据
    const localWord = ieltsWordBook.find(w => w.word.toLowerCase() === query.toLowerCase());
    if (localWord) {
      resultEl.innerHTML = `
        <div class="word-result-card">
          <div class="word-result-header">
            <h3>${localWord.word}</h3>
            <button class="btn primary" onclick="addWordToLearning('${localWord.word}')">加入学习</button>
          </div>
          <div class="word-result-content">
            <div class="result-item"><strong>中文：</strong>${localWord.meaning}</div>
            <div class="result-item"><strong>主题：</strong>${getCategoryName(localWord.category)}</div>
            <div class="result-item"><strong>频率：</strong>${localWord.frequency}</div>
          </div>
        </div>
      `;
    } else {
      resultEl.innerHTML = "<div class='loading'>未找到该单词，请检查拼写或尝试其他单词</div>";
    }
  }
}

function bindWordSearch() {
  const searchInput = document.getElementById("wordSearchInput");
  const searchBtn = document.getElementById("btnWordSearch");
  
  const performSearch = () => {
    const query = searchInput?.value.trim();
    if (query) {
      searchWord(query);
    }
  };
  
  if (searchBtn) {
    searchBtn.addEventListener("click", performSearch);
  }
  
  if (searchInput) {
    searchInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        performSearch();
      }
    });
  }
}

// 导出功能
function exportToExcel() {
  const vocabData = getVocabData();
  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(vocabData.notebook);
  XLSX.utils.book_append_sheet(workbook, worksheet, "生词本");
  XLSX.writeFile(workbook, "ielts-learning-data.xlsx");
  alert("已导出到 Excel！");
}

function exportToPdf() {
  const vocabData = getVocabData();
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  
  doc.setFontSize(16);
  doc.text("IELTS 学习数据", 10, 10);
  doc.setFontSize(12);
  
  let y = 20;
  vocabData.notebook.forEach((word, idx) => {
    if (y > 280) {
      doc.addPage();
      y = 10;
    }
    doc.text(`${idx + 1}. ${word.word} - ${word.meaning}`, 10, y);
    y += 7;
  });
  
  doc.save("ielts-learning-data.pdf");
  alert("已导出到 PDF！");
}

function bindExport() {
  const excelBtn = document.getElementById("exportExcel");
  const pdfBtn = document.getElementById("exportPdf");
  
  if (excelBtn) {
    excelBtn.addEventListener("click", exportToExcel);
  }
  if (pdfBtn) {
    pdfBtn.addEventListener("click", exportToPdf);
  }
}

// 初始化
function bootstrap() {
  updateDailyQuote();
  updateTargetAverage();
  updateExamCountdown();
  updateVocabProgress();
  renderChart();
  
  bindNav();
  bindChartTabs();
  bindTimers();
  bindVocabRatio();
  bindWordBook();
  bindWordSearch();
  bindExport();
  
  // 考试日期设置
  const btnSetExam = document.getElementById("btnSetExam");
  const examDateInput = document.getElementById("examDateInput");
  
  if (btnSetExam) {
    btnSetExam.addEventListener("click", () => {
      if (examDateInput) {
        examDateInput.style.display = "block";
        examDateInput.showPicker?.();
        examDateInput.focus();
      }
    });
  }
  
  if (examDateInput) {
    examDateInput.addEventListener("change", (e) => {
      const data = getUserData();
      data.examDate = e.target.value;
      saveUserData(data);
      updateExamCountdown();
      examDateInput.style.display = "none";
    });
  }
  
  // 进入庄园按钮
  const ctaEnter = document.getElementById("ctaEnter");
  if (ctaEnter) {
    ctaEnter.addEventListener("click", () => {
      alert("欢迎进入你的学习庄园！继续努力吧~ 🌱");
    });
  }
  
  // 开始背诵按钮
  const ctaVocab = document.getElementById("ctaVocab");
  if (ctaVocab) {
    ctaVocab.addEventListener("click", () => {
      showPage("vocab");
    });
  }
  
  // 初始化单词书
  renderWordBook();
}

// 页面加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}

