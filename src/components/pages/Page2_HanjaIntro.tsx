import React from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css'; // 공통 스타일

const Page2_HanjaIntro = () => {
  const { setCurrentPage } = useGame();

  const handleNext = () => {
    // PDF 3페이지(첫 번째 한자 퀴즈)로 이동
    setCurrentPage(3); 
  };

  return (
    // 'page-container'는 공통, 'page2'는 이 페이지 전용 스타일
    <div className="page-container page2">
      
      {/* 한자 뜻풀이 그룹 */}
      <div className="hanja-definition-group">
        <div className="hanja-item">
          <h1 className="hanja-char">橋</h1>
          <p className="hanja-meaning">다리</p>
        </div>
        <div className="hanja-item">
          <h1 className="hanja-char">梁</h1>
          <p className="hanja-meaning">(대)들보</p>
        </div>
      </div>
      
      {/* [3단계]에서 공용 스타일로 변경할 '.next-button-styled' 클래스를 사용합니다.
      */}
      <button onClick={handleNext} className="next-button-styled">
        &gt; 다음
      </button>
    </div>
  );
};

export default Page2_HanjaIntro;
