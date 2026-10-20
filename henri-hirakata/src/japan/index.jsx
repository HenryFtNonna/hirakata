import { useState } from 'react';
import HeroSection from './herosection/HeroSection';
import Hiragana from './hiragana/Hiragana';
import { Volume2, VolumeX } from 'lucide-react';
import { setMuted, getMuted, playPopSound } from './utils/audio';

export default function JapanLearningHub() {
  const [audioMuted, setAudioMuted] = useState(getMuted());

  const handleToggleSound = () => {
    const nextState = !audioMuted;
    setMuted(nextState);
    setAudioMuted(nextState);
    if (!nextState) {
      playPopSound();
    }
  };

  const scrollToHiragana = () => {
    const el = document.getElementById('hiragana-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-indigo-500 selection:text-white">
      {/* Sticky Soft Rounded Navbar */}
      <header className="sticky top-0 z-40 px-4 sm:px-6 lg:px-8 pt-3 pb-2 backdrop-blur-md bg-white/75 border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-500 text-white flex items-center justify-center font-jp font-black text-xl soft-shadow">
              あ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight text-slate-800">HiraKata</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
                  v1.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">Belajar Hiragana Interaktif</p>
            </div>
          </div>

          {/* Nav Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={scrollToHiragana}
              className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-slate-100/80 transition-all cursor-pointer"
            >
              Kuis Hiragana
            </button>

            {/* Tombol Toggle Sound FX */}
            <button
              onClick={handleToggleSound}
              title={audioMuted ? 'Nyalakan Efek Suara' : 'Bisukan Suara'}
              aria-label="Toggle Sound"
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
                audioMuted
                  ? 'bg-rose-50 border-rose-200 text-rose-600'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-700'
              }`}
            >
              {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden md:inline">{audioMuted ? 'Muted' : 'Audio Aktif'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. HeroSection & Pilihan Belajar */}
        <HeroSection
          onStartQuiz={scrollToHiragana}
          onOpenChart={scrollToHiragana}
        />

        {/* Pembatas Visual Halus */}
        <div className="max-w-4xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent my-4" />
        </div>

        {/* 2. Hiragana Quiz & Table */}
        <Hiragana />
      </main>

      {/* Soft UI Footer */}
      <footer className="mt-16 border-t border-slate-200/60 bg-white/60 backdrop-blur-sm py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-slate-600 font-semibold">
            <span>Didesain dengan Soft Rounded UI untuk belajar bahasa Jepang yang menyenangkan</span>
          </div>
          <p className="text-slate-400 text-[11px]">
            104 Huruf Hiragana (Seion 46 • Dakuon & Handakuon 25 • Yōon 33) • Responsive & Mobile-Friendly
          </p>
        </div>
      </footer>
    </div>
  );
}
