import { useState, type ReactNode } from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css';      // 공용 스타일
import './PageStyles_v3.css';   // v3 스타일

// 퀴즈 데이터
const TERMS = [
  { id: 't1', name: '교량 길이' },
  { id: 't2', name: '교대' },
  { id: 't3', name: '교각' },
  { id: 't4', name: '주보' },
  { id: 't5', name: '기초' },
];

const DESCRIPTIONS = [
  { id: 'd1', answerId: 't5', text: '교량 전체의 무게를 땅으로 전달해 단단히 지지하는 구조물' },
  { id: 'd2', answerId: 't4', text: "무게를 받아 하부 구조로 전달하는 주요 '보'" },
  { id: 'd3', answerId: 't2', text: '교량 양 끝에 설치되어 상부에서 오는 무게를 받쳐 땅에 전달하는 구조물' },
  { id: 'd4', answerId: 't3', text: '교량 중간에서 상부 구조를 지지하는 기둥' },
  { id: 'd5', answerId: 't1', text: '다리 양 끝 지지대를 연결한 길이' },
];

const Page15_DragQuiz = () => {
  const { updateScore, setCurrentPage, matchQuizSolved, setMatchQuizSolved } = useGame();
  
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  
  // [수정] 1번: 초기 피드백 메시지를 명확하게 설정
  const [feedback, setFeedback] = useState<ReactNode>(
    <span className="info">왼쪽 용어를 먼저 선택하세요 💡</span>
  );
  
  const [wrongMatch, setWrongMatch] = useState<{ termId: string, descId: string } | null>(null);

  const allSolved = matchQuizSolved.size === TERMS.length;

  const handleTermClick = (termId: string) => {
    if (matchQuizSolved.has(termId)) return;
    
    if (selectedTermId === termId) {
      setSelectedTermId(null);
      // [수정] 1번: 선택 취소 시에도 초기 안내 메시지 표시
      setFeedback(<span className="info">왼쪽 용어를 먼저 선택하세요 💡</span>); 
    } else {
      setSelectedTermId(termId);
      setWrongMatch(null); 
      setFeedback(<span className="info">알맞은 설명을 선택하세요.</span>); 
    }
  };

  const handleDescriptionClick = (description: typeof DESCRIPTIONS[0]) => {
    if (!selectedTermId) {
      // [수정] 1번: 피드백 메시지 일관성 유지 (기존에도 잘 되어있었음)
      setFeedback(<span className="info">먼저 왼쪽의 용어를 선택하세요! 💡</span>);
      return;
    }

    if (matchQuizSolved.has(description.answerId)) return;

    if (selectedTermId === description.answerId) {
      // --- 정답 ---
      updateScore(10);
      setMatchQuizSolved(prev => new Set(prev).add(selectedTermId));
      setFeedback(<span className="correct">정답입니다! 🥳 +10점</span>);
      setSelectedTermId(null); 
      setWrongMatch(null); 
    } else {
      // --- 오답 ---
      updateScore(-5); 
      setFeedback(<span className="wrong">오답! 😥 -5점</span>); 
      setWrongMatch({ termId: selectedTermId, descId: description.id });
      
      setTimeout(() => {
        setWrongMatch(null);
      }, 500);
    }
  };

  return (
    <div className="page-container page15-match-quiz-styled"> 
      
      <div className="nav-button-container top">
        <button className="nav-button prev-button" onClick={() => setCurrentPage(13)}>
          {'<'} 이전 (구조 퀴즈)
        </button>
      </div>

      <h2 className="match-quiz-title">퀴즈: 용어-설명 짝맞추기</h2> 
      
      {/* [수정] 1번: 혼란을 주던 정적 <p> 태그 삭제 */}
      {/* <p className="match-quiz-subtitle">왼쪽 단어를 먼저 클릭한 후, 알맞은 설명을 클릭하세요.</p> */}
      {/* 대신 부제목을 좀 더 명확하게 수정 */}
      <p className="match-quiz-subtitle">왼쪽 용어와 알맞은 설명을 짝맞춰 주세요.</p>


      <div className="feedback-message" style={{ minHeight: '30px', marginBottom: '1rem' }}>
        {feedback}
      </div>

      <div className="match-quiz-grid-container"> 
        {/* 1. 용어 뱅크 (클릭 아이템) */}
        <div className="term-bank-grid"> 
          {TERMS.map(term => (
            <div
              key={term.id}
              className={`
                term-item-grid 
                ${selectedTermId === term.id ? 'selected' : ''} 
                ${matchQuizSolved.has(term.id) ? 'matched' : ''}
                ${wrongMatch?.termId === term.id ? 'wrong' : ''}
              `}
              onClick={() => handleTermClick(term.id)}
            >
              {term.name}
            </div>
          ))}
        </div>

        {/* 2. 설명 목록 (클릭 영역) */}
        <div className="description-list-grid"> 
          {DESCRIPTIONS.map(desc => (
            <div
              key={desc.id}
              className={`
                description-item-grid 
                ${matchQuizSolved.has(desc.answerId) ? 'matched' : ''}
                ${wrongMatch?.descId === desc.id ? 'wrong' : ''}
              `}
              onClick={() => handleDescriptionClick(desc)}
            >
              <span>{desc.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 버튼 */}
      <div className="quiz-actions-container single-button">
        <button
          className="next-button-styled"
          onClick={() => setCurrentPage(17)} // 다음 섹션으로 이동
          disabled={!allSolved}
        >
          <span>{'>'} 다음</span> 
        </button>
      </div>

    </div>
  );
};

export default Page15_DragQuiz;