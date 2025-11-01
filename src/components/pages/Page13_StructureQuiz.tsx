import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css';      // 공용 스타일
import './PageStyles_v2.css';   // 퀴즈 전용 스타일

// 퀴즈 정답 데이터 (5개)
const quizBank = [
  { id: 1, chosung: 'ㄱㄹㄱㅇ', answer: '교량길이' }, 
  { id: 2, chosung: 'ㄱㄷ', answer: '교대' },
  { id: 3, chosung: 'ㄱㄱ', answer: '교각' },
  { id: 4, chosung: 'ㅈㅂ', answer: '주보' },
  { id: 5, chosung: 'ㄱㅊ', answer: '기초' },
];

const Page13_StructureQuiz = () => {
  // 전역 상태에서 퀴즈 정답 가져오기
  const { updateScore, setCurrentPage, structureQuizSolved, setStructureQuizSolved } = useGame();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<(typeof quizBank[0]) | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<React.ReactNode>('');
  const [allSolved, setAllSolved] = useState(false);

  useEffect(() => {
    // structureQuizSolved(전역 상태)가 변경될 때마다 allSolved 상태 갱신
    const solvedCount = structureQuizSolved.filter(Boolean).length;
    setAllSolved(solvedCount === quizBank.length);
  }, [structureQuizSolved]);

  const handleQuizButtonClick = (quizId: number) => {
    const quizItem = quizBank.find(q => q.id === quizId);
    if (!quizItem) return;

    setCurrentQuiz(quizItem);
    
    if (structureQuizSolved[quizId]) {
      // --- 이미 푼 문제 (재확인) ---
      setInputValue(quizItem.answer); // 정답을 미리 채워넣음
      setFeedback(<span className="correct">확인 완료!</span>); // 확인 메시지
      setIsModalOpen(true);
    } else {
      // --- 아직 안 푼 문제 ---
      setInputValue('');
      setFeedback('');
      setIsModalOpen(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuiz) return;
    
    if (structureQuizSolved[currentQuiz.id]) {
      setIsModalOpen(false);
      return;
    }

    // 띄어쓰기 처리 로직
    let isCorrect = false;
    const userAnswerTrimmed = inputValue.trim().toLowerCase(); 

    if (currentQuiz.id === 1) {
      isCorrect = userAnswerTrimmed === '교량길이' || userAnswerTrimmed === '교량 길이';
    } else {
      const correctAnswer = currentQuiz.answer.replace(/\s/g, '').toLowerCase();
      const userAnswer = userAnswerTrimmed.replace(/\s/g, ''); 
      isCorrect = userAnswer === correctAnswer;
    }

    if (isCorrect) {
      // --- 정답 ---
      updateScore(10);
      setStructureQuizSolved(prev => prev.map((ans, idx) => (idx === currentQuiz.id ? true : ans)));
      setIsModalOpen(false);
    } else {
      // --- 오답 ---
      updateScore(-5);
      setFeedback(<span className="wrong">오답! 😥 다시 시도해보세요.</span>);
    }
  };

  const handleHintClick = () => {
    setCurrentPage(14); // 힌트 허브 페이지로 이동
  };

  return (
    <div className="page-container page13-quiz">

      <div className="nav-button-container top">
        <button className="nav-button prev-button" onClick={() => setCurrentPage(12)}>
          {'<'} 이전
        </button>
      </div>

      <p className="quiz-instruction-text">
        아래 그림의 번호를 보고,<br/> 해당하는 버튼을 눌러 정답(초성)을 맞혀보세요!
      </p>

      {/* 다리 그림 */}
      <div className="quiz-diagram-container">
        <img src="/assets/images/bridge_diagram_clean.png" alt="교량 구조" className="quiz-diagram-image" />
      </div>

      {/* 퀴즈 번호 버튼 */}
      <div className="quiz-button-row">
        {quizBank.map(item => (
          <button
            key={item.id}
            className={`quiz-number-button ${structureQuizSolved[item.id] ? 'solved' : ''}`}
            onClick={() => handleQuizButtonClick(item.id)}
          >
            {item.id} {structureQuizSolved[item.id] ? '✔️' : ''}
          </button>
        ))}
      </div>


      {/* 하단 버튼 */}
      <div className="quiz-actions-container">
        <button className="hint-button-main" onClick={handleHintClick}>
          💡 힌트 보기
        </button>
        <button
          className="next-button-styled"
          onClick={() => setCurrentPage(15)} // [수정] 17 -> 15
          disabled={!allSolved}
        >
          {allSolved ? (<span>{'>'} 다음</span>) : '5문제 모두 완료 시 활성화'}
        </button>
      </div>

      {/* 퀴즈 모달 */}
      {isModalOpen && currentQuiz && (
        <div className="quiz-modal-overlay">
          <div className="quiz-modal-content">
            <h2>{`[${currentQuiz.id}번 퀴즈] ${currentQuiz.chosung}`}</h2>
            <p>
              {structureQuizSolved[currentQuiz.id] 
                ? '정답을 확인합니다.' 
                : '정답을 입력하세요.'
              }
            </p>
            <form onSubmit={handleSubmit} className="quiz-form">
              <input
                type="text"
                className="quiz-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                disabled={structureQuizSolved[currentQuiz.id]} // 이미 맞혔으면 입력창 비활성화
              />
              <div className="feedback-message">{feedback}</div>
              
              {structureQuizSolved[currentQuiz.id] ? (
                <button 
                  type="button" 
                  className="modal-close-button" 
                  onClick={() => setIsModalOpen(false)}
                  style={{marginTop: '1rem'}}
                >
                  확인
                </button>
              ) : (
                <>
                  <button type="submit" className="quiz-submit-button next-button-styled">정답 확인</button>
                  <button 
                    type="button" 
                    className="modal-close-button" 
                    onClick={() => setIsModalOpen(false)}
                  >
                    닫기
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page13_StructureQuiz;

