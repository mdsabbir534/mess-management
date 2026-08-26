// System State & Mock Data (Exact Sheet Data Integrated)
let messInfo = {
  name: "সোনার বাংলা মেস",
  currentMonth: "June-2026",
  managerName: "Shakil-2",
  managerPhone: "01700000002"
};

// Users list matching your exact June-2026 sheet
let users = [
  { id: 1, name: "Sabbir", phone: "01700000001", password: "123", role: "admin", meals: 62, deposit: 4925.01, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 2, name: "Shakil-2", phone: "01700000002", password: "123", role: "manager", meals: 40, deposit: 3999.55, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 3, name: "Sarkar", phone: "01700000003", password: "123", role: "member", meals: 49, deposit: 2969.74, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 4, name: "S.Uddin", phone: "01700000004", password: "123", role: "member", meals: 41, deposit: 3900.48, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 5, name: "Emon", phone: "01700000005", password: "123", role: "member", meals: 25, deposit: 2202.81, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 0 } },
  { id: 6, name: "Hanif", phone: "01700000006", password: "123", role: "member", meals: 44, deposit: 3202.99, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 7, name: "Nahid", phone: "01700000007", password: "123", role: "member", meals: 54, deposit: 2904.53, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 8, name: "Shahjahan", phone: "01700000008", password: "123", role: "member", meals: 22, deposit: 1691.59, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 0, dinner: 1 } },
  { id: 9, name: "Rezaul", phone: "01700000009", password: "123", role: "member", meals: 43, deposit: 2643.19, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 10, name: "Raz", phone: "01700000010", password: "123", role: "member", meals: 38, deposit: 3110.78, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 11, name: "Araf", phone: "01700000011", password: "123", role: "member", meals: 37, deposit: 2753.45, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 12, name: "Saiful", phone: "01700000012", password: "123", role: "member", meals: 35, deposit: 1618.63, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 1, dinner: 1 } },
  { id: 13, name: "Shakil", phone: "01700000013", password: "123", role: "member", meals: 5, deposit: 961.52, openingDue: 0, blockedByManager: false, isManagerPending: false, today: { breakfast: 0, dinner: 0 } }
];

// Shared Fixed Costs (Others in sheet = 1019.62 per person)
let sharedFixedCosts = {
  khalaBill: 7000,
  electricityBill: 5000,
  dustBill: 150,
  gasBill: 1000,
  kitchenLine: 105
};

// Approved Bazar Records
let bazarRecords = [
  { id: 1, shopperName: "Shakil-2", phone: "01700000002", date: "2026-08-25", items: "মুরগি, তেল, মশলা", amount: 3880, source: "Manager", status: "approved" },
  { id: 2, shopperName: "Sabbir", phone: "01700000001", date: "2026-08-26", items: "মাছ, শাকসবজি", amount: 2512, source: "Pocket", status: "approved" },
  { id: 3, shopperName: "Nahid", phone: "01700000007", date: "2026-08-27", items: "চাল, আলু, পেঁয়াজ", amount: 4527, source: "Pocket", status: "approved" }
];

let pendingBazars = [];

// Datewise History Logs (Feature 8 & 9)
let datewiseMealLogs = {
  "2026-08-27": {
    "01700000001": { breakfast: 1, dinner: 1 },
    "01700000002": { breakfast: 1, dinner: 1 },
    "01700000003": { breakfast: 1, dinner: 1 },
    "01700000004": { breakfast: 1, dinner: 1 },
    "01700000005": { breakfast: 1, dinner: 0 },
    "01700000006": { breakfast: 1, dinner: 1 },
    "01700000007": { breakfast: 1, dinner: 1 },
    "01700000008": { breakfast: 0, dinner: 1 },
    "01700000009": { breakfast: 1, dinner: 1 },
    "01700000010": { breakfast: 1, dinner: 1 },
    "01700000011": { breakfast: 1, dinner: 1 },
    "01700000012": { breakfast: 1, dinner: 1 },
    "01700000013": { breakfast: 0, dinner: 0 }
  }
};

// Archived Past Month Sheets
let archivedMonths = [
  {
    monthName: "May-2026",
    managerName: "Raz",
    mealRate: 56.40,
    othersPerPerson: 980.00,
    records: [
      { name: "Sabbir", totalMeal: 58, mealCost: 3271.20, others: 980.00, totalCost: 4251.20, deposit: 4500.00, due: 248.80 },
      { name: "Shakil-2", totalMeal: 42, mealCost: 2368.80, others: 980.00, totalCost: 3348.80, deposit: 3000.00, due: -348.80 },
      { name: "Nahid", totalMeal: 50, mealCost: 2820.00, others: 980.00, totalCost: 3800.00, deposit: 3500.00, due: -300.00 }
    ]
  }
];

