// Default Initial Mock Data
let messInfo = {
  name: "সোনার বাংলা মেস",
  adminPhone: "01700000001",
  managerPhone: "01700000002"
};

let users = [
  { id: 1, name: "Sabbir (Admin)", phone: "01700000001", role: "admin", deposit: 4500, meals: 36, isManagerPending: false, blockedByManager: false, today: { breakfast: 1, dinner: 1 } },
  { id: 2, name: "Raz (Manager)", phone: "01700000002", role: "manager", deposit: 3800, meals: 34, isManagerPending: false, blockedByManager: false, today: { breakfast: 1, dinner: 1 } },
  { id: 3, name: "Nahid", phone: "01700000003", role: "member", deposit: 3000, meals: 28, isManagerPending: false, blockedByManager: false, today: { breakfast: 1, dinner: 0 } },
  { id: 4, name: "Hanif", phone: "01700000004", role: "member", deposit: 2500, meals: 26, isManagerPending: false, blockedByManager: false, today: { breakfast: 0, dinner: 1 } }
];

let bazarRecords = [
  { id: 1, shopperName: "Raz (Manager)", phone: "01700000002", date: "2026-08-25", items: "মুরগি (৮০০৳), তেল (২২০৳)", amount: 1020, source: "Pocket", status: "approved" },
  { id: 2, shopperName: "Nahid", phone: "01700000003", date: "2026-08-26", items: "আলু (১২০৳), পেঁয়াজ (৮০৳), ডিম (১৪০৳)", amount: 340, source: "Pocket", status: "approved" }
];

let pendingBazars = [];

let isMealsLockedByKhala = false;

let todayCookingMenu = {
  breakfast: "পরোটা, ডিম ভাজি, ডাল",
  dinner: "মুরগির মাংসের ঝোল, ডাল, ভাত"
};

let currentUser = null;

