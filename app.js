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
      
      // 如果是单词书页面，初始化
      if (pageId === "wordbook") {
        setTimeout(() => {
          if (!wordbookState.initialized) {
            initWordBook();
            wordbookState.initialized = true;
          }
        }, 100);
      }
      
      // 如果是真题演练页面，初始化
      if (pageId === "mock") {
        setTimeout(() => {
          initMockTests();
        }, 100);
      }
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
    vocabRatio: { new: 1, review: 2 },
    userName: "",
    userAvatar: null
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
  
  const vocabTarget = userData.vocabTarget || 30;
  
  if (todayEl) todayEl.textContent = vocabData.learnedToday || 0;
  if (targetEl) targetEl.textContent = vocabTarget;
  if (reviewEl) reviewEl.textContent = reviewInfo.count;
  if (reviewTargetEl) reviewTargetEl.textContent = getReviewTarget();
  if (ratioEl) ratioEl.textContent = `新词:复习 = ${ratio.new}:${ratio.review}`;
}

// 设置新词数量
function showTargetModal() {
  const modal = document.getElementById("targetModal");
  const userData = getUserData();
  const input = document.getElementById("newWordTargetInput");
  if (modal && input) {
    input.value = userData.vocabTarget || 30;
    modal.classList.remove("hidden");
  }
}

function closeTargetModal() {
  const modal = document.getElementById("targetModal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function saveWordTarget() {
  const input = document.getElementById("newWordTargetInput");
  if (!input) return;
  
  const target = parseInt(input.value);
  if (isNaN(target) || target < 1 || target > 200) {
    alert("请输入1-200之间的数字！");
    return;
  }
  
  const userData = getUserData();
  userData.vocabTarget = target;
  saveUserData(userData);
  
  updateVocabProgress();
  closeTargetModal();
  alert(`每日新词目标已设置为 ${target} 个！`);
}

// 用户设置
function showUserSettings() {
  const modal = document.getElementById("userSettingsModal");
  const userData = getUserData();
  const nameInput = document.getElementById("userNameInput");
  const previewText = document.getElementById("previewText");
  const previewImage = document.getElementById("previewImage");
  
  if (modal && nameInput) {
    nameInput.value = userData.userName || "";
    
    // 更新预览
    if (userData.userAvatar) {
      previewImage.src = userData.userAvatar;
      previewImage.style.display = "block";
      previewText.style.display = "none";
    } else {
      previewImage.style.display = "none";
      previewText.style.display = "block";
      previewText.textContent = (userData.userName || "U").charAt(0).toUpperCase();
    }
    
    modal.classList.remove("hidden");
  }
}

function closeUserSettings() {
  const modal = document.getElementById("userSettingsModal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function useDefaultAvatar() {
  const previewImage = document.getElementById("previewImage");
  const previewText = document.getElementById("previewText");
  const nameInput = document.getElementById("userNameInput");
  
  if (previewImage && previewText) {
    previewImage.style.display = "none";
    previewText.style.display = "block";
    const userName = nameInput?.value || "U";
    previewText.textContent = userName.charAt(0).toUpperCase();
  }
}

function saveUserSettings() {
  const nameInput = document.getElementById("userNameInput");
  const userData = getUserData();
  
  if (nameInput) {
    userData.userName = nameInput.value.trim() || "";
  }
  
  // 保存头像（如果有上传）
  const previewImage = document.getElementById("previewImage");
  if (previewImage && previewImage.src && previewImage.style.display !== "none") {
    userData.userAvatar = previewImage.src;
  } else {
    userData.userAvatar = null;
  }
  
  saveUserData(userData);
  updateUserAvatar();
  closeUserSettings();
  alert("设置已保存！");
}

function updateUserAvatar() {
  const userData = getUserData();
  const avatar = document.getElementById("userAvatar");
  const avatarText = document.getElementById("avatarText");
  const avatarImage = document.getElementById("avatarImage");
  
  if (!avatar) return;
  
  if (userData.userAvatar) {
    if (avatarImage) {
      avatarImage.src = userData.userAvatar;
      avatarImage.style.display = "block";
    }
    if (avatarText) {
      avatarText.style.display = "none";
    }
  } else {
    if (avatarImage) {
      avatarImage.style.display = "none";
    }
    if (avatarText) {
      avatarText.style.display = "block";
      avatarText.textContent = (userData.userName || "U").charAt(0).toUpperCase();
    }
  }
}

// 处理头像上传
function initAvatarUpload() {
  const fileInput = document.getElementById("avatarFileInput");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      if (!file.type.startsWith("image/")) {
        alert("请选择图片文件！");
        return;
      }
      
      if (file.size > 2 * 1024 * 1024) {
        alert("图片大小不能超过2MB！");
        return;
      }
      
      const reader = new FileReader();
      reader.onload = (event) => {
        const previewImage = document.getElementById("previewImage");
        const previewText = document.getElementById("previewText");
        if (previewImage && previewText) {
          previewImage.src = event.target.result;
          previewImage.style.display = "block";
          previewText.style.display = "none";
        }
      };
      reader.readAsDataURL(file);
    });
  }
}

