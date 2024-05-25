// src/QuizApp.js
import React, { useState } from 'react';
import quizData from '../quizQuestions';

const Quiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);

    const handleAnswerOptionClick = (option) => {
        if (option === quizData[currentQuestion].answer) {
            setScore(score + 1);
        }

        const nextQuestion = currentQuestion + 1;
        if (nextQuestion < quizData.length) {
            setCurrentQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const restart = () => {
        setScore(0)
        setShowScore(false)
        setCurrentQuestion(0)
    }

    return (
        <div className='quiz-wrapper'>
            <div className="quiz-app">
                {showScore ? (
                    <div className="score-section">
                        <p>
                            You scored {score} out of {quizData.length}
                        </p>
                        <button onClick={() => restart()}>Restart</button>
                    </div>
                ) : (
                    <div>
                        <div className="question-section">
                            <div className="question-count">
                                <span>Question {currentQuestion + 1}</span>/{quizData.length}
                            </div>
                            <div className="question-text">
                                {quizData[currentQuestion].question}
                            </div>
                        </div>
                        <div className="answer-section">
                            {quizData[currentQuestion].options.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswerOptionClick(option)}
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Quiz;
