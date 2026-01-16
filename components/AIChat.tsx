
import React, { useState, useRef, useEffect } from 'react';
import { Message, Lesson } from '../types';
import { geminiService } from '../services/geminiService';

interface AIChatProps {
  currentLesson?: Lesson;
}

export const AIChat: React.FC<AIChatProps> = ({ currentLesson }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Chào bạn! Mình là SmartLearn AI. Bạn có câu hỏi nào về bài học này không?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    const context = currentLesson ? `Bài học: ${currentLesson.title}. Nội dung: ${currentLesson.description}` : undefined;
    const responseText = await geminiService.askQuestion(input, context);

    const aiMsg: Message = { role: 'model', text: responseText || '...', timestamp: new Date() };
    setMessages(prev => [...prev, aiMsg]);
    setIsLoading(false);
  };

  return (
    <div className={`fixed bottom-24 right-6 z-50 transition-all duration-300 ${isMinimized ? 'w-16 h-16' : 'w-full sm:w-96'}`}>
      {isMinimized ? (
        <button 
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 rounded-full bg-blue-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-blue-200"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      ) : (
        <div className="bg-white rounded-3xl shadow-2xl flex flex-col h-[550px] border border-blue-100 overflow-hidden">
          {/* Header */}
          <div className="p-5 bg-blue-600 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <span className="font-black text-sm tracking-tight block leading-none">SmartLearn AI</span>
                <span className="text-[10px] opacity-70 font-bold uppercase tracking-wider">Trợ lý học tập</span>
              </div>
            </div>
            <button onClick={() => setIsMinimized(true)} className="hover:bg-white/10 p-2 rounded-xl transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none shadow-lg shadow-blue-100' 
                    : 'bg-white text-slate-700 border border-blue-50 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl border border-blue-50 flex gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-5 bg-white border-t border-blue-50 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Đặt câu hỏi cho AI..."
              className="flex-1 bg-slate-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            />
            <button 
              onClick={handleSend}
              disabled={isLoading}
              className="bg-blue-600 text-white p-3 rounded-2xl hover:bg-blue-700 disabled:opacity-50 shadow-lg shadow-blue-100 transition-all active:scale-90"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
