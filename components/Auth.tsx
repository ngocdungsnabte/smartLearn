
import React, { useState } from 'react';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [fullName, setFullName] = useState('');
  const [className, setClassName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [failCount, setFailCount] = useState(0);

  const getDeviceInfo = () => {
    const ua = navigator.userAgent;
    let device = "Máy tính";
    if (/android/i.test(ua)) device = "Android";
    else if (/iPad|iPhone|iPod/.test(ua)) device = "iOS";
    
    let browser = "Trình duyệt";
    if (ua.includes("Chrome")) browser = "Chrome";
    else if (ua.includes("Firefox")) browser = "Firefox";
    else if (ua.includes("Safari")) browser = "Safari";
    
    return { device, browser };
  };

  const removeVietnameseTones = (str: string) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (failCount >= 5) {
      setError('Cảnh báo bảo mật: Bạn đã nhập sai quá 5 lần. Vui lòng thử lại sau.');
      return;
    }

    if (fullName.trim().length < 2) {
      setError('Vui lòng nhập đầy đủ họ và tên học sinh');
      return;
    }

    if (!className.trim()) {
      setError('Vui lòng nhập lớp học (VD: 10A1)');
      return;
    }

    const { device, browser } = getDeviceInfo();
    const nameNoTones = removeVietnameseTones(fullName).replace(/\s+/g, '');
    const maHS = `HS${Math.floor(Math.random() * 9000) + 1000}`; // Tạo mã HS ngẫu nhiên cho demo
    const generatedUsername = `${maHS}_${className}_${nameNoTones}`;

    const newUser: User = {
      username: generatedUsername,
      maHS: maHS,
      lop: className,
      fullName: fullName,
      school: 'SmartLearn Digital School', // Mặc định vì đã bỏ trường chọn
      role: 'student',
      joinDate: new Date().toLocaleDateString('vi-VN'),
      lastLogin: new Date().toLocaleString('vi-VN'),
      loginCount: 1,
      totalTimeMinutes: 0,
      isOnline: true,
      device,
      browser,
      progress: 0
    };
    onLogin(newUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-950 p-6">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-2xl rounded-[3rem] shadow-2xl overflow-hidden border border-white/20 animate-fade-in">
        <div className="p-10">
          <div className="text-center mb-10">
            <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl shadow-blue-500/30 mb-6">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.282.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18 18.247 18 16.5 18c-1.746 0-3.282.477-4.5 1.253" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Hệ thống Học tập</h2>
            <p className="text-blue-300 font-bold uppercase text-[10px] tracking-widest mt-2">Kết nối tri thức và cuộc sống</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-2xl text-red-200 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase ml-4">Họ và tên học sinh</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium text-white placeholder-slate-500"
                placeholder="Nhập họ và tên đầy đủ"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase ml-4">Lớp học</label>
              <input
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium text-white placeholder-slate-500"
                placeholder="VD: 10A1, 11B2..."
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-black text-slate-400 uppercase ml-4">Mật khẩu</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border-2 border-white/5 rounded-2xl px-6 py-4 outline-none focus:border-blue-500 focus:bg-white/10 transition-all font-medium text-white placeholder-slate-500"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black py-4 rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.02] transition-all active:scale-95 mt-6"
            >
              ĐĂNG NHẬP HỆ THỐNG
            </button>
          </form>

          <div className="mt-8 flex justify-center gap-4">
            <button className="text-[10px] font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Đăng ký</button>
            <span className="text-slate-700">|</span>
            <button className="text-[10px] font-black text-slate-400 hover:text-white transition-colors uppercase tracking-widest">Quên mật khẩu</button>
          </div>
        </div>
      </div>
    </div>
  );
};
