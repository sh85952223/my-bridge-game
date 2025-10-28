import React, { useState } from 'react';
import { useGame } from '../context/GameContext'; // 1단계에서 만든 useGame 훅

const LoginScreen = () => {
  // 1. Context에서 startGame 함수 가져오기
  const { startGame } = useGame();

  // 2. 입력값 관리를 위한 State
  const [p1Id, setP1Id] = useState('');
  const [p1Name, setP1Name] = useState('');
  const [p2Id, setP2Id] = useState('');
  const [p2Name, setP2Name] = useState('');
  
  const [error, setError] = useState(''); // 에러 메시지
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태

  // 3. 폼 제출(게임 시작) 함수 (Type: React.FormEvent)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 폼 기본 동작(새로고침) 방지
    setError(''); // 에러 메시지 초기화

    // 4. [필수] 입력값 검증
    if (!p1Id.trim() || !p1Name.trim()) {
      setError('본인의 학번과 이름은 반드시 입력해야 합니다.');
      return;
    }

    setIsLoading(true); // 로딩 시작 (버튼 비활성화)
    try {
      // 5. Context의 startGame 함수 호출 (이 함수가 Firebase에 저장)
      await startGame(p1Id, p1Name, p2Id, p2Name);
      
    } catch (error) {
      // startGame 함수에서 오류 발생 시
      setError('게임 시작 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsLoading(false); // 오류 발생 시 로딩 해제
    }
  };

  return (
    // 'page-container': 공통 어두운 배경 (PageStyles.css)
    // 'login-page': 로그인 페이지 전용 스타일 (PageStyles.css)
    <div className="page-container login-page">
      <h1>교량 탐험 게임</h1>
      <p>학번과 이름을 입력하고 게임을 시작하세요.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="player-inputs">
          <h3>[필수] 본인 정보</h3>
          <input
            type="text"
            placeholder="학번 (예: 20101)"
            value={p1Id}
            onChange={(e) => setP1Id(e.target.value)}
            disabled={isLoading} // 로딩 중 비활성화
          />
          <input
            type="text"
            placeholder="이름 (예: 홍길동)"
            value={p1Name}
            onChange={(e) => setP1Name(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="player-inputs">
          <h3>[선택] 팀원 정보</h3>
          <input
            type="text"
            placeholder="팀원 학번 (선택)"
            value={p2Id}
            onChange={(e) => setP2Id(e.target.value)}
            disabled={isLoading}
          />
          <input
            type="text"
            placeholder="팀원 이름 (선택)"
            value={p2Name}
            onChange={(e) => setP2Name(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {/* 에러 메시지가 있을 때만 표시 */}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-start-button" disabled={isLoading}>
          {isLoading ? '시작하는 중...' : '게임 시작하기'}
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;