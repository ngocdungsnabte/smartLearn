
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonContent } from './components/LessonContent';
import { AIChat } from './components/AIChat';
import { Auth } from './components/Auth';
import { Statistics } from './components/Statistics';
import { COURSE_DATA } from './constants';
import { Lesson, User } from './types';

const AUTO_LOGOUT_TIME = 15 * 60 * 1000; // 15 phút

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(COURSE_DATA[0].lessons[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [view, setView] = useState<'learning' | 'statistics'>('learning');
  const [allStudents, setAllStudents] = useState<User[]>([]);
  const lastActivityRef = useRef<number>(Date.now());

  const allLessons = useMemo(() => {
    return COURSE_DATA.flatMap(chapter => chapter.lessons);
  }, []);

  const currentIndex = allLessons.findIndex(l => l.id === selectedLesson.id);
  const nextLesson = allLessons[currentIndex + 1];
  const prevLesson = allLessons[currentIndex - 1];

  // Logic theo dõi thời gian và hoạt động
  useEffect(() => {
    if (!currentUser) return;

    const interval = setInterval(() => {
      // Tăng tổng thời gian học mỗi phút
      setAllStudents(prev => prev.map(s => {
        if (s.username === currentUser.username && s.isOnline) {
          return { ...s, totalTimeMinutes: s.totalTimeMinutes + 1 };
        }
        return s;
      }));

      // Kiểm tra tự động đăng xuất
      if (Date.now() - lastActivityRef.current > AUTO_LOGOUT_TIME) {
        handleLogout();
      }
    }, 60000);

    const updateActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);

    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
    };
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setAllStudents(prev => {
      const existing = prev.find(s => s.username === user.username);
      if (existing) {
        return prev.map(s => s.username === user.username ? { 
          ...s, 
          isOnline: true, 
          lastLogin: new Date().toLocaleString('vi-VN'),
          loginCount: s.loginCount + 1 
        } : s);
      }
      return [user, ...prev];
    });
    lastActivityRef.current = Date.now();
  };

  const handleLogout = () => {
    if (currentUser) {
      setAllStudents(prev => prev.map(s => 
        s.username === currentUser.username ? { ...s, isOnline: false } : s
      ));
    }
    setCurrentUser(null);
  };

  const handleDeleteStudent = (username: string) => {
    setAllStudents(prev => prev.filter(s => s.username !== username));
  };

  const navigateTo = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    setView('learning');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!currentUser) {
    return <Auth onLogin={handleLogin} />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50 font-['Inter']">
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar 
        chapters={COURSE_DATA}
        selectedLessonId={selectedLesson.id}
        onSelectLesson={navigateTo}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 bg-white lg:bg-slate-50">
        <header className="sticky top-0 z-30 bg-white/70 backdrop-blur-xl border-b border-blue-100 shadow-sm">
          <div className="px-6 py-4 sm:px-12 flex items-center justify-between max-w-7xl mx-auto w-full">
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-black text-blue-700 tracking-tight leading-none uppercase">
                SmartLearn Tin học 10
              </h1>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">
                Bộ sách Kết nối tri thức và cuộc sống
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button 
                  onClick={() => setView('learning')}
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${view === 'learning' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Nội dung học tập
                </button>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <button 
                  onClick={() => setView('statistics')}
                  className={`text-[10px] font-black uppercase tracking-widest transition-colors ${view === 'statistics' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  Thống kê lớp học
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end mr-2">
                <span className="text-xs font-black text-slate-800">{currentUser.fullName}</span>
                <button 
                  onClick={handleLogout}
                  className="text-[10px] text-red-500 font-bold uppercase tracking-tighter hover:underline"
                >
                  Đăng xuất
                </button>
              </div>
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-3 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-2xl lg:hidden transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto relative pb-32">
          <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
            {view === 'learning' ? (
              <div className="bg-white lg:rounded-[3rem] lg:shadow-xl lg:shadow-blue-900/5 min-h-screen border border-blue-50 overflow-hidden">
                <LessonContent lesson={selectedLesson} />
              </div>
            ) : (
              <Statistics students={allStudents} onDeleteStudent={handleDeleteStudent} />
            )}
          </div>
          
          {view === 'learning' && (
            <div className="fixed bottom-0 left-0 right-0 lg:left-80 bg-white/90 backdrop-blur-xl border-t border-blue-100 px-6 py-5 z-20 shadow-[0_-10px_40px_-15px_rgba(37,99,235,0.1)]">
              <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                <div className="hidden md:flex flex-col gap-1 flex-1">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Tiến độ cá nhân</span>
                    <span className="text-xs font-bold text-slate-600">{Math.round(((currentIndex + 1) / allLessons.length) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-blue-50 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-600 transition-all duration-700 ease-out" 
                      style={{ width: `${((currentIndex + 1) / allLessons.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {prevLesson && (
                    <button 
                      onClick={() => navigateTo(prevLesson)}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center p-3 sm:px-6 bg-slate-50 text-slate-600 text-sm font-black rounded-2xl hover:bg-slate-100 transition-all active:scale-95"
                    >
                      <svg className="w-5 h-5 mr-0 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      <span className="hidden sm:inline">Bài trước</span>
                    </button>
                  )}
                  
                  {nextLesson && (
                    <button 
                      onClick={() => navigateTo(nextLesson)}
                      className="flex-[2] sm:flex-none inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-blue-600 text-white text-sm font-black rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
                    >
                      <span>Tiếp tục bài sau</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <AIChat currentLesson={selectedLesson} />
      </main>
    </div>
  );
};

export default App;
