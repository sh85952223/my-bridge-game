import { Suspense } from 'react'; 
import { useGame } from '../context/useGame'; 
import { pageRegistry } from './pages/pageRegistry'; 
import LoginScreen from "./LoginScreen"; 

// [수정] 인라인 스타일 속성에 as const를 추가하여 TS2322 오류 해결

// 게임 전체를 화면 중앙에 배치하고 배경색 설정
const GAME_WRAPPER_STYLE = {
    display: 'flex' as const,
    flexDirection: 'column' as const, // 👈 TS2322 해결
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
    boxSizing: 'border-box' as const, // 👈 TS2322 해결
    maxWidth: '500px', 
    margin: '0 auto',
};
const SCORE_LABEL_STYLE = { fontSize: '1rem', fontWeight: 600, color: '#aaa' };
const SCORE_VALUE_STYLE = { fontSize: '1.5rem', fontWeight: 700, color: '#f7e04f' };


const GameContainer = () => {
  const { currentPage, score } = useGame();

  const renderScoreBar = () => (
    <div style={SCORE_BAR_STYLE}>
      <span style={SCORE_LABEL_STYLE}>SCORE</span>
      <span style={SCORE_VALUE_STYLE}>{score}</span>
    </div>
  );

  const renderCurrentPage = () => {
    if (currentPage === 0) { 
        return <LoginScreen />; 
    }
    
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