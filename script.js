const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const playground = document.getElementById("playground");
const teaseText = document.getElementById("teaseText");
const heartContainer = document.getElementById("heart-container");

const teaseMessages = [
  "Are you sure? 😏",
  "Think again 😌",
  "You can’t escape ❤️",
  "Just click Yes already 😂",
];

let teaseIndex = 0;
let isMoving = false;

function showTease() {
  teaseText.textContent = teaseMessages[teaseIndex];
  teaseIndex = (teaseIndex + 1) % teaseMessages.length;
}

function randomPositionFarFromCursor(cx, cy) {
  const pg = playground.getBoundingClientRect();
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;

  let x,
    y,
    attempts = 0;

  do {
    x = Math.random() * (pg.width - btnW);
    y = Math.random() * (pg.height - btnH);

    const dx = pg.left + x + btnW / 2 - cx;
    const dy = pg.top + y + btnH / 2 - cy;
    var dist = Math.hypot(dx, dy);

    attempts++;
  } while (dist < 250 && attempts < 50); // ensure it's FAR

  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Initial placement
randomPositionFarFromCursor(window.innerWidth / 2, window.innerHeight / 2);

// Main evade logic
playground.addEventListener("mousemove", (e) => {
  if (isMoving) return;

  const rect = noBtn.getBoundingClientRect();
  const dx = rect.left + rect.width / 2 - e.clientX;
  const dy = rect.top + rect.height / 2 - e.clientY;
  const dist = Math.hypot(dx, dy);

  if (dist < 220) {
    // big fear radius
    isMoving = true;
    noBtn.style.pointerEvents = "none";

    randomPositionFarFromCursor(e.clientX, e.clientY);

    setTimeout(() => {
      noBtn.style.pointerEvents = "auto";
      isMoving = false;
    }, 120);
  }
});

// If cursor somehow touches button
noBtn.addEventListener("mouseenter", (e) => {
  randomPositionFarFromCursor(e.clientX, e.clientY);
});

// If they somehow click
noBtn.addEventListener("click", (e) => {
  e.preventDefault();
  showTease();
  randomPositionFarFromCursor(e.clientX, e.clientY);
});

// YES click
yesBtn.addEventListener("click", () => {
  document.querySelector(".container").innerHTML = "";
  showLove();
});

function showLove() {
  const messages = [
    "You just made my heart the happiest it has ever been ❤️",
    "This is the start of something really beautiful ❤️",
    "I knew you couldn’t say No to me 😌💕",
    "If only you could see how big I’m smiling right now 💗",
    "Every love story starts with a small ‘Yes’ ❤️",
    "You just turned a simple moment into a beautiful memory 💖",
    "My day is officially perfect now because of you 🥰",
    "You have no idea how special this moment is to me ❤️",
    "See? Your heart knew what to do 😄💕",
    "I promise this ‘Yes’ will be worth it ❤️",
    "You just unlocked unlimited hugs and smiles 💞",
    "And just like that… you made everything brighter ✨",
    "I’m going to remember this moment for a very long time 💗",
    "This little ‘Yes’ means more to me than you think ❤️",
    "Smart choice, Valentine 😌💘",
  ];

  const msg = messages[Math.floor(Math.random() * messages.length)];

  const h1 = document.createElement("h1");
  h1.textContent = msg;
  h1.style.color = "white";
  document.body.appendChild(h1);

  startHearts();
}

function startHearts() {
  setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 3 + "s";
    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
  }, 120);
}
