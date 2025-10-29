import { useGame } from '../context/GameContext';

// 페이지 컴포넌트들을 임포트합니다.
import Page1_Title from './pages/Page1_Title';
import Page2_HanjaIntro from './pages/Page2_HanjaIntro';
import Page3_HanjaQuiz1 from './pages/Page3_HanjaQuiz1';
import Page4_HanjaQuiz1_Result from './pages/Page4_HanjaQuiz1_Result';
import Page5_HanjaQuiz2 from './pages/Page5_HanjaQuiz2';
import Page6_HanjaQuiz2_Result from './pages/Page6_HanjaQuiz2_Result';
import Page7_ActivityIntro from './pages/Page7_ActivityIntro';
import Page8_ImageQuiz1 from './pages/Page8_ImageQuiz1';
import Page9_VSQuiz from './pages/Page9_VSQuiz';
import Page10_AmazingBridges from './pages/Page10_AmazingBridges';
import Page11_Definition from './pages/Page11_Definition';
// [신규] 퀴즈 섹션 3페이지 import
import Page12_QuizIntro from './pages/Page12_QuizIntro';
import Page13_StructureQuiz from './pages/Page13_StructureQuiz';
import Page14_HintHub from './pages/Page14_HintHub';

const GameContainer = () => {
  // 1. 훅 호출을 컴포넌트 최상단에서 실행합니다.
  const { currentPage, score } = useGame();

  // 2. 점수 바 렌더링 함수
  // (이 함수는 'score' 변수에 접근해야 하므로 GameContainer 내부에 있어야 합니다.)
  const renderScoreBar = () => (
    <div className="score-bar">
      <span className="score-label">SCORE</span>
      <span className="score-value">{score}</span>
    </div>
  );

  /**
   * 3. 현재 페이지 번호에 맞는 컴포넌트를 반환합니다.
   * (이 함수는 'currentPage' 변수에 접근해야 하므로 GameContainer 내부에 있어야 합니다.)
   */
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1_Title />;
      case 2:
        return <Page2_HanjaIntro />;
      case 3:
        return <Page3_HanjaQuiz1 />;
      case 4:
        return <Page4_HanjaQuiz1_Result />;
      case 5:
        return <Page5_HanjaQuiz2 />;
      case 6:
        return <Page6_HanjaQuiz2_Result />;
      case 7:
        return <Page7_ActivityIntro />;
      case 8:
        return <Page8_ImageQuiz1 />;
      case 9:
        return <Page9_VSQuiz />;
      case 10:
        return <Page10_AmazingBridges />;
      case 11:
        return <Page11_Definition />;
      
      // [신규] 퀴즈 섹션 3페이지 추가
      case 12:
        return <Page12_QuizIntro />;
      case 13:
        return <Page13_StructureQuiz />;
      case 14:
        return <Page14_HintHub />;

      default:
        // 혹시 모를 예외 처리 (1페이지로 이동)
        console.warn(`알 수 없는 페이지 번호입니다: ${currentPage}`);
        return <Page1_Title />;
    }
  };

  // 4. 최종 JSX를 반환합니다.
  return (
    <div className="game-wrapper">
      {renderScoreBar()}
      <div className="game-content-container">
        {renderCurrentPage()}
      </div>
    </div>
  );
};

export default GameContainer;