// ==================== APP INITIALIZATION ====================
window.addEventListener('DOMContentLoaded', () => {
  const savedPhone = localStorage.getItem('mess_user_phone');
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
  document.getElementById('topUserPhone').innerText = currentUser.phone;

  // Role Badge
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

  populateManagerOptions();
  populateAdminOptions();

  renderAll();
}

// ==================== AUTHENTICATION LOGIC ====================
function toggleAuthMode(mode) {
  const isLogin = mode === 'login';
  document.getElementById('loginForm').classList.toggle('hidden', !isLogin);
  document.getElementById('registerForm').classList.toggle('hidden', isLogin);

  document.getElementById('btnAuthLogin').className = isLogin 
    ? "w-1/2 py-2.5 rounded-lg bg-white shadow-sm text-emerald-700 font-bold"
    : "w-1/2 py-2.5 rounded-lg text-slate-500";
    
  document.getElementById('btnAuthRegister').className = !isLogin 
    ? "w-1/2 py-2.5 rounded-lg bg-white shadow-sm text-emerald-700 font-bold"
    : "w-1/2 py-2.5 rounded-lg text-slate-500";
}

function toggleMessNameField(role) {
  document.getElementById('messNameBox').classList.toggle('hidden', role !== 'admin');
}

function handleLogin(e) {
  e.preventDefault();
  const phone = document.getElementById('loginPhone').value.trim();
  const user = users.find(u => u.phone === phone);

  if (user) {
    currentUser = user;
    localStorage.setItem('mess_user_phone', phone);
    initAppSession();
    showToast(`স্বাগতম, ${user.name}!`);
  } else {
    alert("এই নম্বরে কোনো অ্যাকাউন্ট পাওয়া যায়নি। দয়া করে রেজিস্ট্রেশন করুন।");
  }
}

function quickLogin(phone) {
  const user = users.find(u => u.phone === phone);
  if (user) {
    currentUser = user;
    localStorage.setItem('mess_user_phone', phone);
    initAppSession();
    showToast(`${user.name} হিসেবে লগইন করা হয়েছে!`);
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById('regName').value.trim();
  const phone = document.getElementById('regPhone').value.trim();
  const role = document.getElementById('regRole').value;
  const messName = document.getElementById('regMessName').value.trim();

  if (users.find(u => u.phone === phone)) {
    alert("এই নম্বর দিয়ে ইতিমধ্যে অ্যাকাউন্ট খোলা হয়েছে!");
    return;
  }

  if (role === 'admin' && messName) {
    messInfo.name = messName;
    messInfo.adminPhone = phone;
  }

  const newUser = {
    id: Date.now(),
    name,
    phone,
    role,
    deposit: 0,
    meals: 0,
    isManagerPending: false,
    blockedByManager: false,
    today: { breakfast: 1, dinner: 1 }
  };

  users.push(newUser);
  currentUser = newUser;
  localStorage.setItem('mess_user_phone', phone);
  initAppSession();
  showToast("রেজিস্ট্রেশন সফল হয়েছে!");
}

function handleLogout() {
  localStorage.removeItem('mess_user_phone');
  currentUser = null;
  document.getElementById('authScreen').classList.remove('hidden');
}

// ==================== NAVIGATION TABS ====================
function switchTab(viewId) {
  const views = ['dashboard', 'active-meals', 'bazar-entry', 'manager-panel', 'admin-panel'];
  views.forEach(v => {
    const el = document.getElementById(`view-${v}`);
    const navBtn = document.getElementById(`nav-${v}`);
    if (el) el.classList.toggle('hidden', v !== viewId);
    if (navBtn) {
      if (v === viewId) {
        navBtn.className = "py-2.5 px-3 min-w-[90px] text-center border-b-2 border-white font-bold bg-emerald-900/50 text-white";
      } else {
        navBtn.className = "py-2.5 px-3 min-w-[90px] text-center text-emerald-200 hover:text-white";
      }
    }
  });

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

// ==================== MEAL COUNT & MULTIPLE MEALS ====================
function changeMealCount(mealType, delta) {
  if (isMealsLockedByKhala) {
    alert("খালাকে হিসাব বুঝিয়ে দেওয়ার পর মিল লক হয়ে গেছে। এখন আর পরিবর্তন সম্ভব নয়।");
    return;
  }

  if (currentUser.blockedByManager) {
    alert("ম্যানেজার আপনার মিল বন্ধ করে রেখেছেন। আপনি নিজে চালু করতে পারবেন না।");
    return;
  }

  const currentCount = currentUser.today[mealType];
  const newCount = Math.max(0, currentCount + delta);
  currentUser.today[mealType] = newCount;

  renderAll();
}

function toggleKhalaLock() {
  isMealsLockedByKhala = !isMealsLockedByKhala;
  showToast(isMealsLockedByKhala ? "🔒 মিল লক করা হয়েছে! খালা রান্না শুরু করেছেন।" : "🔓 মিল আনলক করা হয়েছে!");
  renderAll();
}

// ==================== BAZAR ENTRY WITH TWO-COLUMN ROWS ====================
function addBazarRow() {
  const container = document.getElementById('bazarRowsContainer');
  const newRow = document.createElement('div');
  newRow.className = "flex items-center space-x-2 bazar-item-row";
  newRow.innerHTML = `
    <input type="text" placeholder="পণ্যের নাম (যেমন: শাকসবজি)" class="w-2/3 p-2.5 border border-slate-200 rounded-xl bg-slate-50 font-medium item-name" required />
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
  const priceInputs = document.querySelectorAll('.item-price');
  priceInputs.forEach(input => {
    const val = parseFloat(input.value) || 0;
    total += val;
  });
  document.getElementById('bazarCalculatedTotal').innerText = `${total} ৳`;
  return total;
}

function submitBazarList(e) {
  e.preventDefault();
  const total = calculateBazarTotal();
  if (total <= 0) {
    alert("সঠিক দাম লিখুন।");
    return;
  }

  const rows = document.querySelectorAll('.bazar-item-row');
  const itemList = [];
  rows.forEach(r => {
    const name = r.querySelector('.item-name').value.trim();
    const price = r.querySelector('.item-price').value.trim();
    if (name && price) {
      itemList.push(`${name} (${price}৳)`);
    }
  });

  const source = document.getElementById('bazarMoneySource').value;

  const newBazar = {
    id: Date.now(),
    shopperName: currentUser.name,
    phone: currentUser.phone,
    date: new Date().toISOString().split('T')[0],
    items: itemList.join(', '),
    amount: total,
    source,
    status: "pending"
  };

  pendingBazars.unshift(newBazar);
  showToast("বাজারের তালিকা ম্যানেজারের অনুমোদনের জন্য পাঠানো হয়েছে!");

  // Reset Form
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

// ==================== MANAGER ACTIONS ====================
function handleManagerDeposit(e) {
  e.preventDefault();
  const targetPhone = document.getElementById('depositSelectUser').value;
  const amount = parseFloat(document.getElementById('depositInputAmount').value);

  const member = users.find(u => u.phone === targetPhone);
  if (member && amount > 0) {
    member.deposit += amount;
    showToast(`${member.name}-এর ব্যালেন্সে ${amount} ৳ জমা কনফার্ম করা হয়েছে!`);
    document.getElementById('depositInputAmount').value = '';
    renderAll();
  }
}

function approvePendingBazar(bazarId) {
  const index = pendingBazars.findIndex(b => b.id === bazarId);
  if (index > -1) {
    const item = pendingBazars[index];
    item.status = "approved";
    bazarRecords.unshift(item);

    // If paid from Pocket, auto-add to member deposit
    if (item.source === "Pocket") {
      const shopper = users.find(u => u.phone === item.phone);
      if (shopper) {
        shopper.deposit += item.amount;
      }
    }

    pendingBazars.splice(index, 1);
    showToast(`বাজার বাবদ ${item.amount} ৳ অনুমোদন করা হয়েছে!`);
    renderAll();
  }
}

function rejectPendingBazar(bazarId) {
  const index = pendingBazars.findIndex(b => b.id === bazarId);
  if (index > -1) {
    pendingBazars.splice(index, 1);
    showToast("বাজার বাতিল করা হয়েছে!", true);
    renderAll();
  }
}

function toggleManagerBlockMeal(userPhone) {
  const user = users.find(u => u.phone === userPhone);
  if (user) {
    user.blockedByManager = !user.blockedByManager;
    if (user.blockedByManager) {
      user.today.breakfast = 0;
      user.today.dinner = 0;
      showToast(`${user.name}-এর মিল বন্ধ ও ব্লক করা হয়েছে!`);
    } else {
      user.today.breakfast = 1;
      user.today.dinner = 1;
      showToast(`${user.name}-এর মিল আনব্লক করা হয়েছে!`);
    }
    renderAll();
  }
}

// ==================== ADMIN ACTIONS & MANAGER HANDOVER ====================
function handleSendManagerRequest(e) {
  e.preventDefault();
  const selectedPhone = document.getElementById('adminSelectNewManager').value;
  const targetUser = users.find(u => u.phone === selectedPhone);

  if (targetUser) {
    targetUser.isManagerPending = true;
    showToast(`${targetUser.name}-এর কাছে ম্যানেজার হওয়ার রিকোয়েস্ট পাঠানো হয়েছে!`);
    renderAll();
  }
}

function acceptManagerOffer() {
  const oldManager = users.find(u => u.role === 'manager');
  if (oldManager) oldManager.role = 'member';

  currentUser.role = 'manager';
  currentUser.isManagerPending = false;
  messInfo.managerPhone = currentUser.phone;

  showToast("অভিনন্দন! আপনি এখন মেসের নতুন ম্যানেজার।");
  initAppSession();
}

function rejectManagerOffer() {
  currentUser.isManagerPending = false;
  showToast("ম্যানেজারি রিকোয়েস্ট বাতিল করা হয়েছে।");
  renderAll();
}

function updateMessName() {
  const newName = document.getElementById('inputAdminMessName').value.trim();
  if (newName) {
    messInfo.name = newName;
    document.getElementById('topMessTitle').innerText = newName;
    showToast("মেসের নাম সফলভাবে পরিবর্তন করা হয়েছে!");
    document.getElementById('inputAdminMessName').value = '';
  }
}

// ==================== COOKING MENU MODAL ====================
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
  showToast("আজকের রান্নার মেন্যু সেভ হয়েছে!");
  renderAll();
}

// ==================== POPULATE SELECT DROPDOWNS ====================
function populateManagerOptions() {
  const select = document.getElementById('depositSelectUser');
  if (select) {
    select.innerHTML = users.map(u => `<option value="${u.phone}">${u.name} (${u.phone})</option>`).join('');
  }
}

function populateAdminOptions() {
  const select = document.getElementById('adminSelectNewManager');
  if (select) {
    select.innerHTML = users.filter(u => u.role !== 'admin').map(u => `<option value="${u.phone}">${u.name} (${u.phone})</option>`).join('');
  }
  const mgr = users.find(u => u.role === 'manager');
  const badge = document.getElementById('currentManagerNameBadge');
  if (badge) badge.innerText = mgr ? `${mgr.name} (${mgr.phone})` : "কেউ নেই";
}

// ==================== MAIN RENDER UI FUNCTION ====================
function renderAll() {
  if (!currentUser) return;

  // 1. Calculations
  const totalBazarApproved = bazarRecords.reduce((sum, b) => sum + b.amount, 0);
  const totalMealsConsumed = users.reduce((sum, u) => sum + u.meals, 0) || 1;
  const mealRate = totalBazarApproved / totalMealsConsumed;

  // Current User Stats
  const userMealCost = currentUser.meals * mealRate;
  const userBalance = currentUser.deposit - userMealCost;

  // Top Stats UI
  const balanceEl = document.getElementById('userBalanceText');
  balanceEl.innerText = `${userBalance.toFixed(1)} ৳`;
  balanceEl.className = `text-2xl font-black mt-1 ${userBalance >= 0 ? 'text-emerald-600' : 'text-rose-600'}`;
  document.getElementById('userBalanceStatus').innerText = userBalance >= 0 ? "পাবেন (Advance)" : "দিতে হবে (Due)";

  document.getElementById('statMealRate').innerText = `${mealRate.toFixed(2)} ৳`;
  document.getElementById('statTotalMessCost').innerText = `মোট বাজার: ${totalBazarApproved} ৳`;
  document.getElementById('userTotalMealsCount').innerText = `${currentUser.meals} মিল`;
  document.getElementById('statTotalMessMeals').innerText = `মেস মোট: ${totalMealsConsumed} মিল`;
  document.getElementById('userTotalDepositText').innerText = `${currentUser.deposit} ৳`;

  // Meal Counters UI
  document.getElementById('textBreakfastCount').innerText = `${currentUser.today.breakfast} মিল`;
  document.getElementById('textDinnerCount').innerText = `${currentUser.today.dinner} মিল`;

  // Lock Badge & Lock Warnings
  const lockBadge = document.getElementById('badgeLockStatus');
  const btnLockKhala = document.getElementById('btnLockKhala');
  const managerBlockAlert = document.getElementById('managerForcedOffAlert');

  managerBlockAlert.classList.toggle('hidden', !currentUser.blockedByManager);

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

  // Manager Handover Request Banner
  document.getElementById('managerRequestBanner').classList.toggle('hidden', !currentUser.isManagerPending);

  // Cooking Menu
  document.getElementById('displayMenuBreakfast').innerText = todayCookingMenu.breakfast;
  document.getElementById('displayMenuDinner').innerText = todayCookingMenu.dinner;

  // 2. Render Live Member Table
  const allTable = document.getElementById('tableAllMembersLive');
  allTable.innerHTML = users.map(u => {
    const cost = u.meals * mealRate;
    const bal = u.deposit - cost;
    const isMe = u.phone === currentUser.phone;

    return `
      <tr class="${isMe ? 'bg-emerald-50/70 font-bold' : 'hover:bg-slate-50'}">
        <td class="p-3.5">
          <div class="font-bold text-slate-800">${u.name} ${isMe ? '<span class="text-[10px] bg-emerald-600 text-white px-1.5 py-0.5 rounded ml-1">You</span>' : ''}</div>
          <div class="text-[10px] text-slate-400 font-mono">${u.phone}</div>
        </td>
        <td class="p-3.5 font-semibold text-blue-600">${u.meals}</td>
        <td class="p-3.5 text-slate-700 font-medium">${u.deposit} ৳</td>
        <td class="p-3.5 text-slate-600 font-medium">${cost.toFixed(1)} ৳</td>
        <td class="p-3.5 font-bold ${bal >= 0 ? 'text-emerald-600' : 'text-rose-600'}">
          ${bal.toFixed(1)} ৳
        </td>
      </tr>
    `;
  }).join('');

  // 3. Render Active Meals
  const totalBfToday = users.reduce((sum, u) => sum + u.today.breakfast, 0);
  const totalDinToday = users.reduce((sum, u) => sum + u.today.dinner, 0);
  document.getElementById('activeTotalMealsBadge').innerText = `সকাল: ${totalBfToday} | রাত: ${totalDinToday}`;

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

  // 4. Render My Submitted Bazars
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

  // 5. Render Manager Pending Bazar Approvals
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
          <button onclick="approvePendingBazar(${b.id})" class="flex-1 sm:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow">অনুমোদন করুন</button>
          <button onclick="rejectPendingBazar(${b.id})" class="flex-1 sm:flex-none px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold rounded-lg border border-rose-200">বাতিল</button>
        </div>
      </div>
    `).join('');
  }

  // 6. Render Manager Meal Force Control Table
  const managerMealTable = document.getElementById('tableManagerMealControl');
  if (managerMealTable) {
    managerMealTable.innerHTML = users.map(u => `
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