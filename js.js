document.addEventListener("DOMContentLoaded", () => {
  loadGoals();
  updateGoalCount();
  setReminderCheckInterval();
});

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
    <span>${goal.title} - <small>${goal.reminder}</small></span>
    <div>
      <button onclick="completeGoal('${goal.title}')">اكتمال</button>
      <button onclick="deleteGoal('${goal.title}')">حذف</button>
    </div>
  `;

  goalContainer.appendChild(goalElement);
}

// إضافة هدف جديد
document.getElementById("goal-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("title").value.trim();
  const reminderTime = document.getElementById("reminder-time").value;

  if (!title || !reminderTime) return;

  const goal = { title, reminder: reminderTime, completed: false };
  saveGoal(goal);
  displayGoal(goal);

  document.getElementById("title").value = '';
  document.getElementById("reminder-time").value = '';

  updateGoalCount();
});

// حفظ الهدف
function saveGoal(goal) {
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  goals.push(goal);
  localStorage.setItem("goals", JSON.stringify(goals));
}

// اكتمال الهدف
function completeGoal(title) {
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  const updatedGoals = goals.map(goal =>
    goal.title === title ? { ...goal, completed: !goal.completed } : goal
  );
  localStorage.setItem("goals", JSON.stringify(updatedGoals));
  refreshGoals();
  updateGoalCount();
}

// حذف الهدف
function deleteGoal(title) {
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  const updatedGoals = goals.filter(goal => goal.title !== title);
  localStorage.setItem("goals", JSON.stringify(updatedGoals));
  refreshGoals();
  updateGoalCount();
}

// إعادة تحميل الأهداف
function refreshGoals() {
  document.getElementById("goal-container").innerHTML = '';
  loadGoals();
}

// تحديث عدد الأهداف
function updateGoalCount() {
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  const incompleteGoals = goals.filter(goal => !goal.completed).length;
  document.getElementById("goal-number").textContent = incompleteGoals;
}
function notifyUser(message) {
  if (Notification.permission === "granted") {
    new Notification(message);
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification(message);
      }
    });
  }
}


// التذكير بالأهداف
function setReminderCheckInterval() {
  setInterval(() => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const goals = JSON.parse(localStorage.getItem("goals")) || [];
    goals.forEach(goal => {
      if (!goal.completed && goal.reminder === currentTime) {
        notifyUser(`تذكير: حان وقت الهدف "${goal.title}"!`);
      }
    });
  }, 60000); // تحقق كل دقيقة
}
function scheduleReminder(goal) {
  const now = new Date();
  const [hours, minutes] = goal.reminder.split(':').map(Number);
  const reminderTime = new Date();
  reminderTime.setHours(hours, minutes, 0, 0);

  const delay = reminderTime - now;
  if (delay > 0) {
    setTimeout(() => {
      notifyUser(`تذكير: حان وقت الهدف "${goal.title}"!`);
    }, delay);
  }
}

// جدولة لكل هدف
function setGoalReminders() {
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  goals.forEach(goal => {
    if (!goal.completed) {
      scheduleReminder(goal);
    }
  });
}


const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

document.addEventListener("DOMContentLoaded", () => {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
});


