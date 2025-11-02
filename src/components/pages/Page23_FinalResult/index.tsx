import { useState, useEffect } from 'react';
import { useGame } from '../../../context/useGame';
import styles from './Page23.module.css';
import Confetti from 'react-confetti'; 

// [추가] Firebase DB와 통신하기 위해 import
import { db } from '../../../firebaseConfig'; 
import { doc, updateDoc } from 'firebase/firestore';

const Page23_FinalResult = () => {
  // 1. GameContext에서 필요한 모든 정보 가져오기
  const { 
    score, 
    timeTaken, 
    calculateFinalScore, 
    gameDocId, 
    player1,
    player2
  } = useGame();

  // 2. 최종 점수 계산 (Context의 함수 사용)
  const { quizScore, timeBonus, finalScore } = calculateFinalScore(score, timeTaken);

  // 3. Firebase 전송 상태 관리
  const [transmissionStatus, setTransmissionStatus] = useState('결과 분석 중...');
  const [isSent, setIsSent] = useState(false);

  // 4. 컴포넌트가 마운트될 때 1회만 실행
  useEffect(() => {
    // Firebase에 최종 점수 전송
    const sendScoreToFirebase = async () => {
      if (gameDocId && !isSent) { // gameDocId가 있고, 아직 전송되지 않았다면
        setTransmissionStatus('선생님께 점수 전송 중...');
        try {
          const gameDocRef = doc(db, "gameSessions", gameDocId);
          await updateDoc(gameDocRef, {
            finalScore: finalScore,
            quizScore: quizScore,
            timeBonus: timeBonus,
            timeTaken: timeTaken,
            status: 'completed'
          });
          
          setTransmissionStatus('✅ 전송 완료! 수고하셨습니다.');
          setIsSent(true);
        } catch (err) {
          console.error("Firebase 최종 점수 업데이트 오류: ", err);
          setTransmissionStatus('❌ 전송 실패! (네트워크 오류)');
        }
      } else if (!gameDocId) {
        setTransmissionStatus('❌ 전송 실패! (게임 세션 ID 없음)');
      }
    };

    sendScoreToFirebase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameDocId, finalScore, quizScore, timeBonus, timeTaken]); // 의존성 배열

  return (
    <>
      {/* 400개 컨페티 (정답 시가 아닌, 완료 시 계속 터짐) */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={400} 
      />

      <div className={styles.pageContainer}>
        <h1 className={styles.title}>수고했어요!</h1>
        <p className={styles.subtitle}>
          {player1.name}님 (그리고 {player2.name || '팀원'}님)의
          <br />
          최종 점수입니다.
        </p>

        {/* 점수 카드 (TimeUp 페이지와 동일한 스타일) */}
        <div className={styles.scoreCard}>
          <div className={styles.scoreRow}>
            <span>획득 점수 (Score)</span>
            <span className={styles.scoreValue}>{quizScore} 점</span>
          </div>
          <div className={styles.scoreRow}>
            <span>시간 보너스 (Bonus)</span>
            <span className={styles.scoreValue}>+{timeBonus} 점</span>
          </div>
          <hr className={styles.divider} />
          <div className={`${styles.scoreRow} ${styles.finalScore}`}>
            <span>최종 점수</span>
            <span className={styles.scoreValue}>{finalScore} 점</span>
          </div>
        </div>

        {/* 전송 상태 메시지 */}
        <p className={styles.transmissionStatus}>
          {transmissionStatus}
        </p>

        {/* (이 페이지는 마지막이므로 '다음' 버튼이 없습니다) */}
      </div>
    </>
  );
};

export default Page23_FinalResult;
