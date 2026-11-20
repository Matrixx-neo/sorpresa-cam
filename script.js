const ASSETS = {
  peek: 'assets/peek.png',
  jump: 'assets/jump.png',
  globo1: 'assets/globo1.png', globo2: 'assets/globo2.png', globo3: 'assets/globo3.png', globo4: 'assets/globo4.png',
  saludo: 'assets/pinkie-saludo.jpg',
  canonBtn: 'assets/pinkie-canon.jpg',
  pastelVela: 'assets/pinkie-pastel-cumple.jpg',
  princesa: 'assets/pinkie-princesa-pastel.jpg',
  hbSticker: 'assets/happy-birthday.png'
};
const IOS_EMOJIS = { sparklingHeart: 'https://em-content.zobj.net/source/apple/391/sparkling-heart_1f496.png', sparkles: 'https://em-content.zobj.net/source/apple/391/sparkles_2728.png', glowingStar: 'https://em-content.zobj.net/source/apple/391/glowing-star_1f31f.png', ribbon: 'https://em-content.zobj.net/source/apple/391/ribbon_1f380.png', lion: 'https://em-content.zobj.net/source/apple/391/lion_1f981.png', twoHearts: 'https://em-content.zobj.net/source/apple/391/two-hearts_1f495.png' };
const PHRASES = [
  { text: "Mi leona", img: ASSETS.globo1, color: "linear-gradient(135deg, rgba(255,75,162,0.8), rgba(255,150,205,0.6))", balloonIcon: IOS_EMOJIS.sparklingHeart, phraseIcon: IOS_EMOJIS.lion },
  { text: "Eres increíble", img: ASSETS.globo2, color: "linear-gradient(135deg, rgba(0,210,255,0.8), rgba(135,238,255,0.6))", balloonIcon: IOS_EMOJIS.sparkles, phraseIcon: IOS_EMOJIS.sparkles },
  { text: "Mereces algo igual de increíble", img: ASSETS.globo3, color: "linear-gradient(135deg, rgba(255,220,45,0.85), rgba(255,243,148,0.65))", balloonIcon: IOS_EMOJIS.glowingStar, phraseIcon: IOS_EMOJIS.glowingStar },
  { text: "Espero te guste, tqmillones", img: ASSETS.globo4, color: "linear-gradient(135deg, rgba(199,112,255,0.8), rgba(232,182,255,0.6))", balloonIcon: IOS_EMOJIS.ribbon, phraseIcon: IOS_EMOJIS.twoHearts }
];
const LETTER_TEXT = "¡Sorpresa, Cam, mi Pinkie! Sabía que una fan número uno de Pinkie Pie merecía un regalo interactivo a su altura. Hoy celebro la vida de mi bestie favorita y quiero recordarte lo increíble que eres. Te quiero muchísimo y te admiro un montón por esa fuerza con la que siempre sigues adelante; eres una diva total, la mejor, mi alfa y mi leona. Prométeme que jamás te vas a rendir ante nada. ¡Pásala hermoso hoy y disfruta de una rica tortita!";

// Asignar nuevas imágenes
document.getElementById('noti-img').src = ASSETS.saludo;
document.getElementById('pinkie-peek').src = ASSETS.peek;
document.getElementById('btn-cannon-img').src = ASSETS.canonBtn;
document.getElementById('pinkie-jumper').src = ASSETS.jump;
document.getElementById('candle-img').src = ASSETS.pastelVela;
document.getElementById('final-pinkie').src = ASSETS.princesa;
document.getElementById('hb-sticker').src = ASSETS.hbSticker;

// Lógica de Audio y Notificación Falsa
let audioCtx; // Se inicializa solo después del click del usuario
function playAudioEffect(type) {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const osc = audioCtx.createOscillator(); const gain = audioCtx.createGain();
  osc.connect(gain); gain.connect(audioCtx.destination);
  
  if (type === 'noti') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(880, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(1100, audioCtx.currentTime + 0.1);
    gain.gain.setValueAtTime(0, audioCtx.currentTime); gain.gain.linearRampToValueAtTime(0.5, audioCtx.currentTime + 0.02); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.4);
    osc.start(audioCtx.currentTime); osc.stop(audioCtx.currentTime + 0.4);
  } else if (type === 'pop' || type === 'cannon') {
    osc.type = 'sine'; osc.frequency.setValueAtTime(350, audioCtx.currentTime); osc.frequency.exponentialRampToValueAtTime(900, audioCtx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.4, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
    osc.start(audioCtx.currentTime); osc.stop(audioCtx.currentTime + 0.12);
  } else if (type === 'fanfare') {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'triangle';
      o.frequency.value = freq;
      o.connect(g);
      g.connect(audioCtx.destination);
      g.gain.setValueAtTime(0.25, audioCtx.currentTime + idx * 0.09);
      g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + idx * 0.09 + 0.35);
      o.start(audioCtx.currentTime + idx * 0.09);
      o.stop(audioCtx.currentTime + idx * 0.09 + 0.35);
    });
  }
}

