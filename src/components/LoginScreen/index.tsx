// src/components/LoginScreen/index.tsx

import { useState } from 'react';
import { useGame } from '../../context/useGame'; 
import styles from './LoginScreen.module.css'; 

const LoginScreen = () => {
    const { startGame } = useGame();
    
    const [p1Id, setP1Id] = useState('');
    const [p1Name, setP1Name] = useState('');
    const [p2Id, setP2Id] = useState('');
    const [p2Name, setP2Name] = useState('');
    const [error, setError] = useState('');


    // [최종 수정] 1. 함수 정의에서 매개변수를 완전히 제거합니다.
    const handleStartGameLogic = async () => {
        setError('');

        if (!p1Id || !p1Name) {
            setError('본인의 학번과 이름은 반드시 입력해야 합니다.');
            return;
        }

        try {
            await startGame(p1Id, p1Name, p2Id, p2Name);
        } catch { // catch 블록의 예외 객체를 사용하지 않으므로 바인딩을 제거합니다.
            setError('게임 시작 중 오류가 발생했습니다. 네트워크를 확인하세요.');
        }
    };

    return (
        <div className={`${styles.pageContainer} ${styles.loginPage}`}>
            
            <h1 className={styles.mainTitle}>교량 탐험 게임</h1>
            <p>학번과 이름을 입력하고 게임을 시작하세요.</p>

            {/* [최종 수정] 2. 폼 제출 시 인라인 함수에서 e.preventDefault()만 처리하고, 로직은 매개변수 없이 호출합니다. */}
            <form onSubmit={(e) => {
                e.preventDefault(); 
                handleStartGameLogic(); 
            }} className={styles.form}>
                
                {/* [필수] 본인 정보 */}
                <div className={styles.playerInputs}>
                    <h3>[필수] 본인 정보</h3>
                    <div className={styles.inputRow}>
                        <input
                            type="text"
                            placeholder="학번 (예: 20101)"
                            value={p1Id}
                            onChange={(e) => setP1Id(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                        <input
                            type="text"
                            placeholder="이름 (예: 홍길동)"
                            value={p1Name}
                            onChange={(e) => setP1Name(e.target.value)}
                            className={styles.inputField}
                            required
                        />
                    </div>
                </div>

                {/* [선택] 팀원 정보 */}
                <div className={styles.playerInputs}>
                    <h3>[선택] 팀원 정보</h3>
                    <div className={styles.inputRow}>
                        <input
                            type="text"
                            placeholder="팀원 학번 (선택)"
                            value={p2Id}
                            onChange={(e) => setP2Id(e.target.value)}
                            className={styles.inputField}
                        />
                        <input
                            type="text"
                            placeholder="팀원 이름 (선택)"
                            value={p2Name}
                            onChange={(e) => setP2Name(e.target.value)}
                            className={styles.inputField}
                        />
                    </div>
                </div>

                {error && <p className={styles.errorMessage}>{error}</p>}
                
                <button
                    type="submit"
                    className={styles.loginStartButton}
                    disabled={!p1Id || !p1Name}
                >
                    게임 시작하기
                </button>
            </form>
            <p className={styles.note}>본인의 학번과 이름은 반드시 입력해야 합니다.</p>
        </div>
    );
};

export default LoginScreen;