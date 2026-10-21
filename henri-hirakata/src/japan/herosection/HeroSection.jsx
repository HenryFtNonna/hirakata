import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { playPopSound, getMuted, setMuted } from '../utils/audio';

export default function HeroSection() {
  const navigate = useNavigate();
  const [audioMuted, setAudioMuted] = useState(getMuted());

  const handleToggleSound = () => {
    const nextState = !audioMuted;
    setMuted(nextState);
    setAudioMuted(nextState);
    if (!nextState) {
      playPopSound();
    }
  };

  const handleNav = (path) => {
    playPopSound();
    navigate(path);
  };

  const modules = [
    {
      id: 'hiragana',
      path: '/hiragana',
      title: 'Hiragana',
      subtitle: '104 Huruf',
      icon: 'あ',
      iconBg: 'bg-indigo-600 text-white',
    },
    {
      id: 'katakana',
      path: '/katakana',
      title: 'Katakana',
      subtitle: '104 Huruf',
      icon: 'ア',
      iconBg: 'bg-cyan-600 text-white',
    },
    {
      id: 'kanji',
      path: '/kanji',
      title: 'Kanji',
      subtitle: '105 Kanji',
      icon: '日',
      iconBg: 'bg-purple-600 text-white',
    },
    {
      id: 'kosakata',
      path: '/kosakata',
      title: 'Kosakata',
      subtitle: '80 Kata',
      icon: '話',
      iconBg: 'bg-fuchsia-600 text-white',
    },
    {
      id: 'tatabahasa',
      path: '/tatabahasa',
      title: 'Tata Bahasa',
      subtitle: 'Partikel N5',
      icon: '文',
      iconBg: 'bg-emerald-600 text-white',
    },
    {
      id: 'latihan',
      path: '/latihan',
      title: 'Simulasi Ujian',
      subtitle: 'Tes N5',
      icon: '試',
      iconBg: 'bg-amber-500 text-white',
    },
  ];

  return (
    <div className="min-h-[calc(100dvh-5.5rem)] flex flex-col justify-around max-w-md mx-auto px-4 pt-safe pt-4 sm:pt-6 pb-6 sm:pb-8 gap-4 sm:gap-5 w-full">
      {/* 1. Header: Centered HiraKata Title (Wireframe) */}
      <div className="flex items-center justify-between pt-2 pb-1">
        <div className="w-9" /> {/* Spacer untuk memastikan judul tetap simetris di tengah */}

        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-1.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800">
              HiraKata
            </h1>
            <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-indigo-50 text-indigo-600 border border-indigo-100">
              N5
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-semibold tracking-wide">Japanese Learning Hub</p>
        </div>

        {/* Quick Audio Mute Toggle */}
        <button
          onClick={handleToggleSound}
          title={audioMuted ? 'Nyalakan Efek Suara' : 'Bisukan Efek Suara'}
          aria-label="Toggle Sound"
          className={`w-9 h-9 rounded-2xl border flex items-center justify-center transition-all cursor-pointer active:scale-90 ${
            audioMuted
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-white border-slate-200 text-emerald-600 soft-shadow-sm'
          }`}
        >
          {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* 2. Banner: placeholder buat gambar nanti (Wireframe) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl p-5 sm:p-6 bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-600 text-white soft-shadow-lg text-center"
      >
        {/* Soft Background Accents */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-32 h-32 rounded-full bg-purple-400/20 blur-xl pointer-events-none" />

        <div className="relative z-10 py-2 sm:py-3 space-y-2">
          {/* Wireframe Placeholder Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] font-bold">
            <Sparkles className="w-3 h-3 text-amber-300 animate-pulse" />
            <span>placeholder buat gambar nanti</span>
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-xl">🌸</span>
            <h2 className="text-base sm:text-lg font-black tracking-tight drop-shadow-sm text-white">
              Belajar Huruf & Bahasa Jepang
            </h2>
            <span className="text-xl">🎌</span>
          </div>

          <p className="text-xs text-indigo-100/90 max-w-xs mx-auto leading-relaxed font-medium">
            Kuasai Hiragana, Katakana, Kanji, dan Tata Bahasa N5 dengan kuis interaktif!
          </p>
        </div>
      </motion.div>

      {/* 3. 3x2 Grid of 6 Squircle Buttons (Wireframe) */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
        {modules.map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleNav(item.path)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 soft-shadow-sm hover:soft-shadow-md hover:border-indigo-300 transition-all cursor-pointer group select-none text-center"
          >
            <div
              className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center font-jp font-black text-xl mb-1.5 soft-shadow transition-transform group-hover:scale-105 ${item.iconBg}`}
            >
              {item.icon}
            </div>
            <span className="text-xs font-black text-slate-800 tracking-tight leading-tight group-hover:text-indigo-600 transition-colors">
              {item.title}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
              {item.subtitle}
            </span>
          </motion.button>
        ))}
      </div>

      {/* 4. Dedicated CTA Bar: Mulai Quiz sekarang ! (Wireframe) */}
      <div className="space-y-2 pt-1">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => handleNav('/hiragana')}
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-black text-base sm:text-lg soft-shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
          <span>Mulai Quiz sekarang !</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <p className="text-center text-[11px] text-slate-400 font-medium">
          🔥 Kuis acak instan dengan feedback Quizizz & audio asli
        </p>
      </div>
    </div>
  );
}
