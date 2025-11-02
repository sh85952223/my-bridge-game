// src/App.tsx (최종 수정)

import { useGame } from './context/useGame';
// LoginScreen은 GameContainer에서 관리하므로 여기서 import를 제거합니다.
// import LoginScreen from './components/LoginScreen'; // 👈 이 줄은 삭제합니다.
import GameContainer from './components/GameContainer'; 

function App() {
    // 1. useGame()을 최상단에서 한 번만 호출 (Hook 규칙)
    useGame(); // currentPage는 GameContainer에서 사용됩니다.

    return (
        <div className="app-container">
            {/* 2. GameContainer만 렌더링하도록 단순화 */}
            <GameContainer /> 
        </div>
    );
}

export default App;