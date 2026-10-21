import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Volume2, VolumeX } from 'lucide-react';
import { getMuted, setMuted, playPopSound } from '../utils/audio';

export default function MobileHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [audioMuted, setAudioMuted] = useState(getMuted());

  // On home ('/'), HeroSection renders the wireframe layout directly
  if (location.pathname === '/') {
    return null;
  }

  const handleToggleSound = () => {
    const nextState = !audioMuted;
    setMuted(nextState);
    setAudioMuted(nextState);
    if (!nextState) {
      playPopSound();
    }
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/hiragana':
        return { title: 'Hiragana', subtitle: '104 Huruf Flashcard', color: 'text-indigo-600' };
      case '/katakana':
        return { title: 'Katakana', subtitle: '104 Huruf Serapan', color: 'text-cyan-600' };
      case '/kanji':
        return { title: 'Kanji N5', subtitle: '105 Karakter Inti', color: 'text-purple-600' };
      case '/kosakata':
        return { title: 'Kosakata N5', subtitle: '80 Kata & Frasa', color: 'text-fuchsia-600' };
      case '/tatabahasa':
        return { title: 'Tata Bahasa', subtitle: 'Partikel & Kalimat', color: 'text-emerald-600' };
      case '/latihan':
        return { title: 'Simulasi N5', subtitle: '15 Soal Ujian', color: 'text-amber-600' };
      case '/peta-jalan':
        return { title: 'Peta Jalan', subtitle: 'Silabus Belajar N5', color: 'text-indigo-600' };
      case '/profil':
        return { title: 'Profil Belajar', subtitle: 'Statistik & Pengaturan', color: 'text-purple-600' };
      default:
        return { title: 'HiraKata', subtitle: 'Belajar N5', color: 'text-indigo-600' };
    }
  };

  const pageInfo = getPageTitle();

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/60 pt-safe px-4 py-2.5 transition-all">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {/* Back Button + Subpage Title */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              playPopSound();
              navigate(-1);
            }}
            title="Kembali"
            aria-label="Kembali ke halaman sebelumnya"
            className="p-1.5 -ml-1 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-90 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h2 className="font-black text-sm text-slate-800 leading-tight">
              {pageInfo?.title}
            </h2>
            <span className={`text-[10px] font-bold ${pageInfo?.color}`}>
              {pageInfo?.subtitle}
            </span>
          </div>
        </div>

        {/* Right Action: Sound Toggle */}
        <button
          onClick={handleToggleSound}
          title={audioMuted ? 'Nyalakan Audio' : 'Bisukan Audio'}
          aria-label="Toggle Sound"
          className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 active:scale-95 ${
            audioMuted
              ? 'bg-rose-50 border-rose-200 text-rose-600'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}
        >
          {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
