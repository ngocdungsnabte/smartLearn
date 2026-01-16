
import { Chapter, Lesson, QuizQuestion, Exercise, MindMapNode } from './types';

/**
 * DỮ LIỆU BÀI 1: THÔNG TIN VÀ XỬ LÍ THÔNG TIN
 */
const lesson1Quizzes: QuizQuestion[] = [
  {
    id: 'l1-q1',
    question: "Đâu là đơn vị nhỏ nhất để lưu trữ thông tin trong máy tính?",
    options: [
      { text: "Byte", isCorrect: false },
      { text: "Bit", isCorrect: true },
      { text: "Kilobyte", isCorrect: false },
      { text: "Hertz", isCorrect: false }
    ],
    explanation: "Bit (viết tắt của Binary Digit) là đơn vị nhỏ nhất dùng để lưu trữ và xử lí thông tin trong máy tính, chỉ nhận giá trị 0 hoặc 1."
  },
  {
    id: 'l1-q2',
    question: "Một dãy 8 bit liên tiếp được gọi là gì?",
    options: [
      { text: "Một Word", isCorrect: false },
      { text: "Một Byte", isCorrect: true },
      { text: "Một Gigabyte", isCorrect: false },
      { text: "Một Pixel", isCorrect: false }
    ],
    explanation: "1 Byte = 8 Bit. Đây là đơn vị cơ bản để đo dung lượng lưu trữ của các thiết bị số."
  },
  {
    id: 'l1-q3',
    question: "Thiết bị nào sau đây thực hiện chức năng 'Tiếp nhận thông tin'?",
    options: [
      { text: "Màn hình", isCorrect: false },
      { text: "Loa", isCorrect: false },
      { text: "Bàn phím", isCorrect: true },
      { text: "Máy in", isCorrect: false }
    ],
    explanation: "Bàn phím là thiết bị vào (Input device), giúp máy tính tiếp nhận thông tin từ người dùng gõ vào."
  },
  {
    id: 'l1-q4',
    question: "Bộ phận nào được coi là 'bộ não' của máy tính, thực hiện chức năng xử lí thông tin?",
    options: [
      { text: "Bộ nhớ trong (RAM)", isCorrect: false },
      { text: "Ổ đĩa cứng (HDD/SSD)", isCorrect: false },
      { text: "Bộ vi xử lí (CPU)", isCorrect: true },
      { text: "Card màn hình", isCorrect: false }
    ],
    explanation: "CPU (Central Processing Unit) là nơi thực hiện các phép tính và điều khiển toàn bộ hoạt động của máy tính."
  },
  {
    id: 'l1-q5',
    question: "Đơn vị nào lớn hơn Terabyte (TB)?",
    options: [
      { text: "Gigabyte (GB)", isCorrect: false },
      { text: "Petabyte (PB)", isCorrect: true },
      { text: "Megabyte (MB)", isCorrect: false },
      { text: "Kilobyte (KB)", isCorrect: false }
    ],
    explanation: "Theo thứ tự tăng dần: B < KB < MB < GB < TB < PB. Mỗi đơn vị sau bằng 1024 lần đơn vị trước."
  },
  // Các câu hỏi bổ sung cho đủ 15 câu (Demo cấu trúc)
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `l1-q${i + 6}`,
    question: `[Câu ${i + 6}] Khái niệm nào sau đây đúng về chu trình xử lí thông tin?`,
    options: [
      { text: "Chỉ gồm Tiếp nhận và Xử lí", isCorrect: false },
      { text: "Tiếp nhận -> Xử lí -> Lưu trữ -> Truyền", isCorrect: true },
      { text: "Xử lí -> Truyền -> Lưu trữ", isCorrect: false },
      { text: "Lưu trữ là bước duy nhất quan trọng", isCorrect: false }
    ],
    explanation: "Chu trình xử lí thông tin đầy đủ gồm 4 bước: Tiếp nhận, Xử lí, Lưu trữ và Truyền thông tin."
  }))
];

