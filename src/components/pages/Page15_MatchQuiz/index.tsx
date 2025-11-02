// src/components/pages/Page15_MatchQuiz/index.tsx (전체 코드)

import { useState, type ReactNode } from 'react';
import { useGame } from '../../../context/useGame'; 

// [삭제] 기존 PageStyles_v3.css 의존성 제거
// import './PageStyles_v3.css';
// [추가] 모듈 CSS 불러오기
import styles from './Page15.module.css'; 

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

const Page15_MatchQuiz = () => { // [수정] 컴포넌트 이름 변경
  const { updateScore, setCurrentPage, matchQuizSolved, setMatchQuizSolved } = useGame();
  
  const [selectedTermId, setSelectedTermId] = useState<string | null>(null);
  
  const [feedback, setFeedback] = useState<ReactNode>(
    <span className={styles.info}>왼쪽 용어를 먼저 선택하세요 💡</span>
  );
  
  const [wrongMatch, setWrongMatch] = useState<{ termId: string, descId: string } | null>(null);

  const allSolved = matchQuizSolved.size === TERMS.length;

  const handleTermClick = (termId: string) => {
    if (matchQuizSolved.has(termId)) return;
    
    if (selectedTermId === termId) {
      setSelectedTermId(null);
      setFeedback(<span className={styles.info}>왼쪽 용어를 먼저 선택하세요 💡</span>); 
    } else {
      setSelectedTermId(termId);
      setWrongMatch(null); 
      setFeedback(<span className={styles.info}>알맞은 설명을 선택하세요.</span>); 
    }
  };

  const handleDescriptionClick = (description: typeof DESCRIPTIONS[0]) => {
    if (!selectedTermId) {
      setFeedback(<span className={styles.info}>먼저 왼쪽의 용어를 선택하세요! 💡</span>);
      return;
    }

    if (matchQuizSolved.has(description.answerId)) return;

    if (selectedTermId === description.answerId) {
      // --- 정답 ---
      updateScore(10);
      setMatchQuizSolved((prev: Set<string>) => new Set(prev).add(selectedTermId));
      setFeedback(<span className={styles.correct}>정답입니다! 🥳 +10점</span>);
      setSelectedTermId(null); 
      setWrongMatch(null); 
    } else {
      // --- 오답 ---
      updateScore(-5); 
      setFeedback(<span className={styles.wrong}>오답! 😥 -5점</span>); 
      setWrongMatch({ termId: selectedTermId, descId: description.id });
      
      setTimeout(() => {
        setWrongMatch(null);
      }, 500);
    }
  };

  return (
    // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
    <div className={`${styles.pageContainer} ${styles.page15MatchQuizStyled}`}> 
      
      <div className={`${styles.navButtonContainer} ${styles.top}`}>
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={() => setCurrentPage(13)}>
          {'<'} 이전 (그림 확인)
        </button>
      </div>

      <h2 className={styles.matchQuizTitle}>퀴즈: 용어-설명 짝맞추기</h2> 
      
      <p className={styles.matchQuizSubtitle}>왼쪽 용어와 알맞은 설명을 짝맞춰 주세요.</p>

      <div className={styles.feedbackMessage} style={{ minHeight: '30px', marginBottom: '1rem' }}>
        {feedback}
      </div>

      <div className={styles.matchQuizGridContainer}> 
        <div className={styles.termBankGrid}> 
          {TERMS.map(term => (
            <div
              key={term.id}
              className={`
                ${styles.termItemGrid} 
                ${selectedTermId === term.id ? styles.selected : ''} 
                ${matchQuizSolved.has(term.id) ? styles.matched : ''}
                ${wrongMatch?.termId === term.id ? styles.wrong : ''}
              `}
              onClick={() => handleTermClick(term.id)}
            >
              {term.name}
            </div>
          ))}
        </div>
        <div className={styles.descriptionListGrid}> 
          {DESCRIPTIONS.map(desc => (
            <div
              key={desc.id}
              className={`
                ${styles.descriptionItemGrid} 
                ${matchQuizSolved.has(desc.answerId) ? styles.matched : ''}
                ${wrongMatch?.descId === desc.id ? styles.wrong : ''}
              `}
              onClick={() => handleDescriptionClick(desc)}
            >
              <span>{desc.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.quizActionsContainer} ${styles.singleButton}`}>
        <button
          className={styles.nextButtonStyled}
          onClick={() => setCurrentPage(16)} // 다음 페이지로 이동
          disabled={!allSolved}
        >
          <span>{'>'} 다음</span> 
        </button>
      </div>

    </div>
  );
};

export default Page15_MatchQuiz; // [수정] 컴포넌트 이름 변경