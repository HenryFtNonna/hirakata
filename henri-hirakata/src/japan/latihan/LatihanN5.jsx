import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { SIMULASI_N5_QUESTIONS } from '../data/simulasiData';
import {
  playCorrectSound,
  playWrongSound,
  playFanfareSound,
} from '../utils/audio';

export default function LatihanN5() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = SIMULASI_N5_QUESTIONS[currentIndex];

  const handleSelectOption = (idx) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: idx,
    }));
  };

  const handleNext = () => {
    const isAnswerCorrect = selectedAnswers[currentIndex] === currentQ.answer;
    if (isAnswerCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }

    if (currentIndex + 1 >= SIMULASI_N5_QUESTIONS.length) {
      setIsFinished(true);
      playFanfareSound();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setIsFinished(false);
  };

  // Hitung Skor
  const correctCount = SIMULASI_N5_QUESTIONS.reduce((acc, q, idx) => {
    return acc + (selectedAnswers[idx] === q.answer ? 1 : 0);
  }, 0);
  const totalQuestions = SIMULASI_N5_QUESTIONS.length;
  const scorePercent = Math.round((correctCount / totalQuestions) * 100);
  const isPassed = scorePercent >= 60;

  return (
    <section className="py-6 sm:py-12 px-3 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-semibold mb-2.5 soft-shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
          <span>Simulasi Ujian JLPT N5 (15 Soal Campuran)</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-slate-800 tracking-tight">
          Simulasi Tes JLPT N5
        </h1>
        <p className="mt-1.5 text-slate-500 text-xs sm:text-sm max-w-lg mx-auto px-2">
          Uji kesiapan Anda untuk JLPT N5 dengan soal mencakup Huruf, Kanji, Kosakata, dan Tata Bahasa Partikel.
        </p>
      </div>

      {!isFinished ? (
        <div className="max-w-2xl mx-auto space-y-4 sm:space-y-6">
          {/* Progress Bar & Counter */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400 px-1">
            <span>Kategori: {currentQ.tipe}</span>
            <span>Soal {currentIndex + 1} dari {totalQuestions}</span>
          </div>

          <div className="w-full bg-slate-200/70 h-2 sm:h-2.5 rounded-full overflow-hidden p-0.5 soft-inner-shadow">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${Math.round(((currentIndex + 1) / totalQuestions) * 100)}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 rounded-3xl p-5 sm:p-8 border border-slate-100 soft-shadow-lg space-y-4 sm:space-y-6"
          >
            <div className="inline-block px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase bg-indigo-50 text-indigo-700">
              {currentQ.tipe}
            </div>

            <h3 className="font-jp text-lg sm:text-2xl font-black text-slate-800 leading-relaxed">
              {currentQ.question}
            </h3>

            {/* Options */}
            <div className="space-y-2 sm:space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-3.5 sm:p-4 rounded-2xl font-bold text-xs sm:text-sm text-left border-2 transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-800 soft-shadow-sm'
                        : 'bg-slate-50/80 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-indigo-600 bg-indigo-600 text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentIndex] === undefined}
              className="w-full py-3.5 sm:py-4 rounded-2xl font-black text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white soft-shadow flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{currentIndex + 1 === totalQuestions ? 'Lihat Hasil Akhir' : 'Soal Selanjutnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      ) : (
        /* Result Screen */
        <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 soft-shadow-lg text-center"
          >
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-3xl flex items-center justify-center mb-3 sm:mb-4 ${
                isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}
            >
              {isPassed ? <Trophy className="w-8 h-8 sm:w-10 sm:h-10" /> : <XCircle className="w-8 h-8 sm:w-10 sm:h-10" />}
            </div>

            <span
              className={`px-3 py-1 rounded-full text-[10px] sm:text-xs font-black uppercase ${
                isPassed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {isPassed ? 'LULUS SIMULASI N5 🎉' : 'BELUM LULUS (Perlu Latihan Lagi)'}
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-slate-800 mt-2">
              Skor Anda: {scorePercent}%
            </h2>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Benar {correctCount} dari {totalQuestions} pertanyaan (Standar kelulusan: 60%).
            </p>

            <button
              onClick={handleRestart}
              className="mt-5 px-6 py-3 sm:py-3.5 rounded-2xl font-black text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white soft-shadow inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Simulasi Tes</span>
            </button>
          </motion.div>

          {/* Review of Questions */}
          <div className="space-y-3 sm:space-y-4">
            <h3 className="text-base sm:text-lg font-black text-slate-800">Pembahasan Jawaban:</h3>
            {SIMULASI_N5_QUESTIONS.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.answer;
              return (
                <div
                  key={q.id}
                  className={`p-3.5 sm:p-4 rounded-2xl border bg-white ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-slate-800 text-xs sm:text-sm">
                      {idx + 1}. {q.question}
                    </p>
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-500 shrink-0" />
                    )}
                  </div>
                  <div className="mt-2 text-[11px] sm:text-xs space-y-1">
                    <p className="text-slate-600">
                      Jawaban Anda: <span className="font-semibold">{q.options[userAns]}</span>
                    </p>
                    {!isCorrect && (
                      <p className="text-emerald-700 font-bold">
                        Jawaban Benar: {q.options[q.answer]}
                      </p>
                    )}
                    <p className="text-indigo-600 bg-indigo-50/80 p-2 rounded-xl mt-1">
                      💡 {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
