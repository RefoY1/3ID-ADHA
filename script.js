// =======================================
//  🌙 Eid Card — Luxurious Edition JS
// =======================================

const $ = id => document.getElementById(id);

const welcomeScreen = $('welcomeScreen');
const loadingScreen = $('loadingScreen');
const mainContainer = $('mainContainer');
const envelopeWrapper = $('envelopeWrapper');
const cardContainer = $('cardContainer');
const modalOverlay = $('modalOverlay');
const bgMusic = $('bgMusic');
const musicBtn = $('musicBtn');
const musicIcon = $('musicIcon');
const particlesLayer = $('particlesLayer');

let musicPlaying = false;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
});

// ===== PARTICLES (Gold Dust) =====
function createParticles() {
  const symbols = ['✦', '✧', '·', '◆'];
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('span');
    p.className = 'floating-particle';
    p.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    p.style.cssText = `
      left: ${Math.random() * 95}%;
      top: ${50 + Math.random() * 50}%;
      font-size: ${Math.random() * 6 + 4}px;
      color: hsl(${38 + Math.random() * 8}, ${40 + Math.random() * 20}%, ${60 + Math.random() * 25}%);
      --pd: ${Math.random() * 14 + 10}s;
      --px: ${Math.random() * 80 - 40}px;
      --pr: ${Math.random() * 360}deg;
      animation-delay: ${Math.random() * 10}s;
    `;
    particlesLayer.appendChild(p);
  }
}

// ===== START — User clicked "Open" =====
function startExperience() {
  // Play music on first click (browser requirement)
  bgMusic.volume = 0.45;
  bgMusic.play().then(() => {
    musicPlaying = true;
    musicBtn.style.display = 'flex';
    musicBtn.classList.add('playing');
    musicIcon.textContent = '🔊';
  }).catch(() => {
    musicBtn.style.display = 'flex';
    musicIcon.textContent = '🔇';
  });

  // Hide welcome
  welcomeScreen.classList.add('hide');

  setTimeout(() => {
    welcomeScreen.style.display = 'none';
    loadingScreen.style.display = 'flex';

    setTimeout(() => {
      loadingScreen.classList.add('hide');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContainer.style.display = 'flex';
      }, 700);
    }, 2200);
  }, 700);
}

// ===== TOGGLE MUSIC =====
function toggleMusic() {
  if (musicPlaying) {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '🔇';
  } else {
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicBtn.classList.add('playing');
      musicIcon.textContent = '🔊';
    }).catch(() => {});
  }
}

// ===== OPEN ENVELOPE =====
function openEnvelope() {
  if (envelopeWrapper.classList.contains('opened')) return;
  envelopeWrapper.classList.add('opened');

  elegantConfetti(40);

  setTimeout(() => {
    envelopeWrapper.style.display = 'none';
    document.querySelector('.click-hint').style.display = 'none';
    cardContainer.style.display = 'block';
    cardContainer.offsetHeight;
    cardContainer.classList.add('show');

    setTimeout(() => elegantConfetti(25), 400);
    setTimeout(() => launchFirework(), 200);
    setTimeout(() => launchFirework(), 700);
  }, 800);
}

// ===== ELEGANT CONFETTI =====
function elegantConfetti(count = 40) {
  const colors = ['#c9a24c', '#e2cc8c', '#f5e6b8', '#b8913a', '#d4af5e', '#a07d2f'];
  const shapes = ['✦', '✧', '◆', '·'];

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('span');
      el.className = 'confetti-piece';
      el.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      el.style.cssText = `
        left: ${Math.random() * 100}%;
        top: -20px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        font-size: ${Math.random() * 10 + 5}px;
        --fd: ${Math.random() * 3 + 2.5}s;
        --dx: ${Math.random() * 120 - 60}px;
        --dr: ${Math.random() * 480 - 240}deg;
      `;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 4000);
    }, Math.random() * 600);
  }
}

// ===== FIREWORK =====
function launchFirework() {
  const colors = ['#c9a24c', '#e2cc8c', '#d4af5e', '#f5e6b8', '#e8d5a3'];
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight * 0.4 + 60;
  const container = document.createElement('div');
  container.className = 'firework';
  container.style.left = x + 'px';
  container.style.top = y + 'px';

  const color = colors[Math.floor(Math.random() * colors.length)];
  const count = 16;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'firework-particle';
    const angle = (i / count) * Math.PI * 2;
    const dist = Math.random() * 70 + 35;
    p.style.cssText = `
      background: ${color};
      box-shadow: 0 0 5px ${color};
      --tx: ${Math.cos(angle) * dist}px;
      --ty: ${Math.sin(angle) * dist}px;
    `;
    container.appendChild(p);
  }

  document.body.appendChild(container);
  setTimeout(() => container.remove(), 1600);
}

// ===== SURPRISE BOXES =====
function openBox(element) {
  if (element.classList.contains('opened')) return;
  element.classList.add('opened');

  // mini hearts around the box
  for (let i = 0; i < 6; i++) {
    const h = document.createElement('span');
    h.className = 'floating-heart';
    h.textContent = ['✦', '✧', '💛', '✨'][Math.floor(Math.random() * 4)];
    const rect = element.getBoundingClientRect();
    h.style.cssText = `
      left: ${rect.left + rect.width / 2 + (Math.random() * 40 - 20)}px;
      top: ${rect.top + rect.height / 2}px;
      font-size: ${Math.random() * 12 + 8}px;
    `;
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 3000);
  }
}

// ===== MODAL =====
function showSpecialMessage() {
  modalOverlay.classList.add('show');
  elegantConfetti(30);
  setTimeout(() => launchFirework(), 150);
  setTimeout(() => launchFirework(), 550);
}

function closeModal() {
  modalOverlay.classList.remove('show');
}

modalOverlay.addEventListener('click', e => {
  if (e.target === modalOverlay) closeModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ===== SHARE =====
function shareCard() {
  const text = '🌙✨ كل عام وأنتِ بخير يا رحوومه\nعيد سعيد عليكِ وعلى كل أحبابك\n🎉❤️';
  if (navigator.share) {
    navigator.share({ title: 'معايدة العيد 🌙', text, url: window.location.href }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text + '\n' + window.location.href).then(() => {
      const btn = document.querySelector('.btn-ghost span:last-child');
      const original = btn.textContent;
      btn.textContent = '✓ تم النسخ';
      setTimeout(() => btn.textContent = original, 2000);
    });
  }
}

// ===== GENTLE SPARKLE TRAIL =====
let lastSparkle = 0;
document.addEventListener('mousemove', e => {
  const now = Date.now();
  if (now - lastSparkle < 160) return;
  lastSparkle = now;

  const s = document.createElement('span');
  s.className = 'sparkle';
  const syms = ['✦', '✧', '·'];
  s.textContent = syms[Math.floor(Math.random() * syms.length)];
  s.style.cssText = `
    left: ${e.clientX}px;
    top: ${e.clientY}px;
    color: hsl(${38 + Math.random() * 6}, ${50 + Math.random() * 30}%, ${65 + Math.random() * 20}%);
  `;
  document.body.appendChild(s);
  setTimeout(() => s.remove(), 1000);
});
