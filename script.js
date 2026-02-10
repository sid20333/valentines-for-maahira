// ── Floating hearts background ──
const heartsBg = document.getElementById('heartsBg');
const heartChars = ['♥', '♡', '❤', '💕', '💗'];

function spawnHeart() {
  const heart = document.createElement('span');
  heart.className = 'floating-heart';
  heart.textContent = heartChars[Math.floor(Math.random() * heartChars.length)];
  heart.style.left = Math.random() * 100 + '%';
  heart.style.fontSize = (14 + Math.random() * 20) + 'px';
  heart.style.animationDuration = (6 + Math.random() * 8) + 's';
  heartsBg.appendChild(heart);
  setTimeout(() => heart.remove(), 14000);
}

setInterval(spawnHeart, 600);

// ── Section navigation ──
function goTo(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (id === 'celebration') {
    launchConfetti();
  }
}

// ── Envelope click ──
const envelope = document.getElementById('envelope');
envelope.addEventListener('click', () => {
  envelope.classList.add('open');
  setTimeout(() => goTo('intro'), 1200);
});

// ── Photo Slideshow ──
// To add your own photos:
// 1. Put image files (jpg/png) in the photos/ folder
// 2. Update the PHOTOS array below with filenames and captions
const PHOTOS = [
  { src: 'photos/IMG_1400.JPG', caption: '♥' },
  { src: 'photos/IMG_1481.JPG', caption: '♥' },
  { src: 'photos/IMG_1564.JPG', caption: '♥' },
  { src: 'photos/IMG_2610.JPG', caption: '♥' },
  { src: 'photos/IMG_2998.JPG', caption: '♥' },
  { src: 'photos/IMG_3025.JPG', caption: '♥' },
  { src: 'photos/IMG_7834.JPG', caption: '♥' },
  { src: 'photos/IMG_9709.JPG', caption: '♥' },
];

let currentSlide = 0;
const slideContainer = document.getElementById('slideContainer');
const slideDots = document.getElementById('slideDots');

function initSlideshow() {
  if (PHOTOS.length === 0) return; // keep placeholder

  // Clear placeholder
  slideContainer.innerHTML = '';
  slideDots.innerHTML = '';

  PHOTOS.forEach((photo, i) => {
    // Create slide
    const slide = document.createElement('div');
    slide.className = 'slide' + (i === 0 ? ' active' : '');
    slide.innerHTML = `
      <img src="${photo.src}" alt="Us">
      <p class="caption">${photo.caption}</p>
    `;
    slideContainer.appendChild(slide);

    // Create dot
    const dot = document.createElement('span');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.onclick = () => jumpToSlide(i);
    slideDots.appendChild(dot);
  });
}

function changeSlide(dir) {
  const slides = slideContainer.querySelectorAll('.slide');
  if (slides.length <= 1) return;

  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + dir + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  updateDots();
}

function jumpToSlide(i) {
  const slides = slideContainer.querySelectorAll('.slide');
  slides[currentSlide].classList.remove('active');
  currentSlide = i;
  slides[currentSlide].classList.add('active');
  updateDots();
}

function updateDots() {
  const dots = slideDots.querySelectorAll('.dot');
  dots.forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}

initSlideshow();

// ── Runaway "No" button ──
const btnNo = document.getElementById('btnNo');
const noHint = document.getElementById('noHint');
const noMessages = [
  "Haha, nice try!",
  "Nope, not an option 😄",
  "You sure about that? 🤔",
  "The button says no 🙅",
  "Try again... or just say yes!",
  "I don't think so! 💕",
  "That button is broken 😜",
  "Wrong answer!",
  "Are you sure sure?",
  "Last chance... just kidding, say yes!"
];
let noCount = 0;

function runAway() {
  const question = document.getElementById('question');
  const rect = question.getBoundingClientRect();
  const btnRect = btnNo.getBoundingClientRect();

  // Random position within the section, avoiding edges
  const maxX = rect.width - btnRect.width - 40;
  const maxY = rect.height - btnRect.height - 40;
  const newX = 20 + Math.random() * maxX;
  const newY = 20 + Math.random() * maxY;

  btnNo.style.left = newX + 'px';
  btnNo.style.top = newY + 'px';
  btnNo.style.fontSize = Math.max(0.6, 1.1 - noCount * 0.05) + 'rem';
  btnNo.style.padding = `${Math.max(6, 14 - noCount)}px ${Math.max(16, 36 - noCount * 2)}px`;

  noHint.textContent = noMessages[noCount % noMessages.length];
  noCount++;
}

// ── Yes! Celebration ──
function sayYes() {
  goTo('celebration');
}

// ── Confetti ──
const confettiColors = ['#ff6b8a', '#ffc2d1', '#e63e6d', '#ff9ebc', '#ffd700', '#ff69b4', '#ff1493', '#ff85a2'];

function launchConfetti() {
  const fireworks = document.getElementById('fireworks');
  fireworks.innerHTML = '';

  for (let i = 0; i < 120; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.top = -10 + 'px';
    piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
    piece.style.width = (6 + Math.random() * 10) + 'px';
    piece.style.height = (6 + Math.random() * 10) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    piece.style.animationDuration = (2 + Math.random() * 3) + 's';
    piece.style.animationDelay = Math.random() * 2 + 's';
    fireworks.appendChild(piece);
  }

  // Keep spawning confetti
  setInterval(() => {
    for (let i = 0; i < 20; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti';
      piece.style.left = Math.random() * 100 + '%';
      piece.style.top = -10 + 'px';
      piece.style.background = confettiColors[Math.floor(Math.random() * confettiColors.length)];
      piece.style.width = (6 + Math.random() * 10) + 'px';
      piece.style.height = (6 + Math.random() * 10) + 'px';
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDuration = (2 + Math.random() * 3) + 's';
      piece.style.animationDelay = Math.random() * 0.5 + 's';
      fireworks.appendChild(piece);
    }
  }, 3000);
}
