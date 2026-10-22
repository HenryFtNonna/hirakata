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
import henhanLogo from '../../assets/henhan_logo.jpg';
import ippoImg from '../../assets/ippo.png';

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
      iconBg: 'bg-gradient-to-tr from-[#EA4A30] to-[#F59E0B] text-white',
    },
    {
      id: 'katakana',
      path: '/katakana',
      title: 'Katakana',
      subtitle: '104 Huruf',
      icon: 'ア',
      iconBg: 'bg-gradient-to-tr from-cyan-600 to-sky-500 text-white',
    },
    {
      id: 'kanji',
      path: '/kanji',
      title: 'Kanji',
      subtitle: '105 Kanji',
      icon: '日',
      iconBg: 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white',
    },
    {
      id: 'kosakata',
      path: '/kosakata',
      title: 'Kosakata',
      subtitle: '80 Kata',
      icon: '話',
      iconBg: 'bg-gradient-to-tr from-fuchsia-600 to-rose-500 text-white',
    },
    {
      id: 'tatabahasa',
      path: '/tatabahasa',
      title: 'Tata Bahasa',
      subtitle: 'Partikel N5',
      icon: '文',
      iconBg: 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white',
    },
    {
      id: 'latihan',
      path: '/latihan',
      title: 'Simulasi Ujian',
      subtitle: 'Tes N5',
      icon: '試',
      iconBg: 'bg-gradient-to-tr from-indigo-600 to-purple-600 text-white',
    },
  ];

  return (
    <div className="min-h-[calc(100dvh-5.5rem)] flex flex-col justify-around max-w-md mx-auto px-4 pt-safe pt-4 sm:pt-6 pb-6 sm:pb-8 gap-4 sm:gap-5 w-full">
      {/* 1. Header: Brand Logo & Title HenHan Go */}
      <div className="flex items-center justify-between pt-2 pb-1">
        <div className="flex items-center gap-2.5">
          <img
            src={henhanLogo}
            alt="HenHan Go Logo"
            className="w-10 h-10 rounded-2xl object-cover border border-amber-200/80 soft-shadow-sm"
          />
          <div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-800 leading-tight">
              HenHan <span className="text-[#EA4A30]">Go</span>
            </h1>
            <p className="text-[11px] text-slate-400 font-semibold tracking-wide">
              Japanese Learning Hub
            </p>
          </div>
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

      {/* 2. Banner Card: Image ippo.png with subtle border */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative overflow-hidden rounded-3xl border border-slate-200/90 soft-shadow-sm bg-white"
      >
        <img
          src={ippoImg}
          alt="Hajime no Ippo - Belajar Bahasa Jepang"
          className="w-full h-36 sm:h-44 object-cover object-center"
        />
      </motion.div>

      {/* 3. 3x2 Grid of 6 Squircle Buttons */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-3.5">
        {modules.map((item) => (
          <motion.button
            key={item.id}
            whileTap={{ scale: 0.92 }}
            onClick={() => handleNav(item.path)}
            className="flex flex-col items-center justify-center p-3 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 soft-shadow-sm hover:soft-shadow-md hover:border-[#EA4A30]/40 transition-all cursor-pointer group select-none text-center"
          >
            <div
              className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center font-jp font-black text-xl mb-1.5 soft-shadow transition-transform group-hover:scale-105 ${item.iconBg}`}
            >
              {item.icon}
            </div>
            <span className="text-xs font-black text-slate-800 tracking-tight leading-tight group-hover:text-[#EA4A30] transition-colors">
              {item.title}
            </span>
            <span className="text-[10px] font-semibold text-slate-400 mt-0.5">
              {item.subtitle}
            </span>
          </motion.button>
        ))}
      </div>

      {/* 4. Dedicated CTA Bar */}
      <div className="space-y-2 pt-1">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => handleNav('/hiragana')}
          className="w-full py-3.5 sm:py-4 px-6 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-[#EA4A30] via-[#EB5338] to-[#F59E0B] hover:opacity-95 text-white font-black text-base sm:text-lg soft-shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer group"
        >
          <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
          <span>Mulai Quiz sekarang !</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </motion.button>

        <p className="text-center text-[11px] text-slate-500 font-medium">
          🔥 Kuis acak untuk mempermudah mengingat + feedback & audio asli
        </p>
      </div>
    </div>
  );
}
