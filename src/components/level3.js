import React, { useState, useEffect } from 'react';
import './home.css';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Level3 = () => {
    const navigate = useNavigate();
    const [answer, setAnswer] = useState('');
    const [question, setQuestion] = useState({ num1: 0, num2: 0 });
    const [correctAnswers, setCorrectAnswers] = useState(0);
    const [incorrectAnswers, setIncorrectAnswers] = useState([]);
    const [totalQuestionCount, setTotalQuestionCount] = useState(0);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        generateQuestion();
    }, []);

    const generateQuestion = () => {
        const num1 = Math.floor(Math.random() * 15) + 1;
        const num2 = Math.floor(Math.random() * 15) + 1;
        setQuestion({ num1, num2 });
        setTotalQuestionCount(totalQuestionCount + 1);
    };

    const handleSubmit = () => {
        const correctAnswer = question.num1 * question.num2;
        if (parseInt(answer) === correctAnswer) {
            setCorrectAnswers(correctAnswers + 1);
            if (correctAnswers + 1 === 5) {
                // Trigger confetti effect
                confetti({
                    particleCount: 200,
                    spread: 70,
                    origin: { y: 0.6 }
                });
                // Display reward and navigate to the home page after a short delay
                setTimeout(() => {
                    alert('Congratulations! You finished the game!');
                    navigate('/');
                }, 3000);
            } else {
                generateQuestion();
                setAnswer('');
            }
        } else {
            setIncorrectAnswers([...incorrectAnswers, { question: `${question.num1} × ${question.num2}`, userAnswer: answer, correctAnswer }]);
            if (incorrectAnswers.length + 1 === 3) {
                setGameOver(true);
            } else {
                generateQuestion();
                setAnswer('');
            }
        }
    };

    const resetGame = () => {
        setCorrectAnswers(0);
        setIncorrectAnswers([]);
        setTotalQuestionCount(0);
        setGameOver(false);
        generateQuestion();
        setAnswer('');
    };

    return (
        <div className="level-container">
            <h2>Level 3: Multiplication</h2>
            {!gameOver && correctAnswers < 5 ? (
                <>
                    <p>What is {question.num1} × {question.num2}?</p>
                    <input
                        type="text"
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="answer-input"
                    />
                    <button onClick={handleSubmit} className="submit-button">Submit</button>
                    <p>Correct answers: {correctAnswers}/5</p>
                    <p>Total questions answered: {totalQuestionCount}</p>
                    {incorrectAnswers.length > 0 && (
                        <div className="incorrect-answers">
                            <h3>Incorrect Answers:</h3>
                            <ul>
                                {incorrectAnswers.map((item, index) => (
                                    <li key={index}>
                                        {item.question} = {item.userAnswer} (Correct: {item.correctAnswer})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            ) : gameOver ? (
                <div className="game-over-message">
                    <h3>Game Over</h3>
                    <p>You've input 3 incorrect answers. Please try again.</p>
                    <button onClick={resetGame} className="retry-button">Retry</button>
                </div>
            ) : (
                <div className="reward-message">
                    <h3>Congratulations!</h3>
                    <p>You've answered all questions correctly!</p>
                    <p>Here is your reward: <span className="reward-badge">🏅</span> You are a math champion!</p>
                    <p>Proceeding to the home page...</p>
                </div>
            )}
            {correctAnswers >= 5 && (
                <div className="points-table">
                    <h3>Points Table</h3>
                    <p>Total correct answers: {correctAnswers}</p>
                    <p>Total incorrect answers: {incorrectAnswers.length}</p>
                </div>
            )}
        </div>
    );
};

export default Level3;
