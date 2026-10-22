import { useState } from 'react';
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
  Check,
  XCircle,
} from 'lucide-react';
import {
  PARTIKEL_GUIDE,
  GRAMMAR_QUIZ_QUESTIONS,
} from '../data/tatabahasaData';
import {
  playCorrectSound,
  playWrongSound,
  playPopSound,
  playFanfareSound,
  speakJapanese,
} from '../utils/audio';

export default function TataBahasa() {
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' | 'guide'

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

  const currentQuestion = GRAMMAR_QUIZ_QUESTIONS[currentIndex];

  const handleAnswer = (option, idx) => {
    if (isTransitioning || quizStatus !== 'idle') return;

    setSelectedOption(idx);
    setIsTransitioning(true);

    const isCorrect = option === currentQuestion.correct;

    if (isCorrect) {
      setQuizStatus('correct');
      const nextStreak = streak + 1;
      setStreak(nextStreak);
      if (nextStreak > bestStreak) setBestStreak(nextStreak);
      setScore((prev) => prev + 20 + Math.min(nextStreak * 5, 40));
      setCorrectCount((prev) => prev + 1);

      playCorrectSound(nextStreak);
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.65 },
        colors: ['#059669', '#3b82f6', '#f59e0b', '#ec4899'],
      });

      // Ucapkan kalimat yang sudah lengkap
      const fullSentence = currentQuestion.question.replace('[ ? ]', option);
      speakJapanese(fullSentence);

      setTimeout(() => {
        if (currentIndex + 1 >= GRAMMAR_QUIZ_QUESTIONS.length) {
          setQuizFinished(true);
          playFanfareSound();
        } else {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setQuizStatus('idle');
          setIsTransitioning(false);
        }
      }, 1000);
    } else {
      setQuizStatus('wrong');
      setStreak(0);
      setWrongCount((prev) => prev + 1);
      playWrongSound();

      setTimeout(() => {
        if (currentIndex + 1 >= GRAMMAR_QUIZ_QUESTIONS.length) {
          setQuizFinished(true);
        } else {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOption(null);
          setQuizStatus('idle');
          setIsTransitioning(false);
        }
      }, 1600);
    }
  };

  const initQuiz = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setQuizStatus('idle');
    setIsTransitioning(false);
    setStreak(0);
    setScore(0);
    setCorrectCount(0);
    setWrongCount(0);
    setQuizFinished(false);
  };

  const totalAnswered = correctCount + wrongCount;
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 100;
  const progressPercent = Math.round(((currentIndex + 1) / GRAMMAR_QUIZ_QUESTIONS.length) * 100);

  return (
    <section id="tatabahasa-section" className="py-2 px-3 sm:px-4 max-w-md mx-auto space-y-3 sm:space-y-3.5">
      {/* ================= JUDUL UTAMA ================= */}
      <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight text-center pt-1">
        Partikel & Tata Bahasa N5
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
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Kuis Partikel</span>
          </button>
          <button
            onClick={() => {
              playPopSound();
              setActiveTab('guide');
            }}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>10 Panduan Partikel</span>
          </button>
        </div>

        {/* Progress Bar Mini */}
        {activeTab === 'quiz' && (
          <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden soft-inner-shadow">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}
      </div>

      {activeTab === 'quiz' ? (
        <div className="space-y-3 sm:space-y-3.5">
          {/* ================= 2. CARD QUIZ (Di Bawah Mode Agar Tetap Terlihat Saat Keyboard Terbuka) ================= */}
          {!quizFinished && currentQuestion ? (
            <motion.div
              key={currentQuestion.id}
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
                  Lengkapi Partikel [ ? ]
                </span>
                <button
                  onClick={() => speakJapanese(currentQuestion.question.replace('[ ? ]', ''))}
                  title="Dengarkan kalimat"
                  className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer active:scale-90"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Kalimat Soal */}
              <div className="my-2 sm:my-3 text-center">
                <div className="font-jp text-lg sm:text-2xl font-black text-slate-800 tracking-wide leading-relaxed">
                  {currentQuestion.question.split('[ ? ]')[0]}
                  <span className="inline-block px-2 py-0.5 mx-1 rounded-xl bg-indigo-50 border-2 border-dashed border-indigo-400 text-indigo-700 font-bold">
                    {quizStatus === 'idle' ? '?' : currentQuestion.correct}
                  </span>
                  {currentQuestion.question.split('[ ? ]')[1]}
                </div>
                <p className="text-[10px] sm:text-xs text-slate-400 mt-1 font-mono">
                  {currentQuestion.romaji}
                </p>
                <p className="text-xs font-semibold text-slate-600 mt-0.5">
                  Arti: "{currentQuestion.arti}"
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
                    <span>Tepat Sekali! Partikel 「{currentQuestion.correct}」 🎉</span>
                  </motion.div>
                )}
                {quizStatus === 'wrong' && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-500 text-white font-extrabold text-xs"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Kurang Tepat! Yang benar: 「{currentQuestion.correct}」</span>
                  </motion.div>
                )}
                {quizStatus === 'idle' && (
                  <span className="text-[11px] font-semibold text-slate-500">
                    Pilih partikel yang tepat untuk mengisi kurung [ ? ]:
                  </span>
                )}
              </div>

              {/* 4 Pilihan Partikel */}
              <div className="grid grid-cols-4 gap-2">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  let btnStyle = 'bg-slate-50 hover:bg-emerald-50 border-slate-200 text-slate-800 hover:border-emerald-300';
                  if (quizStatus !== 'idle') {
                    if (opt === currentQuestion.correct) {
                      btnStyle = 'bg-emerald-500 text-white border-emerald-500 shadow-md';
                    } else if (isSelected) {
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
                      className={`py-2.5 sm:py-3 px-1 rounded-2xl font-jp text-lg sm:text-xl font-black border transition-all cursor-pointer active:scale-95 ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {/* Penjelasan jika sudah dijawab */}
              {quizStatus !== 'idle' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2.5 p-2.5 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-[11px] text-indigo-800"
                >
                  💡 <span className="font-bold">Penjelasan:</span> {currentQuestion.explanation}
                </motion.div>
              )}

              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[10px] sm:text-[11px] text-slate-400">
                <span>Partikel Kalimat N5</span>
                <button
                  onClick={initQuiz}
                  className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Mulai Ulang</span>
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 soft-shadow-lg text-center">
              <Trophy className="w-12 h-12 text-emerald-500 mx-auto mb-2" />
              <h3 className="text-xl font-black text-slate-800">Kuis Partikel Selesai! 🎉</h3>
              <p className="text-slate-500 text-xs mt-1">Skor Akhir: {score} • Akurasi: {accuracy}%</p>
              <button
                onClick={initQuiz}
                className="mt-4 w-full py-3 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white soft-shadow cursor-pointer transition-all text-xs sm:text-sm"
              >
                Latihan Lagi
              </button>
            </div>
          )}

          {/* ================= 3. INFO STATS (Paling Bawah) ================= */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-[10px]">
                <Flame className={`w-3 h-3 ${streak >= 3 ? 'animate-bounce text-orange-500' : ''}`} />
                <span>Streak</span>
              </div>
              <span className="text-sm font-black text-slate-800">{streak}</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-emerald-600 font-extrabold text-[10px]">
                <Trophy className="w-3 h-3" />
                <span>Skor</span>
              </div>
              <span className="text-sm font-black text-slate-800">{score}</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-sky-500 font-extrabold text-[10px]">
                <CheckCircle2 className="w-3 h-3" />
                <span>Akurasi</span>
              </div>
              <span className="text-sm font-black text-slate-800">{accuracy}%</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400">Soal</span>
              <span className="text-sm font-black text-slate-800">
                {currentIndex + 1}/{GRAMMAR_QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* ================= PANDUAN PARTIKEL ================= */
        <div className="space-y-2.5">
          {PARTIKEL_GUIDE.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-2xl p-3 sm:p-4 border border-slate-100 soft-shadow-sm hover:border-emerald-200 transition-all space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-jp text-lg font-black text-emerald-600">
                  {item.partikel}
                </span>
                <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                  {item.fungsi}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.penjelasan}</p>

              <div className="p-2 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-jp font-bold text-slate-800 text-xs block">
                    {item.contoh}
                  </span>
                  <span className="text-[10px] text-slate-500">{item.arti}</span>
                </div>
                <button
                  onClick={() => speakJapanese(item.contoh)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 cursor-pointer active:scale-90"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
