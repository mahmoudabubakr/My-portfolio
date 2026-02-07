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


/* الضغط على الخلفية */
overlay.addEventListener('click', closeMenu);

///////////////////
const textElement = document.getElementById("animated-text");
const texts = ["Front-End Developer.", "Back-End Developer."];
let currentTextIndex = 0;
let currentCharIndex = 0;
let isDeleting = false;

const typeEffect = () => {
  const currentText = texts[currentTextIndex];

  if (!isDeleting) {
    // كتابة النص حرفًا حرفًا
    textElement.textContent = currentText.slice(0, currentCharIndex + 1);
    currentCharIndex++;

    // عند الانتهاء من كتابة النص بالكامل
    if (currentCharIndex === currentText.length) {
      isDeleting = true; // بدء الحذف
      setTimeout(typeEffect, 1000); // انتظار قبل بدء الحذف
      return;
    }
  } else {
    // حذف النص حرفًا حرفًا
    textElement.textContent = currentText.slice(0, currentCharIndex - 1);
    currentCharIndex--;

    // عند الانتهاء من حذف النص بالكامل
    if (currentCharIndex === 0) {
      isDeleting = false; // بدء كتابة النص التالي
      currentTextIndex = (currentTextIndex + 1) % texts.length; // الانتقال إلى النص التالي
    }
  }

  // تحديد سرعة الكتابة والحذف
  setTimeout(typeEffect, isDeleting ? 100 : 150);
};

// بدء تأثير الكتابة
typeEffect();

////////////////////////
function initCanvas() {
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

  function getDistance(p1, p2) {
    const dx = p1.x - p2.x;
    const dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
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
          ctx.strokeStyle = `rgba(255,255,255,${1 - distance / 150})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  }

  function updatePoints() {
    for (let p of points) {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    }
  }

  function animate() {
    drawWeb();
    updatePoints();
    requestAnimationFrame(animate);
  }

  canvas.addEventListener("click", (e) => {
    points.push({
      x: e.clientX,
      y: e.clientY,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    });
  });

  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  createRandomPoints(30);
  animate();
}

/* تشغيل الـ canvas بعد تحميل الصفحة */
window.addEventListener("load", () => {
  if (window.innerWidth > 768) {
    initCanvas();
  }
});


//
function sendMail(e) {
  e.preventDefault(); // منع إعادة تحميل الصفحة

  const sendBtn = document.getElementById("send-btn");
  const btnText = sendBtn.querySelector(".btn-text");

  // القيم
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // العناصر الخاصة بالأخطاء
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");

  // إعادة تعيين الرسائل
  nameError.style.display = "none";
  emailError.style.display = "none";
  messageError.style.display = "none";

  let hasError = false;

  if (!name) {
    nameError.textContent = "Please enter your name ✋";
    nameError.style.display = "block";
    hasError = true;
  }

  if (!email) {
    emailError.textContent = "Please enter your email ✋";
    emailError.style.display = "block";
    hasError = true;
  }

  if (!message) {
    messageError.textContent = "Please enter your message ✋";
    messageError.style.display = "block";
    hasError = true;
  }

  if (hasError) return; // لو فيه خطأ ما نكملش

  // تعطيل الزر أثناء الإرسال
  sendBtn.disabled = true;
  btnText.textContent = "Sending...";

  const params = { name, email, message };

  // إرسال الإيميل عبر EmailJS
  emailjs.send("service_bivff26", "template_4qdgy3p", params)
    .then(() => {
      // رسالة نجاح عامة
      alert("Thank you for your enquiry, I will get back to you shortly");
      document.getElementById("contact-form").reset();
    })
    .catch((error) => {
      console.log(error);
      alert("Something went wrong, Please try again.");
    })
    .finally(() => {
      sendBtn.disabled = false;
      btnText.textContent = "Send";
    });
}
