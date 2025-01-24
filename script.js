function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  navLinks.classList.toggle('active');
}


function rotateLines() {
  const container = document.querySelector('.lines-container');
  container.classList.toggle('rotated'); // تبديل الكلاس بين الوضع العادي والمقلوب
}

//////////////////
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

