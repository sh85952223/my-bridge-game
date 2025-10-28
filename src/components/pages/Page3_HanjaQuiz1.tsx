import React, { useState } from 'react';
import { useGame } from '../../context/GameContext';
import './PageStyles.css'; // 공통 스타일

const Page3_HanjaQuiz1 = () => {
  const { setCurrentPage, updateScore } = useGame();
  
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCorrect) return; 

    if (answer.trim() === '교') {
      updateScore(10); // 정답: +10점
      setFeedback('정답입니다! +10점');
      setIsCorrect(true);
      setAnswer('교'); // 입력창에 정답 고정
    } else {
      updateScore(-5); // 오답: -5점
      
      // [수정] 오답 시 초성 힌트 제공
      setFeedback("땡! -5점. 힌트: 초성은 'ㄱ' 입니다.");
      
      setAnswer(''); // 입력창 비우기
    }
  };

  const handleNext = () => {
    setCurrentPage(4); // Page 4 (결과)로 이동
  };

  return (
    <div className="page-container page3"> 
      
      <div className="quiz-content">
        <h1 className="hanja-quiz-char">橋</h1>
        <p className="hanja-quiz-meaning">다리</p>
      </div>
      
      <form className="quiz-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="quiz-input"
          placeholder="한자의 '음'을 한 글자 입력하세요"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          disabled={isCorrect} 
          maxLength={1} // 한 글자만 입력 가능
        />
        
        {/* 정답이 아닐 때만 '정답 확인' 버튼 표시 */}
        {!isCorrect && (
          <button type="submit" className="login-start-button quiz-submit-button">
            정답 확인
          </button>
        )}
      </form>

      {/* 피드백 메시지 */}
      {feedback && (
        <p className={`feedback-message ${isCorrect ? 'correct' : 'wrong'}`}>
          {feedback}
        </p>
      )}
      
      {/* 정답을 맞췄을 때만 '다음' 버튼 표시 */}
      {isCorrect && (
        <button onClick={handleNext} className="next-button-styled">
          &gt; 다음
        </button>
      )}
    </div>
  );
};

export default Page3_HanjaQuiz1;

