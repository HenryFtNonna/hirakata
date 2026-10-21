import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  X,
  FileText,
  BookOpen,
  Trophy,
  Volume2,
  VolumeX,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { getMuted, setMuted, playPopSound } from '../utils/audio';

export default function MoreMenuSheet({ isOpen, onClose }) {
  const navigate = useNavigate();
  const audioMuted = getMuted();

  const extraModules = [
    {
      path: '/kosakata',
      title: 'Kosakata & Frasa',
      subtitle: '80 Kosakata Inti JLPT N5',
      icon: FileText,
      color: 'bg-purple-50 text-purple-600 border-purple-200',
      badge: '80 Kata',
    },
    {
      path: '/tatabahasa',
      title: 'Tata Bahasa & Partikel',
      subtitle: '10 Partikel Kunci & Kuis Rumpang',
      icon: BookOpen,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      badge: 'Partikel',
    },
    {
      path: '/latihan',
      title: 'Simulasi Tes N5',
      subtitle: '15 Soal Ujian Standar JLPT N5',
      icon: Trophy,
      color: 'bg-amber-50 text-amber-600 border-amber-200',
      badge: 'Ujian',
    },
  ];

  const handleSelect = (path) => {
    playPopSound();
    onClose();
    navigate(path);
  };

  const handleToggleSound = () => {
    const nextState = !audioMuted;
    setMuted(nextState);
    if (!nextState) {
      playPopSound();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs transition-opacity"
          />

          {/* Bottom Sheet Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl border-t border-slate-200/80 p-5 pb-safe soft-shadow-lg max-w-lg mx-auto"
          >
            {/* Handle Drag Bar */}
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />

            {/* Header Sheet */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="font-black text-base text-slate-800">
                  Modul Pembelajaran Lainnya
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
                  JLPT N5
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer active:scale-95"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="space-y-2.5 mb-5">
              {extraModules.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleSelect(item.path)}
                    className="w-full p-3.5 rounded-2xl bg-slate-50 hover:bg-indigo-50/60 active:scale-98 border border-slate-200/70 hover:border-indigo-200 transition-all flex items-center justify-between text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl border ${item.color}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-sm text-slate-800 group-hover:text-indigo-600 transition-colors">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-white border border-slate-200 text-slate-500">
                            {item.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">{item.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 transition-transform group-hover:translate-x-0.5" />
                  </button>
                );
              })}
            </div>

            {/* Sound Toggle Quick Row */}
            <div className="p-3 rounded-2xl bg-slate-100/70 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-indigo-500" />
                <span className="font-bold text-slate-700">Efek Suara Audio Quizizz</span>
              </div>
              <button
                onClick={handleToggleSound}
                className={`px-3 py-1.5 rounded-xl font-bold flex items-center gap-1.5 transition-all ${
                  audioMuted
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                {audioMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{audioMuted ? 'Muted' : 'Aktif'}</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

