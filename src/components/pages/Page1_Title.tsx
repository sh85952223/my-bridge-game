import React from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css'; // 페이지 공통 스타일

const Page1_Title = () => {
  // 1. Context에서 페이지 이동 함수 가져오기
  const { setCurrentPage } = useGame();

  // 2. '다음' 버튼 클릭 시 2페이지로 이동
  const handleNext = () => {
    setCurrentPage(2); // Page 2로 이동
  };

  return (
    // 'page-container'는 공통 스타일, 'page1'은 이 페이지 전용 스타일
    <div className="page-container page1">
      
      {/* 橋梁 한자 */}
      <h1 className="hanja-title">
        橋梁
      </h1>
      
      {/* [수정] [source: 1] 텍스트 제거 */}
      <p className="description-text">
        처음 보는 한자죠?
      </p>
      
      {/* 공용 스타일 버튼 */}
      <button onClick={handleNext} className="next-button-styled">
        &gt; 다음
      </button>

    </div>
  );
};

export default Page1_Title;

