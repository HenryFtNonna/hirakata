import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Flame,
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
        particleCount: 80,
        spread: 70,
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
  const answeredCount = Object.keys(selectedAnswers).length;

  return (
    <section id="latihan-section" className="py-2 px-3 sm:px-4 max-w-md mx-auto space-y-3 sm:space-y-3.5">
      {/* ================= JUDUL UTAMA ================= */}
      <h2 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight text-center pt-1">
        Simulasi Ujian JLPT N5
      </h2>

      {!isFinished ? (
        <div className="space-y-3 sm:space-y-3.5">
          {/* ================= 1. KONTROL PROGRESS & COUNTER ================= */}
          <div className="space-y-1.5 pt-0.5">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 px-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 font-extrabold text-[10px]">
                {currentQ.tipe}
              </span>
              <span className="text-[11px] font-extrabold text-slate-400">
                Soal {currentIndex + 1} dari {totalQuestions}
              </span>
            </div>

            <div className="w-full bg-slate-200/70 h-1.5 rounded-full overflow-hidden soft-inner-shadow">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-[#EA4A30] to-indigo-600 rounded-full transition-all duration-300"
                style={{ width: `${Math.round(((currentIndex + 1) / totalQuestions) * 100)}%` }}
              />
            </div>
          </div>

          {/* ================= 2. CARD QUIZ SOAL (Sesuai Sketsa: Posisikan Tinggi Agar Terlihat) ================= */}
          <motion.div
            key={currentQ.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 rounded-3xl p-4 sm:p-5 border border-slate-100 soft-shadow-md space-y-3"
          >
            <div className="inline-block px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-50 text-indigo-700">
              {currentQ.tipe}
            </div>

            <h3 className="font-jp text-base sm:text-lg font-black text-slate-800 leading-snug">
              {currentQ.question}
            </h3>

            {/* Pilihan Jawaban */}
            <div className="space-y-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedAnswers[currentIndex] === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full p-2.5 sm:p-3 rounded-2xl font-bold text-xs sm:text-sm text-left border transition-all flex items-center justify-between cursor-pointer active:scale-98 ${
                      isSelected
                        ? 'bg-rose-50 border-[#EA4A30] text-[#EA4A30] soft-shadow-sm font-extrabold'
                        : 'bg-slate-50/90 hover:bg-slate-100 border-slate-200 text-slate-700'
                    }`}
                  >
                    <span>{opt}</span>
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-[#EA4A30] bg-[#EA4A30] text-white'
                          : 'border-slate-300'
                      }`}
                    >
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Tombol Selanjutnya */}
            <button
              onClick={handleNext}
              disabled={selectedAnswers[currentIndex] === undefined}
              className="w-full py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-[#EA4A30] to-amber-500 hover:brightness-105 active:scale-95 text-white soft-shadow flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>{currentIndex + 1 === totalQuestions ? 'Lihat Skor Akhir' : 'Soal Selanjutnya'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>

          {/* ================= 3. INFO STATS (Paling Bawah) ================= */}
          <div className="grid grid-cols-4 gap-1.5 pt-1">
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400">Terjawab</span>
              <span className="text-sm font-black text-slate-800">{answeredCount}/{totalQuestions}</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-amber-500 font-extrabold text-[10px]">
                <Flame className="w-3 h-3" />
                <span>KKM</span>
              </div>
              <span className="text-sm font-black text-slate-800">60%</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-0.5 text-emerald-500 font-extrabold text-[10px]">
                <CheckCircle2 className="w-3 h-3" />
                <span>Standar</span>
              </div>
              <span className="text-sm font-black text-slate-800">JLPT N5</span>
            </div>
            <div className="bg-white/90 rounded-2xl p-2 border border-slate-100 soft-shadow-sm flex flex-col items-center justify-center text-center">
              <span className="text-[10px] font-bold text-slate-400">Total Soal</span>
              <span className="text-sm font-black text-slate-800">{totalQuestions}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Result Screen */
        <div className="space-y-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-3xl p-5 sm:p-7 border border-slate-100 soft-shadow-lg text-center"
          >
            <div
              className={`w-14 h-14 mx-auto rounded-3xl flex items-center justify-center mb-2.5 ${
                isPassed ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}
            >
              {isPassed ? <Trophy className="w-8 h-8" /> : <XCircle className="w-8 h-8" />}
            </div>

            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                isPassed ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
              }`}
            >
              {isPassed ? 'LULUS SIMULASI N5 🎉' : 'BELUM LULUS (Perlu Latihan Lagi)'}
            </span>

            <h2 className="text-2xl font-black text-slate-800 mt-2">
              Skor Anda: {scorePercent}%
            </h2>
            <p className="text-slate-500 text-xs mt-1">
              Benar {correctCount} dari {totalQuestions} pertanyaan (Standar kelulusan: 60%).
            </p>

            <button
              onClick={handleRestart}
              className="mt-4 px-6 py-3 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-[#EA4A30] to-amber-500 hover:brightness-105 active:scale-95 text-white soft-shadow inline-flex items-center gap-2 cursor-pointer transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Simulasi Tes</span>
            </button>
          </motion.div>

          {/* Pembahasan Jawaban */}
          <div className="space-y-2.5">
            <h3 className="text-sm font-black text-slate-800 px-1">Pembahasan Jawaban:</h3>
            {SIMULASI_N5_QUESTIONS.map((q, idx) => {
              const userAns = selectedAnswers[idx];
              const isCorrect = userAns === q.answer;
              return (
                <div
                  key={q.id}
                  className={`p-3 rounded-2xl border bg-white ${
                    isCorrect ? 'border-emerald-200' : 'border-rose-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-bold text-slate-800 text-xs">
                      {idx + 1}. {q.question}
                    </p>
                    {isCorrect ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                    )}
                  </div>
                  <div className="mt-1.5 text-[11px] space-y-0.5">
                    <p className="text-slate-600">
                      Jawaban Anda: <span className="font-semibold">{q.options[userAns] || '-'}</span>
                    </p>
                    {!isCorrect && (
                      <p className="text-emerald-700 font-bold">
                        Jawaban Benar: {q.options[q.answer]}
                      </p>
                    )}
                    <p className="text-indigo-600 bg-indigo-50/80 p-1.5 rounded-xl mt-1 text-[10px]">
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
