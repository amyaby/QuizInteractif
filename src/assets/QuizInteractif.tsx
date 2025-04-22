import { useState } from 'react';

const QuizInteractif = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);

  const questions = [
    { texte: "React est un framework.", reponse: false },
    { texte: "useState permet de gérer l'état.", reponse: true },
    { texte: "JSX est une extension CSS.", reponse: false },
    { texte: "Le Virtual DOM est plus rapide.", reponse: true },
  ];

  const handleAnswer = (selectedAnswer: boolean) => {
    const correct = questions[currentQuestionIndex].reponse === selectedAnswer;
    if (correct) setScore(prev => prev + 1);
  
    setUserAnswer(selectedAnswer);
    setShowResult(true);
  };
  

  const handleNextQuestion = () => {
    setShowResult(false);
    setUserAnswer(null);
    setCurrentQuestionIndex(prev => prev + 1);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
    setUserAnswer(null);
  };

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="end-screen">
        <h2>Quiz Terminé !</h2>
        <p>Votre score : {score}/{questions.length}</p>
        <button onClick={handleRestart}>Recommencer</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="quiz-container">
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p className="question-text">{currentQuestion.texte}</p>
      
      <div className="buttons-container">
        <button 
          onClick={() => handleAnswer(true)}
          disabled={showResult}
          className={showResult && userAnswer === true ? (userAnswer === currentQuestion.reponse ? 'correct' : 'incorrect') : ''}
        >
          Vrai
        </button>
        
        <button 
          onClick={() => handleAnswer(false)}
          disabled={showResult}
          className={showResult && userAnswer === false ? (userAnswer === currentQuestion.reponse ? 'correct' : 'incorrect') : ''}
        >
          Faux
        </button>
      </div>

      {showResult && (
        <div className="result-section">
          <p style={{ color: userAnswer === currentQuestion.reponse ? 'green' : 'red' }}>
            {userAnswer === currentQuestion.reponse 
              ? 'Bonne réponse ! 🎉' 
              : `Mauvaise réponse ! La bonne réponse était ${currentQuestion.reponse ? 'Vrai' : 'Faux'}.`}
          </p>
          <button 
            onClick={handleNextQuestion}
            className="next-button"
          >
            {currentQuestionIndex < questions.length - 1 ? 'Question suivante →' : 'Voir les résultats'}
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizInteractif;