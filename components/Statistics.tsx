
import React from 'react';
import { User } from '../types';

interface StatisticsProps {
  students: User[];
  onDeleteStudent: (username: string) => void;
}

export const Statistics: React.FC<StatisticsProps> = ({ students, onDeleteStudent }) => {
  const exportToExcel = () => {
    const headers = ['STT', 'Mã HS', 'Họ và tên', 'Lớp', 'Trường', 'Số lần ĐN', 'ĐN gần nhất', 'Thiết bị', 'Trình duyệt', 'Thời gian học (phút)', 'Tiến độ (%)'];
    const rows = students.map((s, idx) => [
      idx + 1,
      `"${s.maHS}"`,
      `"${s.fullName}"`,
      `"${s.lop}"`,
      `"${s.school}"`,
      s.loginCount,
      `"${s.lastLogin}"`,
      `"${s.device}"`,
      `"${s.browser}"`,
      s.totalTimeMinutes,
      s.progress
    ]);
    
    const csvContent = "\uFEFF" + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `thong_ke_lop_hoc_${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.csv`);
    link.click();
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden animate-slide-up">
      {/* Dashboard Header */}
      <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-200">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">Thống kê học tập</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Quản lý phiên tham gia của học sinh</p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Đang Online</p>
              <p className="text-lg font-black text-slate-800 leading-none">{students.filter(s => s.isOnline).length}</p>
            </div>
          </div>
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-8 py-3 bg-slate-900 text-white text-xs font-black uppercase tracking-widest rounded-2xl hover:bg-black transition-all shadow-xl active:scale-95"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Tải Báo Cáo Excel
          </button>
        </div>
      </div>
      
      {/* Statistics Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80">
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">STT</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Học sinh & Mã số</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Lớp</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Truy cập cuối</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Thiết bị</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Tổng thời gian</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Trạng thái</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {students.map((student, idx) => (
              <tr key={student.username} className="hover:bg-blue-50/20 transition-all group">
                <td className="px-8 py-6 text-sm font-black text-slate-300">{(idx + 1).toString().padStart(2, '0')}</td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg transition-colors ${student.isOnline ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      {student.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-800">{student.fullName}</p>
                      <p className="text-[10px] text-blue-500 font-black uppercase tracking-widest">{student.maHS}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-black rounded-lg uppercase">
                    {student.lop}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <p className="text-xs font-bold text-slate-600">{student.lastLogin}</p>
                  <p className="text-[10px] text-slate-400 font-medium italic">Lượt ĐN: {student.loginCount}</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-2 text-slate-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {student.device === 'Máy tính' ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      )}
                    </svg>
                    <span className="text-xs font-bold">{student.device}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-center">
                  <span className="text-sm font-black text-slate-800">{student.totalTimeMinutes}</span>
                  <span className="text-[10px] text-slate-400 ml-1 font-bold">phút</span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${student.isOnline ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-400'}`}>
                      {student.isOnline ? 'Đang Online' : 'Offline'}
                    </span>
                    <button
                      onClick={() => onDeleteStudent(student.username)}
                      className="p-2 text-slate-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