let isMealsLockedByKhala = false;
let todayCookingMenu = {
  breakfast: "পরোটা, ডিম ভাজি, ডাল",
  dinner: "মুরগির মাংসের ঝোল, ডাল, ভাত"
};

let currentUser = null;

// ==================== APP INITIALIZATION ====================
window.addEventListener('DOMContentLoaded', () => {
  const todayStr = new Date().toISOString().split('T')[0];
  document.getElementById('topTodayDateText').innerText = todayStr;
  document.getElementById('calendarDateFilter').value = todayStr;

  const savedPhone = localStorage.getItem('mess_active_phone');
  if (savedPhone) {
    const found = users.find(u => u.phone === savedPhone);
    if (found) {
      currentUser = found;
      initAppSession();
      return;
    }
  }
  document.getElementById('authScreen').classList.remove('hidden');
});

function initAppSession() {
  document.getElementById('authScreen').classList.add('hidden');
  document.getElementById('topMessTitle').innerText = messInfo.name;
  document.getElementById('topUserName').innerText = currentUser.name;

  const badge = document.getElementById('topUserRoleBadge');
  if (currentUser.role === 'admin') {
    badge.innerText = "👑 অ্যাডমিন";
    badge.className = "text-[10px] bg-amber-500 text-white px-2 py-0.5 rounded font-bold";
    document.getElementById('nav-admin-panel').classList.remove('hidden');
    document.getElementById('nav-manager-panel').classList.add('hidden');
  } else if (currentUser.role === 'manager') {
    badge.innerText = "💼 ম্যানেজার";
    badge.className = "text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded font-bold";
    document.getElementById('nav-manager-panel').classList.remove('hidden');
    document.getElementById('nav-admin-panel').classList.add('hidden');
  } else {
    badge.innerText = "👤 মেম্বার";
    badge.className = "text-[10px] bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded font-bold";
    document.getElementById('nav-manager-panel').classList.add('hidden');
    document.getElementById('nav-admin-panel').classList.add('hidden');
  }

  populateDropdowns();
  renderAll();
}

// ==================== AUTHENTICATION ====================
function handleLogin(e) {
  e.preventDefault();
  const phone = document.getElementById('loginPhone').value.trim();
  const pass = document.getElementById('loginPassword').value.trim();

  const user = users.find(u => u.phone === phone && u.password === pass);
  if (user) {
    currentUser = user;
    localStorage.setItem('mess_active_phone', phone);
    initAppSession();
    showToast(`স্বাগতম, ${user.name}!`);
  } else {
    alert("ভুল মোবাইল নম্বর অথবা পাসওয়ার্ড দেওয়া হয়েছে!");
  }
}

function quickLogin(phone, pass) {
  const user = users.find(u => u.phone === phone);
  if (user) {
    currentUser = user;
    localStorage.setItem('mess_active_phone', phone);
    initAppSession();
    showToast(`${user.name} হিসেবে লগইন করা হয়েছে!`);
  }
}

function handleLogout() {
  localStorage.removeItem('mess_active_phone');
  currentUser = null;
  document.getElementById('authScreen').classList.remove('hidden');
}

// ==================== NAVIGATION TABS ====================
function switchTab(viewId) {
  const views = ['dashboard', 'active-meals', 'meal-calendar', 'bazar-entry', 'history-view', 'manager-panel', 'admin-panel'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    const navBtn = document.getElementById(`nav-${v}`);
    if (el) el.classList.toggle('hidden', v !== viewId);
    if (navBtn) {
      if (v === viewId) {
        navBtn.className = "py-2.5 px-3 min-w-[85px] text-center border-b-2 border-white font-bold bg-emerald-900/50 text-white";
      } else {
        navBtn.className = "py-2.5 px-3 min-w-[85px] text-center text-emerald-200 hover:text-white";
      }
    }
  });

  if (viewId === 'meal-calendar') {
    renderCalendarView(document.getElementById('calendarDateFilter').value);
  }
  if (viewId === 'history-view') {
    populateArchiveDropdown();
  }

  renderAll();
}

// ==================== TOAST HELPER ====================
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');
  const icon = document.getElementById('toast-icon');

  toastMsg.innerText = msg;
  icon.className = isError ? "fa-solid fa-circle-exclamation text-rose-400 text-sm" : "fa-solid fa-circle-check text-emerald-400 text-sm";
  toast.classList.remove('hidden');
  setTimeout(() => toast.classList.add('hidden'), 3500);
}

