import { useState } from 'react';
import { motion } from 'framer-motion';
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
        particleCount: 50,
        spread: 60,
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
    <section className="py-6 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header Tata Bahasa */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold mb-2.5 soft-shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
          <span>Modul Partikel & Tata Bahasa JLPT N5</span>
        </div>
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-800 tracking-tight">
          Partikel & Tata Bahasa N5
        </h1>
        <p className="mt-1.5 text-slate-500 text-xs sm:text-base max-w-xl mx-auto px-2">
          Kuasai pemakaian partikel (は, を, に, で, へ, が, と, dll.) yang menjadi penentu utama kelulusan ujian bahasa Jepang level N5.
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
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Gamepad2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Kuis Partikel</span>
          </button>
          <button
            onClick={() => {
              playPopSound();
              setActiveTab('guide');
            }}
            className={`flex items-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-white text-emerald-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>10 Panduan Partikel</span>
          </button>
        </div>
      </div>

      {activeTab === 'quiz' ? (
        <div className="space-y-4 sm:space-y-6">
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
              <div className="flex items-center gap-0.5 text-emerald-600 font-extrabold text-[10px] sm:text-xs">
                <Trophy className="w-3.5 h-3.5" />
                <span>Skor</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-800">{score}</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-sky-500 font-extrabold text-[10px] sm:text-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Akurasi</span>
              </div>
              <span className="text-base sm:text-lg font-black text-slate-800">{accuracy}%</span>
            </div>
            <div className="bg-white/90 backdrop-blur-md rounded-2xl p-2 sm:p-3 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[10px] sm:text-xs font-bold text-slate-400">Soal</span>
              <span className="text-base sm:text-lg font-black text-slate-800">
                {currentIndex + 1}/{GRAMMAR_QUIZ_QUESTIONS.length}
              </span>
            </div>
          </div>

          {/* Progress */}
          <div className="max-w-xl mx-auto px-1">
            <div className="w-full bg-slate-200/70 h-2 sm:h-2.5 rounded-full overflow-hidden p-0.5 soft-inner-shadow">
              <div
                className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Quiz Card */}
          {!quizFinished && currentQuestion ? (
            <div className="max-w-lg mx-auto">
              <motion.div
                key={currentQuestion.id}
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
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase tracking-wider bg-slate-100 text-slate-600">
                    Lengkapi Partikel [ ? ]
                  </span>
                  <button
                    onClick={() => speakJapanese(currentQuestion.question.replace('[ ? ]', ''))}
                    title="Dengarkan kalimat"
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors cursor-pointer active:scale-90"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Kalimat Soal */}
                <div className="my-4 sm:my-6 text-center">
                  <div className="font-jp text-xl sm:text-3xl font-black text-slate-800 tracking-wide leading-relaxed">
                    {currentQuestion.question.split('[ ? ]')[0]}
                    <span className="inline-block px-2.5 sm:px-3 py-0.5 mx-1 rounded-xl bg-indigo-50 border-2 border-dashed border-indigo-400 text-indigo-700 font-bold">
                      {quizStatus === 'idle'
                        ? '?'
                        : currentQuestion.correct}
                    </span>
                    {currentQuestion.question.split('[ ? ]')[1]}
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-400 mt-1.5 font-mono">
                    {currentQuestion.romaji}
                  </p>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                    Arti: "{currentQuestion.arti}"
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
                      <span>Tepat Sekali! Partikel 「{currentQuestion.correct}」 🎉</span>
                    </motion.div>
                  )}
                  {quizStatus === 'wrong' && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500 text-white font-extrabold text-xs sm:text-sm"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Kurang Tepat! Yang benar: 「{currentQuestion.correct}」</span>
                    </motion.div>
                  )}
                  {quizStatus === 'idle' && (
                    <span className="text-xs font-semibold text-slate-500">
                      Pilih partikel yang tepat untuk mengisi kurung [ ? ]:
                    </span>
                  )}
                </div>

                {/* 4 Pilihan Partikel */}
                <div className="grid grid-cols-4 gap-2 sm:gap-3">
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
                        className={`py-3 sm:py-3.5 px-1 sm:px-2 rounded-2xl font-jp text-lg sm:text-xl font-black border-2 transition-all cursor-pointer active:scale-95 ${btnStyle}`}
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
                    className="mt-3.5 p-3 rounded-2xl bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-800"
                  >
                    💡 <span className="font-bold">Penjelasan:</span> {currentQuestion.explanation}
                  </motion.div>
                )}

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] sm:text-xs text-slate-400">
                  <span>Partikel Kalimat N5</span>
                  <button
                    onClick={initQuiz}
                    className="flex items-center gap-1 text-slate-500 hover:text-emerald-600 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Mulai Ulang</span>
                  </button>
                </div>
              </motion.div>
            </div>
          ) : (
            <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 soft-shadow-lg text-center">
              <Trophy className="w-14 h-14 sm:w-16 sm:h-16 text-emerald-500 mx-auto mb-3" />
              <h3 className="text-xl sm:text-2xl font-black text-slate-800">Kuis Partikel Selesai! 🎉</h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-1">Skor Akhir: {score} • Akurasi: {accuracy}%</p>
              <button
                onClick={initQuiz}
                className="mt-5 w-full py-3.5 rounded-2xl font-black bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white soft-shadow cursor-pointer transition-all"
              >
                Latihan Lagi
              </button>
            </div>
          )}
        </div>
      ) : (
        /* PANDUAN PARTIKEL */
        <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          {PARTIKEL_GUIDE.map((item, idx) => (
            <div
              key={idx}
              className="bg-white/95 rounded-2xl p-4 sm:p-5 border border-slate-100 soft-shadow-sm hover:border-emerald-200 transition-all space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="font-jp text-lg sm:text-xl font-black text-emerald-600">
                  {item.partikel}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {item.fungsi}
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{item.penjelasan}</p>

              <div className="p-2.5 sm:p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-jp font-bold text-slate-800 text-xs sm:text-sm block">
                    {item.contoh}
                  </span>
                  <span className="text-[11px] sm:text-xs text-slate-500">{item.arti}</span>
                </div>
                <button
                  onClick={() => speakJapanese(item.contoh)}
                  className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 cursor-pointer active:scale-90"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
