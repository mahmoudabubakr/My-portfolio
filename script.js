window.addEventListener("load", () => {
  window.scrollTo(0, 0); // scroll مباشر لفوق
});


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
const canvas = document.getElementById("spiderweb");
const ctx = canvas.getContext("2d");

// ضبط حجم الكانفاس
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// مصفوفة لتخزين النقاط
let points = [];

// إنشاء نقاط عشوائية تتحرك
function createRandomPoints(count) {
  for (let i = 0; i < count; i++) {
    points.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2, // سرعة أفقية
      vy: (Math.random() - 0.5) * 2, // سرعة عمودية
    });
  }
}

// رسم الشبكة
function drawWeb() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // تنظيف الكانفاس

  // رسم الخطوط بين النقاط
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      const distance = getDistance(points[i], points[j]);

      if (distance < 150) { // شرط إذا كانت المسافة أقل من 150
        ctx.beginPath();
        ctx.moveTo(points[i].x, points[i].y);
        ctx.lineTo(points[j].x, points[j].y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${1 - distance / 150})`; // شفافية الخطوط
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
}

// تحديث موقع النقاط المتحركة
function updatePoints() {
  for (let point of points) {
    point.x += point.vx;
    point.y += point.vy;

    // عكس الاتجاه إذا خرجت النقطة خارج الحدود
    if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
    if (point.y < 0 || point.y > canvas.height) point.vy *= -1;
  }
}

// حدث لإضافة نقطة عند النقر على الشاشة
canvas.addEventListener("click", (e) => {
  points.push({
    x: e.clientX,
    y: e.clientY,
    vx: (Math.random() - 0.5) * 2, // سرعة أفقية
    vy: (Math.random() - 0.5) * 2, // سرعة عمودية
  });
});

// حساب المسافة بين نقطتين
function getDistance(point1, point2) {
  const dx = point1.x - point2.x;
  const dy = point1.y - point2.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// حلقة الرسوم المتحركة
function animate() {
  drawWeb();
  updatePoints();
  requestAnimationFrame(animate);
}

// ضبط حجم الكانفاس عند تغيير حجم النافذة
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  drawWeb();
});

// بدء الشبكة العائمة
createRandomPoints(30); // إنشاء 20 نقطة عشوائية
animate();


//
function sendMail(e) {
  e.preventDefault();

  const sendBtn = document.querySelector("#contact-form button");
  sendBtn.disabled = true;
  sendBtn.textContent = "Sending... ⏳";

  const subjectInput = document.getElementById("subject").value;

  let params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: subjectInput || "No Subject",
    message: document.getElementById("message").value,
  };

  // استخدام catch للتأكد من التعامل مع أي خطأ
  emailjs
    .send("service_bivff26", "template_4qdgy3p", params)
    .then(
      () => {
        showAlert("Message sent successfully 🚀", "success");
        document.getElementById("contact-form").reset();
      }
    )
    .catch((error) => {
      console.log(error);
      showAlert("Something went wrong ❌", "error");
    })
    .finally(() => {
      // في كل الحالات (نجاح أو فشل) نرجع الزرار طبيعي
      sendBtn.disabled = false;
      sendBtn.textContent = "Send Message";
    });
}




