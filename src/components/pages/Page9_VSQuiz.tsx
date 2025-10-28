import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css'; // 공통 스타일

// 1. 이미지 경로
const imageA = '/assets/images/bridge_trampoline_1.jpg';
const imageB = '/assets/images/bridge_trampoline_2.jpg';

const Page9_VSQuiz = () => {
  const { updateScore, setCurrentPage } = useGame();
  
  // 피드백 메시지 상태
  const [feedback, setFeedback] = useState<React.ReactNode>('');
  // '다음' 버튼 표시 상태
  const [showNextButton, setShowNextButton] = useState(false);
  // A, B 중 무엇을 선택했는지 상태
  const [selectedOption, setSelectedOption] = useState<'A' | 'B' | null>(null);

  /**
   * 선택지 (A 또는 B)를 클릭했을 때 호출되는 함수
   */
  const handleSelect = (option: 'A' | 'B') => {
    // 이미 정답을 맞혔으면 더 이상 클릭 안 됨
    if (showNextButton) return;

    // 1. 선택한 옵션 저장 (CSS 효과 적용용)
    setSelectedOption(option);

    // 2. 둘 다 정답이므로 10점 추가
    updateScore(10);
    
    // 3. 피드백 메시지 설정 (HTML 포함)
    setFeedback(
      <span className="correct">
        사실 둘 다 정답! 🥳
        <br />
        이것은 파리의 '텀블링 교량'입니다!
      </span>
    );

    // 4. '다음' 버튼 표시
    setShowNextButton(true);
  };

  /**
   * '다음' 버튼 클릭 시
   */
  const handleNext = () => {
    // PDF 14페이지(개념 강화)로 이동합니다.
    setCurrentPage(10); 
  };

  return (
    <div className="page-container page9">
      
      {/* 퀴즈 질문 */}
      <h2 className="quiz-question">이것은 텀블링일까요,  <br />교량일까요?</h2>
      
      {/* VS 선택지 컨테이너 */}
      <div className="vs-quiz-container">
        
        {/* 선택지 A (텀블링) */}
        <div 
          className={`vs-option ${selectedOption === 'A' ? 'selected' : ''}`}
          onClick={() => handleSelect('A')}
        >
          <img src={imageA} alt="텀블링" className="vs-image" />
          <div className="vs-label">텀블링</div>
        </div>

        {/* 'VS' 텍스트 */}
        <div className="vs-graphic">VS</div>

        {/* 선택지 B (교량) */}
        <div 
          className={`vs-option ${selectedOption === 'B' ? 'selected' : ''}`}
          onClick={() => handleSelect('B')}
        >
          <img src={imageB} alt="교량" className="vs-image" />
          <div className="vs-label">교량</div>
        </div>

      </div>

      {/* 피드백 메시지 표시 */}
      {feedback && (
        <div className="feedback-message">
          {feedback}
        </div>
      )}

      {/* '다음' 버튼 (정답 맞힐 시 표시) */}
      {showNextButton && (
        <button onClick={handleNext} className="next-button-styled quiz-submit-button">
          {'>'} 다음
        </button>
      )}

      {/* '다음' 버튼이 보이기 전, 공간 차지를 위한 빈 div */}
      {!showNextButton && (
        <div style={{ height: '70px', marginTop: '1rem' }} />
      )}
    </div>
  );
};

export default Page9_VSQuiz;

