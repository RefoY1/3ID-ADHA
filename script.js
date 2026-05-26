// ========================================
// 🌙 Eid Greeting Card - JavaScript
// ========================================

// ===== DOM Elements =====
const welcomeScreen = document.getElementById('welcomeScreen');
const loadingScreen = document.getElementById('loadingScreen');
const mainContainer = document.getElementById('mainContainer');
const envelopeWrapper = document.getElementById('envelopeWrapper');
const cardContainer = document.getElementById('cardContainer');
const modalOverlay = document.getElementById('modalOverlay');
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
const musicIcon = document.getElementById('musicIcon');

let isMusicPlaying = false;

// ===== Initialize =====
document.addEventListener('DOMContentLoaded', () => {
  createWelcomeStars();
});

// ===== Create Welcome Screen Stars =====
function createWelcomeStars() {
  const container = document.getElementById('welcomeStars');
  for (let i = 0; i < 60; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --duration: ${Math.random() * 3 + 2}s;
      --delay: ${Math.random() * 5}s;
    `;
    container.appendChild(star);
  }
}

// ===== START EXPERIENCE (User clicks the button) =====
function startExperience() {
  // 1. Play music IMMEDIATELY on user click (this is allowed by browsers)
  bgMusic.volume = 0.5;
  bgMusic.play().then(() => {
    isMusicPlaying = true;
    musicBtn.style.display = 'flex';
    musicBtn.classList.add('playing');
    musicIcon.textContent = '🔊';
  }).catch(() => {
    // If still blocked, show button as muted
    musicBtn.style.display = 'flex';
    musicIcon.textContent = '🔇';
  });

  // 2. Hide welcome screen
  welcomeScreen.classList.add('hide');

  // 3. Show loading screen
  setTimeout(() => {
    welcomeScreen.style.display = 'none';
    loadingScreen.style.display = 'flex';

    // 4. Setup background elements
    createStars();
    createLanterns();
    setupSparkles();

    // 5. After loading, show main content
    setTimeout(() => {
      loadingScreen.classList.add('hide');
      setTimeout(() => {
        loadingScreen.style.display = 'none';
        mainContainer.style.display = 'flex';
      }, 800);
    }, 2000);
  }, 600);
}

// ===== Toggle Music =====
function toggleMusic() {
  if (isMusicPlaying) {
    bgMusic.pause();
    isMusicPlaying = false;
    musicBtn.classList.remove('playing');
    musicIcon.textContent = '🔇';
  } else {
    bgMusic.play().then(() => {
      isMusicPlaying = true;
      musicBtn.classList.add('playing');
      musicIcon.textContent = '🔊';
    }).catch(() => {});
  }
}

// ===== Create Stars Background =====
function createStars() {
  const container = document.getElementById('starsContainer');
  const count = window.innerWidth < 768 ? 80 : 150;

  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 3 + 1;
    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      --duration: ${Math.random() * 3 + 2}s;
      --delay: ${Math.random() * 5}s;
    `;
    container.appendChild(star);
  }
}

// ===== Create Floating Lanterns =====
function createLanterns() {
  const lanterns = ['🏮', '🪔', '✨', '⭐', '🌟'];
  const container = document.body;

  for (let i = 0; i < 8; i++) {
    const lantern = document.createElement('div');
    lantern.className = 'lantern';
    lantern.textContent = lanterns[Math.floor(Math.random() * lanterns.length)];
    lantern.style.cssText = `
      top: ${Math.random() * 80 + 10}%;
      ${Math.random() > 0.5 ? 'left' : 'right'}: ${Math.random() * 15 + 2}%;
      --duration: ${Math.random() * 4 + 4}s;
      --delay: ${Math.random() * 3}s;
      --size: ${Math.random() * 1.5 + 1}rem;
    `;
    container.appendChild(lantern);
  }
}

// ===== Sparkle Cursor Effect =====
function setupSparkles() {
  let lastSparkle = 0;
  document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastSparkle < 100) return;
    lastSparkle = now;

    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = ['✨', '⭐', '💫', '✦'][Math.floor(Math.random() * 4)];
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 800);
  });
}

