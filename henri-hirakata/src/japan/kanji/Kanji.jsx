import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [streak, setStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Kamus State
  const [searchQuery, setSearchQuery] = useState('');
  const [listCategory, setListCategory] = useState('all');
  const [activeKanjiDetail, setActiveKanjiDetail] = useState(null);

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

  const handleSelectCategory = (catId) => {
    setSelectedCat(catId);
    initQuiz(catId);
  };

  const currentCard = deck[currentIndex] || deck[0];

  // Generate 4 Multiple Choice Options (1 benar, 3 salah)
  const quizOptions = useMemo(() => {
    if (!currentCard) return [];
    const correctAnswer = currentCard.meaning;
    const otherOptions = KANJI_N5_DATA.filter((k) => k.meaning !== correctAnswer)
      .map((k) => k.meaning);
    const shuffledOthers = shuffleKanji(otherOptions).slice(0, 3);
    const combined = [
      { text: correctAnswer, isCorrect: true },
      ...shuffledOthers.map((m) => ({ text: m, isCorrect: false })),
    ];
    return shuffleKanji(combined);
  }, [currentCard]);

  const handleAnswer = (option, idx) => {
    if (isTransitioning || quizStatus !== 'idle') return;

    setSelectedOption(idx);
    setIsTransitioning(true);

    if (option.isCorrect) {
      setQuizStatus('correct');
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore((prev) => prev + 10 + Math.min(newStreak * 2, 20));
      setCorrectCount((prev) => prev + 1);
      playCorrectSound();

      if (newStreak % 5 === 0) {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      }

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
    <section id="kanji-section" className="py-2 px-3 sm:px-4 max-w-md mx-auto space-y-3 sm:space-y-3.5">
      {/* ================= JUDUL UTAMA ================= */}
      <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight text-center pt-1">
        Kuis & Kamus Kanji N5
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
                ? 'bg-white text-purple-600 shadow-sm'
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
                ? 'bg-white text-purple-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Daftar 105 Kanji</span>
          </button>
        </div>

        {/* Progress Bar Mini */}
        {activeTab === 'quiz' && (
          <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden soft-inner-shadow">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-400 to-amber-400 rounded-full transition-all duration-300"
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
              {/* Header Kartu */}
              <div className="flex items-center justify-between mb-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                  {currentCard.strokes} Coretan • JLPT N5
                </span>
                <button
                  onClick={() => speakJapanese(currentCard.char)}
                  title="Dengarkan pengucapan"
                  className="p-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-600 transition-colors cursor-pointer active:scale-90"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Big Kanji */}
              <div className="my-2 sm:my-3 text-center select-none">
                <span
                  onClick={() => speakJapanese(currentCard.char)}
                  className="font-jp text-6xl sm:text-7xl font-black text-slate-800 hover:text-purple-600 transition-colors cursor-pointer inline-block leading-tight"
                >
                  {currentCard.char}
                </span>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1">
                  Onyomi: <span className="font-bold text-slate-600">{currentCard.onyomi}</span> • Kunyomi: <span className="font-bold text-slate-600">{currentCard.kunyomi}</span>
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
                    <span>Benar! Arti: {currentCard.meaning} 🎉</span>
                  </motion.div>
                )}
                {quizStatus === 'wrong' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-xs"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Kurang Tepat! Jawaban: {currentCard.meaning}</span>
                  </motion.div>
                )}
                {quizStatus === 'idle' && (
                  <span className="text-[11px] font-semibold text-slate-500">
                    Pilihlah arti bahasa Indonesia yang tepat:
                  </span>
                )}
              </div>

              {/* Multiple Choice Options */}
              <div className="grid grid-cols-2 gap-2">
                {quizOptions.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'bg-slate-50 hover:bg-purple-50 border-slate-200 text-slate-700 hover:border-purple-300';
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

              {/* Footer Kartu */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                <span className="truncate max-w-[190px]">Contoh: {currentCard.example}</span>
                <button
                  onClick={() => initQuiz()}
                  className="flex items-center gap-1 text-slate-500 hover:text-purple-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Acak Baru</span>
                </button>
              </div>
            </motion.div>
          ) : (
            /* Modal Selesai */
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 soft-shadow-lg text-center">
              <Trophy className="w-12 h-12 text-purple-500 mx-auto mb-2" />
              <h3 className="text-xl font-black text-slate-800">Kuis Kanji Selesai! 🎉</h3>
              <p className="text-slate-500 text-xs mt-1">Skor Akhir: {score} • Akurasi: {accuracy}%</p>
              <button
                onClick={() => initQuiz()}
                className="mt-4 w-full py-3 rounded-2xl font-black bg-purple-600 hover:bg-purple-700 active:scale-95 text-white soft-shadow cursor-pointer transition-all text-xs sm:text-sm"
              >
                Main Lagi (Acak Ulang)
              </button>
            </div>
          )}

          {/* ================= 3. PILIHAN KATEGORI KANJI (Di Bawah Card Kuis) ================= */}
          <div className="space-y-1.5 pt-0.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-1 block">
              Pilihan Kategori Kanji
            </span>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
              {KANJI_N5_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playPopSound();
                    handleSelectCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                    selectedCat === cat.id
                      ? 'bg-purple-600 text-white soft-shadow-sm'
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
              <div className="flex items-center gap-0.5 text-purple-600 font-extrabold text-[10px]">
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
        /* ================= DAFTAR LENGKAP KANJI N5 ================= */
        <div className="space-y-3">
          <div className="flex flex-col gap-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari kanji, arti, onyomi (cth: 日, hari, nichi)..."
                className="w-full pl-9 pr-3 py-2 rounded-2xl bg-white border border-slate-200 soft-inner-shadow focus:outline-none focus:border-purple-500 text-xs font-medium"
              />
            </div>

            <div className="flex gap-1.5 w-full overflow-x-auto no-scrollbar pb-0.5">
              {KANJI_N5_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    playPopSound();
                    setListCategory(cat.id);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer shrink-0 ${
                    listCategory === cat.id
                      ? 'bg-purple-600 text-white shadow-sm'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-[10px] text-slate-500">
            💡 Tips: Ketuk kartu Kanji untuk melihat detail cara baca dan contoh kosakata lengkap!
          </p>

          {/* Grid Kanji Responsif (3 kolom di HP) */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {filteredList.map((k) => (
              <motion.div
                key={k.id}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => {
                  playPopSound();
                  setActiveKanjiDetail(k);
                  speakJapanese(k.char);
                }}
                className="bg-white/95 rounded-2xl p-2 sm:p-3 border border-slate-100 soft-shadow-sm hover:soft-shadow hover:border-purple-200 transition-all flex flex-col items-center justify-center text-center cursor-pointer group active:bg-purple-50"
              >
                <span className="text-[8px] font-bold text-slate-400 mb-0.5">
                  {k.strokes} coretan
                </span>
                <span className="font-jp text-3xl sm:text-4xl font-black text-slate-800 group-hover:text-purple-600 transition-colors my-0.5">
                  {k.char}
                </span>
                <span className="text-[10px] font-bold text-slate-700 line-clamp-1">{k.meaning}</span>
                <span className="text-[9px] text-purple-600 font-semibold">{k.onyomi.split(',')[0]}</span>
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
                  className="bg-white rounded-3xl p-5 max-w-xs w-full soft-shadow-lg border border-slate-100 text-center relative"
                >
                  <button
                    onClick={() => setActiveKanjiDetail(null)}
                    className="absolute top-3.5 right-3.5 p-1.5 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 cursor-pointer active:scale-90"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="font-jp text-5xl font-black text-purple-600 my-1">
                    {activeKanjiDetail.char}
                  </div>
                  <h3 className="text-base font-black text-slate-800">{activeKanjiDetail.meaning}</h3>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    {activeKanjiDetail.strokes} Coretan • JLPT N5
                  </span>

                  <div className="my-3 p-2.5 rounded-2xl bg-slate-50 border border-slate-100 text-left space-y-1 text-xs">
                    <div>
                      <span className="font-bold text-slate-500 block text-[9px]">Onyomi (Katakana):</span>
                      <span className="font-semibold text-purple-700 text-[11px]">{activeKanjiDetail.onyomi}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block text-[9px]">Kunyomi (Hiragana):</span>
                      <span className="font-semibold text-pink-700 text-[11px]">{activeKanjiDetail.kunyomi}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-500 block text-[9px]">Contoh Kosakata:</span>
                      <span className="font-semibold text-slate-800 text-[11px]">{activeKanjiDetail.example}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => speakJapanese(activeKanjiDetail.char)}
                    className="w-full py-2.5 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 transition-all"
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
