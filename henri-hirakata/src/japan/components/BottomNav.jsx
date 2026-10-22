import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Home,
  Compass,
  Trophy,
  User,
} from 'lucide-react';
import { playPopSound } from '../utils/audio';
import { Capacitor } from '@capacitor/core';
import { Keyboard } from '@capacitor/keyboard';

export default function BottomNav() {
  const location = useLocation();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  useEffect(() => {
    // 1. Native Capacitor Keyboard listener
    if (Capacitor.isNativePlatform()) {
      Keyboard.setResizeMode({ mode: 'none' }).catch(() => {});

      let showSub = null;
      let hideSub = null;

      Keyboard.addListener('keyboardWillShow', () => {
        setIsKeyboardOpen(true);
      }).then((sub) => {
        showSub = sub;
      });

      Keyboard.addListener('keyboardWillHide', () => {
        setIsKeyboardOpen(false);
      }).then((sub) => {
        hideSub = sub;
      });

      return () => {
        showSub?.remove?.();
        hideSub?.remove?.();
      };
    }

    // 2. Fallback untuk browser / webview resize
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        if (window.visualViewport) {
          const isShrunk = window.visualViewport.height < window.innerHeight * 0.82;
          setIsKeyboardOpen(isShrunk);
        }
      };

      window.visualViewport?.addEventListener('resize', handleResize);
      window.addEventListener('resize', handleResize);

      return () => {
        window.visualViewport?.removeEventListener('resize', handleResize);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, []);

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/peta-jalan', label: 'Peta Jalan', icon: Compass },
    { path: '/latihan', label: 'Ujian', icon: Trophy },
    { path: '/profil', label: 'Profil', icon: User },
  ];

  // Saat keyboard virtual HP terbuka, sembunyikan navbar agar tidak ikut melayang ke atas keyboard
  if (isKeyboardOpen) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 pb-safe pt-1.5 px-3 soft-shadow-lg max-w-md mx-auto transition-all duration-200">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => playPopSound()}
              className="flex-1 flex flex-col items-center justify-center py-1 select-none transition-colors relative cursor-pointer"
            >
              <motion.div
                whileTap={{ scale: 0.85 }}
                className={`flex flex-col items-center justify-center px-3 py-1 rounded-2xl transition-all ${
                  isActive
                    ? 'bg-rose-50 text-[#EA4A30] font-black'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-[#EA4A30] stroke-[2.5]' : 'stroke-2'}`} />
                <span className={`text-[10px] tracking-tight mt-0.5 ${isActive ? 'font-black' : 'font-semibold'}`}>
                  {item.label}
                </span>
              </motion.div>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
}
