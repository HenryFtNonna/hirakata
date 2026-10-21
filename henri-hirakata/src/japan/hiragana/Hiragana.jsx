import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Sparkles,
  RotateCcw,
  HelpCircle,
  ArrowRight,
  Flame,
  Trophy,
  CheckCircle2,
  XCircle,
  BookOpen,
  Gamepad2,
  Check,
  Search,
  Zap,
} from 'lucide-react';
import {
  HIRAGANA_DATA,
  HIRAGANA_CATEGORIES,
  getHiraganaByCategory,
  shuffleArray,
  checkRomajiAnswer,
} from './hiraganaData';
import {
  playCorrectSound,
  playWrongSound,
  playPopSound,
  playFanfareSound,
  speakJapanese,
} from '../utils/audio';

export default function Hiragana() {
  // State Filter & Mode
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'chart'
  const [selectedCategory, setSelectedCategory] = useState('all');

  // State Kuis
  const [deck, setDeck] = useState(() => shuffleArray(getHiraganaByCategory('all')));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'correct' | 'wrong'
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [revealedAnswer, setRevealedAnswer] = useState(null);

  // Stats
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // State Tabel / Chart
  const [chartSearch, setChartSearch] = useState('');
  const [chartCategory, setChartCategory] = useState('all');

  // Refs
  const inputRef = useRef(null);

  // Inisialisasi atau Reset Kuis dengan pengacakan
  const initQuiz = useCallback((category = selectedCategory) => {
    const list = getHiraganaByCategory(category);
    const shuffled = shuffleArray(list);
    setDeck(shuffled);
    setCurrentIndex(0);
    setInputVal('');
    setStatus('idle');
    setIsTransitioning(false);
    setShowHint(false);
    setRevealedAnswer(null);
    setQuizFinished(false);

    // Fokus ke input
    setTimeout(() => {
      inputRef.current?.focus();
    }, 150);
  }, [selectedCategory]);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    initQuiz(categoryId);
  };

  const currentCard = deck[currentIndex] || deck[0];

  // Efek Suara saat ganti kartu
  const handlePronounce = (text) => {
    if (text) {
      speakJapanese(text);
    }
  };

  // Trigger Confetti Quizizz Style
  const fireConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#22c55e', '#3b82f6', '#ec4899', '#f59e0b', '#8b5cf6'],
      ticks: 180,
    });
  };

  // Lanjut ke kartu berikutnya
  const nextCard = useCallback(() => {
    if (currentIndex + 1 >= deck.length) {
      setQuizFinished(true);
      playFanfareSound();
      confetti({
        particleCount: 120,
        spread: 100,
        origin: { y: 0.5 },
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
      setInputVal('');
      setStatus('idle');
      setIsTransitioning(false);
      setShowHint(false);
      setRevealedAnswer(null);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [currentIndex, deck.length]);

  // Cek Jawaban
  const handleCheckAnswer = (overrideVal) => {
    if (isTransitioning || !currentCard) return;

    const answerToCheck = (typeof overrideVal === 'string' ? overrideVal : inputVal).trim();
    if (!answerToCheck) return;

    const isCorrect = checkRomajiAnswer(answerToCheck, currentCard);

    if (isCorrect) {
      setIsTransitioning(true);
      setStatus('correct');
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);
      setScore((prev) => prev + 10 + Math.min(nextStreak * 2, 20));
      setCorrectCount((prev) => prev + 1);

      playCorrectSound(nextStreak);
      fireConfetti();

      // Transisi otomatis ke kartu berikutnya setelah jeda Quizizz
      setTimeout(() => {
        nextCard();
      }, 550);
    } else {
      setStatus('wrong');
      setStreak(0);
      setWrongCount((prev) => prev + 1);
      playWrongSound();

      // Shake selesai, biarkan input tetap fokus untuk dikoreksi
      setTimeout(() => {
        setStatus('idle');
      }, 800);
    }
  };

  // Handle Input Change (Mendukung instan auto-check saat user mengetikkan romaji yang pas)
  const handleInputChange = (e) => {
    const val = e.target.value;
    setInputVal(val);

    if (status === 'wrong') {
      setStatus('idle');
    }

    // Jika romaji cocok langsung saat diketik (misal user mengetik 'a' untuk あ)
    if (currentCard && checkRomajiAnswer(val, currentCard)) {
      handleCheckAnswer(val);
    }
  };

  // Handle Form Submit / Enter
  const handleSubmit = (e) => {
    e.preventDefault();
    handleCheckAnswer();
  };

  // Menyerah / Lihat Jawaban
  const handleGiveUp = () => {
    if (isTransitioning || !currentCard) return;
    setIsTransitioning(true);
    setRevealedAnswer(currentCard.romaji);
    setStatus('wrong');
    setStreak(0);
    setWrongCount((prev) => prev + 1);
    playWrongSound();

    setTimeout(() => {
      nextCard();
    }, 1400);
  };

  // Filter Chart
  const filteredChartData = HIRAGANA_DATA.filter((item) => {
    const matchCat = chartCategory === 'all' || item.type === chartCategory;
    const matchSearch =
      chartSearch === '' ||
      item.char.includes(chartSearch) ||
      item.romaji.toLowerCase().includes(chartSearch.toLowerCase()) ||
      (item.example && item.example.toLowerCase().includes(chartSearch.toLowerCase()));
    return matchCat && matchSearch;
  });

  const totalAnswered = correctCount + wrongCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 100;
  const progressPercent = deck.length > 0 ? Math.round(((currentIndex + 1) / deck.length) * 100) : 0;

  return (
    <section id="hiragana-section" className="py-6 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Bagian Hiragana */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100/80 text-indigo-700 text-xs font-semibold mb-2.5 soft-shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Fokus Utama • 104 Karakter Lengkap</span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
          Kuis Flashcard Hiragana
        </h2>
        <p className="mt-1.5 text-slate-500 text-xs sm:text-base max-w-xl mx-auto px-2">
          Tulis romaji di bawah kartu. Jawaban benar langsung lanjut dengan efek visual instan ala Quizizz!
        </p>

        {/* Tab Switcher: Kuis Flashcard vs Tabel Lengkap */}
        <div className="mt-4 sm:mt-6 inline-flex p-1 rounded-2xl bg-slate-200/70 backdrop-blur-sm soft-inner-shadow">
          <button
            onClick={() => {
              playPopSound();
              setActiveTab('quiz');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'quiz'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Mode Kuis</span>
          </button>
          <button
            onClick={() => {
              playPopSound();
              setActiveTab('chart');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'chart'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Tabel 104 Huruf</span>
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        <div className="space-y-4 sm:space-y-6">
          {/* Bar Filter Kategori (Swipeable di mobile) */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 overflow-x-auto no-scrollbar py-1 px-1 justify-start sm:justify-center">
            {HIRAGANA_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playPopSound();
                  handleSelectCategory(cat.id);
                }}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap cursor-pointer shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white soft-shadow-sm scale-102 ring-2 ring-indigo-300'
                    : 'bg-white/90 text-slate-600 border border-slate-200/60 soft-shadow-sm hover:border-indigo-200'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] font-semibold ${
                    selectedCategory === cat.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-500'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* Stats Bar Soft Rounded (Compact on mobile) */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 max-w-xl mx-auto">
            {/* Streak */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3.5 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-[10px] sm:text-xs">
                <Flame className={`w-3 h-3 sm:w-4 sm:h-4 ${streak >= 3 ? 'animate-bounce text-orange-500' : ''}`} />
                <span>Streak</span>
              </div>
              <span className="text-base sm:text-xl font-black text-slate-800">{streak}</span>
            </div>

            {/* Score */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3.5 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-indigo-500 font-extrabold text-[10px] sm:text-xs">
                <Trophy className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Skor</span>
              </div>
              <span className="text-base sm:text-xl font-black text-slate-800">{score}</span>
            </div>

            {/* Akurasi */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3.5 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-emerald-500 font-extrabold text-[10px] sm:text-xs">
                <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Akurasi</span>
              </div>
              <span className="text-base sm:text-xl font-black text-slate-800">{accuracy}%</span>
            </div>

            {/* Progres */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3.5 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-sky-500 font-extrabold text-[10px] sm:text-xs">
                <Zap className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>Kartu</span>
              </div>
              <span className="text-base sm:text-xl font-black text-slate-800">
                {deck.length > 0 ? `${currentIndex + 1}/${deck.length}` : '0/0'}
              </span>
            </div>
          </div>

          {/* Progress Bar Soft */}
          <div className="max-w-xl mx-auto px-1">
            <div className="w-full bg-slate-200/70 h-2 sm:h-2.5 rounded-full overflow-hidden p-0.5 soft-inner-shadow">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quiz Card Container */}
          {!quizFinished && currentCard ? (
            <div className="max-w-md mx-auto">
              <motion.div
                key={currentCard.id}
                initial={{ scale: 0.94, opacity: 0, y: 10 }}
                animate={
                  status === 'wrong'
                    ? {
                        scale: 1,
                        opacity: 1,
                        y: 0,
                        x: [-14, 14, -10, 10, -5, 5, 0],
                        transition: { duration: 0.4 },
                      }
                    : status === 'correct'
                    ? {
                        scale: 1.03,
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.25 },
                      }
                    : { scale: 1, opacity: 1, y: 0, transition: { duration: 0.3 } }
                }
                className={`relative rounded-3xl p-5 sm:p-8 transition-colors duration-200 border-2 ${
                  status === 'correct'
                    ? 'bg-gradient-to-b from-emerald-50 to-white border-emerald-400 soft-shadow-success'
                    : status === 'wrong'
                    ? 'bg-gradient-to-b from-rose-50 to-white border-rose-400 soft-shadow-error'
                    : 'bg-white/95 backdrop-blur-md border-white/80 soft-shadow-lg'
                }`}
              >
                {/* Badge Tipe Huruf & Tombol Audio */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-600 border border-slate-200/50">
                    {currentCard.type === 'seion'
                      ? 'Dasar (Seion)'
                      : currentCard.type === 'dakuon'
                      ? 'Tenten / Maru'
                      : 'Kombinasi (Yoon)'}
                  </span>

                  <button
                    onClick={() => handlePronounce(currentCard.char)}
                    title="Dengarkan pengucapan asli Jepang"
                    aria-label="Dengarkan pengucapan"
                    className="p-2 sm:p-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 border border-indigo-100 transition-all hover:scale-105 active:scale-90 cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>

                {/* Karakter Hiragana Utama */}
                <div className="my-4 sm:my-8 text-center select-none">
                  <span
                    onClick={() => handlePronounce(currentCard.char)}
                    className="font-jp text-7xl sm:text-9xl font-black text-slate-800 tracking-wider hover:text-indigo-600 transition-colors cursor-pointer inline-block"
                  >
                    {currentCard.char}
                  </span>
                </div>

                {/* Feedback Banner Interaktif (Quizizz Style) */}
                <div className="min-h-[2.25rem] flex items-center justify-center mb-3">
                  <AnimatePresence mode="wait">
                    {status === 'correct' && (
                      <motion.div
                        initial={{ opacity: 0, y: 6, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-xs sm:text-sm shadow-md"
                      >
                        <Check className="w-4 h-4 stroke-[3]" />
                        <span>Bagus Sekali! Romaji: {currentCard.romaji.toUpperCase()} 🎉</span>
                      </motion.div>
                    )}

                    {status === 'wrong' && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500 text-white font-extrabold text-xs sm:text-sm shadow-md"
                      >
                        <XCircle className="w-4 h-4" />
                        <span>Kurang Tepat! Coba lagi</span>
                      </motion.div>
                    )}

                    {revealedAnswer && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-slate-600 text-xs sm:text-sm font-semibold bg-amber-50 border border-amber-200 px-3 py-1 rounded-full text-center"
                      >
                        Jawaban benar: <span className="font-bold text-amber-700">{revealedAnswer}</span>
                      </motion.div>
                    )}

                    {showHint && !revealedAnswer && status === 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-indigo-600 bg-indigo-50 border border-indigo-100 px-3 py-1 rounded-xl text-center"
                      >
                        💡 Contoh kata: <span className="font-semibold">{currentCard.example}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Form Input Jawaban */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    ref={inputRef}
                    type="text"
                    autoFocus
                    inputMode="text"
                    autoCapitalize="none"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    disabled={status === 'correct' || isTransitioning}
                    value={inputVal}
                    onChange={handleInputChange}
                    placeholder="Ketik romaji di sini..."
                    className={`w-full py-3 sm:py-4 px-3 text-center text-xl sm:text-2xl font-bold rounded-2xl transition-all duration-200 border-2 soft-inner-shadow ${
                      status === 'correct'
                        ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                        : status === 'wrong'
                        ? 'bg-rose-50 border-rose-400 text-rose-800'
                        : 'bg-slate-50/90 border-slate-200 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 text-slate-800 placeholder:text-slate-400'
                    }`}
                  />

                  {/* Tombol Aksi: Cek & Nyerah / Hint */}
                  <div className="flex items-center gap-2">
                    <button
                      type="submit"
                      disabled={!inputVal.trim() || status === 'correct' || isTransitioning}
                      className="flex-1 py-3 sm:py-3.5 rounded-2xl font-black text-sm sm:text-base bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white soft-shadow flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
                    >
                      <span>Cek</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setShowHint((prev) => !prev)}
                      title="Lihat Petunjuk"
                      className="p-3 sm:p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/80 active:scale-95 transition-all cursor-pointer"
                    >
                      <HelpCircle className="w-5 h-5" />
                    </button>

                    <button
                      type="button"
                      onClick={handleGiveUp}
                      disabled={isTransitioning}
                      title="Nyerah / Lewati"
                      className="px-3 sm:px-3.5 py-3 sm:py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                    >
                      Lewati
                    </button>
                  </div>
                </form>

                {/* Footer Kartu */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
                  <span>Enter = Cek Jawaban</span>
                  <button
                    onClick={() => initQuiz()}
                    className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 font-medium transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Acak Ulang</span>
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Modal Selesai Kuis */
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-100 soft-shadow-lg text-center"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3 soft-shadow">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-800">Kuis Selesai! 🎉</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Kamu telah menyelesaikan seluruh kartu dalam set ini.</p>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 my-5">
                <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="block text-[10px] sm:text-xs text-slate-400 font-bold">Skor</span>
                  <span className="text-lg sm:text-xl font-black text-indigo-600">{score}</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="block text-[10px] sm:text-xs text-slate-400 font-bold">Akurasi</span>
                  <span className="text-lg sm:text-xl font-black text-emerald-600">{accuracy}%</span>
                </div>
                <div className="p-2.5 sm:p-3 rounded-2xl bg-slate-50 border border-slate-100">
                  <span className="block text-[10px] sm:text-xs text-slate-400 font-bold">Max Streak</span>
                  <span className="text-lg sm:text-xl font-black text-amber-600">{bestStreak}🔥</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  onClick={() => initQuiz()}
                  className="w-full py-3 sm:py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white soft-shadow transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Lagi (Acak Huruf Baru)</span>
                </button>
                <button
                  onClick={() => setActiveTab('chart')}
                  className="w-full py-2.5 sm:py-3 rounded-2xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 active:scale-95 transition-all cursor-pointer"
                >
                  Buka Tabel Lengkap 104 Huruf
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ) : (
        /* ================= MODE TABEL LENGKAP 104 HURUF ================= */
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 max-w-2xl mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={chartSearch}
                onChange={(e) => setChartSearch(e.target.value)}
                placeholder="Cari huruf atau romaji (cth: a, ka, き)..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200 soft-inner-shadow focus:outline-none focus:border-indigo-500 text-xs sm:text-sm font-medium"
              />
            </div>

            <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {['all', 'seion', 'dakuon', 'yoon'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    playPopSound();
                    setChartCategory(cat);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    chartCategory === cat
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat === 'all'
                    ? 'Semua'
                    : cat === 'seion'
                    ? 'Dasar (46)'
                    : cat === 'dakuon'
                    ? 'Tenten (25)'
                    : 'Yoon (33)'}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-[11px] sm:text-xs text-slate-500">
            💡 Tips: Ketuk kartu huruf untuk mendengarkan audio pengucapan asli!
          </p>

          {/* Grid Karakter Responsif (4 kolom di HP, 6 di tablet, 8 di desktop) */}
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
            {filteredChartData.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                  playPopSound();
                  speakJapanese(item.char);
                }}
                className="bg-white/95 rounded-2xl p-2.5 sm:p-3.5 border border-slate-100 soft-shadow-sm hover:soft-shadow hover:border-indigo-200 transition-all flex flex-col items-center justify-center text-center cursor-pointer group active:bg-indigo-50"
              >
                <div className="flex items-center justify-between w-full mb-0.5">
                  <span className="text-[9px] font-bold text-slate-400 group-hover:text-indigo-400">
                    {item.row.toUpperCase()}
                  </span>
                  <Volume2 className="w-3 h-3 text-slate-300 group-hover:text-indigo-500 transition-colors" />
                </div>
                <span className="font-jp text-3xl sm:text-4xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors my-0.5">
                  {item.char}
                </span>
                <span className="text-xs font-extrabold text-indigo-600 tracking-wide">
                  {item.romaji}
                </span>
              </motion.div>
            ))}
          </div>

          {filteredChartData.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-xs sm:text-sm">
              <p>Tidak ada huruf yang cocok dengan pencarian "{chartSearch}"</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

