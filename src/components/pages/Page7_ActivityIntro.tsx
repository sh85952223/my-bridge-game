import { useGame } from '../../context/GameContext';
import './PageStyles.css'; // 공통 스타일

const Page7_ActivityIntro = () => {
  const { setCurrentPage } = useGame();

  const handleNext = () => {
    setCurrentPage(8); // Page 8 (첫 번째 사진 퀴즈)로 이동
  };

  return (
    <div className="page-container page7">
      
      {/* "핀터레스트 감성" 카드 레이아웃 */}
      <div className="card-content">
        <p className="card-decoration">🍦 ➡️ 🏗️</p>
        
        {/* 줄바꿈을 위한 <br /> 태그 */}
        <h1 className="card-title">
          아이스크림 
          <br />
          막대로
          <br />
          교량 만들기
        </h1>
        
        {/* 배경 영문 텍스트 (스타일로 적용) */}
        <div className="card-bg-text-en">BUILD</div>
      </div>

      <button onClick={handleNext} className="next-button-styled">
        {'>'} 다음
      </button>
      
    </div>
  );
};

export default Page7_ActivityIntro;


