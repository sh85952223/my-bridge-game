// 'React'가 사용되지 않는다는 경고를 없애기 위해 import 라인 정리
import { useGame } from './context/GameContext';
import LoginScreen from './components/LoginScreen'; 
// 1. GameContainer를 임포트합니다.
import GameContainer from './components/GameContainer'; 

function App() {
  // 1. useGame()을 최상단에서 한 번만 호출 (Hook 규칙 오류 수정)
  const { currentPage } = useGame(); // player1, score는 여기선 필요 없으므로 제거

  return (
    <div className="app-container">
      {/* 2. currentPage 값에 따라 화면 전환 */}
      {currentPage === 0 ? (
        <LoginScreen /> // 0페이지 = 로그인
      ) : (
        // 3. 임시 텍스트 대신 GameContainer 컴포넌트를 렌더링
        <GameContainer />
      )}
    </div>
  );
}

export default App;