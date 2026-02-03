// ⬆️ اجعل الصفحة تبدأ من فوق عند التحميل
window.addEventListener("load", () => {
  window.scrollTo(0, 0); // تبدأ الصفحة من فوق
});

/* ======= Menu Toggle ======= */
const menu = document.querySelector('.nav-links');
const overlay = document.querySelector('.menu-overlay');
const hamburger = document.querySelector('.hamburger');
const lines = document.querySelector('.lines-container');

/* عند الضغط على زر المنيو */
hamburger.addEventListener('click', () => {
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
  lines.classList.toggle('rotated'); // ☰ ⇄ X
});

/* قفل المينيو */
function closeMenu() {
  menu.classList.remove('active');
  overlay.classList.remove('active');
  lines.classList.remove('rotated'); // ✅ يرجع للوضع الطبيعي
}

/* عند الضغط على أي لينك */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

/* ESC */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
});

/* الضغط على الخلفية */
overlay.addEventListener('click', closeMenu);

/* ======= Type Effect ======= */
const textElement = document.getElementById("animated-text");
const texts = ["Front-End Developer.", "Back-End Developer."];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentText = texts[currentTextIndex];

  if (!isDeleting) {
    textElement.textContent = currentText.slice(0, currentCharIndex + 1);
    currentCharIndex++;

    if (currentCharIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000);
      return;
    }
  } else {
    textElement.textContent = currentText.slice(0, currentCharIndex - 1);
    currentCharIndex--;

    if (currentCharIndex === 0) {
      isDeleting = false;
      currentTextIndex = (currentTextIndex + 1) % texts.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 100 : 150);
};

typeEffect();

/* ======= Spiderweb Canvas ======= */
const canvas = document.getElementById("spiderweb");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let points = [];

function createRandomPoints(count) {
  for (let i = 0; i < count; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    });
  }
}

function drawWeb() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = getDistance(points[i], points[j]);

      if (distance < 150) {
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

function updatePoints() {
  for (let point of points) {
    point.x += point.vx;
    point.y += point.vy;

    if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
    if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
  }
}

canvas.addEventListener("click", (e) => {
  points.push({
    x: e.clientX,
    y: e.clientY,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
  });
});

function getDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

function animate() {
  drawWeb();
  updatePoints();
  requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawWeb();
});

createRandomPoints(30);
animate();

/* ======= Alert Function ======= */
function showAlert(message, type = "success") {
  const alertBox = document.getElementById("form-alert");
  alertBox.textContent = message;
  alertBox.className = `form-alert show ${type}`;

  setTimeout(() => {
    alertBox.classList.remove("show");
  }, 3000);
}

/* ======= EmailJS Send Mail ======= */
function sendMail(e) {
  e.preventDefault();

  const subjectInput = document.getElementById("subject").value;

  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: subjectInput || "No Subject",
    message: document.getElementById("message").value,
  };

  emailjs
    .send("service_bivff26", "template_4qdgy3p", params)
    .then(
      () => {
        showAlert("Message sent successfully ✅", "success");
        document.getElementById("contact-form").reset();
      },
      (error) => {
        console.log(error);
        showAlert("Something went wrong ❌", "error");
      }
    );
}




