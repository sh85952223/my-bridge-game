// src/components/pages/Page13_StructureQuiz/index.tsx

import { useState, useEffect, type ReactNode } from 'react';
import { useGame } from '../../../context/useGame';
// [수정] 기존 CSS 의존성 제거
import styles from './Page13.module.css'; 

// 퀴즈 정답 데이터 (5개) - 컴포넌트 밖으로 이동
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
  const [feedback, setFeedback] = useState<ReactNode>('');
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
      setFeedback(<span className={styles.correct}>확인 완료!</span>); // 확인 메시지
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
    
    // 이미 맞힌 문제라면 모달만 닫기 (재확인 모드)
    if (structureQuizSolved[currentQuiz.id]) {
      setIsModalOpen(false);
      return;
    }

    // 띄어쓰기 처리 로직
    let isCorrect = false;
    const userAnswerTrimmed = inputValue.trim().toLowerCase().replace(/\s/g, ''); 

    // '교량길이'는 띄어쓰기 유무 모두 허용
    if (currentQuiz.id === 1) {
      isCorrect = userAnswerTrimmed === '교량길이';
    } else {
      const correctAnswer = currentQuiz.answer.replace(/\s/g, '').toLowerCase();
      isCorrect = userAnswerTrimmed === correctAnswer;
    }

    if (isCorrect) {
      // --- 정답 ---
      updateScore(10);
      setStructureQuizSolved(prev => prev.map((ans, idx) => (idx === currentQuiz.id ? true : ans)));
      setIsModalOpen(false);
    } else {
      // --- 오답 ---
      updateScore(-5);
      setFeedback(<span className={styles.wrong}>오답! 😥 다시 시도해보세요.</span>);
    }
  };

  const handleHintClick = () => {
    setCurrentPage(14); // 힌트 허브 페이지로 이동
  };

  return (
    // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
    <div className={`${styles.pageContainer} ${styles.page13Quiz}`}>

      {/* 상단 이전 버튼 (nav-button 스타일은 모듈에 통합됨) */}
      <div className={`${styles.navButtonContainer} ${styles.top}`}>
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={() => setCurrentPage(12)}>
          {'<'} 이전
        </button>
      </div>

      <p className={styles.quizInstructionText}>
        그림의 번호를 보고,<br/> 해당하는 숫자를 눌러 정답을 맞혀보세요!
      </p>

      {/* 다리 그림 */}
      <div className={styles.quizDiagramContainer}>
        <img src="/assets/images/bridge_diagram_clean.png" alt="교량 구조" className={styles.quizDiagramImage} />
      </div>

      {/* 퀴즈 번호 버튼 */}
      <div className={styles.quizButtonRow}>
        {quizBank.map(item => (
          <button
            key={item.id}
            className={`${styles.quizNumberButton} ${structureQuizSolved[item.id] ? styles.solved : ''}`}
            onClick={() => handleQuizButtonClick(item.id)}
            disabled={structureQuizSolved[item.id]}
          >
            {item.id} {structureQuizSolved[item.id] ? '✔️' : ''}
          </button>
        ))}
      </div>


      {/* 하단 버튼 */}
      <div className={styles.quizActionsContainer}>
        <button className={styles.hintButtonMain} onClick={handleHintClick}>
          💡 힌트 보기
        </button>
        <button
          className={styles.nextButtonStyled}
          onClick={() => setCurrentPage(15)} // 다음 페이지로 이동
          disabled={!allSolved}
        >
          {allSolved ? (<span>{'>'} 다음</span>) : '모두 완료 시 활성화'}
        </button>
      </div>

      {/* 퀴즈 모달 */}
      {isModalOpen && currentQuiz && (
        <div className={styles.quizModalOverlay}>
          <div className={styles.quizModalContent}>
            <h2>{`[${currentQuiz.id}번 퀴즈] ${currentQuiz.chosung}`}</h2>
            <p>
              {structureQuizSolved[currentQuiz.id] 
                ? '정답을 확인합니다.' 
                : '정답을 입력하세요.'
              }
            </p>
            <form onSubmit={handleSubmit} className={styles.quizForm}>
              <input
                type="text"
                className={styles.quizInput} // [수정] 모듈 클래스 사용
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                disabled={structureQuizSolved[currentQuiz.id]}
              />
              <div className={styles.feedbackMessage}>{feedback}</div>
              
              {structureQuizSolved[currentQuiz.id] ? (
                <button 
                  type="button" 
                  className={styles.modalCloseButton} 
                  onClick={() => setIsModalOpen(false)}
                  style={{marginTop: '1rem'}}
                >
                  확인
                </button>
              ) : (
                <>
                  <button type="submit" className={`${styles.quizModalSubmitButton} ${styles.quizModalSubmitButton}`}>정답 확인</button>
                  <button 
                    type="button" 
                    className={styles.modalCloseButton} 
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