import { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import {
  Volume2,
  VolumeX,
  Sparkles,
  BookOpen,
  Home,
  CheckCircle,
  FileText,
  Compass,
} from 'lucide-react';
import { setMuted, getMuted, playPopSound } from '../utils/audio';
import henhanLogo from '../../assets/henhan_logo.jpg';

export default function Navbar() {
  const [audioMuted, setAudioMuted] = useState(getMuted());
  const location = useLocation();

  // Jika berjalan di platform native Capacitor (Android/iOS), sembunyikan navbar versi web
  if (Capacitor.isNativePlatform()) {
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

  const navItems = [
    { name: 'Beranda', path: '/', icon: Home },
    { name: 'Hiragana', path: '/hiragana', icon: Sparkles, badge: '104' },
    { name: 'Katakana', path: '/katakana', icon: BookOpen, badge: '104' },
    { name: 'Kanji N5', path: '/kanji', icon: Compass, badge: '105' },
    { name: 'Kosakata', path: '/kosakata', icon: FileText, badge: '80' },
    { name: 'Tata Bahasa', path: '/tatabahasa', icon: BookOpen, badge: 'Partikel' },
    { name: 'Latihan N5', path: '/latihan', icon: CheckCircle, badge: 'Tes' },
  ];

  return (
    <header className="hidden md:block sticky top-0 z-40 px-4 sm:px-6 lg:px-8 pt-3 pb-2.5 backdrop-blur-md bg-white/85 border-b border-slate-200/60 soft-shadow-sm transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={() => playPopSound()}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-2xl overflow-hidden border border-amber-200/80 bg-amber-50 flex items-center justify-center soft-shadow transition-transform group-hover:scale-105 active:scale-95">
            <img src={henhanLogo} alt="HenHan Go" className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-lg sm:text-xl tracking-tight text-slate-800 group-hover:text-[#EA4A30] transition-colors">
                HenHan Go
              </span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium">
              Japanese Learning Hub
            </p>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="flex items-center gap-1 bg-slate-100/70 p-1 rounded-2xl soft-inner-shadow border border-slate-200/50">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => playPopSound()}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-white text-[#EA4A30] shadow-sm font-extrabold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#EA4A30]' : 'text-slate-400'}`} />
                <span>{item.name}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.2 rounded-full font-bold ${
                      isActive ? 'bg-rose-50 text-[#EA4A30]' : 'bg-slate-200/80 text-slate-500'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Sound FX Toggle */}
        <button
          onClick={handleToggleSound}
          title={audioMuted ? 'Nyalakan Efek Suara' : 'Bisukan Suara'}
          aria-label="Toggle Sound"
          className={`p-2.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold ${
            audioMuted
              ? 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:bg-emerald-100'
          }`}
        >
          {audioMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          <span>{audioMuted ? 'Muted' : 'Audio Aktif'}</span>
        </button>
      </div>
    </header>
  );
}
