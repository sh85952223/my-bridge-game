import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css';      // 공용 버튼 스타일 import
import './PageStyles_v2.css';   // Page 11 전용 스타일 import

const Page11_Definition = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { setCurrentPage } = useGame();

  // 카드를 클릭하면 뒤집기
  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  // 다음 페이지로 이동
  const handleNext = () => {
    setCurrentPage(12); // 다음 페이지로 (예: Page 12)
  };

  return (
    // 'page-container' (공통)와 'page11-container' (전용) 클래스를 모두 사용
    <div className="page-container page11-container">
      
      {/* 3D 플립 카드 */}
      <div 
        className={`flip-card ${isFlipped ? 'flipped' : ''}`}
        onClick={handleFlip}
        title="클릭하여 정답 확인"
      >
        <div className="flip-card-inner">
          
          {/* 카드 앞면 (질문) */}
          <div className="flip-card-front">
            <h2>
              교량이란
              <br/>
              무엇일까? 🧐
            </h2>
            <small>(카드를 클릭하여 정답 확인)</small>
          </div>
          
          {/* 카드 뒷면 (정답) */}
          <div className="flip-card-back">
            <h2>
              강, 바다, 계곡 등을
              <br/>
              건널 수 있게 만든
              <br/>
              구조물 🌉
            </h2>
            <small className="definition-note">
              📌 학습지에 적으세요!
            </small>
          </div>

        </div>
      </div>
      
      {/* 카드가 뒤집힌 후에만 '다음' 버튼 표시 */}
      {isFlipped && (
        <button 
          className="next-button-styled" 
          onClick={handleNext}
        >
          {'>'} 다음
        </button>
      )}

    </div>
  );
};

export default Page11_Definition;