// 设置词汇比例
function bindVocabRatio() {
  const btnSetRatio = document.getElementById("btnSetRatio");
  const btnSetVocabRatio = document.getElementById("btnSetVocabRatio");
  const btnSetTarget = document.getElementById("btnSetTarget");
  
  if (btnSetTarget) {
    btnSetTarget.addEventListener("click", showTargetModal);
  }
  
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
      maintainAspectRatio: true,
      aspectRatio: 2.5,
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
// 场景分类
const wordScenarios = [
  "不限", "听力高频词", "自然地理", "植物研究", "动物保护", "太空探索",
  "学校教育", "科技发明", "文化历史", "语言演化", "娱乐运动", "物品材料",
  "时尚潮流", "饮食健康", "建筑场所", "交通旅行", "国家政府", "社会经济",
  "法律法规", "征战沙场", "社会关系", "行为动作", "身心健康", "时间日期", "雅思词汇"
];

// 扩展单词数据结构
const ieltsWordBook = [
  { 
    word: "diet", 
    phonetic: "/daıət/",
    pos: "名词",
    meaning: "日常饮食; 节食", 
    category: "饮食健康", 
    frequency: "高频",
    collocation: "balanced diet",
    collocationMeaning: "均衡饮食",
    example: "She is on a strict diet to lose weight.",
    exampleMeaning: "她正在严格节食以减肥。"
  },
  { 
    word: "dietary", 
    phonetic: "/ˈdaɪəteri/",
    pos: "形容词",
    meaning: "饮食的", 
    category: "饮食健康", 
    frequency: "中频",
    collocation: "dietary restrictions",
    collocationMeaning: "饮食限制",
    example: "Dietary concerns are important for health.",
    exampleMeaning: "饮食问题对健康很重要。"
  },
  { 
    word: "appetite", 
    phonetic: "/ˈæpɪtaɪt/",
    pos: "名词",
    meaning: "食欲; 强烈欲望", 
    category: "饮食健康", 
    frequency: "高频",
    collocation: "lose appetite",
    collocationMeaning: "食欲减退",
    example: "He has a big appetite after working out.",
    exampleMeaning: "运动后他的食欲很大。"
  },
  { 
    word: "provision", 
    phonetic: "/prə'vızən/",
    pos: "名词",
    meaning: "供应; 预备; 食物供应", 
    category: "饮食健康", 
    frequency: "中频",
    collocation: "food provision",
    collocationMeaning: "食物供应",
    example: "They made provisions for the winter season.",
    exampleMeaning: "他们为冬季做好了准备。"
  },
  { 
    word: "edible", 
    phonetic: "/'ɛdıbəl/",
    pos: "形容词",
    meaning: "可吃的; 可以食用的", 
    category: "饮食健康", 
    frequency: "中频",
    collocation: "edible plants",
    collocationMeaning: "可食植物",
    example: "Most mushrooms are edible, but some are toxic.",
    exampleMeaning: "大多数蘑菇是可吃的, 但有些是有毒的。"
  },
  { 
    word: "recipe", 
    phonetic: "/'rɛsıpi/",
    pos: "名词",
    meaning: "食谱; 秘方", 
    category: "饮食健康", 
    frequency: "高频",
    collocation: "follow a recipe",
    collocationMeaning: "遵循食谱",
    example: "I need a recipe for chocolate cake.",
    exampleMeaning: "我需要一个巧克力蛋糕的食谱。"
  },
  { 
    word: "earthquake", 
    phonetic: "/'ɜːθkweɪk/",
    pos: "名词",
    meaning: "地震", 
    category: "自然地理", 
    frequency: "高频",
    collocation: "earthquake zone",
    collocationMeaning: "地震带",
    example: "The earthquake caused widespread damage.",
    exampleMeaning: "地震造成了广泛的破坏。"
  },
  { 
    word: "climate", 
    phonetic: "/'klaɪmɪt/",
    pos: "名词",
    meaning: "气候", 
    category: "自然地理", 
    frequency: "高频",
    collocation: "climate change",
    collocationMeaning: "气候变化",
    example: "Climate change is a global concern.",
    exampleMeaning: "气候变化是全球关注的问题。"
  },
  { 
    word: "curriculum", 
    phonetic: "/kə'rɪkjʊləm/",
    pos: "名词",
    meaning: "课程", 
    category: "学校教育", 
    frequency: "高频",
    collocation: "school curriculum",
    collocationMeaning: "学校课程",
    example: "The curriculum includes mathematics and science.",
    exampleMeaning: "课程包括数学和科学。"
  },
  { 
    word: "innovation", 
    phonetic: "/ˌɪnə'veɪʃən/",
    pos: "名词",
    meaning: "创新", 
    category: "科技发明", 
    frequency: "高频",
    collocation: "technological innovation",
    collocationMeaning: "技术创新",
    example: "Innovation drives economic growth.",
    exampleMeaning: "创新推动经济增长。"
  }
];

// 单词书状态管理
let wordbookState = {
  currentTopic: "true-scripture",
  currentScenario: "不限",
  currentStatus: "all",
  currentMode: "list",
  selectedWord: null,
  wordStatuses: {}, // {word: "known"|"unknown"|"vague"|null}
  initialized: false
};

// 初始化单词书
function initWordBook() {
  // 渲染场景按钮
  renderScenarioButtons();
  // 渲染单词卡片
  renderWordBookGrid();
  // 绑定筛选事件
  bindWordBookFilters();
}

// 渲染场景按钮
function renderScenarioButtons() {
  const container = document.getElementById("scenarioButtons");
  if (!container) return;
  
  container.innerHTML = wordScenarios.map(scenario => `
    <button class="filter-btn ${scenario === wordbookState.currentScenario ? "active" : ""}" 
            data-scenario="${scenario}">${scenario}</button>
  `).join("");
}

// 渲染单词卡片网格
function renderWordBookGrid() {
  const grid = document.getElementById("wordbookGrid");
  if (!grid) return;
  
  // 筛选单词
  let filtered = ieltsWordBook.filter(word => {
    // 场景筛选
    if (wordbookState.currentScenario !== "不限" && word.category !== wordbookState.currentScenario) {
      return false;
    }
    // 状态筛选
    if (wordbookState.currentStatus !== "all") {
      const status = wordbookState.wordStatuses[word.word];
      if (wordbookState.currentStatus === "unlabeled" && status) return false;
      if (wordbookState.currentStatus !== "unlabeled" && status !== wordbookState.currentStatus) return false;
    }
    return true;
  });
  
  if (filtered.length === 0) {
    grid.innerHTML = '<div class="empty-state">暂无单词，请选择其他筛选条件</div>';
    return;
  }
  
  grid.innerHTML = filtered.map(word => {
    const status = wordbookState.wordStatuses[word.word] || "unlabeled";
    const statusClass = status === "known" ? "known" : status === "unknown" ? "unknown" : status === "vague" ? "vague" : "";
    
    return `
      <div class="word-card ${statusClass}" data-word="${word.word}">
        <div class="word-card-header">
          <div class="word-main">
            <h3 class="word-title">${word.word}</h3>
            <span class="word-phonetic">${word.phonetic || "/phonetic/"}</span>
          </div>
          <div class="word-card-actions">
            <button class="icon-btn sound-btn" onclick="playSound('${word.word}')">🔊</button>
            <button class="icon-btn hide-btn" onclick="hideWord('${word.word}')">👁️</button>
          </div>
        </div>
        <div class="word-card-body">
          <div class="word-pos">${word.pos || "n."}</div>
          <div class="word-meaning">${word.meaning}</div>
          ${word.collocation ? `
            <div class="word-collocation">
              <div class="collocation-header">
                <span>搭配</span>
                <button class="icon-btn sound-btn" onclick="playSound('${word.collocation}')">🔊</button>
              </div>
              <div class="collocation-text">${word.collocation}</div>
              <div class="collocation-meaning">${word.collocationMeaning}</div>
            </div>
          ` : ""}
          ${word.example ? `
            <div class="word-example">
              <div class="example-header">
                <span>例句</span>
                <button class="icon-btn sound-btn" onclick="playSound('${word.example}')">🔊</button>
              </div>
              <div class="example-text">${word.example}</div>
              <div class="example-meaning">${word.exampleMeaning}</div>
            </div>
          ` : ""}
        </div>
        <div class="word-card-footer">
          <span class="word-status-badge ${statusClass}">${getStatusLabel(status)}</span>
        </div>
      </div>
    `;
  }).join("");
}

function getStatusLabel(status) {
  const labels = {
    "known": "认识",
    "unknown": "不认识",
    "vague": "模糊",
    "unlabeled": "未标注"
  };
  return labels[status] || "未标注";
}

// 绑定筛选事件
function bindWordBookFilters() {
  // 主题筛选
  document.querySelectorAll("[data-topic]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-topic]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      wordbookState.currentTopic = btn.dataset.topic;
      renderWordBookGrid();
    });
  });
  
  // 场景筛选
  document.addEventListener("click", (e) => {
    if (e.target.dataset.scenario) {
      document.querySelectorAll("[data-scenario]").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      wordbookState.currentScenario = e.target.dataset.scenario;
      renderWordBookGrid();
    }
  });
  
  // 状态筛选
  document.querySelectorAll("[data-status]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-status]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      wordbookState.currentStatus = btn.dataset.status;
      renderWordBookGrid();
    });
  });
  
  // 模式筛选
  document.querySelectorAll("[data-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll("[data-mode]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      wordbookState.currentMode = btn.dataset.mode;
      // 可以根据模式切换显示方式
      renderWordBookGrid();
    });
  });
}

