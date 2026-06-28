const cards = [...document.querySelectorAll(".paper-card")];
const buttons = [...document.querySelectorAll(".filter-btn")];
const input = document.querySelector("#searchInput");
const empty = document.querySelector("#emptyState");
const sortMode = document.querySelector("#sortMode");
const grid = document.querySelector("#paperGrid");
let activeFilter = "all";
cards.forEach((card, index) => { card.dataset.order = String(index); });
function sortedCards() {
  const mode = sortMode?.value || "default";
  const ordered = [...cards];
  if (mode === "author") {
    ordered.sort((a, b) => (a.dataset.author || "").localeCompare(b.dataset.author || "", "zh-CN-u-co-pinyin") || Number(a.dataset.order) - Number(b.dataset.order));
  } else if (mode === "yearDesc") {
    ordered.sort((a, b) => ((Number.parseInt(b.dataset.year || "0", 10) || 0) - (Number.parseInt(a.dataset.year || "0", 10) || 0)) || Number(a.dataset.order) - Number(b.dataset.order));
  } else {
    ordered.sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order));
  }
  return ordered;
}
function updateCards() {
  const query = (input?.value || "").trim().toLowerCase();
  let visible = 0;
  for (const card of sortedCards()) {
    grid?.appendChild(card);
    const categoryMatch = activeFilter === "all" || card.dataset.category === activeFilter;
    const searchMatch = !query || (card.dataset.search || "").includes(query);
    const show = categoryMatch && searchMatch;
    card.style.display = show ? "" : "none";
    if (show) visible += 1;
  }
  if (empty) empty.style.display = visible ? "none" : "block";
}
for (const button of buttons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    buttons.forEach((item) => item.classList.toggle("active", item === button));
    updateCards();
  });
}
input?.addEventListener("input", updateCards);
sortMode?.addEventListener("change", updateCards);
updateCards();
