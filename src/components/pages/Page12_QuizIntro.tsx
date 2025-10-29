import { useGame } from '../../context/GameContext';
import './PageStyles.css';      // 공용 스타일 (page-container)
import './PageStyles_v2.css';   // Page 12 전용 스타일

const Page12_QuizIntro = () => {
  const { setCurrentPage } = useGame();

  const handleNext = () => {
    setCurrentPage(13); // 메인 퀴즈(Page 13)로 이동
  };

  const handlePrev = () => {
    setCurrentPage(11); // Page 11 (핵심 정의)로 돌아가기
  };

  return (
    // page-container는 PageStyles.css에서, page12-container는 PageStyles_v2.css에서 스타일을 가져옵니다.
    <div className="page-container page12-container">
      
      {/* 퀴즈 제목 (PDF 17 스타일) */}
      <div className="quiz-intro-content">
        <h1 className="quiz-intro-title">Quiz!</h1>
        <h2 className="quiz-intro-subtitle">교량의 구조</h2>
      </div>

      {/* 이전/다음 버튼 컨테이너 */}
      <div className="nav-button-container">
        <button 
          className="nav-button prev-button" 
          onClick={handlePrev}
        >
          {'<'} 이전
        </button>
        <button 
          className="nav-button next-button" 
          onClick={handleNext}
        >
          다음 {'>'}
        </button>
      </div>

    </div>
  );
};

export default Page12_QuizIntro;