// 标记单词状态
function markCurrentWord(status) {
  if (!wordbookState.selectedWord) {
    alert("请先选择一个单词！");
    return;
  }
  
  wordbookState.wordStatuses[wordbookState.selectedWord] = status;
  saveWordStatuses();
  renderWordBookGrid();
  
  // 清除选中
  wordbookState.selectedWord = null;
  document.querySelectorAll(".word-card").forEach(card => {
    card.classList.remove("selected");
  });
}

// 保存单词状态
function saveWordStatuses() {
  localStorage.setItem("wordbookStatuses", JSON.stringify(wordbookState.wordStatuses));
}

// 加载单词状态
function loadWordStatuses() {
  const saved = localStorage.getItem("wordbookStatuses");
  if (saved) {
    wordbookState.wordStatuses = JSON.parse(saved);
  }
}

// 单词卡片点击选中
document.addEventListener("click", (e) => {
  const wordCard = e.target.closest(".word-card");
  if (wordCard) {
    // 如果点击的是按钮，不选中
    if (e.target.closest(".icon-btn") || e.target.closest(".word-card-footer")) {
      return;
    }
    
    // 清除其他选中
    document.querySelectorAll(".word-card").forEach(card => {
      card.classList.remove("selected");
    });
    
    // 选中当前卡片
    wordCard.classList.add("selected");
    wordbookState.selectedWord = wordCard.dataset.word;
  }
});

// 播放发音（模拟）
function playSound(text) {
  // 这里可以集成真实的TTS API
  console.log("播放发音:", text);
  alert(`播放发音: ${text}`);
}

// 隐藏单词
function hideWord(word) {
  if (confirm(`确定要隐藏单词 "${word}" 吗？`)) {
    const card = document.querySelector(`[data-word="${word}"]`);
    if (card) {
      card.style.display = "none";
    }
  }
}

// AI学习功能
let aiLearningWords = [];

function addToAILearning() {
  if (!wordbookState.selectedWord) {
    alert("请先选择一个单词！");
    return;
  }
  
  const word = ieltsWordBook.find(w => w.word === wordbookState.selectedWord);
  if (!word) return;
  
  if (aiLearningWords.includes(word.word)) {
    alert(`"${word.word}" 已在AI学习列表中！`);
    return;
  }
  
  aiLearningWords.push(word.word);
  showAILearning(word);
}

