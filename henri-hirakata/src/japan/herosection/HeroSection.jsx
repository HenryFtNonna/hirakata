import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Volume2,
  CheckCircle2,
  Zap,
  BookOpen,
  ChevronRight,
  Flame,
} from 'lucide-react';
import { speakJapanese, playPopSound } from '../utils/audio';

export default function HeroSection({ onStartQuiz, onOpenChart }) {
  // Mini interactive demo inside hero
  const [demoInput, setDemoInput] = useState('');
  const [demoStatus, setDemoStatus] = useState('idle'); // 'idle' | 'correct' | 'wrong'

  const handleDemoCheck = (e) => {
    e?.preventDefault();
    if (demoInput.trim().toLowerCase() === 'a') {
      setDemoStatus('correct');
      speakJapanese('あ');
      setTimeout(() => {
        setDemoInput('');
        setDemoStatus('idle');
      }, 1500);
    } else {
      setDemoStatus('wrong');
      setTimeout(() => setDemoStatus('idle'), 800);
    }
  };

  const learningModules = [
    {
      id: 'hiragana',
      title: 'Hiragana',
      subtitle: '104 Huruf Lengkap',
      badge: 'Aktif & Siap',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      active: true,
      icon: 'あ',
      desc: 'Huruf fonetik dasar bahasa Jepang. Wajib dikuasai untuk pemula.',
      features: ['46 Seion', '25 Dakuon & Handakuon', '33 Yōon Kombinasi'],
      actionText: 'Mulai Belajar Sekarang',
    },
    {
      id: 'katakana',
      title: 'Katakana',
      subtitle: 'Kata Serapan & Nama',
      badge: 'Segera Hadir',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      active: false,
      icon: 'ア',
      desc: 'Digunakan untuk kata serapan asing, nama non-Jepang, dan penekanan kata.',
      features: ['104 Huruf Katakana', 'Latihan Kata Asing', 'Flashcard Interaktif'],
      actionText: 'Segera Tersedia',
    },
    {
      id: 'kanji',
      title: 'Kanji JLPT N5',
      subtitle: '100+ Kanji Dasar',
      badge: 'Tahap Rilis',
      badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
      active: false,
      icon: '日',
      desc: 'Karakter logografis dengan cara baca Onyomi & Kunyomi beserta contoh kata.',
      features: ['Radikal Dasar', 'Urutan Coretan', 'Contoh Kosakata'],
      actionText: 'Segera Tersedia',
    },
    {
      id: 'vocab',
      title: 'Kosakata & Frasa',
      subtitle: 'Percakapan Harian',
      badge: 'Tahap Rilis',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      active: false,
      icon: '話',
      desc: 'Kumpulan kosakata dan ungkapan penting untuk komunikasi sehari-hari.',
      features: ['Salam & Sapaan', 'Angka & Waktu', 'Audio Penutur Asli'],
      actionText: 'Segera Tersedia',
    },
  ];

  return (
    <div className="relative overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20">
      {/* Background Soft Glow Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 -z-10 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute -top-10 left-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-indigo-200/50 blur-3xl" />
        <div className="absolute top-10 right-10 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-rose-200/40 blur-3xl" />
        <div className="absolute top-36 left-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-amber-100/50 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Hero Section: Headline & Interactive Demo Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Kolom Kiri: Teks & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            {/* Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-slate-200/70 text-slate-700 text-xs sm:text-sm font-semibold soft-shadow-sm"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>🌸 Belajar Bahasa Jepang Interaktif & Asyik</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-800 tracking-tight leading-[1.15]"
            >
              Kuasai Huruf <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500">Hiragana</span> Cepat & Melekat
            </motion.h1>

            {/* Deskripsi */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              Hafal 104 huruf Hiragana lengkap tanpa jenuh. Dilengkapi kuis flashcard mengetik romaji, acak huruf otomatis, suara asli penutur Jepang, dan feedback visual instan layaknya Quizizz!
            </motion.p>

            {/* Tombol CTA */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2"
            >
              <button
                onClick={() => {
                  playPopSound();
                  onStartQuiz?.();
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-extrabold text-base soft-shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
              >
                <span>Mulai Kuis Flashcard</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  playPopSound();
                  onOpenChart?.();
                }}
                className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white/90 hover:bg-white text-slate-700 hover:text-indigo-600 border border-slate-200/80 font-bold text-base soft-shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <BookOpen className="w-5 h-5 text-indigo-500" />
                <span>Lihat Tabel 104 Huruf</span>
              </button>
            </motion.div>

            {/* Quick Feature Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/70 border border-slate-100 soft-shadow-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">104 Huruf Komplit</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/70 border border-slate-100 soft-shadow-sm">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Feedback Instan</span>
              </div>
              <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-white/70 border border-slate-100 soft-shadow-sm col-span-2 sm:col-span-1 justify-center sm:justify-start">
                <Flame className="w-4 h-4 text-rose-500 shrink-0" />
                <span className="text-xs font-semibold text-slate-700">Sistem Acak Cerdas</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Mini Interactive Preview Soft Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-sm">
              {/* Background card accent */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-500 opacity-20 blur-xl" />

              <div className="relative rounded-3xl bg-white/95 backdrop-blur-md p-6 sm:p-7 border border-white soft-shadow-lg text-center">
                {/* Mini Card Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-indigo-50 text-indigo-600 border border-indigo-100">
                    Coba Langsung Di Sini 🎯
                  </span>
                  <button
                    onClick={() => speakJapanese('あ')}
                    title="Dengarkan suara"
                    className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 text-indigo-600" />
                  </button>
                </div>

                {/* Big Japanese Char */}
                <div className="my-4">
                  <span className="font-jp text-7xl font-black text-slate-800 tracking-wider">
                    あ
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Huruf apakah ini? Ketik romajinya!</p>
                </div>

                {/* Mini Interactive Form */}
                <form onSubmit={handleDemoCheck} className="space-y-3">
                  <input
                    type="text"
                    value={demoInput}
                    onChange={(e) => setDemoInput(e.target.value)}
                    placeholder="Ketik 'a'..."
                    className={`w-full py-2.5 px-3 text-center text-lg font-bold rounded-xl border transition-all soft-inner-shadow ${
                      demoStatus === 'correct'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-700'
                        : demoStatus === 'wrong'
                        ? 'bg-rose-50 border-rose-400 text-rose-700'
                        : 'bg-slate-50 border-slate-200 focus:outline-none focus:border-indigo-500 text-slate-800'
                    }`}
                  />

                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-700 text-white soft-shadow transition-colors cursor-pointer"
                  >
                    {demoStatus === 'correct'
                      ? 'Benar! (A) 🎉'
                      : demoStatus === 'wrong'
                      ? 'Salah, coba "a"!'
                      : 'Tes Jawaban'}
                  </button>
                </form>

                <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                  ✨ Website responsif, nyaman digunakan di smartphone maupun laptop.
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Section: Pilihan Belajar (Learning Modules) */}
        <div className="mt-16 sm:mt-24">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight">
              Pilihan Modul Pembelajaran
            </h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
              Pilih materi yang ingin Anda kuasai. Saat ini modul <span className="font-bold text-indigo-600">Hiragana</span> sudah lengkap 100% dan siap diuji!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {learningModules.map((mod) => (
              <motion.div
                key={mod.id}
                whileHover={{ y: -4 }}
                className={`relative rounded-3xl p-6 transition-all duration-200 border ${
                  mod.active
                    ? 'bg-white/95 border-indigo-200 soft-shadow-lg ring-2 ring-indigo-500/20'
                    : 'bg-white/60 backdrop-blur-sm border-slate-200/60 soft-shadow-sm opacity-85'
                }`}
              >
                {/* Module Badge & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-jp text-2xl font-black ${
                      mod.active ? 'bg-indigo-600 text-white soft-shadow' : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {mod.icon}
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${mod.badgeColor}`}>
                    {mod.badge}
                  </span>
                </div>

                {/* Module Title & Subtitle */}
                <h3 className="text-lg font-black text-slate-800">{mod.title}</h3>
                <span className="text-xs font-semibold text-indigo-500 block mb-2">{mod.subtitle}</span>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">{mod.desc}</p>

                {/* Features list */}
                <ul className="space-y-1.5 mb-6">
                  {mod.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <div className={`w-1.5 h-1.5 rounded-full ${mod.active ? 'bg-indigo-500' : 'bg-slate-300'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Action button */}
                <button
                  onClick={() => {
                    if (mod.active) {
                      playPopSound();
                      onStartQuiz?.();
                    }
                  }}
                  disabled={!mod.active}
                  className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all ${
                    mod.active
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white soft-shadow cursor-pointer'
                      : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>{mod.actionText}</span>
                  {mod.active && <ChevronRight className="w-3.5 h-3.5" />}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
