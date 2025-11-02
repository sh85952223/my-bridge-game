import { Suspense } from 'react'; 
import { useGame } from '../context/useGame'; 
import { pageRegistry } from './pages/pageRegistry'; 
import LoginScreen from "./LoginScreen"; 
// [신규] 타임 오버 페이지 import
import PageTimeUp from './pages/Page_TimeUp'; 

// [신규] 초를 mm:ss 형식으로 변환하는 헬퍼 함수
const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

// [수정] TypeScript 타입 오류(TS2322)를 해결하기 위해 'as const' 추가

// 게임 전체를 화면 중앙에 배치하고 배경색 설정
const GAME_WRAPPER_STYLE = {
    display: 'flex' as const,
    flexDirection: 'column' as const, // TS 오류 해결
    alignItems: 'center' as const,
    minHeight: '100vh',
    backgroundColor: '#111', 
    paddingTop: '20px', 
    paddingBottom: '20px',
};

// 페이지 콘텐츠 컨테이너 (모바일 최대 너비 설정 및 중앙 정렬)
const GAME_CONTENT_CONTAINER_STYLE = {
    width: '100%',
    maxWidth: '500px', 
    margin: '0 auto',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
    flexGrow: 1, 
    borderRadius: '12px',
};

// 스코어 바 스타일
const SCORE_BAR_STYLE = {
    display: 'flex' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
    padding: '10px 1.5rem',
    backgroundColor: '#1a1a1a',
    borderRadius: '12px 12px 0 0',
    borderBottom: '2px solid #3a3a3a',
    width: '100%',
    boxSizing: 'border-box' as const, // TS 오류 해결
    maxWidth: '500px', 
    margin: '0 auto',
};
const SCORE_LABEL_STYLE = { fontSize: '1rem', fontWeight: 600, color: '#aaa' };
const SCORE_VALUE_STYLE = { fontSize: '1.5rem', fontWeight: 700, color: '#f7e04f' };

// [신규] 타이머 텍스트 스타일
const TIMER_STYLE = {
  fontSize: '1.5rem',
  fontWeight: 700,
  color: '#f7e04f', // 점수와 동일한 강조색
};


const GameContainer = () => {
  // [수정] timeRemaining, isTimeUp 가져오기
  const { currentPage, score, timeRemaining, isTimeUp } = useGame();

  const renderScoreBar = () => (
    <div style={SCORE_BAR_STYLE}>
      <div>
        <span style={SCORE_LABEL_STYLE}>SCORE </span>
        <span style={SCORE_VALUE_STYLE}>{score}</span>
      </div>
      {/* [신규] 타이머 표시 */}
      <div style={TIMER_STYLE}>
        {formatTime(timeRemaining)}
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    // [수정] 1. 타임 오버 시 PageTimeUp 렌더링
    if (isTimeUp) {
      // PageTimeUp 컴포넌트를 렌더링하기 위해 pageRegistry에 등록하거나
      // 여기서 직접 import 해야 합니다. (상단에 import PageTimeUp 추가됨)
      return <PageTimeUp />;
    }

    // 2. 로그인 페이지 (기존과 동일)
    if (currentPage === 0) { 
        return <LoginScreen />; 
    }
    
    // 3. 퀴즈 페이지 (기존과 동일)
    const CurrentPage = pageRegistry[currentPage as keyof typeof pageRegistry];

    if (!CurrentPage) {
      console.warn(`알 수 없는 페이지 번호입니다: ${currentPage}`);
      const DefaultPage = pageRegistry[1];
      return <DefaultPage />;
    }
    return <CurrentPage />;
  };

  return (
    <div style={GAME_WRAPPER_STYLE}>
      <div style={GAME_CONTENT_CONTAINER_STYLE}>
        
        {currentPage !== 0 && renderScoreBar()}
      
        <Suspense fallback={
            <div style={{ 
                backgroundColor: '#2a2a2a', 
                minHeight: '700px', 
                padding: '20px', 
                borderRadius: currentPage !== 0 ? '0 0 12px 12px' : '12px'
            }}>
                로딩 중...
            </div>
        }>
          {renderCurrentPage()}
        </Suspense>

      </div>
    </div>
  );
};

export default GameContainer;