function showAILearning(word) {
  const modal = document.getElementById("aiLearningModal");
  const content = document.getElementById("aiLearningContent");
  
  if (!modal || !content) return;
  
  modal.classList.remove("hidden");
  content.innerHTML = '<div class="loading-ai">AI正在生成学习内容...</div>';
  
  // 模拟AI生成（实际应该调用AI API）
  setTimeout(() => {
    const aiContent = generateAILearningContent(word);
    content.innerHTML = aiContent;
  }, 1500);
}

function generateAILearningContent(word) {
  return `
    <div class="ai-content">
      <h3 class="ai-word-title">${word.word} - AI学习内容</h3>
      <div class="ai-section">
        <h4>📚 深度解析</h4>
        <p>${word.word} 是一个${word.pos}，在雅思考试中${word.frequency}出现。这个词的核心含义是"${word.meaning}"。</p>
      </div>
      <div class="ai-section">
        <h4>🔗 常用搭配</h4>
        <p><strong>${word.collocation || "常用搭配"}</strong> - ${word.collocationMeaning || "搭配含义"}</p>
        <p>这个搭配在学术写作和口语中都非常实用，可以帮助你更自然地表达观点。</p>
      </div>
      <div class="ai-section">
        <h4>💡 学习建议</h4>
        <ul>
          <li>尝试用这个词造3个不同的句子</li>
          <li>在口语练习中主动使用这个词</li>
          <li>注意这个词在不同语境下的细微差别</li>
        </ul>
      </div>
      <div class="ai-section">
        <h4>📝 扩展练习</h4>
        <p>请用 <strong>${word.word}</strong> 完成以下句子：</p>
        <p class="ai-exercise">The government needs to ${word.word} the problem of...</p>
      </div>
    </div>
  `;
}

