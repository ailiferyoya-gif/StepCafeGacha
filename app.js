const fmt = new Intl.NumberFormat("ja-JP");
const grid = { cols: 6, rows: 7, maxItems: 18 };
const assets = {
  sofa: "assets/decor/red-sofa.png",
  table: "assets/decor/round-table.png",
  counter: "assets/decor/pastry-counter.png",
  plant: "assets/decor/potted-plant.png",
  staff: "assets/staff/barista-mina.png"
};
const catalog = [
  { key: "sofa", label: "ソファ", note: "2x1", w: 2, h: 1, bonus: 8, sales: 120, image: assets.sofa, className: "sofa" },
  { key: "table", label: "丸テーブル", note: "1x1", w: 1, h: 1, bonus: 5, sales: 80, image: assets.table, className: "table" },
  { key: "counter", label: "ショーケース", note: "2x1", w: 2, h: 1, bonus: 10, sales: 190, image: assets.counter, className: "counter" },
  { key: "plant", label: "植木", note: "1x1", w: 1, h: 1, bonus: 3, sales: 35, image: assets.plant, className: "plant" },
  { key: "staff", label: "ミナ", note: "1x2", w: 1, h: 2, bonus: 5, sales: 110, image: assets.staff, className: "staff" }
];
const state = {
  steps: 4820,
  coins: 1240,
  tickets: 3,
  reputation: 42,
  idle: 620,
  selected: "sofa",
  mode: "place",
  placed: [
    { id: "starter-counter", item: "counter", col: 3, row: 1 },
    { id: "starter-sofa", item: "sofa", col: 1, row: 4 },
    { id: "starter-table", item: "table", col: 2, row: 3 },
    { id: "starter-staff", item: "staff", col: 4, row: 4 }
  ],
  staff: [
    { name: "ミナ", rarity: "N", role: "ホール", effect: "全売上 +3%", level: 1 },
    { name: "ハル", rarity: "R", role: "バリスタ", effect: "コーヒー系売上 +12%", level: 2 },
    { name: "ナギ", rarity: "R", role: "接客", effect: "評判獲得 +8%", level: 1 }
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
  { name: "ソウタ", rarity: "N", role: "キッチン", effect: "提供速度 +3%" },
  { name: "ミナ", rarity: "N", role: "ホール", effect: "全売上 +3%" },
  { name: "リコ", rarity: "R", role: "パティシエ", effect: "スイーツ系売上 +12%" },
  { name: "セナ", rarity: "SR", role: "宣伝", effect: "来客数 +15%" },
  { name: "カレン", rarity: "SSR", role: "看板バリスタ", effect: "全売上 +20%、コーヒー系 +15%" }
];
const upgrades = [
  { name: "エスプレッソマシン", effect: "コーヒー系売上 +10%", cost: 900 },
  { name: "木製テーブル", effect: "席数 +2", cost: 700 },
  { name: "手書き看板", effect: "来客数 +8%", cost: 650 }
];
function itemByKey(key) {
  return catalog.find((item) => item.key === key);
}
function makeId() {
  return `item-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
}
function getBoardMetrics() {
  const placedLayer = document.querySelector("#placedLayer");
  const rect = placedLayer.getBoundingClientRect();
  const gridLayer = document.querySelector("#gridLayer");
  const style = getComputedStyle(gridLayer);
  const padLeft = parseFloat(style.paddingLeft);
  const padRight = parseFloat(style.paddingRight);
  const padTop = parseFloat(style.paddingTop);
  const padBottom = parseFloat(style.paddingBottom);
  const width = rect.width - padLeft - padRight;
  const height = rect.height - padTop - padBottom;
  return {
    left: padLeft,
    top: padTop,
    cellW: width / grid.cols,
    cellH: height / grid.rows
  };
}
function occupiedCells(ignoreId) {
  const cells = new Set();
  state.placed.forEach((placed) => {
    if (placed.id === ignoreId) return;
    const item = itemByKey(placed.item);
    for (let row = placed.row; row < placed.row + item.h; row += 1) {
      for (let col = placed.col; col < placed.col + item.w; col += 1) {
        cells.add(`${col}:${row}`);
      }
    }
  });
  return cells;
}
function canPlace(item, col, row, ignoreId) {
  if (col < 0 || row < 0 || col + item.w > grid.cols || row + item.h > grid.rows) return false;
  const occupied = occupiedCells(ignoreId);
  for (let y = row; y < row + item.h; y += 1) {
    for (let x = col; x < col + item.w; x += 1) {
      if (occupied.has(`${x}:${y}`)) return false;
    }
  }
  return true;
}
function setLog(message) {
  document.querySelector("#salesLog").textContent = message;
}
function placeSelected(col, row) {
  const item = itemByKey(state.selected);
  if (!item) return;
  if (state.placed.length >= grid.maxItems) {
    setLog("配置上限です。撤去してから置き直してください。");
    return;
  }
  if (!canPlace(item, col, row)) {
    setLog(`${item.label}はそのマスには置けません。空いている範囲を選んでください。`);
    pulseBlocked(col, row, item);
    return;
  }
  state.placed.push({ id: makeId(), item: item.key, col, row });
  setLog(`${item.label}を ${col + 1}-${row + 1} に配置しました。`);
  renderAll();
}
function removePlaced(id) {
  const index = state.placed.findIndex((placed) => placed.id === id);
  if (index === -1) return;
  const item = itemByKey(state.placed[index].item);
  state.placed.splice(index, 1);
  setLog(`${item.label}を撤去しました。`);
  renderAll();
}
function pulseBlocked(col, row, item) {
  const cells = document.querySelectorAll(".grid-cell");
  for (let y = row; y < Math.min(grid.rows, row + item.h); y += 1) {
    for (let x = col; x < Math.min(grid.cols, col + item.w); x += 1) {
      const cell = cells[y * grid.cols + x];
      if (!cell) continue;
      cell.classList.add("blocked");
      setTimeout(() => cell.classList.remove("blocked"), 420);
    }
  }
}
function getBonus() {
  return state.placed.reduce((sum, placed) => sum + itemByKey(placed.item).bonus, 0);
}
function getSales() {
  const base = 1100 + state.staff.length * 220;
  const itemSales = state.placed.reduce((sum, placed) => sum + itemByKey(placed.item).sales, 0);
  return Math.round((base + itemSales) * (1 + getBonus() / 100));
}
function renderGrid() {
  const root = document.querySelector("#gridLayer");
  root.innerHTML = "";
  for (let row = 0; row < grid.rows; row += 1) {
    for (let col = 0; col < grid.cols; col += 1) {
      const cell = document.createElement("button");
      cell.className = "grid-cell";
      cell.type = "button";
      cell.dataset.col = col;
      cell.dataset.row = row;
      cell.setAttribute("aria-label", `${col + 1}列 ${row + 1}行`);
      cell.addEventListener("click", () => {
        if (state.mode === "remove") {
          setLog("撤去したい家具を直接タップしてください。");
          return;
        }
        placeSelected(col, row);
      });
      root.appendChild(cell);
    }
  }
}
function renderPlaced() {
  const root = document.querySelector("#placedLayer");
  const metrics = getBoardMetrics();
  root.innerHTML = "";
  state.placed.forEach((placed) => {
    const item = itemByKey(placed.item);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `placed-item ${item.className}`;
    button.style.left = `${metrics.left + placed.col * metrics.cellW}px`;
    button.style.top = `${metrics.top + placed.row * metrics.cellH}px`;
    button.style.width = `${metrics.cellW * item.w}px`;
    button.style.height = `${metrics.cellH * item.h}px`;
    button.setAttribute("aria-label", `${item.label}を撤去`);
    button.innerHTML = `<img src="${item.image}" alt="${item.label}">`;
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (state.mode === "remove") {
        removePlaced(placed.id);
        return;
      }
      setLog(`${item.label}を選択中。撤去モードでタップすると外せます。`);
      document.querySelectorAll(".placed-item").forEach((node) => node.classList.remove("selected"));
      button.classList.add("selected");
    });
    root.appendChild(button);
  });
}
function renderPalette() {
  const root = document.querySelector("#decorPalette");
  root.innerHTML = "";
  catalog.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `palette-item ${state.selected === item.key ? "active" : ""}`;
    button.innerHTML = `<img src="${item.image}" alt=""><span>${item.label}</span><small>${item.note}</small>`;
    button.addEventListener("click", () => {
      state.selected = item.key;
      state.mode = "place";
      setLog(`${item.label}を選択しました。置きたいマスをタップしてください。`);
      renderAll();
    });
    root.appendChild(button);
  });
}
function renderModeButtons() {
  document.querySelector("#placeMode").classList.toggle("active", state.mode === "place");
  document.querySelector("#removeMode").classList.toggle("active", state.mode === "remove");
}
function renderResources() {
  document.querySelector("#stepCount").textContent = fmt.format(state.steps);
  document.querySelector("#coins").textContent = fmt.format(state.coins);
  document.querySelector("#tickets").textContent = fmt.format(state.tickets);
  document.querySelector("#reputation").textContent = fmt.format(state.reputation);
  document.querySelector("#forecastSales").textContent = fmt.format(getSales());
  document.querySelector("#decorBonus").textContent = `+${getBonus()}%`;
  document.querySelector("#placementCount").textContent = `${state.placed.length}/${grid.maxItems}`;
  document.querySelector("#layoutScore").textContent = `満足度 ${Math.min(100, 38 + getBonus())}`;
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
  setLog(`${fmt.format(reward.steps)}歩報酬を受け取りました。`);
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
        setLog("コインが足りません。歩数報酬や放置売上を回収しましょう。");
        return;
      }
      state.coins -= upgrade.cost;
      state.reputation += 5;
      setLog(`${upgrade.name}を強化しました。`);
      renderAll();
    });
    root.appendChild(item);
  });
}
function drawGacha() {
  if (state.tickets <= 0) {
    setLog("ガチャチケットがありません。5,000歩報酬を狙いましょう。");
    return;
  }
  state.tickets -= 1;
  const roll = Math.random();
  const pick = roll > 0.97 ? gachaPool[4] : roll > 0.85 ? gachaPool[3] : roll > 0.5 ? gachaPool[2] : gachaPool[Math.floor(Math.random() * 2)];
  state.staff.push({ ...pick, level: 1 });
  const card = document.querySelector("#gachaCard");
  card.querySelector(".rarity").textContent = pick.rarity;
  card.querySelector("strong").textContent = pick.name;
  card.querySelector("p").textContent = `${pick.role} / ${pick.effect}`;
  setLog(`${pick.name}がスタッフに加わりました。`);
  renderAll();
}
function applyPreset() {
  state.placed = [
    { id: makeId(), item: "counter", col: 3, row: 1 },
    { id: makeId(), item: "sofa", col: 1, row: 4 },
    { id: makeId(), item: "table", col: 2, row: 3 },
    { id: makeId(), item: "table", col: 4, row: 3 },
    { id: makeId(), item: "plant", col: 0, row: 2 },
    { id: makeId(), item: "plant", col: 5, row: 5 },
    { id: makeId(), item: "staff", col: 4, row: 4 }
  ];
  setLog("おすすめ配置を反映しました。家具は撤去して自由に置き直せます。");
  renderAll();
}
function clearLayout() {
  state.placed = [];
  setLog("店内を空にしました。家具パレットから配置してください。");
  renderAll();
}
function renderAll() {
  renderPalette();
  renderModeButtons();
  renderPlaced();
  renderResources();
  renderRewards();
  renderLoadout();
  renderUpgrades();
}
function switchScreen(screenName) {
  document.querySelectorAll(".nav-item").forEach((tab) => tab.classList.toggle("active", tab.dataset.screen === screenName));
  document.querySelector("#homeScreen").classList.toggle("hidden", screenName !== "home");
  document.querySelectorAll(".screen").forEach((screen) => screen.classList.remove("active"));
  const target = document.querySelector(`#${screenName}Screen`);
  if (target) target.classList.add("active");
  requestAnimationFrame(renderPlaced);
}
renderGrid();
renderAll();
window.addEventListener("resize", renderPlaced);
document.querySelectorAll(".nav-item").forEach((tab) => tab.addEventListener("click", () => switchScreen(tab.dataset.screen)));
document.querySelector("#placeMode").addEventListener("click", () => {
  state.mode = "place";
  setLog("配置モードです。家具を選んでマスをタップしてください。");
  renderAll();
});
document.querySelector("#removeMode").addEventListener("click", () => {
  state.mode = "remove";
  setLog("撤去モードです。外したい家具を直接タップしてください。");
  renderAll();
});
document.querySelector("#clearLayout").addEventListener("click", clearLayout);
document.querySelector("#presetButton").addEventListener("click", applyPreset);
document.querySelector("#addSteps").addEventListener("click", () => {
  state.steps += 1000;
  setLog("疑似歩数を1,000歩追加しました。");
  renderAll();
});
document.querySelector("#collectIdle").addEventListener("click", () => {
  state.coins += state.idle;
  setLog(`放置売上 ${fmt.format(state.idle)}G を回収しました。`);
  state.idle = Math.floor(state.idle * 0.4) + 180;
  renderAll();
});
document.querySelector("#drawGacha").addEventListener("click", drawGacha);
