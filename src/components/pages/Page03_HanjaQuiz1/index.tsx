// src/components/pages/Page03_HanjaQuiz1/index.tsx

import React, { useState } from 'react';
import { useGame } from '../../../context/useGame'
// [삭제] 기존 PageStyles.css 의존성 제거
// import './PageStyles.css'; 
// [추가] 모듈 CSS 불러오기
import styles from './Page03_HanjaQuiz1.module.css'; 

const Page3_HanjaQuiz1 = () => {
    const { setCurrentPage, updateScore } = useGame();
    
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isCorrect) return; 

        if (answer.trim().toLowerCase() === '교') { // [수정] 대소문자 무시 (안전성)
            updateScore(10); // 정답: +10점
            setFeedback('정답입니다! +10점');
            setIsCorrect(true);
            setAnswer('교'); // 입력창에 정답 고정
        } else {
            updateScore(-5); // 오답: -5점
            
            // 힌트: 초성은 'ㄱ' 입니다. (문제와 동일)
            setFeedback("땡! -5점. 힌트: 초성은 'ㄱ' 입니다.");
            
            setAnswer(''); // 입력창 비우기
        }
    };

    const handleNext = () => {
        setCurrentPage(4); // Page 4 (결과)로 이동
    };

    return (
        // [수정] 클래스 이름을 모듈에서 불러온 이름으로 변경합니다.
        <div className={`${styles.pageContainer} ${styles.page3}`}> 
            
            <div className={styles.quizContent}>
                <h1 className={styles.hanjaQuizChar}>橋</h1>
                <p className={styles.hanjaQuizMeaning}>다리</p>
            </div>
            
            <form className={styles.quizForm} onSubmit={handleSubmit}>
                <input
                    type="text"
                    className={styles.quizInput}
                    placeholder="한자의 '음'을 한 글자 입력하세요"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    disabled={isCorrect} 
                    maxLength={1} // 한 글자만 입력 가능
                />
                
                {/* 정답이 아닐 때만 '정답 확인' 버튼 표시 */}
                {!isCorrect && (
                    // [수정] 모듈 CSS 클래스 사용
                    <button type="submit" className={`${styles.loginStartButton} ${styles.quizSubmitButton}`}>
                        정답 확인
                    </button>
                )}
            </form>

            {/* 피드백 메시지 */}
            {feedback && (
                // [수정] 모듈 CSS 클래스 사용
                <p className={`${styles.feedbackMessage} ${isCorrect ? styles.correct : styles.wrong}`}>
                    {feedback}
                </p>
            )}
            
            {/* 정답을 맞췄을 때만 '다음' 버튼 표시 */}
            {isCorrect && (
                // [수정] 모듈 CSS 클래스 사용
                <button onClick={handleNext} className={styles.nextButtonStyled}>
                    &gt; 다음
                </button>
            )}
        </div>
    );
};

export default Page3_HanjaQuiz1;