/**
 * DỮ LIỆU BÀI 16: NGÔN NGỮ LẬP TRÌNH BẬC CAO VÀ PYTHON
 */
const lesson16Quizzes: QuizQuestion[] = [
  {
    id: 'l16-q1',
    question: "Python là ngôn ngữ lập trình thuộc loại nào?",
    options: [
      { text: "Ngôn ngữ máy", isCorrect: false },
      { text: "Hợp ngữ", isCorrect: false },
      { text: "Ngôn ngữ lập trình bậc cao", isCorrect: true },
      { text: "Ngôn ngữ siêu văn bản", isCorrect: false }
    ],
    explanation: "Python là ngôn ngữ lập trình bậc cao, mã nguồn mở, có cú pháp rõ ràng và gần gũi với ngôn ngữ tự nhiên."
  },
  {
    id: 'l16-q2',
    question: "Trong Python, để in một dòng chữ ra màn hình ta dùng lệnh nào?",
    options: [
      { text: "echo()", isCorrect: false },
      { text: "print()", isCorrect: true },
      { text: "write()", isCorrect: false },
      { text: "scanf()", isCorrect: false }
    ],
    explanation: "Lệnh print('nội dung') được dùng để xuất dữ liệu ra màn hình thiết bị."
  },
  {
    id: 'l16-q3',
    question: "Chế độ gõ lệnh trực tiếp trong Python được gọi là gì?",
    options: [
      { text: "Interactive mode", isCorrect: true },
      { text: "Script mode", isCorrect: false },
      { text: "Design mode", isCorrect: false },
      { text: "Debug mode", isCorrect: false }
    ],
    explanation: "Chế độ Interactive (tương tác) cho phép gõ lệnh nào máy thực hiện lệnh đó ngay lập tức."
  },
  {
    id: 'l16-q4',
    question: "Kí hiệu nào dùng để viết ghi chú (comment) một dòng trong Python?",
    options: [
      { text: "//", isCorrect: false },
      { text: "/*", isCorrect: false },
      { text: "#", isCorrect: true },
      { text: "--", isCorrect: false }
    ],
    explanation: "Kí tự # được dùng để bắt đầu một dòng ghi chú, Python sẽ bỏ qua không thực hiện phần này."
  },
  {
    id: 'l16-q5',
    question: "Phần mở rộng mặc định của tệp chương trình Python là gì?",
    options: [
      { text: ".python", isCorrect: false },
      { text: ".py", isCorrect: true },
      { text: ".txt", isCorrect: false },
      { text: ".exe", isCorrect: false }
    ],
    explanation: "Tệp mã nguồn Python luôn có đuôi .py để hệ thống nhận diện và thực thi."
  },
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `l16-q${i + 6}`,
    question: `[Câu ${i + 6}] Câu lệnh nào sau đây là hợp lệ trong Python?`,
    options: [
      { text: "print 'Hello'", isCorrect: false },
      { text: "print('Hello')", isCorrect: true },
      { text: "Print('Hello')", isCorrect: false },
      { text: "out('Hello')", isCorrect: false }
    ],
    explanation: "Python phân biệt chữ hoa chữ thường. Lệnh print() phải viết thường toàn bộ và có cặp ngoặc tròn."
  }))
];

/**
 * HÀM GENERATOR CHO CÁC BÀI CHƯA CÓ NỘI DUNG CHI TIẾT
 */
