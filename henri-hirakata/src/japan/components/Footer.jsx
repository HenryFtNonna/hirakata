import { Link } from 'react-router-dom';
import { Sparkles, Heart } from 'lucide-react';
import { Capacitor } from '@capacitor/core';

export default function Footer() {
  if (Capacitor.isNativePlatform()) {
    return null;
  }

  return (
    <footer className="hidden md:block mt-20 border-t border-slate-200/70 bg-white/70 backdrop-blur-md pt-12 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-jp font-black text-sm">
                あ
              </div>
              <span className="font-black text-xl text-slate-800">HiraKata</span>
            </div>
            <p className="text-slate-500 text-xs sm:text-sm max-w-sm leading-relaxed">
              Platform belajar huruf dan bahasa Jepang tingkat dasar (JLPT N5) dengan metode kuis flashcard interaktif, feedback instan layaknya Quizizz, dan audio penutur asli.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>100% Gratis • Tanpa Iklan • Mobile-Friendly</span>
            </div>
          </div>

          {/* Quick Links: Huruf & Karakter */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
              Huruf & Kanji
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600">
              <li>
                <Link to="/hiragana" className="hover:text-indigo-600 transition-colors">
                  Hiragana (104 Huruf)
                </Link>
              </li>
              <li>
                <Link to="/katakana" className="hover:text-indigo-600 transition-colors">
                  Katakana (104 Huruf)
                </Link>
              </li>
              <li>
                <Link to="/kanji" className="hover:text-indigo-600 transition-colors">
                  Kanji JLPT N5 (105 Karakter)
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Kosakata & Ujian */}
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
              Tata Bahasa & Ujian
            </h4>
            <ul className="space-y-2 text-xs font-bold text-slate-600">
              <li>
                <Link to="/kosakata" className="hover:text-indigo-600 transition-colors">
                  Kosakata Inti N5 (80 Kata)
                </Link>
              </li>
              <li>
                <Link to="/tatabahasa" className="hover:text-indigo-600 transition-colors">
                  Partikel & Tata Bahasa
                </Link>
              </li>
              <li>
                <Link to="/latihan" className="hover:text-indigo-600 transition-colors">
                  Simulasi Kuis JLPT N5
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-200/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} HiraKata. Didesain dengan Soft Rounded UI untuk kemudahan belajar.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>untuk pembelajar bahasa Jepang</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
