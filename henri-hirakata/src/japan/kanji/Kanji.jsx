import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Sparkles,
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
  KANJI_N5_DATA,
  KANJI_N5_CATEGORIES,
  getKanjiByCategory,
  shuffleKanji,
} from '../data/kanjiData';
import {
  playCorrectSound,
  playWrongSound,
  playPopSound,
  playFanfareSound,
  speakJapanese,
} from '../utils/audio';

export default function Kanji() {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'list'
  const [selectedCat, setSelectedCat] = useState('all');

  // Quiz State
  const [deck, setDeck] = useState(() => shuffleKanji(getKanjiByCategory('all')));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quizStatus, setQuizStatus] = useState('idle'); // 'idle' | 'correct' | 'wrong'
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Stats
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Modal Detail Kanji
  const [activeKanjiDetail, setActiveKanjiDetail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [listCategory, setListCategory] = useState('all');

  const currentCard = deck[currentIndex] || deck[0];

  // Generate 4 Multiple Choice Options (1 Benar + 3 Pengecoh)
  const quizOptions = useMemo(() => {
    if (!currentCard) return [];
    const pool = KANJI_N5_DATA.filter((k) => k.id !== currentCard.id);
    const shuffledPool = shuffleKanji(pool).slice(0, 3);
    const options = [
      { text: currentCard.meaning, isCorrect: true },
      ...shuffledPool.map((p) => ({ text: p.meaning, isCorrect: false })),
    ];
    // Acak posisi pilihan
    return shuffleKanji(options);
  }, [currentCard]);

  const initQuiz = (cat = selectedCat) => {
    const list = getKanjiByCategory(cat);
    const shuffled = shuffleKanji(list);
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
      setScore((prev) => prev + 15 + Math.min(nextStreak * 3, 30));
      setCorrectCount((prev) => prev + 1);

      playCorrectSound(nextStreak);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.65 },
        colors: ['#4f46e5', '#10b981', '#f59e0b', '#ec4899'],
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

  // Filter List Kanji
  const filteredList = KANJI_N5_DATA.filter((k) => {
    const matchCat = listCategory === 'all' || k.category === listCategory;
    const matchSearch =
      searchQuery === '' ||
      k.char.includes(searchQuery) ||
      k.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.onyomi.toLowerCase().includes(searchQuery.toLowerCase()) ||
      k.kunyomi.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalAnswered = correctCount + wrongCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 100;
  const progressPercent = deck.length > 0 ? Math.round(((currentIndex + 1) / deck.length) * 100) : 0;

  return (
    <section className="py-6 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Kanji N5 */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-2.5 soft-shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
          <span>Modul Kanji JLPT N5 • 105 Karakter Inti</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
          Kuis & Kamus Kanji N5
        </h1>
        <p className="mt-1.5 text-slate-500 text-xs sm:text-base max-w-xl mx-auto px-2">
          Hafalkan arti, cara baca (Onyomi & Kunyomi), dan contoh kata Kanji standar ujian JLPT N5 dengan kuis interaktif yang adiktif!
        </p>

        {/* Tab Switcher */}
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
              setActiveTab('list');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'list'
                ? 'bg-white text-indigo-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Daftar 105 Kanji</span>
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        <div className="space-y-4 sm:space-y-6">
          {/* Filter Kategori (Swipeable di HP) */}
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1 px-1 justify-start sm:justify-center">
            {KANJI_N5_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  playPopSound();
                  handleSelectCategory(cat.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                  selectedCat === cat.id
                    ? 'bg-indigo-600 text-white soft-shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <span>{cat.name}</span>
                <span className="ml-1 opacity-70">({cat.count})</span>
              </button>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-4 max-w-xl mx-auto">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-[10px] sm:text-xs">
                <Flame className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${streak >= 3 ? 'animate-bounce text-orange-500' : ''}`} />
                <span>Streak</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-800">{streak}</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-indigo-600 font-extrabold text-[10px] sm:text-xs">
                <Trophy className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Skor</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-800">{score}</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-emerald-500 font-extrabold text-[10px] sm:text-xs">
                <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                <span>Akurasi</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-800">{accuracy}%</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400">Progres</span>
              <span className="text-base sm:text-lg font-black text-slate-800">
                {deck.length > 0 ? `${currentIndex + 1}/${deck.length}` : '0/0'}
              </span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="max-w-xl mx-auto px-1">
            <div className="w-full bg-slate-200/70 h-2 sm:h-2.5 rounded-full overflow-hidden p-0.5 soft-inner-shadow">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Card Kuis Kanji */}
          {!quizFinished && currentCard ? (
            <div className="max-w-md mx-auto">
              <motion.div
                key={currentCard.id}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`relative rounded-3xl p-5 sm:p-8 border-2 transition-all ${
                  quizStatus === 'correct'
                    ? 'bg-emerald-50 border-emerald-400 soft-shadow-success'
                    : quizStatus === 'wrong'
                    ? 'bg-rose-50 border-rose-400 soft-shadow-error'
                    : 'bg-white/95 border-white soft-shadow-lg'
                }`}
              >
                {/* Header Kartu */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                    {currentCard.strokes} Coretan • JLPT N5
                  </span>
                  <button
                    onClick={() => speakJapanese(currentCard.char)}
                    title="Dengarkan pengucapan"
                    className="p-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-600 transition-colors cursor-pointer active:scale-90"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Big Kanji */}
                <div className="my-4 sm:my-6 text-center select-none">
                  <span
                    onClick={() => speakJapanese(currentCard.char)}
                    className="font-jp text-7xl sm:text-8xl font-black text-slate-800 hover:text-indigo-600 transition-colors cursor-pointer inline-block"
                  >
                    {currentCard.char}
                  </span>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5">
                    Onyomi: <span className="font-bold text-slate-600">{currentCard.onyomi}</span> • Kunyomi: <span className="font-bold text-slate-600">{currentCard.kunyomi}</span>
                  </p>
                </div>

                {/* Banner Status */}
                <div className="min-h-[2.25rem] flex items-center justify-center mb-3">
                  {quizStatus === 'correct' && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-xs sm:text-sm"
                    >
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Benar! Arti: {currentCard.meaning} 🎉</span>
                    </motion.div>
                  )}
                  {quizStatus === 'wrong' && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500 text-white font-extrabold text-xs sm:text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Kurang Tepat! Jawaban: {currentCard.meaning}</span>
                    </motion.div>
                  )}
                  {quizStatus === 'idle' && (
                    <span className="text-xs font-semibold text-slate-500">
                      Pilihlah arti bahasa Indonesia yang tepat:
                    </span>
                  )}
                </div>

                {/* Multiple Choice Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {quizOptions.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    let btnStyle = 'bg-slate-50 hover:bg-indigo-50 border-slate-200 text-slate-700 hover:border-indigo-300';
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
                        className={`p-3 sm:p-3.5 rounded-2xl font-bold text-xs sm:text-sm text-left border-2 transition-all flex items-center justify-between cursor-pointer active:scale-98 ${btnStyle}`}
                      >
                        <span>{opt.text}</span>
                        {quizStatus !== 'idle' && opt.isCorrect && (
                          <Check className="w-4 h-4 stroke-[3]" />
                        )}
                        {quizStatus !== 'idle' && isSelected && !opt.isCorrect && (
                          <X className="w-4 h-4 stroke-[3]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Footer Kuis */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
                  <span className="truncate max-w-[200px]">Contoh: {currentCard.example}</span>
                  <button
                    onClick={() => initQuiz()}
                    className="flex items-center gap-1 text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Acak Baru</span>
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            /* Modal Selesai */
            <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 soft-shadow-lg text-center">
              <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-indigo-500 mx-auto mb-3" />
              <h3 className="text-xl sm:text-2xl font-black text-slate-800">Kuis Kanji Selesai! 🎉</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Skor Akhir: {score} • Akurasi: {accuracy}%</p>
              <button
                onClick={() => initQuiz()}
                className="mt-5 w-full py-3.5 rounded-2xl font-black bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white soft-shadow cursor-pointer transition-all"
              >
                Main Lagi (Acak Ulang)
              </button>
            </div>
          )}
        </div>
      ) : (
        /* ================= DAFTAR LENGKAP KANJI N5 ================= */
        <div className="space-y-4 sm:space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-2.5 max-w-2xl mx-auto">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari karakter, arti, atau cara baca (cth: 日, hari, nichi)..."
                className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl bg-white border border-slate-200 soft-inner-shadow focus:outline-none focus:border-indigo-500 text-xs sm:text-sm font-medium"
              />
            </div>

            <div className="flex gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar pb-1 sm:pb-0">
              {KANJI_N5_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playPopSound();
                    setListCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    listCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-[11px] sm:text-xs text-slate-500">
            💡 Tips: Ketuk kartu Kanji untuk melihat detail cara baca dan contoh kosakata lengkap!
          </p>

          {/* Grid Kanji Responsif (3 kolom di HP, 4 di tablet, 6 di desktop) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3.5">
            {filteredList.map((k) => (
              <motion.div
                key={k.id}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  playPopSound();
                  setActiveKanjiDetail(k);
                  speakJapanese(k.char);
                }}
                className="bg-white/95 rounded-2xl p-2.5 sm:p-4 border border-slate-100 soft-shadow-sm hover:soft-shadow hover:border-indigo-200 transition-all flex flex-col items-center justify-center text-center cursor-pointer group active:bg-indigo-50"
              >
                <span className="text-[9px] font-bold text-slate-400 mb-0.5">
                  {k.strokes} coretan
                </span>
                <span className="font-jp text-3xl sm:text-4xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors my-0.5">
                  {k.char}
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-slate-700 line-clamp-1">{k.meaning}</span>
                <span className="text-[10px] text-indigo-500 font-semibold">{k.onyomi.split(',')[0]}</span>
              </motion.div>
            ))}
          </div>

          {/* Modal Detail Kanji Popup */}
          <AnimatePresence>
            {activeKanjiDetail && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className="bg-white rounded-3xl p-5 sm:p-8 max-w-xs sm:max-w-sm w-full soft-shadow-lg border border-slate-100 text-center relative"
                >
                  <button
                    onClick={() => setActiveKanjiDetail(null)}
                    className="absolute top-3.5 right-3.5 p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer active:scale-90"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="font-jp text-6xl sm:text-7xl font-black text-indigo-600 my-1">
                    {activeKanjiDetail.char}
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-slate-800">{activeKanjiDetail.meaning}</h3>
                  <span className="text-[11px] text-slate-400 font-semibold">
                    {activeKanjiDetail.strokes} Coretan • JLPT N5
                  </span>

                  <div className="my-3.5 p-3 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-1.5 text-xs">
                    <div>
                      <span className="font-bold text-slate-500 block text-[10px]">Onyomi (Katakana):</span>
                      <span className="font-semibold text-indigo-700">{activeKanjiDetail.onyomi}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block text-[10px]">Kunyomi (Hiragana):</span>
                      <span className="font-semibold text-purple-700">{activeKanjiDetail.kunyomi}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block text-[10px]">Contoh Kosakata:</span>
                      <span className="font-semibold text-slate-800">{activeKanjiDetail.example}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => speakJapanese(activeKanjiDetail.char)}
                    className="w-full py-2.5 sm:py-3 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Dengarkan Pengucapan</span>
                  </button>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}

