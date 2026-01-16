
import React from 'react';
import { Chapter, Lesson } from '../types';

interface SidebarProps {
  chapters: Chapter[];
  selectedLessonId: string;
  onSelectLesson: (lesson: Lesson) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  chapters, 
  selectedLessonId, 
  onSelectLesson, 
  isOpen, 
  onClose 
}) => {
  return (
    <aside className={`
      fixed inset-y-0 left-0 z-40 w-80 bg-white border-r border-blue-100 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static shadow-xl lg:shadow-none
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
    `}>
      <div className="flex flex-col h-full">
        <div className="p-8 border-b border-blue-50 bg-gradient-to-br from-blue-50 to-white flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-black text-blue-700 flex items-center gap-2 tracking-tight">
              <div className="p-1.5 bg-blue-600 rounded-lg text-white shadow-lg shadow-blue-200">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.282.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18 16.5 18c-1.746 0-3.282.477-4.5 1.253" />
                </svg>
              </div>
              SmartLearn
            </h2>
            <p className="text-[10px] uppercase font-bold text-blue-400 mt-1 tracking-widest">Informatics Grade 10</p>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 text-slate-400 hover:text-blue-600 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-4 space-y-8 scroll-smooth">
          {chapters.map((chapter) => (
            <div key={chapter.id} className="space-y-3">
              <h3 className="px-4 text-[11px] font-black text-blue-400 uppercase tracking-[0.2em]">
                {chapter.title}
              </h3>
              <div className="space-y-1">
                {chapter.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      onSelectLesson(lesson);
                      onClose();
                    }}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 group flex items-start gap-3 ${
                      selectedLessonId === lesson.id
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 font-semibold translate-x-1'
                        : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                    }`}
                  >
                    <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${selectedLessonId === lesson.id ? 'bg-white' : 'bg-blue-200 group-hover:bg-blue-400'}`}></span>
                    <span className="leading-snug">{lesson.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>
        
        <div className="p-6 bg-blue-50/50 border-t border-blue-50">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl shadow-sm border border-blue-100">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 font-bold">HS</div>
            <div>
              <p className="text-xs font-bold text-slate-800">Học sinh lớp 10</p>
              <p className="text-[10px] text-slate-400 font-medium italic">Tiến trình: 65%</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
