import { useState } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Smartphone,
} from 'lucide-react';
import { getMuted, setMuted, playPopSound } from '../utils/audio';

export default function Profil() {
  const [audioMuted, setAudioMuted] = useState(getMuted());

  const handleToggleSound = () => {
    const nextState = !audioMuted;
    setMuted(nextState);
    setAudioMuted(nextState);
    if (!nextState) {
      playPopSound();
    }
  };

  return (
    <div className="pt-7 pb-6 px-4 max-w-md mx-auto space-y-4">
      {/* Header Profil */}
      <div className="text-center">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center font-jp text-2xl font-black mx-auto soft-shadow mb-2">
          あ
        </div>
        <h1 className="text-xl font-black text-slate-800">Pelajar Bahasa Jepang</h1>
        <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold mt-1">
          <Sparkles className="w-3 h-3 text-indigo-500" />
          <span>Target JLPT N5</span>
        </div>
      </div>

      {/* Ringkasan Materi */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 soft-shadow-sm space-y-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
          Silabus Pembelajaran
        </h2>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-500 block">Hiragana</span>
            <span className="text-sm font-black text-indigo-600">104 Huruf</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-500 block">Katakana</span>
            <span className="text-sm font-black text-cyan-600">104 Huruf</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-500 block">Kanji N5</span>
            <span className="text-sm font-black text-purple-600">105 Karakter</span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100">
            <span className="font-bold text-slate-500 block">Kosakata</span>
            <span className="text-sm font-black text-fuchsia-600">80 Kosakata</span>
          </div>
        </div>
      </div>

      {/* Pengaturan Audio & Aplikasi */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200/80 soft-shadow-sm space-y-3">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
          Pengaturan Aplikasi
        </h2>

        {/* Toggle Sound */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-100">
          <div className="flex items-center gap-2.5">
            {audioMuted ? (
              <VolumeX className="w-5 h-5 text-rose-500" />
            ) : (
              <Volume2 className="w-5 h-5 text-emerald-600" />
            )}
            <div>
              <p className="font-extrabold text-xs text-slate-800">Efek Suara Quizizz</p>
              <p className="text-[10px] text-slate-400">Audio saat kuis benar/salah</p>
            </div>
          </div>

          <button
            onClick={handleToggleSound}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
              audioMuted
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}
          >
            {audioMuted ? 'Muted' : 'Aktif'}
          </button>
        </div>

        {/* Info Versi */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-slate-400" />
            <span className="font-bold text-slate-700">Platform</span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 font-semibold">
            HiraKata Mobile v1.0
          </span>
        </div>
      </div>
    </div>
  );
}