const getMindMapForLesson = (lessonId: string): MindMapNode[] => {
  const data: Record<string, MindMapNode[]> = {
    'l1': [
      { title: "Thông tin & Dữ liệu", content: "Dữ liệu là các con số, văn bản, hình ảnh. Thông tin là ý nghĩa rút ra từ dữ liệu đó.", icon: "📊" },
      { title: "Chu trình xử lí", content: "Tiếp nhận -> Xử lí -> Lưu trữ -> Truyền. Máy tính thực hiện với tốc độ cực cao.", icon: "🔄" },
      { title: "Đơn vị đo lượng", content: "Bit là đơn vị nhỏ nhất. 1 Byte = 8 bit. Các đơn vị lớn: KB, MB, GB, TB, PB.", icon: "📏" }
    ],
    'l16': [
      { title: "Ngôn ngữ bậc cao", content: "Python dễ học, mã nguồn mở, thư viện phong phú, dùng cho AI, Web, Data Science.", icon: "🐍" },
      { title: "Môi trường lập trình", content: "IDLE cung cấp chế độ gõ lệnh trực tiếp (Interactive) và soạn thảo tệp (Script).", icon: "📝" },
      { title: "Cú pháp cơ bản", content: "Phân biệt chữ hoa/thường, sử dụng cặp ngoặc tròn cho hàm và dấu nháy cho xâu.", icon: "⚙️" }
    ],
    'l19': [
      { title: "Câu lệnh rẽ nhánh if", content: "Dùng để kiểm tra điều kiện. Nếu đúng (True) thì thực hiện khối lệnh con bên dưới.", icon: "❓" },
      { title: "Cấu trúc else", content: "Thực hiện phương án thay thế nếu điều kiện if là sai (False).", icon: "↔️" },
      { title: "Toán tử so sánh", content: "Dùng các kí hiệu: ==, !=, >, <, >=, <= để so sánh các giá trị dữ liệu.", icon: "🧪" }
    ]
  };

  return data[lessonId] || [
    { title: "Khái niệm chính", content: "Tìm hiểu các định nghĩa và lý thuyết cơ bản trọng tâm của bài học.", icon: "📖" },
    { title: "Kỹ năng thực hành", content: "Cách vận dụng kiến thức vào giải quyết bài tập trên máy tính và trong thực tế.", icon: "⌨️" },
    { title: "Mở rộng liên hệ", content: "Sử dụng kiến thức bài học để giải quyết các vấn đề liên môn và đời sống số.", icon: "🌟" }
  ];
};

const generate15Quizzes = (lessonTitle: string): QuizQuestion[] => {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `q-${lessonTitle}-${i + 1}`,
    question: `[Câu ${i + 1}] Nội dung câu hỏi kiểm tra về kiến thức bài ${lessonTitle}?`,
    options: [
      { text: `Lựa chọn đáp án A (Đúng theo SGK)`, isCorrect: i % 4 === 0 },
      { text: `Lựa chọn đáp án B (Sai)`, isCorrect: i % 4 === 1 },
      { text: `Lựa chọn đáp án C (Sai)`, isCorrect: i % 4 === 2 },
      { text: `Lựa chọn đáp án D (Sai)`, isCorrect: i % 4 === 3 }
    ],
    explanation: `Giải thích chi tiết: Kiến thức này nằm trong nội dung trọng tâm của ${lessonTitle}. Hãy ôn tập kĩ phần lý thuyết.`
  }));
};

const generate3Exercises = (lessonTitle: string): Exercise[] => [
  { id: `ex-${lessonTitle}-1`, question: `Bài tập vận dụng 1: Phân tích và giải quyết tình huống về ${lessonTitle}.`, solution: "Hướng dẫn: Áp dụng định nghĩa và các bước xử lí đã học trong bài." },
  { id: `ex-${lessonTitle}-2`, question: `Bài tập thực hành 2: Thực hiện các thao tác chuyên môn liên quan ${lessonTitle}.`, solution: "Hướng dẫn: Mở phần mềm tương ứng và thực hiện tuần tự các bước 1, 2, 3." },
  { id: `ex-${lessonTitle}-3`, question: `Bài tập nâng cao 3: Liên hệ mở rộng kiến thức ${lessonTitle} với môi trường số.`, solution: "Giải quyết: Kết hợp các kĩ năng tổng hợp để đưa ra phương án tối ưu nhất." }
];