function closeAILearning() {
  const modal = document.getElementById("aiLearningModal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

function getCategoryName(category) {
  // 如果category已经是中文，直接返回
  if (wordScenarios.includes(category)) {
    return category;
  }
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
  // 新的单词书使用 initWordBook 初始化
  loadWordStatuses();
  initWordBook();
}

// 单词查询 - 使用 Free Dictionary API
async function searchWord(query) {
  const resultEl = document.getElementById("wordSearchResult");
  if (!resultEl) return;
  
  if (!query.trim()) {
    resultEl.innerHTML = "<div class='loading'>请输入要查询的单词</div>";
    return;
  }
  
  resultEl.innerHTML = "<div class='loading'>查询中...</div>";
  
  const cleanQuery = query.trim().toLowerCase();
  
  try {
    // 使用 Free Dictionary API
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanQuery)}`);
    
    if (!response.ok) {
      throw new Error("Word not found");
    }
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      const wordData = data[0];
      const word = wordData.word;
      const phonetic = wordData.phonetic || wordData.phonetics?.find(p => p.text)?.text || "";
      const meanings = wordData.meanings || [];
      
      let html = `
        <div class="word-result-card">
          <div class="word-result-header">
            <div>
              <h3>${word}</h3>
              ${phonetic ? `<p class="word-phonetic-result">${phonetic}</p>` : ""}
            </div>
            <div class="word-result-actions">
              <button class="icon-btn sound-btn" onclick="playWordSound('${word}')">🔊</button>
              <button class="btn primary" onclick="addWordToLearning('${word}')">加入学习</button>
            </div>
          </div>
          <div class="word-result-content">
      `;
      
      meanings.forEach(meaning => {
        const partOfSpeech = meaning.partOfSpeech || "";
        const definitions = meaning.definitions || [];
        
        html += `
          <div class="meaning-section">
            <div class="pos-badge">${partOfSpeech}</div>
            <ul class="definitions-list">
        `;
        
        definitions.slice(0, 3).forEach((def, idx) => {
          html += `
            <li class="definition-item">
              <div class="definition-text">${idx + 1}. ${def.definition}</div>
              ${def.example ? `<div class="definition-example">例: ${def.example}</div>` : ""}
            </li>
          `;
        });
        
        html += `
            </ul>
          </div>
        `;
      });
      
      html += `
          </div>
        </div>
      `;
      
      resultEl.innerHTML = html;
    } else {
      throw new Error("No results");
    }
  } catch (error) {
    // 如果 Free Dictionary API 失败，尝试备用方案
    try {
      // 备用：使用本地数据
      const localWord = ieltsWordBook.find(w => w.word.toLowerCase() === cleanQuery);
      if (localWord) {
        resultEl.innerHTML = `
          <div class="word-result-card">
            <div class="word-result-header">
              <div>
                <h3>${localWord.word}</h3>
                ${localWord.phonetic ? `<p class="word-phonetic-result">${localWord.phonetic}</p>` : ""}
              </div>
              <button class="btn primary" onclick="addWordToLearning('${localWord.word}')">加入学习</button>
            </div>
            <div class="word-result-content">
              <div class="result-item"><strong>词性：</strong>${localWord.pos || "n."}</div>
              <div class="result-item"><strong>中文：</strong>${localWord.meaning}</div>
              ${localWord.collocation ? `<div class="result-item"><strong>搭配：</strong>${localWord.collocation} - ${localWord.collocationMeaning}</div>` : ""}
              ${localWord.example ? `<div class="result-item"><strong>例句：</strong>${localWord.example}</div>` : ""}
            </div>
          </div>
        `;
      } else {
        resultEl.innerHTML = `
          <div class="word-result-card">
            <div class="error-message">
              <p>未找到该单词，请检查拼写或尝试其他单词</p>
              <p class="error-hint">提示：请确保输入的是英文单词</p>
            </div>
          </div>
        `;
      }
    } catch (fallbackError) {
      resultEl.innerHTML = `
        <div class="word-result-card">
          <div class="error-message">
            <p>查询失败，请稍后重试</p>
          </div>
        </div>
      `;
    }
  }
}

// 播放单词发音（模拟）
function playWordSound(word) {
  // 这里可以集成真实的TTS API
  console.log("播放发音:", word);
  // 可以使用 Web Speech API
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  } else {
    alert(`播放发音: ${word}`);
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

// ==================== 真题模拟模块 ====================

// 真题数据（模拟数据，后续可接入真实数据源）
const mockTests = {
  "2025": {
    "comprehensive": [
      { id: "2025-01-comprehensive", title: "雅思真题试卷 一月", type: "comprehensive", participants: 1812096, month: "一月" },
      { id: "2025-02-comprehensive", title: "雅思真题试卷 二月", type: "comprehensive", participants: 624014, month: "二月" },
      { id: "2025-03-comprehensive", title: "雅思真题试卷 三月", type: "comprehensive", participants: 482075, month: "三月" }
    ],
    "listening": [
      { id: "2025-01-listening-1", title: "雅思真题试卷一月 雅思听力真题1", type: "listening", participants: 570890, month: "一月" },
      { id: "2025-01-listening-2", title: "雅思真题试卷一月 雅思听力真题2", type: "listening", participants: 286192, month: "一月" },
      { id: "2025-02-listening-1", title: "雅思真题试卷二月 雅思听力真题1", type: "listening", participants: 197138, month: "二月" },
      { id: "2025-02-listening-2", title: "雅思真题试卷二月 雅思听力真题2", type: "listening", participants: 102544, month: "二月" }
    ],
    "reading": [
      { id: "2025-01-reading-1", title: "雅思真题试卷一月 雅思阅读真题1", type: "reading", participants: 450321, month: "一月" },
      { id: "2025-01-reading-2", title: "雅思真题试卷一月 雅思阅读真题2", type: "reading", participants: 320156, month: "一月" }
    ],
    "writing": [
      { id: "2025-01-writing-1", title: "雅思真题试卷一月 雅思写作真题1", type: "writing", participants: 380245, month: "一月" },
      { id: "2025-01-writing-2", title: "雅思真题试卷一月 雅思写作真题2", type: "writing", participants: 290123, month: "一月" }
    ],
    "speaking": [
      { id: "2025-01-speaking-1", title: "雅思真题试卷一月 雅思口语真题1", type: "speaking", participants: 410567, month: "一月" },
      { id: "2025-01-speaking-2", title: "雅思真题试卷一月 雅思口语真题2", type: "speaking", participants: 315234, month: "一月" }
    ]
  },
  "2024": {
    "comprehensive": [
      { id: "2024-01-comprehensive", title: "雅思真题试卷 一月", type: "comprehensive", participants: 5596908, month: "一月" },
      { id: "2024-02-comprehensive", title: "雅思真题试卷 二月", type: "comprehensive", participants: 2269077, month: "二月" }
    ],
    "listening": [
      { id: "2024-01-listening-1", title: "雅思真题试卷一月 雅思听力真题1", type: "listening", participants: 1200000, month: "一月" },
      { id: "2024-01-listening-2", title: "雅思真题试卷一月 雅思听力真题2", type: "listening", participants: 980000, month: "一月" }
    ],
    "reading": [
      { id: "2024-01-reading-1", title: "雅思真题试卷一月 雅思阅读真题1", type: "reading", participants: 1100000, month: "一月" }
    ],
    "writing": [
      { id: "2024-01-writing-1", title: "雅思真题试卷一月 雅思写作真题1", type: "writing", participants: 950000, month: "一月" }
    ],
    "speaking": [
      { id: "2024-01-speaking-1", title: "雅思真题试卷一月 雅思口语真题1", type: "speaking", participants: 1050000, month: "一月" }
    ]
  },
  "2023": {
    "comprehensive": [
      { id: "2023-01-comprehensive", title: "雅思真题试卷 一月", type: "comprehensive", participants: 5284876, month: "一月" },
      { id: "2023-02-comprehensive", title: "雅思真题试卷 二月", type: "comprehensive", participants: 2080568, month: "二月" }
    ],
    "listening": [
      { id: "2023-01-listening-1", title: "雅思真题试卷一月 雅思听力真题1", type: "listening", participants: 1500000, month: "一月" }
    ],
    "reading": [
      { id: "2023-01-reading-1", title: "雅思真题试卷一月 雅思阅读真题1", type: "reading", participants: 1400000, month: "一月" }
    ],
    "writing": [
      { id: "2023-01-writing-1", title: "雅思真题试卷一月 雅思写作真题1", type: "writing", participants: 1300000, month: "一月" }
    ],
    "speaking": [
      { id: "2023-01-speaking-1", title: "雅思真题试卷一月 雅思口语真题1", type: "speaking", participants: 1350000, month: "一月" }
    ]
  }
};

// 真题状态管理
let mockState = {
  currentType: "listening",
  currentYear: "2025",
  currentTest: null,
  examTimer: null,
  examTimeLeft: 3600 // 60分钟，单位：秒
};

// 初始化真题模块
function initMockTests() {
  renderYearButtons();
  renderMockList();
  bindMockFilters();
}

// 渲染年份按钮
function renderYearButtons() {
  const container = document.getElementById("yearButtons");
  if (!container) return;
  
  const years = Object.keys(mockTests).sort((a, b) => b - a);
  container.innerHTML = years.map(year => `
    <button class="year-btn ${year === mockState.currentYear ? "active" : ""}" 
            data-year="${year}">${year}</button>
  `).join("");
}

// 渲染题目列表
function renderMockList() {
  const container = document.getElementById("mockList");
  if (!container) return;
  
  const tests = mockTests[mockState.currentYear]?.[mockState.currentType] || [];
  
  if (tests.length === 0) {
    container.innerHTML = '<div class="empty-state">暂无该类型的真题</div>';
    return;
  }
  
  container.innerHTML = tests.map(test => `
    <div class="mock-card" onclick="startMockExam('${test.id}')">
      <div class="mock-card-content">
        <h3 class="mock-card-title">${test.title}</h3>
        <div class="mock-card-meta">
          <span class="mock-participants">⚡ ${formatNumber(test.participants)} 模考人次</span>
          <span class="mock-month">${test.month}</span>
        </div>
      </div>
      <div class="mock-card-action">
        <button class="btn primary">开始模考</button>
      </div>
    </div>
  `).join("");
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// 绑定筛选事件
function bindMockFilters() {
  // 题型切换
  document.querySelectorAll(".mock-nav-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".mock-nav-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      mockState.currentType = btn.dataset.type;
      renderMockList();
    });
  });
  
  // 年份切换
  document.addEventListener("click", (e) => {
    if (e.target.dataset.year) {
      document.querySelectorAll(".year-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      mockState.currentYear = e.target.dataset.year;
      renderMockList();
    }
  });
  
  // 搜索
  const searchInput = document.getElementById("mockSearchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filterMockList(e.target.value);
    });
  }
  
  // 排序
  const sortSelect = document.getElementById("mockSortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortMockList(e.target.value);
    });
  }
}

function filterMockList(keyword) {
  const cards = document.querySelectorAll(".mock-card");
  cards.forEach(card => {
    const title = card.querySelector(".mock-card-title").textContent;
    if (title.toLowerCase().includes(keyword.toLowerCase())) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

function sortMockList(sortBy) {
  const container = document.getElementById("mockList");
  const cards = Array.from(container.querySelectorAll(".mock-card"));
  
  cards.sort((a, b) => {
    if (sortBy === "popular") {
      const aNum = parseInt(a.querySelector(".mock-participants").textContent.replace(/[^0-9]/g, ""));
      const bNum = parseInt(b.querySelector(".mock-participants").textContent.replace(/[^0-9]/g, ""));
      return bNum - aNum;
    } else if (sortBy === "latest") {
      return 0; // 保持原顺序
    }
    return 0;
  });
  
  cards.forEach(card => container.appendChild(card));
}

// 开始模考
function startMockExam(testId) {
  // 查找测试数据
  let testData = null;
  for (const year in mockTests) {
    for (const type in mockTests[year]) {
      const test = mockTests[year][type].find(t => t.id === testId);
      if (test) {
        testData = test;
        break;
      }
    }
    if (testData) break;
  }
  
  if (!testData) return;
  
  mockState.currentTest = testData;
  mockState.examTimeLeft = getExamTimeLimit(testData.type);
  
  // 显示答题界面
  const modal = document.getElementById("mockExamModal");
  const examTitle = document.getElementById("examTitle");
  const examSubtitle = document.getElementById("examSubtitle");
  const examBody = document.getElementById("examBody");
  
  if (modal && examTitle && examSubtitle && examBody) {
    examTitle.textContent = testData.title;
    examSubtitle.textContent = `${mockState.currentYear}年${testData.month}`;
    
    // 生成题目内容（模拟）
    examBody.innerHTML = generateExamContent(testData.type);
    
    modal.classList.remove("hidden");
    startExamTimer();
  }
}

function getExamTimeLimit(type) {
  const limits = {
    "comprehensive": 7200, // 120分钟
    "listening": 1800, // 30分钟
    "reading": 3600, // 60分钟
    "writing": 3600, // 60分钟
    "speaking": 1800 // 30分钟
  };
  return limits[type] || 3600;
}

function generateExamContent(type) {
  // 这里生成模拟题目内容
  const templates = {
    "listening": `
      <div class="exam-section">
        <h3>Section 1</h3>
        <p class="exam-instruction">Listen to the recording and answer the questions below.</p>
        <div class="exam-questions">
          <div class="question-item">
            <p><strong>Question 1:</strong> What is the main topic of the conversation?</p>
            <div class="question-options">
              <label><input type="radio" name="q1" value="A"> A. Travel arrangements</label>
              <label><input type="radio" name="q1" value="B"> B. Hotel booking</label>
              <label><input type="radio" name="q1" value="C"> C. Restaurant reservation</label>
            </div>
          </div>
          <div class="question-item">
            <p><strong>Question 2:</strong> When is the appointment scheduled?</p>
            <input type="text" class="answer-input" placeholder="Your answer" />
          </div>
        </div>
      </div>
    `,
    "reading": `
      <div class="exam-section">
        <h3>Reading Passage 1</h3>
        <div class="reading-passage">
          <p>The concept of sustainability has become increasingly important in modern society. Governments and organizations worldwide are implementing policies to address environmental challenges...</p>
        </div>
        <div class="exam-questions">
          <div class="question-item">
            <p><strong>Question 1:</strong> According to the passage, what is the main focus of sustainability policies?</p>
            <div class="question-options">
              <label><input type="radio" name="q1" value="A"> A. Economic growth</label>
              <label><input type="radio" name="q1" value="B"> B. Environmental protection</label>
              <label><input type="radio" name="q1" value="C"> C. Social development</label>
            </div>
          </div>
        </div>
      </div>
    `,
    "writing": `
      <div class="exam-section">
        <h3>Writing Task 1</h3>
        <p class="exam-instruction">The chart below shows the percentage of households in owned and rented accommodation in England and Wales between 1918 and 2011. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.</p>
        <textarea class="writing-answer" rows="10" placeholder="Write your answer here..."></textarea>
      </div>
    `,
    "speaking": `
      <div class="exam-section">
        <h3>Part 1: Introduction and Interview</h3>
        <div class="speaking-question">
          <p><strong>Question:</strong> Tell me about your hometown.</p>
          <div class="speaking-recording">
            <button class="btn primary" onclick="startRecording()">开始录音</button>
            <span class="recording-status" id="recordingStatus">未开始</span>
          </div>
        </div>
      </div>
    `,
    "comprehensive": `
      <div class="exam-section">
        <h3>完整模拟考试</h3>
        <p>本考试包含听力、阅读、写作、口语四个部分，请按照顺序完成。</p>
        <div class="comprehensive-nav">
          <button class="btn ghost" onclick="switchExamPart('listening')">听力</button>
          <button class="btn ghost" onclick="switchExamPart('reading')">阅读</button>
          <button class="btn ghost" onclick="switchExamPart('writing')">写作</button>
          <button class="btn ghost" onclick="switchExamPart('speaking')">口语</button>
        </div>
      </div>
    `
  };
  
  return templates[type] || "<p>题目加载中...</p>";
}

// 考试计时器
function startExamTimer() {
  if (mockState.examTimer) {
    clearInterval(mockState.examTimer);
  }
  
  const timerEl = document.getElementById("examTimer");
  if (!timerEl) return;
  
  mockState.examTimer = setInterval(() => {
    mockState.examTimeLeft--;
    
    if (mockState.examTimeLeft <= 0) {
      clearInterval(mockState.examTimer);
      alert("时间到！考试已自动提交。");
      submitMockExam();
      return;
    }
    
    const minutes = Math.floor(mockState.examTimeLeft / 60);
    const seconds = mockState.examTimeLeft % 60;
    timerEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    
    // 时间不足5分钟时变红
    if (mockState.examTimeLeft < 300) {
      timerEl.style.color = "#ef4444";
    }
  }, 1000);
}

function closeMockExam() {
  if (confirm("确定要退出考试吗？已作答的内容将不会保存。")) {
    const modal = document.getElementById("mockExamModal");
    if (modal) {
      modal.classList.add("hidden");
    }
    if (mockState.examTimer) {
      clearInterval(mockState.examTimer);
    }
  }
}

function submitMockExam() {
  if (mockState.examTimer) {
    clearInterval(mockState.examTimer);
  }
  
  // 这里可以添加提交逻辑
  alert("答案已提交！评分结果将在稍后显示。");
  closeMockExam();
  
  // 显示报告（模拟）
  const report = document.getElementById("mockReport");
  if (report) {
    report.innerHTML = `
      <h3>考试报告</h3>
      <p>总分：7.0</p>
      <p>听力：7.5</p>
      <p>阅读：7.0</p>
      <p>写作：6.5</p>
      <p>口语：6.5</p>
      <p>建议：继续加强写作和口语练习，多积累高级词汇和表达。</p>
    `;
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

// 今日计划管理
function getPlans() {
  const data = localStorage.getItem("ieltsPlans");
  return data ? JSON.parse(data) : [];
}

function savePlans(plans) {
  localStorage.setItem("ieltsPlans", JSON.stringify(plans));
}

function renderPlans() {
  const plans = getPlans();
  const listEl = document.getElementById("planList");
  if (!listEl) return;
  
  if (plans.length === 0) {
    listEl.innerHTML = '<div style="color: #9ca3af; font-size: 13px; text-align: center; padding: 20px;">暂无计划，添加一个吧~</div>';
    return;
  }
  
  listEl.innerHTML = plans.map((plan, idx) => `
    <div class="plan-item">
      <input type="checkbox" ${plan.completed ? "checked" : ""} onchange="togglePlan(${idx})" />
      <span class="plan-item-text" style="${plan.completed ? "text-decoration: line-through; color: #9ca3af;" : ""}">${plan.text}</span>
    </div>
  `).join("");
}

function addPlan() {
  const input = document.getElementById("planInput");
  if (!input) return;
  
  const text = input.value.trim();
  if (!text) return;
  
  const plans = getPlans();
  plans.push({ text, completed: false, date: new Date().toISOString() });
  savePlans(plans);
  renderPlans();
  input.value = "";
}

function togglePlan(idx) {
  const plans = getPlans();
  if (plans[idx]) {
    plans[idx].completed = !plans[idx].completed;
    savePlans(plans);
    renderPlans();
  }
}

// 能力测评
let assessmentState = {
  score: 0,
  completed: false,
  targets: {}
};

function startAssessment(force = false) {
  const data = getUserData();
  if (!data.assessmentCompleted || force) {
    const modal = document.getElementById("assessModal");
    if (modal) {
      modal.classList.remove("hidden");
      document.getElementById("stage1").classList.remove("hidden");
      document.getElementById("stage4").classList.add("hidden");
      // 重置步骤
      document.querySelectorAll(".step-item").forEach((item, idx) => {
        item.classList.toggle("active", idx === 0);
      });
    }
  }
}

function nextStage(stage, isCorrect) {
  if (stage === 2) {
    assessmentState.score = isCorrect ? 6.0 : 3.5;
    document.getElementById("stage1").classList.add("hidden");
    document.getElementById("stage4").classList.remove("hidden");
    // 更新步骤
    document.querySelectorAll(".step-item").forEach((item, idx) => {
      item.classList.toggle("active", idx === 3);
    });
  }
}

function finishAssessment() {
  const goalL = parseFloat(document.getElementById("goalL")?.value || 7.0);
  const goalR = parseFloat(document.getElementById("goalR")?.value || 7.5);
  const goalW = parseFloat(document.getElementById("goalW")?.value || 6.5);
  const goalS = parseFloat(document.getElementById("goalS")?.value || 6.5);
  
  assessmentState.targets = { l: goalL, r: goalR, w: goalW, s: goalS };
  assessmentState.completed = true;
  
  const data = getUserData();
  data.reading = goalR;
  data.listening = goalL;
  data.writing = goalW;
  data.speaking = goalS;
  data.assessmentCompleted = true;
  data.assessmentScore = assessmentState.score;
  
  const avg = (goalL + goalR + goalW + goalS) / 4;
  data.targetAvg = avg;
  saveUserData(data);
  
  updateTargetAverage();
  closeAssessment();
  
  if (assessmentState.score < 4) {
    alert("温馨提示：您的基础分较低，专项训练已锁定。\n\n建议先去【单词学习】板块积累核心词汇哦~ (ง •_•)ง");
    showPage("vocab");
  } else {
    alert("测评完成！已为你生成 i+1 专属训练计划。");
  }
}

function closeAssessment() {
  const modal = document.getElementById("assessModal");
  if (modal) {
    modal.classList.add("hidden");
  }
}

// 初始化
function bootstrap() {
  updateDailyQuote();
  updateTargetAverage();
  updateExamCountdown();
  updateVocabProgress();
  renderChart();
  renderPlans();
  
  // 检查是否需要显示测评
  const data = getUserData();
  if (!data.assessmentCompleted) {
    setTimeout(() => startAssessment(), 500);
  }
  
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
  
  // 今日计划输入框回车事件
  const planInput = document.getElementById("planInput");
  if (planInput) {
    planInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addPlan();
      }
    });
  }
  
  // 开始背诵按钮
  const ctaVocab = document.getElementById("ctaVocab");
  if (ctaVocab) {
    ctaVocab.addEventListener("click", () => {
      showPage("vocab");
    });
  }
  
  // 初始化单词书（新版本）
  // renderWordBook(); // 旧版本，已替换
  bindWordBook();
  
  // 全局查词功能
  initGlobalWordLookup();
  
  // 初始化用户设置
  updateUserAvatar();
  initAvatarUpload();
  
  // 绑定新词数量设置
  const btnSetTarget = document.getElementById("btnSetTarget");
  if (btnSetTarget) {
    btnSetTarget.addEventListener("click", showTargetModal);
  }
  
  // 初始化真题模拟模块
  // 当切换到真题演练页面时初始化
  const mockPage = document.getElementById("mock");
  if (mockPage) {
    // 延迟初始化，避免页面未显示时执行
    setTimeout(() => {
      if (mockPage.classList.contains("active")) {
        initMockTests();
      }
    }, 100);
  }
}

// 全局查词功能
function initGlobalWordLookup() {
  // 处理阅读内容中的单词点击
  document.body.addEventListener("click", (e) => {
    const popover = document.getElementById("dictPopover");
    if (!popover) return;
    
    // 如果点击的是单词
    if (e.target.tagName === "SPAN" && e.target.closest(".interactive-text")) {
      const word = e.target.innerText.replace(/[^a-zA-Z]/g, "");
      if (word.length > 2) {
        showWordDict(word, e.pageX, e.pageY, e.target);
      }
    } else if (!e.target.closest("#dictPopover")) {
      // 点击其他地方隐藏弹窗
      popover.style.display = "none";
    }
  });
  
  // 处理阅读内容的单词高亮
  const readingContent = document.querySelector(".reading-content");
  if (readingContent) {
    processInteractiveText(readingContent);
  }
}

function processInteractiveText(container) {
  if (!container) return;
  const text = container.innerHTML;
  // 简单处理：将单词用span包裹
  const processed = text.replace(/\b([a-zA-Z]{3,})\b/g, '<span>$1</span>');
  container.innerHTML = processed;
}

function showWordDict(word, x, y, el) {
  const popover = document.getElementById("dictPopover");
  if (!popover) return;
  
  const cleanWord = word.toLowerCase();
  
  // 高亮单词
  el.classList.add("highlight-word");
  
  // 检查是否已在生词本
  const vocabData = getVocabData();
  const existing = vocabData.notebook.find(w => w.word === cleanWord);
  
  // 更新点击次数
  if (existing) {
    existing.clickCount = (existing.clickCount || 0) + 1;
    existing.lastClickDate = new Date().toISOString();
  } else {
    vocabData.notebook.push({
      word: cleanWord,
      meaning: "",
      category: "",
      frequency: "",
      clickCount: 1,
      addedDate: new Date().toISOString(),
      lastClickDate: new Date().toISOString(),
      learnedDate: null,
      lastReviewDate: null,
      reviewLevel: 0
    });
  }
  saveVocabData(vocabData);
  
  // 显示弹窗
  popover.style.left = Math.min(x, window.innerWidth - 320) + "px";
  popover.style.top = (y + 20) + "px";
  popover.style.display = "block";
  
  // 更新弹窗内容
  document.getElementById("popWord").textContent = cleanWord;
  document.getElementById("popPhonetic").textContent = "/" + cleanWord + "/";
  document.getElementById("popDef").textContent = "正在查询有道词典...";
  document.getElementById("popMeta").innerHTML = `
    <span>查询: ${existing ? existing.clickCount : 1}次</span>
    <span style="color: #22c55e; font-weight: 700;">✓ 已自动收录</span>
  `;
  
  // 模拟API查询
  setTimeout(() => {
    // 尝试从单词书查找
    const wordBook = ieltsWordBook.find(w => w.word.toLowerCase() === cleanWord);
    if (wordBook) {
      document.getElementById("popDef").textContent = `中文：${wordBook.meaning}\n主题：${getCategoryName(wordBook.category)}\n频率：${wordBook.frequency}`;
    } else {
      document.getElementById("popDef").textContent = `v. [模拟释义] 点击查词成功\n\n示例：This measure will help to ${cleanWord} the problem.`;
    }
  }, 500);
  
  // 加入生词本按钮
  const addBtn = document.getElementById("popAddBtn");
  if (addBtn) {
    addBtn.onclick = () => {
      if (existing) {
        alert(`"${cleanWord}" 已在生词本中！`);
      } else {
        alert(`"${cleanWord}" 已加入生词本！`);
      }
      popover.style.display = "none";
    };
  }
}

// 页面加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrap);
} else {
  bootstrap();
}

