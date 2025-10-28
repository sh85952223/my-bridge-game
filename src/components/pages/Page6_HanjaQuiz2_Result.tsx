import React from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css'; // 공통 스타일

const Page6_HanjaQuiz2_Result = () => {
  const { setCurrentPage } = useGame();

  const handleNext = () => {
    // PDF 7페이지 (다음 챕터)로 이동
    setCurrentPage(7); 
  };

  return (
    // 'page2'와 스타일을 공유합니다.
    <div className="page-container page2">
      
      <div className="hanja-definition-group">
        <div className="hanja-item">
          {/* 1. 한자와 뜻 변경 */}
          <h1 className="hanja-char">梁</h1>
          <p className="hanja-meaning">(대)들보 량</p>
        </div>
      </div>
      
      <button onClick={handleNext} className="next-button-styled">
        &gt; 교량 만들기 (다음)
      </button>
    </div>
  );
};

export default Page6_HanjaQuiz2_Result;
