// 👻 Add your image file names here (inside the images folder)
const assets = [
  'Images/ghost.png',
  'Images/pumpkin.png',
  'Images/bats.png',
];

// Random number helper
function rand(min, max) {
  return Math.random() * (max - min) + min;
}

const background = document.getElementById('background');

function spawn() {
  const url = assets[Math.floor(Math.random() * assets.length)];
  const el = document.createElement('img');
  el.src = url;
  el.className = 'fall';

  const size = rand(30, 60);
  el.style.width = size + 'px';
  el.style.left = rand(0, window.innerWidth - size) + 'px';
  el.style.top = -size + 'px';

  background.appendChild(el);

  // Falling speed
  const speed = rand(100, 200 ) / 1000; // pixels per ms
  // Random rotation speed in degrees per second
  const rotationSpeed = rand(-1, 1);

  let y = -size;
  let rotation = 0;
  let last = null;

  function step(ts) {
    if (!last) last = ts;
    const dt = ts - last;
    last = ts;

    y += dt * speed;                // falling
    rotation += dt * rotationSpeed * 0.06; // rotation (adjust factor)

    el.style.transform = `translateY(${y}px) rotate(${rotation}deg)`;

    // Fade out near bottom
    if (y > window.innerHeight - 100) el.style.opacity = '0';

    if (y < window.innerHeight + size) {
      requestAnimationFrame(step);
    } else {
      el.remove();
    }
  }

  requestAnimationFrame(step);
}

// Spawn a new image every 600ms
setInterval(spawn, 600);

const music = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");

// Try to autoplay (muted)
music.play().catch(() => {
  console.log("Autoplay blocked — waiting for user interaction.");
});

muteBtn.addEventListener("click", () => {
  if (music.muted) {
    music.muted = false;
    muteBtn.textContent = "🔊";
  } else {
    music.muted = true;
    muteBtn.textContent = "🔇";
  }

});