// ==================== MEAL COUNT ====================
function changeMealCount(mealType, delta) {
  if (isMealsLockedByKhala) {
    alert("খালাকে হিসাব বুঝিয়ে দেওয়ার পর মিল লক হয়ে গেছে। এখন আর পরিবর্তন সম্ভব নয়।");
    return;
  }
  if (currentUser.blockedByManager) {
    alert("ম্যানেজার আপনার মিল বন্ধ ও লক করে রেখেছেন।");
    return;
  }

  const currentCount = currentUser.today[mealType];
  const newCount = Math.max(0, currentCount + delta);
  currentUser.today[mealType] = newCount;

  // Sync to today's datewise log
  const todayStr = new Date().toISOString().split('T')[0];
  if (!datewiseMealLogs[todayStr]) datewiseMealLogs[todayStr] = {};
  if (!datewiseMealLogs[todayStr][currentUser.phone]) datewiseMealLogs[todayStr][currentUser.phone] = {};
  datewiseMealLogs[todayStr][currentUser.phone][mealType] = newCount;

  renderAll();
}

function toggleKhalaLock() {
  isMealsLockedByKhala = !isMealsLockedByKhala;
  showToast(isMealsLockedByKhala ? "🔒 মিল লক করা হয়েছে! খালা রান্না শুরু করেছেন।" : "🔓 মিল আনলক করা হয়েছে!");
  renderAll();
}

// ==================== DATEWISE CALENDAR ====================
function renderCalendarView(selectedDate) {
  const table = document.getElementById('tableDatewiseMealLogs');
  const logs = datewiseMealLogs[selectedDate] || {};

  table.innerHTML = users.map(u => {
    const userLog = logs[u.phone] || { breakfast: u.today.breakfast, dinner: u.today.dinner };
    const hasBf = userLog.breakfast > 0;
    const hasDin = userLog.dinner > 0;
    const isEating = hasBf || hasDin;

    return `
      <tr class="hover:bg-slate-50">
        <td class="p-3 font-bold text-slate-800">${u.name}</td>
        <td class="p-3 text-slate-500 font-mono">${u.phone}</td>
        <td class="p-3 text-center">
          <span class="px-2.5 py-1 rounded-lg text-xs font-black ${hasBf ? 'bg-amber-100 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-400'}">
            ${userLog.breakfast} মিল (${hasBf ? 'খেয়েছে' : 'খায়নি'})
          </span>
        </td>
        <td class="p-3 text-center">
          <span class="px-2.5 py-1 rounded-lg text-xs font-black ${hasDin ? 'bg-indigo-100 text-indigo-800 border border-indigo-200' : 'bg-slate-100 text-slate-400'}">
            ${userLog.dinner} মিল (${hasDin ? 'খেয়েছে' : 'খায়নি'})
          </span>
        </td>
        <td class="p-3 text-center">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isEating ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}">
            ${isEating ? 'চালু ছিল' : 'বন্ধ ছিল'}
          </span>
        </td>
      </tr>
    `;
  }).join('');
}

// ==================== BAZAR ENTRY WITH TWO-COLUMN ROWS ====================
function addBazarRow() {
  const container = document.getElementById('bazarRowsContainer');
  const newRow = document.createElement('div');
  newRow.className = "flex items-center space-x-2 bazar-item-row";
  newRow.innerHTML = `
    <input type="text" placeholder="যেমন: শাকসবজি" class="w-2/3 p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-medium item-name" required />
    <input type="number" placeholder="দাম (৳)" class="w-1/3 p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-medium item-price" oninput="calculateBazarTotal()" required />
    <button type="button" onclick="removeBazarRow(this)" class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center font-bold text-sm">✕</button>
  `;
  container.appendChild(newRow);
}

function removeBazarRow(btn) {
  const rows = document.querySelectorAll('.bazar-item-row');
  if (rows.length > 1) {
    btn.parentElement.remove();
    calculateBazarTotal();
  } else {
    alert("কমপক্ষে একটি পণ্যের নাম ও দাম দিতে হবে।");
  }
}

function calculateBazarTotal() {
  let total = 0;
  document.querySelectorAll('.item-price').forEach(input => {
    total += parseFloat(input.value) || 0;
  });
  document.getElementById('bazarCalculatedTotal').innerText = `${total} ৳`;
  return total;
}

