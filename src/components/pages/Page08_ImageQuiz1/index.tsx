// src/components/pages/Page08_ImageQuiz1/index.tsx

import { useState, type ReactNode } from 'react';
import { useGame } from '../../../context/useGame'
// [삭제] 기존 PageStyles.css 의존성 제거
// import './PageStyles.css'; 
// [추가] 모듈 CSS 불러오기
import styles from './Page08_ImageQuiz1.module.css'; 

// 1. 이미지 경로 (public 폴더 기준)
const imgSrc = '/assets/images/bridge_photo_1.png';

const Page8_ImageQuiz1 = () => {
  const { updateScore, setCurrentPage } = useGame();

  // 2. 상태 관리
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<ReactNode>('');
  const [showNextButton, setShowNextButton] = useState(false);

  // 3. '다음' 버튼 클릭 시
  const handleNext = () => {
    // 9페이지(VS 퀴즈)로 이동합니다.
    setCurrentPage(9); 
  };

  // 4. '정답 확인' 버튼 클릭 시 (폼 제출)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 이미 '다음' 버튼으로 바뀐 상태라면, handleNext 함수를 실행
    if (showNextButton) {
      handleNext();
      return;
    }

    // 2. 정답 채점
    const isCorrect = answer.toLowerCase().includes('교량') || answer.toLowerCase().includes('다리'); // [수정] 대소문자 무시

    if (isCorrect) {
      updateScore(10);
      setFeedback(
        <span className={styles.correct}>
          맞아요! 🥳
          <br />
          멋진 교량이네요!
        </span>
      );
    } else {
      updateScore(-5);
      setFeedback(
        <span className={styles.wrong}>
          틀렸어요... 😥
          <br />
          (살짝 눈치가 없으신 편이군요.
          <br />
          교량이에요.)
        </span>
      );
    }

    // 3. 버튼을 '다음'으로 변경
    setShowNextButton(true);
  };

  return (
    // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
    <div className={`${styles.pageContainer} ${styles.page8}`}>
      
      {/* 퀴즈 이미지 */}
      <img src={imgSrc} alt="물결 모양 교량" className={styles.quizImage} />

      {/* 퀴즈 질문 */}
      <h2 className={styles.quizQuestion}>
        이게 뭐처럼
        <br />
        보이시나요? 🧐
      </h2>
      <p className={styles.quizInstruction}>(정답을 입력하세요.)</p>

      {/* 퀴즈 폼 (정답 확인/다음 버튼) */}
      <form className={styles.quizForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.quizInput}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="정답을 입력..."
          disabled={showNextButton} // 정답 맞힌 후 비활성화
        />

        {/* 피드백 메시지 */}
        <div className={styles.feedbackMessage}>
          {feedback}
        </div>

        {/* 정답 확인 또는 다음 버튼 */}
        <button type="submit" className={`${styles.nextButtonStyled} ${styles.quizSubmitButton}`}>
          {showNextButton ? '> 다음' : '정답 확인'}
        </button>
      </form>
    </div>
  );
};

export default Page8_ImageQuiz1;