// ===== Open Envelope =====
function openEnvelope() {
  if (envelopeWrapper.classList.contains('opened')) return;

  envelopeWrapper.classList.add('opened');

  // Play confetti
  launchConfetti();

  setTimeout(() => {
    envelopeWrapper.style.display = 'none';
    document.querySelector('.click-hint').style.display = 'none';

    cardContainer.style.display = 'block';
    // Trigger reflow
    cardContainer.offsetHeight;
    cardContainer.classList.add('show');

    // Animate card elements
    animateCardElements();

    // More confetti!
    setTimeout(() => launchConfetti(), 500);
    setTimeout(() => launchFirework(), 300);
    setTimeout(() => launchFirework(), 800);
  }, 800);
}

// ===== Animate Card Elements =====
function animateCardElements() {
  const elements = document.querySelectorAll('.eid-card > *');
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `all 0.6s ease ${i * 0.1 + 0.3}s`;

    setTimeout(() => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }, 50);
  });
}

// ===== Confetti =====
function launchConfetti() {
  const colors = ['#d4a843', '#f0d68a', '#e74c3c', '#2ecc71', '#3498db', '#9b59b6', '#f39c12', '#1abc9c'];
  const shapes = ['■', '●', '▲', '★', '♦', '❤'];

  for (let i = 0; i < 60; i++) {
    setTimeout(() => {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      piece.textContent = shapes[Math.floor(Math.random() * shapes.length)];
      piece.style.cssText = `
        left: ${Math.random() * 100}%;
        top: -20px;
        color: ${colors[Math.floor(Math.random() * colors.length)]};
        font-size: ${Math.random() * 15 + 8}px;
        --start-y: -20px;
        --drift: ${Math.random() * 200 - 100}px;
        --rotation: ${Math.random() * 720 - 360}deg;
        --fall-duration: ${Math.random() * 2 + 2}s;
      `;
      document.body.appendChild(piece);

      setTimeout(() => piece.remove(), 4000);
    }, Math.random() * 500);
  }
}

// ===== Firework =====
function launchFirework() {
  const colors = ['#d4a843', '#f0d68a', '#e74c3c', '#3498db', '#2ecc71', '#ff6b9d'];
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * (window.innerHeight * 0.5) + 50;

  const container = document.createElement('div');
  container.className = 'firework';
  container.style.left = x + 'px';
  container.style.top = y + 'px';

  const color = colors[Math.floor(Math.random() * colors.length)];
  const particles = 20;

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement('div');
    particle.className = 'firework-particle';
    const angle = (i / particles) * Math.PI * 2;
    const distance = Math.random() * 80 + 40;
    particle.style.cssText = `
      background: ${color};
      box-shadow: 0 0 6px ${color};
      --tx: ${Math.cos(angle) * distance}px;
      --ty: ${Math.sin(angle) * distance}px;
    `;
    container.appendChild(particle);
  }

  document.body.appendChild(container);
  setTimeout(() => container.remove(), 1500);
}

// ===== Surprise Boxes =====
function openBox(element, index) {
  if (element.classList.contains('opened')) return;

  element.classList.add('opened');

  // Create mini confetti
  for (let i = 0; i < 8; i++) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['💛', '✨', '⭐', '💫'][Math.floor(Math.random() * 4)];
    heart.style.cssText = `
      left: ${element.getBoundingClientRect().left + element.offsetWidth / 2}px;
      top: ${element.getBoundingClientRect().top}px;
      font-size: ${Math.random() * 15 + 10}px;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}

// ===== Show Special Modal =====
function showSpecialMessage() {
  modalOverlay.classList.add('show');
  launchConfetti();
  setTimeout(() => launchFirework(), 200);
  setTimeout(() => launchFirework(), 600);
  setTimeout(() => launchConfetti(), 400);
}

function closeModal() {
  modalOverlay.classList.remove('show');
}

// ===== Share =====
function shareCard() {
  const text = `🌙✨ كل عام وانت بخير\nعيد سعيد عليك وعلى كل أحبابك\n🎉❤️`;

  if (navigator.share) {
    navigator.share({
      title: 'معايدة العيد 🌙',
      text: text,
      url: window.location.href
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(text + '\n' + window.location.href).then(() => {
      const btn = document.querySelector('.btn-outline');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✅ تم النسخ!';
      setTimeout(() => btn.innerHTML = originalText, 2000);
    });
  }
}

// ===== Close modal on overlay click =====
modalOverlay?.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

// ===== Keyboard support =====
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});