const bgMusic = document.getElementById('bg-music');
bgMusic.volume = 0.4;

document.getElementById('unlock-btn').addEventListener('click', () => {
  document.getElementById('unlock-screen').style.opacity = '0';
  setTimeout(() => document.getElementById('unlock-screen').remove(), 500);
  
  gsap.to('#pinkie-peek', { top: -5, duration: 1.25, ease: "elastic.out(1, 0.65)", yoyo: true, repeat: -1, repeatDelay: 2.2 });
  
  playAudioEffect('noti'); // Llama al sonido de forma segura
  setTimeout(() => { document.getElementById('ios-notification').classList.remove('hidden'); }, 400);
});

document.getElementById('ios-notification').addEventListener('click', (e) => {
  e.currentTarget.classList.add('hidden');
  document.getElementById('intro-screen').classList.add('active');
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
});

// Tilt 3D Holográfico
document.addEventListener('mousemove', (e) => {
  const cards = document.querySelectorAll('.tilt-card, #intro-card-tilt');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    if(rect.width === 0) return;
    const x = e.clientX - rect.left; const y = e.clientY - rect.top;
    const centerX = rect.width / 2; const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8; const rotateY = ((x - centerX) / centerX) * 8;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});

// Partículas de Polvo de Hadas (Fairy Dust)
const canvas = document.getElementById('fairy-dust-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth; canvas.height = window.innerHeight;
let particles = [];
// Polvo de Hadas con soporte Mouse y Touch
function spawnDust(x, y) {
  for(let i=0; i<2; i++) {
    particles.push({
      x: x, y: y,
      vx: (Math.random() - 0.5) * 2, vy: (Math.random() - 0.5) * 2 + 1,
      life: 1, color: Math.random() > 0.5 ? '#ff2a85' : '#00d2ff', size: Math.random() * 3 + 1
    });
  }
}
document.addEventListener('mousemove', (e) => spawnDust(e.clientX, e.clientY));
document.addEventListener('touchmove', (e) => {
  if(e.touches.length > 0) { spawnDust(e.touches[0].clientX, e.touches[0].clientY); }
}, {passive: true});
function renderDust() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.x += p.vx; p.y += p.vy; p.life -= 0.02;
    ctx.globalAlpha = p.life; ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2); ctx.fill();
    if(p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(renderDust);
}
renderDust();

// Iniciar Fiesta
document.getElementById('start-btn').addEventListener('click', () => {
  if (navigator.vibrate) navigator.vibrate([100]);
  try { bgMusic.play(); } catch(e) { console.log("Audio autoplay prevenido"); }
  
  document.getElementById('glass-pod').classList.remove('hidden');
  gsap.killTweensOf('#pinkie-peek'); gsap.to('#pinkie-peek', { top: -250, duration: 0.35 });
  document.body.classList.add('party-mode');
  document.getElementById('intro-screen').classList.remove('active');
  document.getElementById('party-stage').classList.add('active');
  playAudioEffect('pop');
  confetti({ particleCount: 130, spread: 90, origin: { y: 0.65 }, colors: ['#ff2a85', '#00d2ff', '#ffe600'] });
  startPinkieJumps(); spawnBalloons();
});

function startPinkieJumps() {
  const w = window.innerWidth; gsap.set('#pinkie-jumper', { x: -220, y: 0, scaleX: 1, scaleY: 1 });
  const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.0 });
  for (let i = 1; i <= 4; i++) {
    tl.to('#pinkie-jumper', { x: -200 + ((w+350)/4)*i, y: -170, scaleX: 0.92, scaleY: 1.08, duration: 0.38, ease: "power2.out" })
      .to('#pinkie-jumper', { y: 0, scaleX: 1.15, scaleY: 0.85, duration: 0.32, ease: "bounce.out" })
      .to('#pinkie-jumper', { scaleX: 1, scaleY: 1, duration: 0.1 });
  }
}

