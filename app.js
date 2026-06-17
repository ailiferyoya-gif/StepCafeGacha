const state = {
  steps: 4820,
  coins: 1240,
  tickets: 3,
  reputation: 42,
  idle: 620,
  staffVisible: true,
  decor: {
    sofa: true,
    sofaAlt: false,
    counter: true,
    counterAlt: false
  },
  staff: [
    { name: "ミナ", rarity: "N", role: "ホール", effect: "全売上 +3%", level: 1, portrait: "assets/staff/barista-mina.png" },
    { name: "ハル", rarity: "R", role: "バリスタ", effect: "コーヒー系売上 +12%", level: 2, portrait: "assets/staff/barista-mina.png" },
    { name: "ナギ", rarity: "R", role: "接客", effect: "評判獲得 +8%", level: 1, portrait: "assets/staff/barista-mina.png" }
  ]
};
const rewards = [
  { steps: 1000, label: "コイン 300", claimed: true },
  { steps: 3000, label: "育成素材 小 5", claimed: true },
  { steps: 5000, label: "通常ガチャチケット 1", claimed: false },
  { steps: 8000, label: "育成素材 中 3", claimed: false },
  { steps: 10000, label: "通常ガチャチケット 1 + 営業ブースト 1", claimed: false }
];
const gachaPool = [
  { name: "ソウタ", rarity: "N", role: "キッチン", effect: "提供速度 +3%", portrait: "assets/staff/barista-mina.png" },
  { name: "ミナ", rarity: "N", role: "ホール", effect: "全売上 +3%", portrait: "assets/staff/barista-mina.png" },
  { name: "リコ", rarity: "R", role: "パティシエ", effect: "スイーツ系売上 +12%", portrait: "assets/staff/barista-mina.png" },
  { name: "セナ", rarity: "SR", role: "宣伝", effect: "来客数 +15%", portrait: "assets/staff/barista-mina.png" },
  { name: "カレン", rarity: "SSR", role: "看板バリスタ", effect: "全売上 +20%、コーヒー系 +15%", portrait: "assets/staff/barista-mina.png" }
];
const upgrades = [
  { name: "エスプレッソマシン", effect: "コーヒー系売上 +10%", cost: 900 },
  { name: "木製テーブル", effect: "席数 +2", cost: 700 },
  { name: "手書き看板", effect: "来客数 +8%", cost: 650 }
];
const decorItems = [
  { key: "sofa", label: "赤ソファ", note: "評判 +8%", image: "assets/decor/red-sofa.png" },
  { key: "counter", label: "ショーケース", note: "売上 +10%", image: "assets/decor/pastry-counter.png" },
  { key: "sofaAlt", label: "ソファ移動", note: "右側配置", image: "assets/decor/red-sofa.png" },
  { key: "counterAlt", label: "ケース移動", note: "左側配置", image: "assets/decor/pastry-counter.png" }
];
const fmt = new Intl.NumberFormat("ja-JP");
function getDecorBonus() {
  let bonus = 0;
  if (state.decor.sofa) bonus += 8;
  if (state.decor.counter) bonus += 10;
  if (state.staffVisible) bonus += 5;
  return bonus;
}
function updateResources() {
  const decorBonus = getDecorBonus();
  document.querySelector("#stepCount").textContent = fmt.format(state.steps);
  document.querySelector("#coins").textContent = fmt.format(state.coins);
  document.querySelector("#tickets").textContent = fmt.format(state.tickets);
  document.querySelector("#reputation").textContent = fmt.format(state.reputation);
  document.querySelector("#forecastSales").textContent = fmt.format(Math.round((1400 + state.staff.length * 260) * (1 + decorBonus / 100)));
  document.querySelector("#forecastGuests").textContent = fmt.format(24 + state.staff.length * 4 + (state.decor.sofa ? 3 : 0));
  document.querySelector("#decorBonus").textContent = `+${decorBonus}%`;
  document.querySelector("#layoutName").textContent = state.decor.sofa && state.decor.counter ? "Cafe Set" : "Custom";
}
function renderStage() {
  const sofa = document.querySelector("#decorSofa");
  const counter = document.querySelector("#decorCounter");
  const staff = document.querySelector("#staffMina");
  sofa.classList.toggle("active", state.decor.sofa);
  sofa.classList.toggle("alt", state.decor.sofaAlt);
  counter.classList.toggle("active", state.decor.counter);
  counter.classList.toggle("alt", state.decor.counterAlt);
  staff.classList.toggle("active", state.staffVisible);
  staff.classList.toggle("alt", state.decor.counterAlt);
  document.querySelector("#toggleStaff").textContent = state.staffVisible ? "非表示" : "表示";
}
function renderDecorControls() {
  const root = document.querySelector("#decorControls");
  root.innerHTML = "";
  decorItems.forEach((decor) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `decor-control ${state.decor[decor.key] ? "active" : ""}`;
    button.innerHTML = `<img src="${decor.image}" alt=""><div>${decor.label}<span>${decor.note}</span></div>`;
    button.addEventListener("click", () => {
      state.decor[decor.key] = !state.decor[decor.key];
      if (decor.key === "sofaAlt" && state.decor.sofaAlt) state.decor.sofa = true;
      if (decor.key === "counterAlt" && state.decor.counterAlt) state.decor.counter = true;
      document.querySelector("#salesLog").textContent = `${decor.label}を${state.decor[decor.key] ? "設定" : "解除"}しました。`;
      renderAll();
    });
    root.appendChild(button);
  });
}
function renderRewards() {
  const root = document.querySelector("#rewardList");
  root.innerHTML = "";
  rewards.forEach((reward) => {
    const available = state.steps >= reward.steps;
    const item = document.createElement("article");
    item.className = `reward ${reward.claimed ? "claimed" : available ? "" : "locked"}`;
    item.innerHTML = `<div class="reward-head"><strong>${fmt.format(reward.steps)}歩</strong><span class="badge">${reward.claimed ? "受取済" : available ? "受取可" : "未達成"}</span></div><p>${reward.label}</p>`;
    if (available && !reward.claimed) item.addEventListener("click", () => claimReward(reward));
    root.appendChild(item);
  });
}
function claimReward(reward) {
  reward.claimed = true;
  if (reward.label.includes("コイン")) state.coins += 300;
  if (reward.label.includes("チケット")) state.tickets += 1;
  document.querySelector("#salesLog").textContent = `${fmt.format(reward.steps)}歩報酬を受け取りました。`;
  renderAll();
}
function renderLoadout() {
  const root = document.querySelector("#loadout");
  root.innerHTML = "";
  state.staff.forEach((member) => {
    const item = document.createElement("article");
    item.className = "member";
    item.innerHTML = `<div class="member-head"><strong>${member.name} Lv.${member.level}</strong><span class="badge">${member.rarity}</span></div><p>${member.role} / ${member.effect}</p>`;
    root.appendChild(item);
  });
}
function renderUpgrades() {
  const root = document.querySelector("#upgradeList");
  root.innerHTML = "";
  upgrades.forEach((upgrade) => {
    const item = document.createElement("article");
    item.className = "upgrade-item";
    item.innerHTML = `<div class="upgrade-head"><strong>${upgrade.name}</strong><span>${fmt.format(upgrade.cost)}G</span></div><p>${upgrade.effect}</p><button type="button">強化する</button>`;
    item.querySelector("button").addEventListener("click", () => {
      if (state.coins < upgrade.cost) {
        document.querySelector("#salesLog").textContent = "コインが足りません。歩数報酬や放置売上を回収しましょう。";
        return;
      }
      state.coins -= upgrade.cost;
      state.reputation += 5;
      document.querySelector("#salesLog").textContent = `${upgrade.name}を強化しました。`;
      renderAll();
    });
    root.appendChild(item);
  });
}
function drawGacha() {
  if (state.tickets <= 0) {
    document.querySelector("#salesLog").textContent = "ガチャチケットがありません。5,000歩報酬を狙いましょう。";
    return;
  }
  state.tickets -= 1;
  const roll = Math.random();
  const pick = roll > 0.97 ? gachaPool[4] : roll > 0.85 ? gachaPool[3] : roll > 0.5 ? gachaPool[2] : gachaPool[Math.floor(Math.random() * 2)];
  state.staff.push({ ...pick, level: 1 });
  state.staffVisible = true;
  const card = document.querySelector("#gachaCard");
  card.querySelector(".rarity").textContent = pick.rarity;
  card.querySelector("strong").textContent = pick.name;
  card.querySelector("p").textContent = `${pick.role} / ${pick.effect}`;
  document.querySelector("#salesLog").textContent = `${pick.name}がスタッフに加わりました。店内にも店員を表示しました。`;
  renderAll();
}
function renderAll() {
  updateResources();
  renderStage();
  renderDecorControls();
  renderRewards();
  renderLoadout();
  renderUpgrades();
}
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`#${tab.dataset.screen}`).classList.add("active");
  });
});
document.querySelector("#addSteps").addEventListener("click", () => {
  state.steps += 1000;
  document.querySelector("#salesLog").textContent = "疑似歩数を1,000歩追加しました。";
  renderAll();
});
document.querySelector("#collectIdle").addEventListener("click", () => {
  state.coins += state.idle;
  document.querySelector("#salesLog").textContent = `放置売上 ${fmt.format(state.idle)}G を回収しました。`;
  state.idle = Math.floor(state.idle * 0.4) + 180;
  renderAll();
});
document.querySelector("#drawGacha").addEventListener("click", drawGacha);
document.querySelector("#toggleStaff").addEventListener("click", () => {
  state.staffVisible = !state.staffVisible;
  document.querySelector("#salesLog").textContent = state.staffVisible ? "ミナを店内に配置しました。" : "ミナを控室に戻しました。";
  renderAll();
});
document.querySelector("#presetButton").addEventListener("click", () => {
  state.decor.sofa = true;
  state.decor.counter = true;
  state.decor.sofaAlt = Math.random() > 0.5;
  state.decor.counterAlt = !state.decor.sofaAlt;
  state.staffVisible = true;
  document.querySelector("#salesLog").textContent = "おすすめ内装セットを反映しました。";
  renderAll();
});
renderAll();
