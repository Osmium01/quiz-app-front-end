import React, { useState, useEffect } from 'react';

function Quiz() {
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizResult, setQuizResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchQuizQuestions() {
            try {
                const response = await fetch('https://quiz-app-back-end.onrender.com/api/quiz');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuizQuestions(data.slice(0, 100));
                setLoading(false);
            } catch (error) {
                console.error('Fetch error:', error);
            }
        }

        fetchQuizQuestions();
    }, []);

    const handleOptionChange = (questionNumber, selectedOption) => {
        setUserAnswers({
            ...userAnswers,
            [questionNumber]: selectedOption
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://quiz-app-back-end.onrender.com/api/quiz/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_answers: userAnswers })
            });
            if (response.ok) {
                const result = await response.json();
                setQuizResult(result);
            } else {
                console.error('Submit failed with status:', response.status);
            }
        } catch (error) {
            console.error('Submit error:', error);
        }
    };

    const renderSkeletonLoader = () => {
        return (
            <div className="skeleton-loader">
                <div className="skeleton-question" />
                <div className="skeleton-options" />
                <div className="skeleton-options" />
                <div className="skeleton-options" />
            </div>
        );
    };

    return (
        <div className="container mt-4">
            <h2>Quiz</h2>
            {loading && renderSkeletonLoader()}

            {!loading && !quizResult && (
                <form onSubmit={handleSubmit}>
                    {quizQuestions.map((question, index) => (
                        <div key={index} className="mb-3 p-3 border rounded shadow-sm question-container">
                            <h5 className="question-text">
                                <strong>Question {index + 1}:</strong> {question.question}
                            </h5>
                            <div>
                                {question.options.map((option, idx) => (
                                    <div key={idx} className="form-check">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name={`question_${index}`}
                                            id={`option_${index}_${idx}`}
                                            value={idx}
                                            onChange={() => handleOptionChange(index, idx)}
                                            checked={userAnswers[index] === idx}
                                        />
                                        <label className="form-check-label" htmlFor={`option_${index}_${idx}`}>
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {!loading && <button className="btn btn-primary" type="submit">Submit Quiz</button>}
                </form>
            )}

            {!loading && quizResult && (
                <div className={`alert ${quizResult.score > 33 ? 'alert-success' : 'alert-danger'}`} role="alert">
                    <h4 className="alert-heading">Quiz Completed!</h4>
                    <p>You answered {quizResult.score} out of {quizQuestions.length} questions correctly.</p>
                </div>
            )}

            {!loading && quizResult && (
                <button className="btn btn-primary" onClick={() => window.location.reload()}>Retake Quiz</button>
            )}
        </div>
    );
}

export default Quiz;
