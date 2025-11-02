// src/components/pages/Page14_HintHub/index.tsx

import { useState } from 'react';
import { useGame } from '../../../context/useGame';
// [삭제] 기존 CSS 의존성 제거
// import './PageStyles.css'; 
// import './PageStyles_v2.css'; 
// [추가] 모듈 CSS 불러오기
import styles from './Page14.module.css'; 


// PDF 21~25페이지 힌트 내용
const hintData = [
  { id: 1, title: '1번이 궁금해', text: "ㄱㄹ의 ㄱㅇ를 나타내는거야.\n여기서부터 여기까지의\nㄱㅇ 라는걸 보여주는거지." },
  { id: 2, title: '2번이 궁금해', text: "ㄱ은 ㄱㄹ의 ㄱ을 따온거야.\nㄷ은 전망ㄷ, 첨성ㄷ, 무ㄷ 의 ㄷ과 같아.\n무엇인가를 받친다는 뜻의 글자야." },
  { id: 3, title: '3번이 궁금해', text: "ㄱ은 ㄱㄹ의 ㄱ을 따온거야.\n두 번째 ㄱ은 '이인삼ㄱ' 할 때의 그 ㄱ이야.\n기둥이라는 뜻이야." },
  { id: 4, title: '4번이 궁금해', text: "ㅈ은 중요하다는 뜻이야. 'ㅈ연 배우'\n할 때 쓰이기도 해.\nㅂ은 '대들ㅂ' 할 때 ㅂ와 똑같아.\n기둥 위에 올려놓는 거지." },
  { id: 5, title: '5번이 궁금해', text: "ㄱㅊ는 쉬운 단어야.\nㄱㅊ학력평가도 있지?\n가장 기본이 되는 것이라는 뜻이야." },
];

const Page14_HintHub = () => {
  const { setCurrentPage, viewHint } = useGame(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentHint, setCurrentHint] = useState(hintData[0]);

  // 힌트 버튼 클릭 시 모달 열기 및 감점 처리
  const showHint = (hint: typeof hintData[0]) => {
    viewHint(hint.id); // 감점 및 기록은 useGame이 담당
    
    setCurrentHint(hint);
    setIsModalOpen(true);
  };

  return (
    // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
    <div className={`${styles.pageContainer} ${styles.page14HintHub}`}>
      
      {/* 상단 네비게이션 */}
      <div className={`${styles.navButtonContainer} ${styles.top}`}>
        <button className={`${styles.navButton} ${styles.prevButton}`} onClick={() => setCurrentPage(13)}>
          {'<'} 퀴즈로 돌아가기
        </button>
      </div>

      <h2 className={styles.hintHubTitle}>힌트 창고💡</h2>
      <p className={styles.hintHubSubtitle}>궁금한 번호의 힌트를 확인해보세요.</p>

      {/* 힌트 버튼 목록 */}
      <div className={styles.hintButtonGrid}>
        {hintData.map(hint => (
          <button 
            key={hint.id}
            className={styles.hintButton}
            onClick={() => showHint(hint)}
          >
            {hint.title}
          </button>
        ))}
      </div>

      {/* 힌트 내용 모달 */}
      {isModalOpen && (
        <div className={styles.quizModalOverlay}>
          <div className={`${styles.quizModalContent} ${styles.hintModalContent}`}>
            <h2 className={styles.modalTitle}>{currentHint.title}</h2>
            {/* \n을 <br>로 변환하여 렌더링 */}
            <p className={styles.hintModalText}>
              {currentHint.text.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <button 
              type="button" 
              className={styles.modalCloseButton} 
              onClick={() => setIsModalOpen(false)}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page14_HintHub;