function submitBazarList(e) {
  e.preventDefault();
  const total = calculateBazarTotal();
  if (total <= 0) return alert("সঠিক দাম লিখুন।");

  const itemList = [];
  document.querySelectorAll('.bazar-item-row').forEach(r => {
    const name = r.querySelector('.item-name').value.trim();
    const price = r.querySelector('.item-price').value.trim();
    if (name && price) itemList.push(`${name} (${price}৳)`);
  });

  const source = document.getElementById('bazarMoneySource').value;
  pendingBazars.unshift({
    id: Date.now(),
    shopperName: currentUser.name,
    phone: currentUser.phone,
    date: new Date().toISOString().split('T')[0],
    items: itemList.join(', '),
    amount: total,
    source,
    status: "pending"
  });

  showToast("বাজারের তালিকা ম্যানেজারের কাছে পাঠানো হয়েছে!");
  document.getElementById('bazarRowsContainer').innerHTML = `
    <div class="flex items-center space-x-2 bazar-item-row">
      <input type="text" placeholder="যেমন: আলু + পেঁয়াজ" class="w-2/3 p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-medium item-name" required />
      <input type="number" placeholder="দাম (৳)" class="w-1/3 p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-medium item-price" oninput="calculateBazarTotal()" required />
      <button type="button" onclick="removeBazarRow(this)" class="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 flex items-center justify-center font-bold text-sm">✕</button>
    </div>
  `;
  document.getElementById('bazarCalculatedTotal').innerText = "০ ৳";
  renderAll();
}

// ==================== MANAGER CONTROLS ====================
function handleManagerDeposit(e) {
  e.preventDefault();
  const phone = document.getElementById('depositSelectUser').value;
  const amount = parseFloat(document.getElementById('depositInputAmount').value);
  const member = users.find(u => u.phone === phone);

  if (member && amount > 0) {
    member.deposit += amount;
    showToast(`${member.name}-এর ব্যালেন্সে ${amount} ৳ জমা কনফার্ম করা হয়েছে!`);
    document.getElementById('depositInputAmount').value = '';
    renderAll();
  }
}

function approvePendingBazar(id) {
  const idx = pendingBazars.findIndex(b => b.id === id);
  if (idx > -1) {
    const item = pendingBazars[idx];
    item.status = "approved";
    bazarRecords.unshift(item);

    if (item.source === "Pocket") {
      const shopper = users.find(u => u.phone === item.phone);
      if (shopper) shopper.deposit += item.amount;
    }
    pendingBazars.splice(idx, 1);
    showToast(`বাজার বাবদ ${item.amount} ৳ অনুমোদন করা হয়েছে!`);
    renderAll();
  }
}

function rejectPendingBazar(id) {
  const idx = pendingBazars.findIndex(b => b.id === id);
  if (idx > -1) {
    pendingBazars.splice(idx, 1);
    showToast("বাজার বাতিল করা হয়েছে!", true);
    renderAll();
  }
}

function toggleManagerBlockMeal(phone) {
  const user = users.find(u => u.phone === phone);
  if (user) {
    user.blockedByManager = !user.blockedByManager;
    if (user.blockedByManager) {
      user.today.breakfast = 0;
      user.today.dinner = 0;
      showToast(`${user.name}-এর মিল ফোর্স অফ ও লক করা হয়েছে!`);
    } else {
      user.today.breakfast = 1;
      user.today.dinner = 1;
      showToast(`${user.name}-এর মিল আনলক করা হয়েছে!`);
    }
    renderAll();
  }
}

function handleManagerMonthComplete() {
  showToast("চলতি মাসের ফাইনাল শিট ক্যালকুলেট করা হয়েছে!");
  renderAll();
}

// ==================== ADMIN CONTROLS ====================
function handleAdminCreateUser(e) {
  e.preventDefault();
  const phone = document.getElementById('adminNewUserPhone').value.trim();
  const name = document.getElementById('adminNewUserName').value.trim();
  const password = document.getElementById('adminNewUserPass').value.trim();

  if (users.find(u => u.phone === phone)) {
    return alert("এই নম্বরে ইতিমধ্যে অ্যাকাউন্ট আছে!");
  }

  users.push({
    id: Date.now(),
    name,
    phone,
    password,
    role: "member",
    meals: 0,
    deposit: 0,
    openingDue: 0,
    blockedByManager: false,
    isManagerPending: false,
    today: { breakfast: 1, dinner: 1 }
  });

  showToast(`${name} (${phone})-এর অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!`);
  document.getElementById('adminNewUserPhone').value = '';
  document.getElementById('adminNewUserName').value = '';
  document.getElementById('adminNewUserPass').value = '';
  populateDropdowns();
  renderAll();
}

function handleSendManagerRequest(e) {
  e.preventDefault();
  const phone = document.getElementById('adminSelectNewManager').value;
  const target = users.find(u => u.phone === phone);
  if (target) {
    target.isManagerPending = true;
    showToast(`${target.name}-এর কাছে ম্যানেজার হওয়ার রিকোয়েস্ট পাঠানো হয়েছে!`);
    renderAll();
  }
}

