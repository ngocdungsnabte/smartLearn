
import React, { useState, useCallback, useEffect } from 'react';
import { Lesson, QuizQuestion, Exercise, MindMapNode } from '../types';

interface LessonContentProps {
  lesson: Lesson;
}

type TabType = 'keyConcepts' | 'quizzes' | 'exercises';

export const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const [activeTab, setActiveTab] = useState<TabType>('keyConcepts');
  const [showSolution, setShowSolution] = useState<{ [key: string]: boolean }>({});
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: number | null }>({});
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);

  useEffect(() => {
    setActiveTab('keyConcepts');
    setShowSolution({});
    setQuizAnswers({});
    setCurrentQuizIndex(0);
  }, [lesson.id]);

  const playSound = useCallback((isCorrect: boolean) => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      if (isCorrect) {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.1);
      } else {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(110, audioCtx.currentTime);
      }
      gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) { console.warn(e); }
  }, []);

  const handleQuizSelect = (questionId: string, optionIndex: number, isCorrect: boolean) => {
    if (quizAnswers[questionId] !== undefined) return;
    setQuizAnswers(prev => ({ ...prev, [questionId]: optionIndex }));
    playSound(isCorrect);
  };

  const currentQuiz = lesson.quizzes[currentQuizIndex];

  return (
    <div className="max-w-5xl mx-auto py-12 px-6 lg:px-12 animate-fade-in">
      <div className="mb-10 text-center">
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          {lesson.title}
        </h1>
        <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-[72px] lg:top-[88px] z-20 mb-12">
        <div className="bg-white/90 backdrop-blur-md border border-slate-200 p-1.5 rounded-2xl shadow-lg flex flex-wrap gap-1">
          {[
            { id: 'keyConcepts', label: 'Kiến thức trọng tâm', icon: '🧠' },
            { id: 'quizzes', label: 'Trắc nghiệm & Ôn tập', icon: '📝' },
            { id: 'exercises', label: 'Vận dụng & Bài tập', icon: '🛠️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 font-bold text-sm ${
                activeTab === tab.id 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-500 hover:bg-slate-100 hover:text-blue-600'
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-slide-up">
        {activeTab === 'keyConcepts' && (
          <div className="space-y-10">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-8 rounded-r-[2.5rem] shadow-sm">
              <h3 className="text-xl font-black text-blue-900 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10.392A7.968 7.968 0 015.5 14c1.255 0 2.443.29 3.5.804V4.804zM11 4.804A7.968 7.968 0 0114.5 4c1.255 0 2.443.29 3.5.804v10.392a7.968 7.968 0 00-3.5-.804c-1.255 0-2.443.29-3.5.804V4.804z"></path></svg>
                Tóm tắt bài học
              </h3>
              <p className="text-slate-700 text-lg leading-relaxed font-medium">{lesson.description}</p>
            </div>

            {/* Enhanced Mindmap Visualization */}
            <div className="relative py-16 bg-gradient-to-b from-transparent via-blue-50/20 to-transparent rounded-[3rem]">
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <div className="w-full h-full border-[10px] border-blue-200 rounded-full scale-110 blur-xl"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 px-4">
                {lesson.keyConcepts.map((node, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-200/40 transition-all transform hover:-translate-y-2 text-center flex flex-col items-center group">
                    <div className="w-20 h-20 bg-blue-50 text-4xl flex items-center justify-center rounded-3xl mb-6 group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500 shadow-inner group-hover:text-white">
                      {node.icon || '📍'}
                    </div>
                    <h4 className="text-xl font-black text-slate-800 mb-3 group-hover:text-blue-600 transition-colors">{node.title}</h4>
                    <p className="text-slate-600 font-medium leading-relaxed">{node.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'quizzes' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex items-center justify-between px-6 py-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-black">
                  {currentQuizIndex + 1}
                </div>
                <div>
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Câu hỏi</div>
                  <div className="text-sm font-bold text-slate-700">Tiến độ: {currentQuizIndex + 1}/{lesson.quizzes.length}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setCurrentQuizIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQuizIndex === 0}
                  className="p-3 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                <button 
                  onClick={() => setCurrentQuizIndex(prev => Math.min(lesson.quizzes.length - 1, prev + 1))}
                  disabled={currentQuizIndex === lesson.quizzes.length - 1}
                  className="p-3 bg-slate-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 disabled:opacity-30 transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-[3rem] p-10 sm:p-14 shadow-xl shadow-slate-100/50">
              <h3 className="text-2xl sm:text-3xl font-black text-slate-800 mb-12 leading-snug">{currentQuiz.question}</h3>
              <div className="grid gap-5">
                {currentQuiz.options.map((opt, idx) => {
                  const isSelected = quizAnswers[currentQuiz.id] === idx;
                  const showFeedback = quizAnswers[currentQuiz.id] !== undefined;
                  
                  let btnClass = "w-full text-left p-6 rounded-3xl border-2 font-bold transition-all flex items-center gap-5 group ";
                  if (!showFeedback) btnClass += "border-slate-50 bg-slate-50 hover:border-blue-400 hover:bg-white active:scale-[0.98]";
                  else if (isSelected) btnClass += opt.isCorrect ? "border-green-500 bg-green-50 text-green-700 shadow-lg shadow-green-100" : "border-red-500 bg-red-50 text-red-700 shadow-lg shadow-red-100";
                  else btnClass += opt.isCorrect ? "border-green-500 bg-green-50/50 text-green-600" : "border-slate-50 opacity-40";

                  return (
                    <button
                      key={idx}
                      disabled={showFeedback}
                      onClick={() => handleQuizSelect(currentQuiz.id, idx, opt.isCorrect)}
                      className={btnClass}
                    >
                      <span className={`w-12 h-12 rounded-2xl border-2 flex items-center justify-center shrink-0 text-lg transition-all ${
                        !showFeedback ? 'border-slate-200 text-slate-400 group-hover:border-blue-500 group-hover:text-blue-600' : 'border-current'
                      }`}>
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-lg sm:text-xl">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {quizAnswers[currentQuiz.id] !== undefined && (
                <div className="mt-12 p-10 bg-blue-600 text-white rounded-[2.5rem] animate-slide-up shadow-2xl shadow-blue-200 relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                    <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 20 20"><path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 10-2 0h-1a1 1 0 100 2h1a1 1 0 102 0zm-7 5a1 1 0 10-2 0v1a1 1 0 102 0v-1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 00-2 0H2a1 1 0 100 2h1a1 1 0 002 0zm.757 4.243a1 1 0 101.414 1.414l.707-.707a1 1 0 00-1.414-1.414l-.707.707zM8 10a2 2 0 114 0 2 2 0 01-4 0z"></path></svg>
                  </div>
                  <div className="flex items-center gap-3 mb-4 font-black uppercase text-xs tracking-[0.2em] opacity-80">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Lời giải chi tiết
                  </div>
                  <p className="font-bold text-xl leading-relaxed italic">{currentQuiz.explanation}</p>
                  {currentQuizIndex < lesson.quizzes.length - 1 && (
                    <button 
                      onClick={() => setCurrentQuizIndex(prev => prev + 1)}
                      className="mt-8 w-full py-5 bg-white text-blue-600 rounded-2xl font-black text-sm hover:bg-slate-50 transition-all uppercase tracking-widest shadow-xl active:scale-[0.98]"
                    >
                      Tiếp tục câu sau
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'exercises' && (
          <div className="space-y-10">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-4 px-2">
              <span className="w-2 h-10 bg-blue-600 rounded-full"></span>
              Vận dụng kiến thức thực tiễn
            </h3>
            <div className="grid gap-10">
              {lesson.exercises.map((ex, idx) => (
                <div key={ex.id} className="bg-white border border-slate-100 rounded-[3rem] overflow-hidden shadow-xl shadow-slate-200/40 hover:shadow-2xl hover:shadow-blue-200/20 transition-all duration-500">
                  <div className="p-10 sm:p-14">
                    <div className="flex items-center gap-3 mb-8">
                      <span className="px-5 py-2 bg-blue-50 text-blue-700 text-[11px] font-black rounded-full uppercase tracking-widest border border-blue-100">Bài tập vận dụng {idx + 1}</span>
                    </div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-10 leading-relaxed">{ex.question}</h4>
                    
                    <button
                      onClick={() => setShowSolution(prev => ({ ...prev, [ex.id]: !prev[ex.id] }))}
                      className={`inline-flex items-center gap-4 py-4 px-10 rounded-2xl font-black text-sm tracking-wider transition-all duration-300 shadow-xl ${
                        showSolution[ex.id] 
                          ? 'bg-slate-100 text-slate-600 shadow-none' 
                          : 'bg-blue-600 text-white shadow-blue-200 active:scale-95'
                      }`}
                    >
                      {showSolution[ex.id] ? 'Ẩn lời giải' : 'Xem hướng dẫn chi tiết'}
                      <svg className={`w-5 h-5 transition-transform duration-500 ${showSolution[ex.id] ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>

                    {showSolution[ex.id] && (
                      <div className="mt-10 p-10 bg-gradient-to-br from-blue-50/30 to-slate-50 border border-blue-100 rounded-[2.5rem] animate-fade-in shadow-inner">
                        <div className="flex items-center gap-2 mb-6">
                          <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Lời giải gợi ý</span>
                        </div>
                        <div className="text-slate-700 text-xl leading-relaxed font-medium">
                          {ex.solution}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-slide-up { animation: slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};
