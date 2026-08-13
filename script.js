const menuBtn = document.getElementById("menuBtn"),
      mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
});

mobileMenu.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => mobileMenu.classList.remove("open"))
);

const cards = [...document.querySelectorAll(".lesson-card")];
const searchInput = document.getElementById("searchInput");
const level = document.getElementById("levelFilter");
const topic = document.getElementById("topicFilter");
const count = document.getElementById("resultCount");
const empty = document.getElementById("empty");

function applyFilters() {
  const q = searchInput.value.trim().toLowerCase();
  const lv = level.value;
  const tp = topic.value;

  let shown = 0;

  cards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const cardTopic = card.dataset.topic;
    const cardLevel = card.dataset.level;

    const ok =
      (!q 
        title.includes(q) 
        card.textContent.toLowerCase().includes(q)) &&
      (!lv  cardLevel === lv) &&
      (!tp  cardTopic === tp);

    card.style.display = ok ? "" : "none";

    if (ok) shown++;
  });

  count.textContent = ${shown} وانە;
  empty.style.display = shown ? "none" : "block";
}

document
  .getElementById("lessonSearch")
  .addEventListener("submit", e => {
    e.preventDefault();
    applyFilters();

    document
      .getElementById("lessons")
      .scrollIntoView({ behavior: "smooth" });
  });

[searchInput, level, topic].forEach(x =>
  x.addEventListener("input", applyFilters)
);

document.querySelectorAll(".chip").forEach(chip =>
  chip.addEventListener("click", () => {
    document
      .querySelectorAll(".chip")
      .forEach(c => c.classList.remove("active"));

    chip.classList.add("active");
    topic.value = chip.dataset.topic;

    applyFilters();
  })
);

document.querySelectorAll(".learn-btn").forEach(btn =>
  btn.addEventListener("click", () => {
    btn.textContent = "بە زوویی دەستپێدەکات ✓";
    btn.disabled = true;
  })
);

document.querySelector(".newsletter button")?.addEventListener("click", () => {
  const input = document.querySelector(".newsletter input");

  if (!input.value.trim()) {
    input.focus();
    return;
  }

  input.value = "";
  input.placeholder = "بە سەرکەوتوویی تۆمار کرا ✓";
});

document
  .querySelectorAll('a[href="#"]')
  .forEach(a => a.addEventListener("click", e => e.preventDefault()));
