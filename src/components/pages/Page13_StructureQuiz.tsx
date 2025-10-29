import { useState, useEffect } from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css';      // 공용 스타일 (next-button-styled 등)
import './PageStyles_v2.css';   // 퀴즈 전용 스타일 (hotspot, modal 등)

// 퀴즈 정답 데이터 (5개)
const quizBank = [
  { id: 1, chosung: 'ㄱㄹㄱㅇ', answer: '교량길이' },
  { id: 2, chosung: 'ㄱㄷ', answer: '교대' },
  { id: 3, chosung: 'ㄱㄱ', answer: '교각' },
  { id: 4, chosung: 'ㅈㅂ', answer: '주보' },
  { id: 5, chosung: 'ㄱㅊ', answer: '기초' },
];

// [삭제] hotspotData 배열 삭제

const Page13_StructureQuiz = () => {
  const { updateScore, setCurrentPage } = useGame();

  // 퀴즈 상태 관리 (quizBank 기준, 0번 인덱스 사용 안함)
  const [solvedState, setSolvedState] = useState([false, false, false, false, false, false]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<(typeof quizBank[0]) | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [feedback, setFeedback] = useState<React.ReactNode>('');
  const [hintUsed, setHintUsed] = useState(false);
  const [allSolved, setAllSolved] = useState(false);

  // 퀴즈 정답 개수 확인
  useEffect(() => {
    const solvedCount = solvedState.filter(Boolean).length;
    // index 0을 제외한 5개가 모두 true인지 확인
    setAllSolved(solvedCount === quizBank.length);
  }, [solvedState]);

  // [수정] 번호 버튼 클릭 시 모달 열기
  const handleQuizButtonClick = (quizId: number) => {
    if (solvedState[quizId]) return; // 이미 맞혔으면 열지 않음

    const quizItem = quizBank.find(q => q.id === quizId);
    if (!quizItem) return;

    setCurrentQuiz(quizItem);
    setInputValue('');
    setFeedback('');
    setIsModalOpen(true);
  };

  // 퀴즈 정답 제출 (로직 동일)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentQuiz) return;

    const correctAnswer = currentQuiz.answer.replace(/\s/g, '');
    const userAnswer = inputValue.replace(/\s/g, '');

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      // --- 정답 ---
      updateScore(10);
      setSolvedState(prev => prev.map((ans, idx) => (idx === currentQuiz.id ? true : ans)));
      setIsModalOpen(false);
    } else {
      // --- 오답 ---
      updateScore(-5);
      setFeedback(<span className="wrong">오답! 😥 다시 시도해보세요.</span>);
    }
  };

  // 힌트 보기 (로직 동일)
  const handleHintClick = () => {
    if (!hintUsed) {
      updateScore(-5);
      setHintUsed(true);
    }
    setCurrentPage(14); // 힌트 허브 페이지로 이동
  };

  return (
    <div className="page-container page13-quiz">

      {/* 상단 네비게이션 */}
      <div className="nav-button-container top">
        <button className="nav-button prev-button" onClick={() => setCurrentPage(12)}>
          {'<'} 이전
        </button>
      </div>

      <p className="quiz-instruction-text">
        아래 그림의 번호를 보고,<br/> 해당 숫자 버튼을 눌러 정답을 맞혀보세요!
      </p>

      {/* 다리 그림 */}
      <div className="quiz-diagram-container">
        <img src="/assets/images/bridge_diagram_clean.png" alt="교량 구조" className="quiz-diagram-image" />
        {/* [삭제] 핫스팟 렌더링 코드 삭제 */}
      </div>

      {/* [신규] 퀴즈 번호 버튼 */}
      <div className="quiz-button-row">
        {quizBank.map(item => (
          <button
            key={item.id}
            className={`quiz-number-button ${solvedState[item.id] ? 'solved' : ''}`}
            onClick={() => handleQuizButtonClick(item.id)}
            disabled={solvedState[item.id]} // 맞힌 버튼은 비활성화
          >
            {item.id} {solvedState[item.id] ? '✔️' : ''}
          </button>
        ))}
      </div>


      {/* 하단 버튼 */}
      <div className="quiz-actions-container">
        <button className="hint-button-main" onClick={handleHintClick}>
          💡 힌트 보기 {hintUsed ? '(사용함)' : '(-5점)'}
        </button>
        <button
          className="next-button-styled"
          onClick={() => setCurrentPage(15)} // 다음 섹션으로 이동
          disabled={!allSolved}
        >
          {allSolved ? (<span>{'>'} 다음</span>) : '모두 완료 시 활성화'}
        </button>
      </div>

      {/* 퀴즈 모달 (내용 동일) */}
      {isModalOpen && currentQuiz && (
        <div className="quiz-modal-overlay">
          <div className="quiz-modal-content">
            <h2>{`[${currentQuiz.id}번 퀴즈] ${currentQuiz.chosung}`}</h2>
            <p>정답을 입력하세요.</p>
            <form onSubmit={handleSubmit} className="quiz-form">
              <input
                type="text"
                className="quiz-input"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
              />
              <div className="feedback-message">{feedback}</div>
              <button type="submit" className="quiz-submit-button next-button-styled">정답 확인</button>
              <button
                type="button"
                className="modal-close-button"
                onClick={() => setIsModalOpen(false)}
              >
                닫기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page13_StructureQuiz;

