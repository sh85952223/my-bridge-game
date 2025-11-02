import { useGame } from '../../../context/useGame';
import styles from './Page_TimeUp.module.css';

// [신규] 최종 점수 계산 로직
const calculateFinalScore = (quizScore: number, timeTaken: number) => {
  // 기준 시간 (40분 = 2400초)
  const totalTime = 40 * 60;
  
  // 시간 보너스 (빨리 푼 시간 * 0.1)
  // (타임 오버 시 0점)
  const timeBonus = Math.max(0, (totalTime - timeTaken) * 0.1);

  // 최종 점수 = 퀴즈 점수 + 시간 보너스
  const finalScore = quizScore + timeBonus;
  
  return {
    quizScore,
    timeBonus: Math.round(timeBonus),
    finalScore: Math.round(finalScore)
  };
};


const Page_TimeUp = () => {
  const { score, timeTaken } = useGame();

  // [신규] 점수 계산
  const { quizScore, timeBonus, finalScore } = calculateFinalScore(score, timeTaken);

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>TIME UP!</h1>
      <p className={styles.subtitle}>
        아쉽지만 40분이 모두 지났습니다!
        <br />
        최종 점수를 확인하세요.
      </p>

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
    </div>
  );
};

export default Page_TimeUp;
