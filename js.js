document.addEventListener("DOMContentLoaded", () => {
    loadGoals();
    updateProgressBar();
    setDailyReminder(20, 0); // التذكير يوميًا في الساعة 8 مساءً
  });
  
  document.getElementById("goal-form").addEventListener("submit", addGoal);
  
  // تحميل الأهداف من Local Storage
  function loadGoals() {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.forEach(goal => displayGoal(goal));
  }
  
  // عرض الهدف
  function displayGoal(goal) {
    const goalContainer = document.getElementById("goal-container");
    
    const goalElement = document.createElement("div");
    goalElement.className = `goal-item ${goal.completed ? 'completed' : ''}`;
    goalElement.innerHTML = `
      <span>${goal.title}</span>
      <div>
        <button class="complete-btn" onclick="completeGoal('${goal.title}')">اكتمال</button>
        <button class="delete-btn" onclick="deleteGoal('${goal.title}')">حذف</button>
      </div>
    `;
  
    goalContainer.appendChild(goalElement);
  }
  
  // إضافة هدف جديد
  function addGoal(e) {
    e.preventDefault();
    
    const title = document.getElementById("title").value;
    if (title.trim() === "") return;
  
    const goal = { title, completed: false };
    saveGoal(goal);
    displayGoal(goal);
    document.getElementById("title").value = "";
  
    updateProgressBar();
  }
  
  // حفظ الهدف في Local Storage
  function saveGoal(goal) {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.push(goal);
    localStorage.setItem("goals", JSON.stringify(goals));
  }
  
  // إكمال الهدف
  function completeGoal(title) {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    const updatedGoals = goals.map(goal => {
      if (goal.title === title) {
        goal.completed = !goal.completed;
        showMotivationMessage();
      }
      return goal;
    });
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    refreshGoals();
    updateProgressBar();
  }
  
  // حذف الهدف
  function deleteGoal(title) {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    const updatedGoals = goals.filter(goal => goal.title !== title);
    localStorage.setItem("goals", JSON.stringify(updatedGoals));
    refreshGoals();
    updateProgressBar();
  }
  
  // تحديث شريط التقدم
  function updateProgressBar() {
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    const completedGoals = goals.filter(goal => goal.completed).length;
    const progress = (completedGoals / goals.length) * 100 || 0;
    document.getElementById("progress-bar").style.width = `${progress}%`;
  }
  
  // إعادة تحميل الأهداف
  function refreshGoals() {
    document.getElementById("goal-container").innerHTML = "";
    loadGoals();
  }
  
  // رسالة تحفيزية عند اكتمال الهدف
  function showMotivationMessage() {
    const messages = ["أحسنت! استمر!", "أنت في الطريق الصحيح!", "هدف جديد، نجاح جديد!"];
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    alert(randomMessage);
  }
  
  // مشاركة التقدم
  function shareProgress() {
    const text = "أنجزت أهدافي اليوم على موقع تحفيز الأهداف!";
    const url = "https://example.com";
    window.open(`https://twitter.com/share?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`);
  }
  
  // إعداد تذكير يومي
  function setDailyReminder(hour, minute) {
    setInterval(() => {
      const now = new Date();
      if (now.getHours() === hour && now.getMinutes() === minute) {
        alert("تذكير يومي: هل أكملت أهدافك اليوم؟");
      }
    }, 60000);
  }
  // إضافة التذكير اليومي بوقت محدد
function setDailyReminder(hour, minute) {
    setInterval(() => {
        const now = new Date();
        if (now.getHours() === hour && now.getMinutes() === minute) {
            alert("تذكير يومي: هل أكملت أهدافك اليوم؟");
        }
    }, 60000); // تحقق كل دقيقة
}

// إعداد التذكير ليكون الساعة 8 مساءً
document.addEventListener("DOMContentLoaded", () => {
    setDailyReminder(20, 0); // تذكير يومي عند الساعة 8:00 مساءً
});
