
export interface Exercise {
  id: string;
  question: string;
  solution: string;
}

export interface QuizOption {
  text: string;
  isCorrect: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  explanation: string;
}

export interface MindMapNode {
  title: string;
  content: string;
  icon?: string;
}

export interface Lesson {
  id: string;
  title: string;
  keyConcepts: MindMapNode[];
  description: string;
  exercises: Exercise[];
  quizzes: QuizQuestion[];
}

export interface Chapter {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface User {
  username: string; // MaHS_Lop_HoTenKhongDau
  maHS: string;
  lop: string;
  fullName: string;
  school: string;
  role: 'student' | 'teacher' | 'admin';
  joinDate: string;
  lastLogin: string;
  loginCount: number;
  totalTimeMinutes: number;
  isOnline: boolean;
  device: string;
  browser: string;
  progress: number;
}
