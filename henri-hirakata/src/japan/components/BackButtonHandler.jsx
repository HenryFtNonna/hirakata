import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { App as CapApp } from '@capacitor/app';
import { Capacitor } from '@capacitor/core';

export default function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Hanya aktifkan listener native di environment Capacitor (Android/iOS)
    if (!Capacitor.isNativePlatform()) return;

    let listenerHandle = null;
    let lastBackPressed = 0;

    const setupListener = async () => {
      listenerHandle = await CapApp.addListener('backButton', () => {
        // Jika sedang tidak di halaman beranda ('/'), navigasi kembali ke halaman sebelumnya atau ke home
        if (location.pathname !== '/') {
          if (window.history.length > 1) {
            navigate(-1);
          } else {
            navigate('/', { replace: true });
          }
        } else {
          // Jika berada di home, tekan back 2 kali dalam 2 detik untuk keluar aplikasi (standar UX Android)
          const now = Date.now();
          if (now - lastBackPressed < 2000) {
            CapApp.exitApp();
          } else {
            lastBackPressed = now;
          }
        }
      });
    };

    setupListener();

    return () => {
      if (listenerHandle) {
        listenerHandle.remove();
      }
    };
  }, [location.pathname, navigate]);

  return null;
}