function acceptManagerOffer() {
  const old = users.find(u => u.role === 'manager');
  if (old) old.role = 'member';

  currentUser.role = 'manager';
  currentUser.isManagerPending = false;
  messInfo.managerName = currentUser.name;
  messInfo.managerPhone = currentUser.phone;

  showToast("অভিনন্দন! আপনি এখন মেসের নতুন ম্যানেজার।");
  initAppSession();
}

function rejectManagerOffer() {
  currentUser.isManagerPending = false;
  showToast("ম্যানেজারি রিকোয়েস্ট বাতিল করা হয়েছে।");
  renderAll();
}

function handleAdminMonthClose() {
  if (!confirm("আপনি কি নিশ্চিত যে চলতি মাস ক্লোজ করে নতুন মাস শুরু করতে চান? সবার বকেয়া/অগ্রিম নতুন মাসে যুক্ত হবে।")) return;

  const totalBazar = bazarRecords.reduce((sum, b) => sum + b.amount, 0);
  const totalMeals = users.reduce((sum, u) => sum + u.meals, 0) || 1;
  const mealRate = totalBazar / totalMeals;
  const totalShared = Object.values(sharedFixedCosts).reduce((a, b) => a + b, 0);
  const othersPerPerson = totalShared / (users.length || 1);

  const monthArchiveRecords = users.map(u => {
    const mealCost = u.meals * mealRate;
    const totalCost = mealCost + othersPerPerson;
    const due = u.deposit - totalCost;
    return {
      name: u.name,
      phone: u.phone,
      totalMeal: u.meals,
      mealCost: mealCost,
      others: othersPerPerson,
      totalCost: totalCost,
      deposit: u.deposit,
      due: due
    };
  });

  archivedMonths.unshift({
    monthName: messInfo.currentMonth,
    managerName: messInfo.managerName,
    mealRate: mealRate,
    othersPerPerson: othersPerPerson,
    records: monthArchiveRecords
  });

  users.forEach(u => {
    const rec = monthArchiveRecords.find(r => r.phone === u.phone);
    u.openingDue = rec ? rec.due : 0;
    u.deposit = rec && rec.due > 0 ? rec.due : 0;
    u.meals = 0;
    u.blockedByManager = false;
  });

  bazarRecords = [];
  pendingBazars = [];
  messInfo.currentMonth = "July-2026";

  showToast("মাস সফলভাবে ক্লোজ হয়েছে! নতুন মাস শুরু হয়েছে।");
  populateArchiveDropdown();
  renderAll();
}

function updateMessName() {
  const name = document.getElementById('inputAdminMessName').value.trim();
  if (name) {
    messInfo.name = name;
    document.getElementById('topMessTitle').innerText = name;
    showToast("মেসের নাম আপডেট হয়েছে!");
    document.getElementById('inputAdminMessName').value = '';
  }
}

// ==================== PROFILE EDIT ====================
function openProfileModal() {
  document.getElementById('editProfileName').value = currentUser.name;
  document.getElementById('editProfilePassword').value = currentUser.password;
  document.getElementById('profileModal').classList.remove('hidden');
}

function closeProfileModal() {
  document.getElementById('profileModal').classList.add('hidden');
}

function handleUpdateProfile(e) {
  e.preventDefault();
  currentUser.name = document.getElementById('editProfileName').value.trim();
  currentUser.password = document.getElementById('editProfilePassword').value.trim();
  closeProfileModal();
  document.getElementById('topUserName').innerText = currentUser.name;
  showToast("প্রোফাইল ও পাসওয়ার্ড আপডেট হয়েছে!");
  renderAll();
}

// ==================== MENU MODAL ====================
function openMenuModal() {
  document.getElementById('inputMenuBreakfast').value = todayCookingMenu.breakfast;
  document.getElementById('inputMenuDinner').value = todayCookingMenu.dinner;
  document.getElementById('menuModal').classList.remove('hidden');
}

function closeMenuModal() {
  document.getElementById('menuModal').classList.add('hidden');
}

function saveMenu() {
  todayCookingMenu.breakfast = document.getElementById('inputMenuBreakfast').value.trim() || "পরোটা, ডিম ভাজি";
  todayCookingMenu.dinner = document.getElementById('inputMenuDinner').value.trim() || "মাংসের ঝোল, ডাল, ভাত";
  closeMenuModal();
  showToast("রান্নার মেন্যু সেভ হয়েছে!");
  renderAll();
}