export const COURSE_DATA: Chapter[] = [
  {
    id: 'ch1',
    title: 'Chủ đề 1: Máy tính và xã hội tri thức',
    lessons: [
      { id: 'l1', title: 'Bài 1: Thông tin và xử lí thông tin', keyConcepts: getMindMapForLesson('l1'), description: 'Tìm hiểu về quá trình xử lí thông tin, phân biệt thông tin và dữ liệu, các đơn vị lưu trữ.', exercises: generate3Exercises('Bài 1'), quizzes: lesson1Quizzes },
      { id: 'l2', title: 'Bài 2: Vai trò của thiết bị thông minh và tin học', keyConcepts: getMindMapForLesson('l2'), description: 'Sự phát triển của thiết bị thông minh và tác động của tin học đến xã hội.', exercises: generate3Exercises('Bài 2'), quizzes: generate15Quizzes('Bài 2') },
      { id: 'l3', title: 'Bài 3: Một số kiểu dữ liệu và dữ liệu văn bản', keyConcepts: getMindMapForLesson('l3'), description: 'Các kiểu dữ liệu cơ bản và bảng mã ASCII, Unicode.', exercises: generate3Exercises('Bài 3'), quizzes: generate15Quizzes('Bài 3') },
      { id: 'l4', title: 'Bài 4: Hệ nhị phân và dữ liệu số nguyên', keyConcepts: getMindMapForLesson('l4'), description: 'Cách biểu diễn số nguyên trong máy tính bằng hệ nhị phân.', exercises: generate3Exercises('Bài 4'), quizzes: generate15Quizzes('Bài 4') },
      { id: 'l5', title: 'Bài 5: Dữ liệu lôgic', keyConcepts: getMindMapForLesson('l5'), description: 'Các phép toán logic AND, OR, NOT và mệnh đề.', exercises: generate3Exercises('Bài 5'), quizzes: generate15Quizzes('Bài 5') },
      { id: 'l6', title: 'Bài 6: Dữ liệu âm thanh và hình ảnh', keyConcepts: getMindMapForLesson('l6'), description: 'Số hóa âm thanh và hình ảnh, hệ màu RGB.', exercises: generate3Exercises('Bài 6'), quizzes: generate15Quizzes('Bài 6') },
      { id: 'l7', title: 'Bài 7: Thực hành sử dụng thiết bị số thông dụng', keyConcepts: getMindMapForLesson('l7'), description: 'Kỹ năng sử dụng smartphone, tablet và kết nối thiết bị số.', exercises: generate3Exercises('Bài 7'), quizzes: generate15Quizzes('Bài 7') }
    ]
  },
  {
    id: 'ch2',
    title: 'Chủ đề 2: Mạng máy tính và Internet',
    lessons: [
      { id: 'l8', title: 'Bài 8: Mạng máy tính trong cuộc sống hiện đại', keyConcepts: getMindMapForLesson('l8'), description: 'Mạng LAN, Internet, IoT và Điện toán đám mây.', exercises: generate3Exercises('Bài 8'), quizzes: generate15Quizzes('Bài 8') },
      { id: 'l9', title: 'Bài 9: An toàn trên không gian mạng', keyConcepts: getMindMapForLesson('l9'), description: 'Nguy cơ và biện pháp phòng chống phần mềm độc hại.', exercises: generate3Exercises('Bài 9'), quizzes: generate15Quizzes('Bài 9') },
      { id: 'l10', title: 'Bài 10: Thực hành khai thác tài nguyên trên Internet', keyConcepts: getMindMapForLesson('l10'), description: 'Tìm kiếm, đánh giá và sử dụng tài nguyên số hiệu quả.', exercises: generate3Exercises('Bài 10'), quizzes: generate15Quizzes('Bài 10') }
    ]
  },
  {
    id: 'ch3',
    title: 'Chủ đề 3: Đạo đức, pháp luật và văn hoá trong môi trường số',
    lessons: [
      { id: 'l11', title: 'Bài 11: Ứng xử trên môi trường số. Nghĩa vụ tôn trọng bản quyền', keyConcepts: getMindMapForLesson('l11'), description: 'Quy tắc ứng xử và luật bản quyền trong môi trường số.', exercises: generate3Exercises('Bài 11'), quizzes: generate15Quizzes('Bài 11') }
    ]
  },
  {
    id: 'ch4',
    title: 'Chủ đề 4: Ứng dụng tin học',
    lessons: [
      { id: 'l12', title: 'Bài 12: Phần mềm thiết kế đồ hoạ', keyConcepts: getMindMapForLesson('l12'), description: 'Làm quen với đồ họa vector và phần mềm Inkscape.', exercises: generate3Exercises('Bài 12'), quizzes: generate15Quizzes('Bài 12') },
      { id: 'l13', title: 'Bài 13: Bổ sung các đối tượng đồ hoạ', keyConcepts: getMindMapForLesson('l13'), description: 'Làm việc với các hình khối và phép ghép đối tượng.', exercises: generate3Exercises('Bài 13'), quizzes: generate15Quizzes('Bài 13') },
      { id: 'l14', title: 'Bài 14: Làm việc với đối tượng đường và văn bản', keyConcepts: getMindMapForLesson('l14'), description: 'Vẽ đường cong và trình bày văn bản nghệ thuật.', exercises: generate3Exercises('Bài 14'), quizzes: generate15Quizzes('Bài 14') },
      { id: 'l15', title: 'Bài 15: Hoàn thiện hình ảnh đồ hoạ', keyConcepts: getMindMapForLesson('l15'), description: 'Quy trình tạo ra một sản phẩm đồ họa chuyên nghiệp.', exercises: generate3Exercises('Bài 15'), quizzes: generate15Quizzes('Bài 15') }
    ]
  },
  {
    id: 'ch5',
    title: 'Chủ đề 5: Giải quyết vấn đề với sự trợ giúp của máy tính',
    lessons: [
      { id: 'l16', title: 'Bài 16: Ngôn ngữ lập trình bậc cao và Python', keyConcepts: getMindMapForLesson('l16'), description: 'Bắt đầu hành trình chinh phục lập trình với ngôn ngữ Python.', exercises: generate3Exercises('Bài 16'), quizzes: lesson16Quizzes },
      { id: 'l17', title: 'Bài 17: Biến và lệnh gán', keyConcepts: getMindMapForLesson('l17'), description: 'Cách khai báo và sử dụng biến trong Python.', exercises: generate3Exercises('Bài 17'), quizzes: generate15Quizzes('Bài 17') },
      { id: 'l18', title: 'Bài 18: Các lệnh vào ra đơn giản', keyConcepts: getMindMapForLesson('l18'), description: 'Lệnh print(), input() và ép kiểu dữ liệu.', exercises: generate3Exercises('Bài 18'), quizzes: generate15Quizzes('Bài 18') },
      { id: 'l19', title: 'Bài 19: Câu lệnh rẽ nhánh if', keyConcepts: getMindMapForLesson('l19'), description: 'Cấu trúc điều khiển rẽ nhánh trong lập trình.', exercises: generate3Exercises('Bài 19'), quizzes: generate15Quizzes('Bài 19') },
      { id: 'l20', title: 'Bài 20: Câu lệnh lặp for', keyConcepts: getMindMapForLesson('l20'), description: 'Vòng lặp với số lần biết trước và hàm range().', exercises: generate3Exercises('Bài 20'), quizzes: generate15Quizzes('Bài 20') },
      { id: 'l21', title: 'Bài 21: Câu lệnh lặp while', keyConcepts: getMindMapForLesson('l21'), description: 'Vòng lặp với số lần không biết trước.', exercises: generate3Exercises('Bài 21'), quizzes: generate15Quizzes('Bài 21') },
      { id: 'l22', title: 'Bài 22: Kiểu dữ liệu danh sách', keyConcepts: getMindMapForLesson('l22'), description: 'Làm việc với kiểu dữ liệu List.', exercises: generate3Exercises('Bài 22'), quizzes: generate15Quizzes('Bài 22') },
      { id: 'l23', title: 'Bài 23: Một số lệnh làm việc với danh sách', keyConcepts: getMindMapForLesson('l23'), description: 'Các hàm append, remove, insert trong danh sách.', exercises: generate3Exercises('Bài 23'), quizzes: generate15Quizzes('Bài 23') },
      { id: 'l24', title: 'Bài 24: Xâu kí tự', keyConcepts: getMindMapForLesson('l24'), description: 'Các phép toán và hàm xử lý văn bản trong Python.', exercises: generate3Exercises('Bài 24'), quizzes: generate15Quizzes('Bài 24') },
      { id: 'l25', title: 'Bài 25: Một số lệnh làm việc với xâu kí tự', keyConcepts: getMindMapForLesson('l25'), description: 'Nâng cao kỹ năng xử lý xâu ký tự.', exercises: generate3Exercises('Bài 25'), quizzes: generate15Quizzes('Bài 25') },
      { id: 'l26', title: 'Bài 26: Hàm trong Python', keyConcepts: getMindMapForLesson('l26'), description: 'Định nghĩa và sử dụng hàm để tái sử dụng code.', exercises: generate3Exercises('Bài 26'), quizzes: generate15Quizzes('Bài 26') },
      { id: 'l27', title: 'Bài 27: Tham số của hàm', keyConcepts: getMindMapForLesson('l27'), description: 'Truyền dữ liệu vào hàm qua các tham số.', exercises: generate3Exercises('Bài 27'), quizzes: generate15Quizzes('Bài 27') },
      { id: 'l28', title: 'Bài 28: Phạm vi của biến', keyConcepts: getMindMapForLesson('l28'), description: 'Biến toàn cục và biến cục bộ trong chương trình.', exercises: generate3Exercises('Bài 28'), quizzes: generate15Quizzes('Bài 28') },
      { id: 'l29', title: 'Bài 29: Nhận biết lỗi chương trình', keyConcepts: getMindMapForLesson('l29'), description: 'Cách đọc log và xử lý lỗi cú pháp, logic.', exercises: generate3Exercises('Bài 29'), quizzes: generate15Quizzes('Bài 29') },
      { id: 'l30', title: 'Bài 30: Kiểm thử và gỡ lỗi chương trình', keyConcepts: getMindMapForLesson('l30'), description: 'Kỹ thuật kiểm thử phần mềm cơ bản.', exercises: generate3Exercises('Bài 30'), quizzes: generate15Quizzes('Bài 30') },
      { id: 'l31', title: 'Bài 31: Thực hành viết chương trình đơn giản', keyConcepts: getMindMapForLesson('l31'), description: 'Tổng hợp kiến thức để xây dựng ứng dụng nhỏ.', exercises: generate3Exercises('Bài 31'), quizzes: generate15Quizzes('Bài 31') },
      { id: 'l32', title: 'Bài 32: Ôn tập lập trình Python', keyConcepts: getMindMapForLesson('l32'), description: 'Hệ thống hóa toàn bộ kiến thức lập trình.', exercises: generate3Exercises('Bài 32'), quizzes: generate15Quizzes('Bài 32') }
    ]
  },
  {
    id: 'ch6',
    title: 'Chủ đề 6: Hướng nghiệp với Tin học',
    lessons: [
      { id: 'l33', title: 'Bài 33: Nghề thiết kế đồ hoạ máy tính', keyConcepts: getMindMapForLesson('l33'), description: 'Tìm hiểu về cơ hội nghề nghiệp trong ngành đồ họa.', exercises: generate3Exercises('Bài 33'), quizzes: generate15Quizzes('Bài 33') },
      { id: 'l34', title: 'Bài 34: Nghề phát triển phần mềm', keyConcepts: getMindMapForLesson('l34'), description: 'Lộ trình trở thành lập trình viên chuyên nghiệp.', exercises: generate3Exercises('Bài 34'), quizzes: generate15Quizzes('Bài 34') }
    ]
  }
];
