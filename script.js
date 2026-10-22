
 
const pages = document.querySelectorAll(".page");
const counter = document.getElementById("counter");
const hearts = document.getElementById("hearts");

let currentPage = 0;
let noClicks = 0;

function showPage(index) {
  if (index < 0 || index >= pages.length) return;

  pages[currentPage].classList.remove("active");
  currentPage = index;
  pages[currentPage].classList.add("active");

  counter.textContent = `${currentPage + 1} / ${pages.length}`;

  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => {
    showPage(currentPage + 1);
  });
});

document.querySelectorAll(".back").forEach(button => {
  button.addEventListener("click", () => {
    showPage(currentPage - 1);
  });
});

// Floating hearts
function createHeart() {
  const heart = document.createElement("span");
  heart.className = "floating-heart";
  heart.textContent = Math.random() > 0.5 ? "♥" : "♡";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (12 + Math.random() * 18) + "px";
  heart.style.animationDuration = (4 + Math.random() * 5) + "s";

  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 9000);
}

setInterval(createHeart, 450);

// YES button
document.getElementById("yesBtn").addEventListener("click", () => {
  document.getElementById("response").textContent =
    "Thank you for giving me a chance ❤️";

  showPage(pages.length - 1);

  for (let i = 0; i < 25; i++) {
    setTimeout(createHeart, i * 100);
  }
});

// NO button stays a valid choice
document.getElementById("noBtn").addEventListener("click", () => {
  noClicks++;

  const response = document.getElementById("response");

  if (noClicks <= 3) {
    response.textContent = "Take your time. No pressure ♡";
  } else {
    response.textContent =
      "Thank you for being honest. Your choice matters ♡";

    const noButton = document.getElementById("noBtn");
    noButton.textContent = "Continue";

    noButton.onclick = () => {
      showPage(pages.length - 1);
    };
  }
});

// Restart website
document.getElementById("restartBtn").addEventListener("click", () => {
  noClicks = 0;
  document.getElementById("response").textContent = "";
  document.getElementById("noBtn").textContent = "No";
  showPage(0);
});