let poppedCount = 0;
function spawnBalloons() {
  const cont = document.getElementById('balloons-container');
  PHRASES.forEach((item, i) => {
    const b = document.createElement('div'); b.className = 'balloon'; b.style.background = item.color; b.style.left = `${15 + i*20}%`;
    b.innerHTML = `<img class="balloon-ios-icon" src="${item.balloonIcon}" />`;
    cont.appendChild(b);
    gsap.to(b, { y: -(window.innerHeight*0.65), x: "random(-35,35)", rotation: "random(-12,12)", duration: 3.5 + i*0.4, ease: "sine.inOut", yoyo: true, repeat: -1 });
    b.addEventListener('click', (e) => {
      if(b.dataset.popped) return; b.dataset.popped = "true";
      if (navigator.vibrate) navigator.vibrate([60]); // Vibración sutil
      playAudioEffect('pop');
      confetti({ particleCount: 45, spread: 60, origin: { x: e.clientX/window.innerWidth, y: e.clientY/window.innerHeight }});
      gsap.to(b, { scale: 1.6, opacity: 0, duration: 0.2, onComplete: () => b.remove() });
      document.getElementById('phrase-img').src = item.img; document.getElementById('phrase-text').textContent = item.text; document.getElementById('phrase-emoji').src = item.phraseIcon;
      const popup = document.getElementById('phrase-popup'); 
      popup.classList.add('visible'); // Usa la nueva clase
      gsap.fromTo(popup, { scale: 0.4, opacity: 0, rotation: -8 }, { scale: 1, opacity: 1, rotation: 0, duration: 0.55, ease: "back.out(1.7)" });
      poppedCount++; document.getElementById('balloon-count').textContent = poppedCount;
      if(poppedCount === PHRASES.length) setTimeout(initCandlePhase, 3200);
    });
  });
}

let micContext, analyser, micStream;
let candleBlown = false;
let blowFrames = 0;

function initCandlePhase() {
  candleBlown = false;
  blowFrames = 0;
  document.getElementById('phrase-popup').classList.remove('visible');
  gsap.to('#party-stage', {
    opacity: 0,
    duration: 0.6,
    onComplete: () => {
      document.getElementById('party-stage').classList.remove('active');
      document.getElementById('candle-screen').classList.add('active');
      gsap.fromTo('.candle-card',
        { y: 60, scale: 0.85, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.75)" }
      );

      const tapArea = document.getElementById('candle-tap-area');
      if (tapArea) tapArea.onclick = blowOutCandle;

      const micBtn = document.getElementById('enable-mic-btn');
      if (micBtn) {
        micBtn.classList.remove('hidden');
        micBtn.onclick = () => requestMicAccess(true);
      }

      // Intento automático inmediato de pedir permiso al entrar a la velita
      requestMicAccess(false);
    }
  });
}

async function requestMicAccess(fromUserClick = false) {
  if (candleBlown) return;
  const status = document.getElementById('mic-status');
  const micBtn = document.getElementById('enable-mic-btn');

  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    if (fromUserClick) {
      status.textContent = "Este enlace local no permite micrófono; toca la llamita para pedir tu deseo ✨";
      if (micBtn) micBtn.classList.add('hidden');
    } else {
      status.textContent = "Toca el botón o la llamita para pedir tu deseo ✨";
    }
    return;
  }

  status.textContent = "Solicitando permiso al micrófono... 🎙️";
  try {
    if (micStream) {
      micStream.getTracks().forEach(t => t.stop());
    }
    micStream = await navigator.mediaDevices.getUserMedia({
      audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false }
    });
    status.textContent = "¡Micrófono listo! Acércate y sopla fuerte 🌬️";
    status.style.color = "#0099cc";
    if (micBtn) micBtn.classList.add('hidden');

    micContext = new (window.AudioContext || window.webkitAudioContext)();
    if (micContext.state === 'suspended') await micContext.resume();
    analyser = micContext.createAnalyser();
    analyser.fftSize = 256;
    const src = micContext.createMediaStreamSource(micStream);
    src.connect(analyser);
    checkBlow();
  } catch (e) {
    status.textContent = fromUserClick
      ? "Permiso no activado. ¡Toca la llamita para apagar la vela! ✨"
      : "Pulsa 'Activar micrófono' para soplar tu velita 🎙️";
    if (micBtn) micBtn.classList.remove('hidden');
  }
}

