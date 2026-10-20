// Web Audio API Synthesizer & Speech Synthesis Utility (No external asset dependency)

let audioCtx = null;
let isMuted = false;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function setMuted(muted) {
  isMuted = muted;
}

export function getMuted() {
  return isMuted;
}

/**
 * Suara Quizizz-style Correct Chime (C5, E5, G5, C6 arpeggio)
 */
export function playCorrectSound(streak = 1) {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Jika streak tinggi, pitch sedikit lebih ceria
  const baseFreqs = streak >= 5 ? [587.33, 739.99, 880.0, 1174.66] : [523.25, 659.25, 783.99, 1046.5];

  baseFreqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + idx * 0.06);

    gain.gain.setValueAtTime(0.001, now + idx * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.22, now + idx * 0.06 + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + idx * 0.06);
    osc.stop(now + idx * 0.06 + 0.38);
  });
}

/**
 * Suara Wrong Shake / Error Buzzer (Gently rounded, not harsh)
 */
export function playWrongSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'triangle';

  // Frekuensi nada rendah bergetar sedikit
  osc1.frequency.setValueAtTime(150, now);
  osc1.frequency.exponentialRampToValueAtTime(110, now + 0.25);

  osc2.frequency.setValueAtTime(145, now);
  osc2.frequency.exponentialRampToValueAtTime(105, now + 0.25);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

  osc1.connect(gain);
  osc2.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.3);
  osc2.stop(now + 0.3);
}

/**
 * Suara Click / Pop ringan untuk tombol UI
 */
export function playPopSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(600, now);
  osc.frequency.exponentialRampToValueAtTime(900, now + 0.04);

  gain.gain.setValueAtTime(0.1, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
}

/**
 * Suara Fanfare ketika kuis selesai / ronde komplit
 */
export function playFanfareSound() {
  if (isMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { f: 523.25, d: 0.12, t: 0 },
    { f: 659.25, d: 0.12, t: 0.13 },
    { f: 783.99, d: 0.12, t: 0.26 },
    { f: 1046.5, d: 0.35, t: 0.39 },
  ];

  const now = ctx.currentTime;
  notes.forEach((n) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(n.f, now + n.t);

    gain.gain.setValueAtTime(0.001, now + n.t);
    gain.gain.exponentialRampToValueAtTime(0.25, now + n.t + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + n.t + n.d);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + n.t);
    osc.stop(now + n.t + n.d + 0.05);
  });
}

/**
 * Mengucapkan teks karakter Jepang menggunakan Web Speech API
 */
export function speakJapanese(text) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return;

  try {
    window.speechSynthesis.cancel(); // batalkan suara sebelumnya
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.85; // kecepatan sedikit lebih lambat untuk pembelajaran yang jelas
    utterance.pitch = 1.05;

    // Cari voice Jepang jika ada
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find((v) => v.lang.startsWith('ja') || v.lang === 'ja_JP');
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    window.speechSynthesis.speak(utterance);
  } catch {
    // Abaikan jika speech synthesis diblokir browser
  }
}

