import { useState, type ReactNode } from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css'; // 공통 스타일

// 1. 이미지 경로
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
    const isCorrect = answer.includes('교량') || answer.includes('다리');

    if (isCorrect) {
      updateScore(10);
      setFeedback(
        <span className="correct">
          맞아요! 🥳
          <br />
          멋진 교량이네요!
        </span>
      );
    } else {
      updateScore(-5);
      setFeedback(
        <span className="wrong">
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
    <div className="page-container page8">
      
      {/* 퀴즈 이미지 */}
      <img src={imgSrc} alt="물결 모양 교량" className="quiz-image" />

      {/* 퀴즈 질문 */}
      <h2 className="quiz-question">
        이게 뭐처럼
        <br />
        보이시나요? 🧐
      </h2>
      <p className="quiz-instruction">(정답을 입력하세요.)</p>

      {/* 퀴즈 폼 (정답 확인/다음 버튼) */}
      <form className="quiz-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="quiz-input"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="정답을 입력..."
          disabled={showNextButton} // 정답 맞힌 후 비활성화
        />

        {/* 피드백 메시지 */}
        <div className="feedback-message">
          {feedback}
        </div>

        {/* 정답 확인 또는 다음 버튼 */}
        <button type="submit" className="next-button-styled quiz-submit-button">
          {/* [오류 수정]
            ({'>'} 다음) -> '> 다음' (하나의 문자열로 변경)
          */}
          {showNextButton ? '> 다음' : '정답 확인'}
        </button>
      </form>
    </div>
  );
};

export default Page8_ImageQuiz1;

