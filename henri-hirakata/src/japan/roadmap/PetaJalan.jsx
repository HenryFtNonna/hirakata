import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Compass,
  ArrowRight,
} from 'lucide-react';
import { playPopSound } from '../utils/audio';

export default function PetaJalan() {
  const navigate = useNavigate();

  const steps = [
    {
      step: '1',
      title: 'Kuasai Huruf Hiragana',
      desc: 'Fondasi utama membaca kata asli Jepang (104 huruf lengkap).',
      path: '/hiragana',
      icon: 'あ',
      iconColor: 'bg-[#EA4A30] text-white',
      badge: 'Langkah Awal',
      badgeColor: 'bg-rose-50 text-[#EA4A30] border-rose-200',
    },
    {
      step: '2',
      title: 'Kuasai Huruf Katakana',
      desc: 'Wajib untuk kata serapan asing, menu makanan, dan nama non-Jepang.',
      path: '/katakana',
      icon: 'ア',
      iconColor: 'bg-amber-500 text-white',
      badge: 'Langkah Kedua',
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
    },
    {
      step: '3',
      title: 'Hafalkan 105 Kanji N5',
      desc: 'Karakter inti dengan Onyomi, Kunyomi, dan jumlah coretan.',
      path: '/kanji',
      icon: '日',
      iconColor: 'bg-purple-600 text-white',
      badge: 'Pilar Ketiga',
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
    },
    {
      step: '4',
      title: 'Perbanyak Kosakata Dasar',
      desc: '80 kosakata yang paling sering keluar di lembar soal N5.',
      path: '/kosakata',
      icon: '話',
      iconColor: 'bg-rose-600 text-white',
      badge: 'Pilar Keempat',
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
    },
    {
      step: '5',
      title: 'Pahami 10 Partikel Inti',
      desc: 'Partikel は, を, に, で, が, dll. yang menjadi kunci susunan kalimat.',
      path: '/tatabahasa',
      icon: '文',
      iconColor: 'bg-emerald-600 text-white',
      badge: 'Pilar Kelima',
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      step: '6',
      title: 'Simulasi Ujian JLPT N5',
      desc: 'Uji kesiapan dengan 15 soal komprehensif standar kelulusan 60%.',
      path: '/latihan',
      icon: '🎯',
      iconColor: 'bg-gradient-to-r from-[#EA4A30] to-amber-500 text-white',
      badge: 'Ujian Akhir',
      badgeColor: 'bg-amber-50 text-amber-800 border-amber-200',
    },
  ];

  const handleGo = (path) => {
    playPopSound();
    navigate(path);
  };

  return (
    <div className="py-4 px-4 max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold mb-2">
          <Compass className="w-3.5 h-3.5 text-[#EA4A30]" />
          <span>Kurikulum JLPT N5</span>
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">
          Peta Jalan Belajar
        </h1>
        <p className="text-xs text-slate-500 mt-1">
          Ikuti urutan langkah di bawah ini untuk mencapai kelulusan JLPT N5.
        </p>
      </div>

      {/* Timeline Steps */}
      <div className="space-y-3 relative before:absolute before:inset-0 before:left-5 before:w-0.5 before:bg-amber-100 before:z-0">
        {steps.map((st, idx) => (
          <motion.div
            key={idx}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGo(st.path)}
            className="relative z-10 flex items-start gap-3 p-3.5 rounded-2xl bg-white border border-slate-200/80 soft-shadow-sm hover:border-amber-300 transition-all cursor-pointer active:bg-amber-50/50"
          >
            {/* Step Icon */}
            <div
              className={`w-10 h-10 rounded-2xl flex items-center justify-center font-jp font-black text-base shrink-0 shadow-sm ${st.iconColor}`}
            >
              {st.icon}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <span className={`text-[9px] font-black px-2 py-0.2 rounded-md border ${st.badgeColor}`}>
                  {st.badge}
                </span>
                <span className="text-[10px] text-slate-400 font-bold">Tahap {st.step}</span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-800 truncate">{st.title}</h3>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-relaxed">
                {st.desc}
              </p>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 self-center" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