// ==================== DROPDOWNS & ARCHIVES ====================
function populateDropdowns() {
  const depSelect = document.getElementById('depositSelectUser');
  if (depSelect) depSelect.innerHTML = users.map(u => `<option value="${u.phone}">${u.name} (${u.phone})</option>`).join('');

  const adminMgr = document.getElementById('adminSelectNewManager');
  if (adminMgr) adminMgr.innerHTML = users.filter(u => u.role !== 'admin').map(u => `<option value="${u.phone}">${u.name} (${u.phone})</option>`).join('');

  const badge = document.getElementById('currentManagerNameBadge');
  if (badge) badge.innerText = `${messInfo.managerName} (${messInfo.managerPhone})`;
}

function populateArchiveDropdown() {
  const sel = document.getElementById('selectArchivedMonth');
  if (sel) {
    sel.innerHTML = archivedMonths.map((m, idx) => `<option value="${idx}">${m.monthName} (ম্যানেজার: ${m.managerName})</option>`).join('');
    if (archivedMonths.length > 0) renderArchivedSheet(0);
  }
}

function renderArchivedSheet(index) {
  const month = archivedMonths[index];
  const container = document.getElementById('archivedSheetContainer');
  if (!month) {
    container.innerHTML = "<p class='text-slate-400 p-4'>কোনো রেকর্ড নেই</p>";
    return;
  }

  container.innerHTML = `
    <div class="mb-3 text-xs bg-slate-50 p-3 rounded-xl border flex justify-between items-center">
      <span>মাস: <strong>${month.monthName}</strong> | ম্যানেজার: <strong>${month.managerName}</strong></span>
      <span>মিল রেট: <strong>${month.mealRate.toFixed(2)} ৳</strong> | ফিক্সড বিল: <strong>${month.othersPerPerson.toFixed(2)} ৳</strong></span>
    </div>
    <table class="w-full text-xs text-left">
      <thead class="bg-slate-100 font-bold border-b">
        <tr>
          <th class="p-3">Name</th>
          <th class="p-3 text-center">Total Meal</th>
          <th class="p-3 text-right">Meal Cost</th>
          <th class="p-3 text-right">Others</th>
          <th class="p-3 text-right">Total Cost</th>
          <th class="p-3 text-right">Deposit</th>
          <th class="p-3 text-right">Due</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100">
        ${month.records.map(r => `
          <tr>
            <td class="p-3 font-bold">${r.name}</td>
            <td class="p-3 text-center">${r.totalMeal}</td>
            <td class="p-3 text-right">${r.mealCost.toFixed(2)}</td>
            <td class="p-3 text-right">${r.others.toFixed(2)}</td>
            <td class="p-3 text-right font-semibold">${r.totalCost.toFixed(2)}</td>
            <td class="p-3 text-right text-emerald-700 font-semibold">${r.deposit.toFixed(2)}</td>
            <td class="p-3 text-right font-black ${r.due >= 0 ? 'text-slate-800' : 'text-rose-600'}">${r.due.toFixed(2)}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}

