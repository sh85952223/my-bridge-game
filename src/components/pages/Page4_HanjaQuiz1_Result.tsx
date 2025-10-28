import React from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css'; // 공통 스타일

const Page4_HanjaQuiz1_Result = () => {
  const { setCurrentPage } = useGame();

  const handleNext = () => {
    // PDF 5페이지 (두 번째 한자 퀴즈)로 이동
    setCurrentPage(5); 
  };

  return (
    // 'page2'와 스타일을 공유합니다.
    <div className="page-container page2">
      
      <div className="hanja-definition-group">
        <div className="hanja-item">
          <h1 className="hanja-char">橋</h1>
          <p className="hanja-meaning">다리 교</p>
        </div>
      </div>
      
      <button onClick={handleNext} className="next-button-styled">
        &gt; 다음 (梁 퀴즈)
      </button>
    </div>
  );
};

export default Page4_HanjaQuiz1_Result;