function checkBlow() {
  if (!analyser || candleBlown) return;
  const data = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(data);

  // El soplido en micrófonos de celular concentra energía en las bandas bajas (0..35)
  let lowSum = 0;
  const bins = 36;
  for (let i = 0; i < bins; i++) lowSum += data[i];
  const lowAvg = lowSum / bins;

  const flame = document.getElementById('candle-flame');
  if (lowAvg > 38 && flame) {
    flame.style.transform = `scale(${0.85 + Math.random() * 0.3}) skewX(${(Math.random() - 0.5) * 28}deg)`;
  }

  if (lowAvg > 58) {
    blowFrames++;
    if (blowFrames >= 4) {
      blowOutCandle();
      return;
    }
  } else {
    blowFrames = Math.max(0, blowFrames - 1);
  }
  requestAnimationFrame(checkBlow);
}

function blowOutCandle() {
  if (candleBlown) return;
  candleBlown = true;

  if (micStream) {
    micStream.getTracks().forEach(t => t.stop());
    micStream = null;
  }
  if (micContext) {
    micContext.close().catch(() => {});
    micContext = null;
  }
  analyser = null;

  if (navigator.vibrate) navigator.vibrate([80, 40, 120]);
  const flame = document.getElementById('candle-flame');
  if (flame) flame.classList.add('blown-out');
  const micBtn = document.getElementById('enable-mic-btn');
  if (micBtn) micBtn.classList.add('hidden');
  document.getElementById('mic-status').textContent = "¡Deseo concedido! ✨";

  confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
  playAudioEffect('fanfare');
  setTimeout(showFinalLetter, 1800);
}

function createStars() {
  const screen = document.getElementById('final-screen');
  for (let i = 0; i < 40; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.width = (Math.random() * 3 + 1) + 'px';
    star.style.height = star.style.width;
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = Math.random() * 100 + 'vh';
    star.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    star.style.animationDelay = (Math.random() * 2) + 's';
    screen.appendChild(star);
  }
}

function showFinalLetter() {
  createStars(); // Genera las estrellas
  gsap.to('#candle-screen', { opacity: 0, duration: 0.6, onComplete: () => {
    document.getElementById('candle-screen').classList.remove('active');
    const finalScreen = document.getElementById('final-screen');
    finalScreen.scrollTop = 0;
    finalScreen.classList.add('active');
    gsap.fromTo('.letter-card', { y: 60, scale: 0.85, opacity: 0 }, { y: 0, scale: 1, opacity: 1, duration: 0.8, ease: "elastic.out(1, 0.75)" });
    const el = document.getElementById('typewriter-text'); el.textContent = "";
    let i = 0; const intv = setInterval(() => { el.textContent += LETTER_TEXT.charAt(i); i++; if(i >= LETTER_TEXT.length) clearInterval(intv); }, 32);
  }});
}
document.getElementById('replay-confetti').addEventListener('click', () => confetti({ particleCount: 130, spread: 90, origin: { y: 0.65 } }));

// Chispas interactivas (Soporte táctil)
function spawnSpark(x, y) {
  if (Math.random() > 0.4) return;
  const spark = document.createElement('div');
  spark.style.position = 'fixed'; spark.style.left = x + 'px'; spark.style.top = y + 'px';
  spark.style.width = '6px'; spark.style.height = '6px';
  spark.style.background = Math.random() > 0.5 ? '#ff2a85' : '#00d2ff';
  spark.style.borderRadius = '50%'; spark.style.pointerEvents = 'none'; spark.style.zIndex = '100';
  document.body.appendChild(spark);
  gsap.to(spark, { y: "+=60", x: (Math.random() - 0.5) * 50, opacity: 0, scale: 0, duration: 0.7, onComplete: () => spark.remove() });
}
const letterCard = document.querySelector('.letter-card');
letterCard.addEventListener('mousemove', (e) => spawnSpark(e.clientX, e.clientY));
letterCard.addEventListener('touchmove', (e) => {
  if(e.touches.length > 0) { spawnSpark(e.touches[0].clientX, e.touches[0].clientY); }
}, {passive: true});

// Interacción táctil con el sticker de Happy Birthday
const sticker = document.getElementById('hb-sticker');
sticker.addEventListener('click', (e) => {
  if (navigator.vibrate) navigator.vibrate(50);
  playAudioEffect('pop');
  sticker.classList.add('bop');
  confetti({ particleCount: 30, spread: 40, origin: { x: e.clientX/window.innerWidth, y: e.clientY/window.innerHeight } });
  setTimeout(() => sticker.classList.remove('bop'), 400);
});