// ==================== MAIN RENDER ====================
function renderAll() {
  if (!currentUser) return;

  const totalBazar = bazarRecords.reduce((sum, b) => sum + b.amount, 0);
  const totalMeals = users.reduce((sum, u) => sum + u.meals, 0) || 1;
  const mealRate = totalBazar / totalMeals;

  const totalShared = Object.values(sharedFixedCosts).reduce((a, b) => a + b, 0);
  const othersPerPerson = totalShared / (users.length || 1);

  const userMealCost = currentUser.meals * mealRate;
  const userTotalCost = userMealCost + othersPerPerson;
  const userBalance = currentUser.deposit - userTotalCost + currentUser.openingDue;

  const balEl = document.getElementById('userBalanceText');
  balEl.innerText = `${userBalance.toFixed(1)} ৳`;
  balEl.className = `text-2xl font-black mt-1 ${userBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`;
  document.getElementById('userBalanceStatus').innerText = userBalance >= 0 ? "পাবেন (Advance)" : "দিতে হবে (Due / Minus)";

  document.getElementById('statMealRate').innerText = `${mealRate.toFixed(2)} ৳`;
  document.getElementById('statTotalMessCost').innerText = `মোট বাজার: ${totalBazar} ৳`;
  document.getElementById('userTotalMealsCount').innerText = `${currentUser.meals} মিল`;
  document.getElementById('statTotalMessMeals').innerText = `মেস মোট: ${totalMeals} মিল`;
  document.getElementById('userTotalDepositText').innerText = `${currentUser.deposit} ৳`;

  document.getElementById('textBreakfastCount').innerText = `${currentUser.today.breakfast} মিল`;
  document.getElementById('textDinnerCount').innerText = `${currentUser.today.dinner} মিল`;

  const totalBfToday = users.reduce((sum, u) => sum + u.today.breakfast, 0);
  const totalDinToday = users.reduce((sum, u) => sum + u.today.dinner, 0);
  document.getElementById('bannerTotalBf').innerText = totalBfToday;
  document.getElementById('bannerTotalDin').innerText = totalDinToday;
  document.getElementById('activeTotalMealsBadge').innerText = `সকাল: ${totalBfToday} | রাত: ${totalDinToday}`;

  const lockBadge = document.getElementById('badgeLockStatus');
  const btnLockKhala = document.getElementById('btnLockKhala');
  document.getElementById('managerForcedOffAlert').classList.toggle('hidden', !currentUser.blockedByManager);

  const disableInputs = isMealsLockedByKhala || currentUser.blockedByManager;
  ['btnMinusBreakfast', 'btnPlusBreakfast', 'btnMinusDinner', 'btnPlusDinner'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.disabled = disableInputs;
  });

  if (isMealsLockedByKhala) {
    lockBadge.className = "text-xs px-2.5 py-1 rounded-full font-bold flex items-center bg-rose-100 text-rose-700";
    lockBadge.innerHTML = `<i class="fa-solid fa-lock mr-1"></i> লকড (খালা রান্না করছেন)`;
    btnLockKhala.className = "w-full sm:w-auto px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1.5";
    btnLockKhala.innerHTML = `<i class="fa-solid fa-unlock"></i> <span>মিল আনলক করুন</span>`;
  } else {
    lockBadge.className = "text-xs px-2.5 py-1 rounded-full font-bold flex items-center bg-emerald-100 text-emerald-700";
    lockBadge.innerHTML = `<i class="fa-solid fa-lock-open mr-1"></i> আনলকড`;
    btnLockKhala.className = "w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center justify-center space-x-1.5";
    btnLockKhala.innerHTML = `<i class="fa-solid fa-lock"></i> <span>খালাকে হিসাব বুঝিয়ে দিয়ে মিল লক করুন</span>`;
  }

  document.getElementById('managerRequestBanner').classList.toggle('hidden', !currentUser.isManagerPending);
  document.getElementById('displayMenuBreakfast').innerText = todayCookingMenu.breakfast;
  document.getElementById('displayMenuDinner').innerText = todayCookingMenu.dinner;

  let sumMealCost = 0, sumTotalCost = 0, sumDeposit = 0, sumDue = 0;
  const tableAll = document.getElementById('tableAllMembersLive');
  tableAll.innerHTML = users.map(u => {
    const mCost = u.meals * mealRate;
    const tCost = mCost + othersPerPerson;
    const due = u.deposit - tCost + u.openingDue;

    sumMealCost += mCost;
    sumTotalCost += tCost;
    sumDeposit += u.deposit;
    sumDue += due;

    const isMe = u.phone === currentUser.phone;

    return `
      <tr class="${isMe ? 'bg-emerald-50/70 font-bold' : 'hover:bg-slate-50'}">
        <td class="p-3 font-semibold text-slate-800">
          ${u.name} ${isMe ? '<span class="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded ml-1">You</span>' : ''}
        </td>
        <td class="p-3 text-center font-bold text-blue-600">${u.meals}</td>
        <td class="p-3 text-right">${mealRate.toFixed(2)}</td>
        <td class="p-3 text-right">${mCost.toFixed(2)}</td>
        <td class="p-3 text-right">${othersPerPerson.toFixed(2)}</td>
        <td class="p-3 text-right font-bold text-slate-700">${tCost.toFixed(2)}</td>
        <td class="p-3 text-right text-emerald-700 font-semibold">${u.deposit.toFixed(2)}</td>
        <td class="p-3 text-right font-black ${due >= 0 ? 'text-slate-800' : 'text-rose-600'}">
          ${due.toFixed(2)}
        </td>
      </tr>
    `;
  }).join('');

  document.getElementById('footTotalMeals').innerText = totalMeals;
  document.getElementById('footTotalMealCost').innerText = sumMealCost.toFixed(2);
  document.getElementById('footTotalOthers').innerText = (othersPerPerson * users.length).toFixed(2);
  document.getElementById('footTotalCost').innerText = sumTotalCost.toFixed(2);
  document.getElementById('footTotalDeposit').innerText = sumDeposit.toFixed(2);
  
  const footDue = document.getElementById('footTotalDue');
  footDue.innerText = sumDue.toFixed(2);
  footDue.className = `p-3 text-right font-black ${sumDue >= 0 ? 'text-slate-800' : 'text-rose-600'}`;

  const activeGrid = document.getElementById('activeMembersGrid');
  activeGrid.innerHTML = users.map(u => {
    const hasBf = u.today.breakfast > 0;
    const hasDin = u.today.dinner > 0;
    const isEating = hasBf || hasDin;

    return `
      <div class="p-3.5 rounded-xl border ${isEating ? 'bg-emerald-50/40 border-emerald-200' : 'bg-slate-50 border-slate-200 opacity-60'}">
        <div class="flex items-center justify-between">
          <span class="font-bold text-slate-800 text-xs">${u.name}</span>
          <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${isEating ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}">
            ${isEating ? 'মিল চালু' : 'বন্ধ'}
          </span>
        </div>
        <div class="mt-2.5 flex space-x-2 text-[11px] font-semibold">
          <span class="px-2 py-1 rounded bg-white border border-slate-200 flex-1 text-center ${hasBf ? 'text-amber-700 border-amber-300 font-bold' : 'text-slate-400'}">
            সকাল: ${u.today.breakfast}
          </span>
          <span class="px-2 py-1 rounded bg-white border border-slate-200 flex-1 text-center ${hasDin ? 'text-indigo-700 border-indigo-300 font-bold' : 'text-slate-400'}">
            রাত: ${u.today.dinner}
          </span>
        </div>
      </div>
    `;
  }).join('');

  const myBazarTable = document.getElementById('mySubmittedBazarList');
  const myBazars = [...pendingBazars, ...bazarRecords].filter(b => b.phone === currentUser.phone);
  if (myBazars.length === 0) {
    myBazarTable.innerHTML = `<tr><td colspan="5" class="p-4 text-center text-slate-400">এখনো কোনো বাজার জমা দেওয়া হয়নি</td></tr>`;
  } else {
    myBazarTable.innerHTML = myBazars.map(b => `
      <tr class="hover:bg-slate-50">
        <td class="p-3 text-slate-500">${b.date}</td>
        <td class="p-3 font-medium text-slate-700">${b.items}</td>
        <td class="p-3 font-bold text-slate-800">${b.amount} ৳</td>
        <td class="p-3"><span class="text-[10px] px-2 py-0.5 rounded bg-slate-100 font-bold">${b.source === 'Pocket' ? 'পকেট' : 'ফান্ড'}</span></td>
        <td class="p-3">
          <span class="text-[10px] px-2 py-0.5 rounded-full font-bold ${b.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}">
            ${b.status === 'approved' ? 'অনুমোদিত' : 'অপেক্ষমাণ'}
          </span>
        </td>
      </tr>
    `).join('');
  }

  const pendingContainer = document.getElementById('pendingBazarListContainer');
  document.getElementById('pendingBazarCountBadge').innerText = `${pendingBazars.length} টি অপেক্ষমাণ`;
  if (pendingBazars.length === 0) {
    pendingContainer.innerHTML = `<p class="text-slate-400 text-center py-3">কোনো অনুমোদনের রিকোয়েস্ট নেই</p>`;
  } else {
    pendingContainer.innerHTML = pendingBazars.map(b => `
      <div class="p-3.5 bg-amber-50/60 border border-amber-200 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div class="flex items-center space-x-2">
            <span class="font-bold text-slate-800">${b.shopperName}</span>
            <span class="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded font-bold">${b.source === 'Pocket' ? 'পকেট খরচ' : 'ফান্ড খরচ'}</span>
          </div>
          <p class="text-slate-600 mt-1">${b.items}</p>
          <span class="font-black text-amber-800 text-sm mt-0.5 block">মোট: ${b.amount} ৳</span>
        </div>
        <div class="flex space-x-2 w-full sm:w-auto">
          <button onclick="approvePendingBazar(${b.id})" class="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow">অনুমোদন</button>
          <button onclick="rejectPendingBazar(${b.id})" class="flex-1 sm:flex-none px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold rounded-lg border border-rose-200">বাতিল</button>
        </div>
      </div>
    `).join('');
  }

  const mgrTable = document.getElementById('tableManagerMealControl');
  if (mgrTable) {
    mgrTable.innerHTML = users.map(u => `
      <tr class="hover:bg-slate-50">
        <td class="p-3">
          <span class="font-bold text-slate-800">${u.name}</span>
          <span class="text-[10px] text-slate-400 block">${u.phone}</span>
        </td>
        <td class="p-3 font-semibold text-amber-800">${u.today.breakfast} টি</td>
        <td class="p-3 font-semibold text-indigo-800">${u.today.dinner} টি</td>
        <td class="p-3">
          <button onclick="toggleManagerBlockMeal('${u.phone}')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition ${u.blockedByManager ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' : 'bg-rose-100 text-rose-700 hover:bg-rose-200'}">
            ${u.blockedByManager ? '<i class="fa-solid fa-unlock mr-1"></i> আনব্লক করুন' : '<i class="fa-solid fa-ban mr-1"></i> ফোর্স অফ ও ব্লক'}
          </button>
        </td>
      </tr>
    `).join('');
  }
}