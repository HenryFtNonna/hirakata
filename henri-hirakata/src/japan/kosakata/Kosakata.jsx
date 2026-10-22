import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Volume2,
  RotateCcw,
  BookOpen,
  Gamepad2,
  Trophy,
  Flame,
  CheckCircle2,
  Search,
  Check,
  X,
  XCircle,
} from 'lucide-react';
import {
  KOSAKATA_DATA,
  KOSAKATA_CATEGORIES,
  getKosakataByCategory,
  shuffleKosakata,
} from '../data/kosakataData';
import {
  playCorrectSound,
  playWrongSound,
  playPopSound,
  playFanfareSound,
  speakJapanese,
} from '../utils/audio';

export default function Kosakata() {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'list'
  const [selectedCat, setSelectedCat] = useState('all');

  const [deck, setDeck] = useState(() => shuffleKosakata(getKosakataByCategory('all')));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizStatus, setQuizStatus] = useState('idle');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [listCategory, setListCategory] = useState('all');

  const currentCard = deck[currentIndex] || deck[0];

  const quizOptions = useMemo(() => {
    if (!currentCard) return [];
    const pool = KOSAKATA_DATA.filter((v) => v.id !== currentCard.id);
    const shuffledPool = shuffleKosakata(pool).slice(0, 3);
    const options = [
      { text: currentCard.arti, isCorrect: true },
      ...shuffledPool.map((p) => ({ text: p.arti, isCorrect: false })),
    ];
    return shuffleKosakata(options);
  }, [currentCard]);

  const initQuiz = (cat = selectedCat) => {
    const list = getKosakataByCategory(cat);
    const shuffled = shuffleKosakata(list);
    setDeck(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setQuizStatus('idle');
    setIsTransitioning(false);
    setQuizFinished(false);
  };

  const handleSelectCategory = (cat) => {
    setSelectedCat(cat);
    initQuiz(cat);
  };

  const handleAnswer = (option, idx) => {
    if (isTransitioning || quizStatus !== 'idle') return;

    setSelectedOption(idx);
    setIsTransitioning(true);

    if (option.isCorrect) {
      setQuizStatus('correct');
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);
      setScore((prev) => prev + 10 + Math.min(nextStreak * 2, 20));
      setCorrectCount((prev) => prev + 1);

      playCorrectSound(nextStreak);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.65 },
      });

      setTimeout(() => {
        if (currentIndex + 1 >= deck.length) {
          setQuizFinished(true);
          playFanfareSound();
        } else {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setQuizStatus('idle');
          setIsTransitioning(false);
        }
      }, 700);
    } else {
      setQuizStatus('wrong');
      setStreak(0);
      setWrongCount((prev) => prev + 1);
      playWrongSound();

      setTimeout(() => {
        if (currentIndex + 1 >= deck.length) {
          setQuizFinished(true);
        } else {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setQuizStatus('idle');
          setIsTransitioning(false);
        }
      }, 1200);
    }
  };

  const filteredList = KOSAKATA_DATA.filter((v) => {
    const matchCat = listCategory === 'all' || v.category === listCategory;
    const matchSearch =
      searchQuery === '' ||
      v.kana.includes(searchQuery) ||
      v.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.arti.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalAnswered = correctCount + wrongCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 100;
  const progressPercent = deck.length > 0 ? Math.round(((currentIndex + 1) / deck.length) * 100) : 0;

  return (
    <section id="kosakata-section" className="py-2 px-3 sm:px-4 max-w-md mx-auto space-y-3 sm:space-y-3.5">
      {/* ================= JUDUL UTAMA ================= */}
      <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight text-center pt-1">
        Kosakata & Frasa N5
      </h2>

      {/* ================= 1. PILIHAN MODE QUIZ DAN TABEL (Paling Atas) ================= */}
      <div className="flex flex-col items-center gap-2">
        <div className="inline-flex p-1 rounded-2xl bg-slate-200/80 backdrop-blur-sm soft-inner-shadow">
          <button
            onClick={() => {
              playPopSound();
              setActiveTab('quiz');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Mode Kuis</span>
          </button>
          <button
            onClick={() => {
              playPopSound();
              setActiveTab('list');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'list'
                ? 'bg-white text-rose-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Daftar 80 Kosakata</span>
          </button>
        </div>

        {/* Progress Bar Mini */}
        {activeTab === 'quiz' && (
          <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden soft-inner-shadow">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {activeTab === 'quiz' ? (
        <div className="space-y-3 sm:space-y-3.5">
          {/* ================= 2. CARD QUIZ (Di Bawah Mode Agar Tetap Terlihat Saat Keyboard Terbuka) ================= */}
          {!quizFinished && currentCard ? (
            <motion.div
              key={currentCard.id}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={
                quizStatus === 'wrong'
                  ? {
                      scale: 1,
                      opacity: 1,
                      x: [-12, 12, -8, 8, -4, 4, 0],
                      transition: { duration: 0.4 },
                    }
                  : { scale: 1, opacity: 1 }
              }
              className={`relative rounded-3xl p-4 sm:p-5 border-2 transition-all ${
                quizStatus === 'correct'
                  ? 'bg-emerald-50/95 border-emerald-400 soft-shadow-success'
                  : quizStatus === 'wrong'
                  ? 'bg-rose-50/95 border-rose-400 soft-shadow-error'
                  : 'bg-white/95 border-slate-100 soft-shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                  JLPT N5 Kosakata
                </span>
                <button
                  onClick={() => speakJapanese(currentCard.kana)}
                  title="Dengarkan pengucapan"
                  className="p-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer active:scale-90"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              <div className="my-2 sm:my-3 text-center select-none">
                <span
                  onClick={() => speakJapanese(currentCard.kana)}
                  className="font-jp text-3xl sm:text-4xl font-black text-slate-800 hover:text-rose-600 transition-colors cursor-pointer inline-block"
                >
                  {currentCard.kana}
                </span>
                {currentCard.kanji !== '-' && (
                  <span className="block text-xs text-slate-400 mt-0.5 font-jp">
                    Kanji: {currentCard.kanji}
                  </span>
                )}
                <p className="text-xs text-[#EA4A30] font-bold mt-1 tracking-wider">
                  {currentCard.romaji}
                </p>
              </div>

              {/* Banner Status */}
              <div className="min-h-[1.75rem] flex items-center justify-center mb-2.5">
                {quizStatus === 'correct' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-500 text-white font-extrabold text-xs"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Benar! Arti: {currentCard.arti} 🎉</span>
                  </motion.div>
                )}
                {quizStatus === 'wrong' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-xs"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Kurang Tepat! Jawaban: {currentCard.arti}</span>
                  </motion.div>
                )}
                {quizStatus === 'idle' && (
                  <span className="text-[11px] font-semibold text-slate-500">
                    Pilihlah arti kata yang tepat:
                  </span>
                )}
              </div>

              {/* Options (2 Kolom di mobile agar ringkas) */}
              <div className="grid grid-cols-2 gap-2">
                {quizOptions.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'bg-slate-50 hover:bg-rose-50 border-slate-200 text-slate-700 hover:border-rose-300';
                  if (quizStatus !== 'idle') {
                    if (opt.isCorrect) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-md';
                    } else if (isSelected && !opt.isCorrect) {
                      btnStyle = 'bg-rose-500 text-white border-rose-500 shadow-md';
                    } else {
                      btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt, idx)}
                      disabled={isTransitioning}
                      className={`p-2.5 sm:p-3 rounded-2xl font-bold text-xs sm:text-sm text-left border transition-all flex items-center justify-between cursor-pointer active:scale-98 ${btnStyle}`}
                    >
                      <span className="truncate">{opt.text}</span>
                      {quizStatus !== 'idle' && opt.isCorrect && (
                        <Check className="w-3.5 h-3.5 stroke-[3] shrink-0 ml-1" />
                      )}
                      {quizStatus !== 'idle' && isSelected && !opt.isCorrect && (
                        <X className="w-3.5 h-3.5 stroke-[3] shrink-0 ml-1" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                <span>Audio penutur asli Jepang</span>
                <button
                  onClick={() => initQuiz()}
                  className="flex items-center gap-1 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Acak Ulang</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 soft-shadow-lg text-center">
              <Trophy className="w-12 h-12 text-rose-500 mx-auto mb-2" />
              <h3 className="text-xl font-black text-slate-800">Kuis Kosakata Selesai! 🎉</h3>
              <p className="text-slate-500 text-xs mt-1">Skor Akhir: {score} • Akurasi: {accuracy}%</p>
              <button
                onClick={() => initQuiz()}
                className="mt-4 w-full py-3 rounded-2xl font-black bg-rose-600 hover:bg-rose-700 active:scale-95 text-white soft-shadow cursor-pointer transition-all text-xs sm:text-sm"
              >
                Main Lagi (Acak Ulang)
              </button>
            </div>
          )}

          {/* ================= 3. PILIHAN KATEGORI KOSAKATA (Di Bawah Card Kuis) ================= */}
          <div className="space-y-1.5 pt-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 block">
              Pilihan Kategori Kosakata
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
              {KOSAKATA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playPopSound();
                    handleSelectCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCat === cat.id
                      ? 'bg-rose-600 text-white soft-shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="ml-1 opacity-70">({cat.count})</span>
                </button>
              ))}
            </div>
          </div>

          {/* ================= 4. INFO STATS (Paling Bawah) ================= */}
          <div className="grid grid-cols-4 gap-1.5">
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-[10px]">
                <Flame className={`w-3 h-3 ${streak >= 3 ? 'animate-bounce text-orange-500' : ''}`} />
                <span>Streak</span>
              </div>
              <span className="text-sm font-black text-slate-800">{streak}</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-rose-600 font-extrabold text-[10px]">
                <Trophy className="w-3 h-3" />
                <span>Skor</span>
              </div>
              <span className="text-sm font-black text-slate-800">{score}</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-emerald-500 font-extrabold text-[10px]">
                <CheckCircle2 className="w-3 h-3" />
                <span>Akurasi</span>
              </div>
              <span className="text-sm font-black text-slate-800">{accuracy}%</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400">Kartu</span>
              <span className="text-sm font-black text-slate-800">
                {deck.length > 0 ? `${currentIndex + 1}/${deck.length}` : '0/0'}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ================= DAFTAR KOSAKATA ================= */
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kata, romaji, atau arti (cth: taberu, makan)..."
                className="w-full pl-9 pr-3 py-2 rounded-2xl bg-white border border-slate-200 soft-inner-shadow focus:outline-none focus:border-rose-500 text-xs font-medium"
              />
            </div>

            <div className="flex gap-1.5 w-full overflow-x-auto no-scrollbar pb-0.5">
              {KOSAKATA_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playPopSound();
                    setListCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    listCategory === cat.id
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredList.map((v) => (
              <div
                key={v.id}
                className="bg-white/95 rounded-2xl p-2.5 sm:p-3 border border-slate-100 soft-shadow-sm flex items-center justify-between group hover:border-rose-200 transition-all active:bg-rose-50"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-jp text-sm sm:text-base font-black text-slate-800">{v.kana}</span>
                    {v.kanji !== '-' && (
                      <span className="text-[10px] text-slate-400 font-jp">({v.kanji})</span>
                    )}
                  </div>
                  <span className="text-[10px] text-[#EA4A30] font-semibold block">{v.romaji}</span>
                  <span className="text-xs text-slate-600 font-medium">{v.arti}</span>
                </div>

                <button
                  onClick={() => {
                    playPopSound();
                    speakJapanese(v.kana);
                  }}
                  title="Dengarkan suara"
                  className="p-1.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 cursor-pointer transition-colors active:scale-90"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
