import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import MobileHeader from './components/MobileHeader';
import BottomNav from './components/BottomNav';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';

// Feature Components
import HeroSection from './herosection/HeroSection';
import Hiragana from './hiragana/Hiragana';
import Katakana from './katakana/Katakana';
import Kanji from './kanji/Kanji';
import Kosakata from './kosakata/Kosakata';
import TataBahasa from './tatabahasa/TataBahasa';
import LatihanN5 from './latihan/LatihanN5';
import PetaJalan from './roadmap/PetaJalan';
import Profil from './profil/Profil';

export default function JapanLearningHub() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col selection:bg-indigo-500 selection:text-white relative">
        {/* Mobile Header (Shown on mobile for subpages) */}
        <div className="block md:hidden">
          <MobileHeader />
        </div>

        {/* Desktop Navbar (Wide screen web only) */}
        <Navbar />

        {/* Dynamic Main Route Content (Added bottom padding on mobile for BottomNav) */}
        <main className="flex-1 pb-20 md:pb-10">
          <Routes>
            <Route path="/" element={<HeroSection />} />
            <Route path="/hiragana" element={<Hiragana />} />
            <Route path="/katakana" element={<Katakana />} />
            <Route path="/kanji" element={<Kanji />} />
            <Route path="/kosakata" element={<Kosakata />} />
            <Route path="/tatabahasa" element={<TataBahasa />} />
            <Route path="/latihan" element={<LatihanN5 />} />
            <Route path="/peta-jalan" element={<PetaJalan />} />
            <Route path="/profil" element={<Profil />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Mobile Bottom Navigation Bar (Fixed at bottom on mobile & Capacitor) */}
        <div className="block md:hidden">
          <BottomNav />
        </div>

        {/* Desktop Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
