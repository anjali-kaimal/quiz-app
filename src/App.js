import React, { useState, useEffect } from 'react';
import './App.css';
import ConnectFour from './ConnectFour';

const dummyQuestions = [
  {
    id: 1,
    question: "When did we first meet?",
    options: ["August 2025", "July 2025"]
  },
  {
    id: 2,
    question: "What's the most appropriate response to (ILY)+1?",
    options: ["Me too", "f u"]
  },
  {
    id: 3,
    question: "Our dream vacation?",
    options: ["Europe", "Japan"]
  },
  {
    id: 4,
    question: "Who's the poker champ from last time?",
    options: ["Anjali", "Aadarsh"]
  },
  {
    id: 5,
    question: "What's our ideal weekend?",
    options: ["Home,movie,cooking :')", "Partayyyyyy"]
  }
];

const correctAnswers = [0, 1, 1, 0, 0];

function App() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [showConnectFour, setShowConnectFour] = useState(false);
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const heartPositions = [];
    for (let i = 0; i < 50; i++) {
      heartPositions.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2
      });
    }
    setHearts(heartPositions);
  }, []);

  const handleStart = () => {
    setStarted(true);
  };

  const handleOptionClick = (selectedIndex) => {
    if (selectedIndex === correctAnswers[currentQuestion]) {
      if (currentQuestion < dummyQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowPopup(true);
      }
    } else {
      setShowErrorPopup(true);
    }
  };

  const handlePlayConnectFour = () => {
    setShowPopup(false);
    setShowConnectFour(true);
  };

  const handleConnectFourEnd = () => {
    setShowConnectFour(false);
    setStarted(false);
    setCurrentQuestion(0);
  };

  const handleRestart = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setShowPopup(false);
    setShowConnectFour(false);
  };

  const handleCloseError = () => {
    setShowErrorPopup(false);
  };

  return (
    <div className="App">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="heart"
          style={{
            left: `${heart.left}%`,
            top: `${heart.top}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`
          }}
        >
          💙
        </div>
      ))}

      {!showConnectFour ? (
        <div className="container">
          {!started ? (
            <>
              <h1 className="title">Happy V day</h1>
              <button className="start-button" onClick={handleStart}>
                Ready to test your knowledge on us?
              </button>
            </>
          ) : (
            <div className="quiz-container">
              <div className="question-number">
                Question {currentQuestion + 1} of {dummyQuestions.length}
              </div>
              <h2 className="question-text">
                {dummyQuestions[currentQuestion].question}
              </h2>
              <div className="options">
                {dummyQuestions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="option-button"
                    onClick={() => handleOptionClick(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <ConnectFour onGameEnd={handleConnectFourEnd} />
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <div className="popup-content">
              <div className="popup-emoji">🎉</div>
              <h2 className="popup-title">Look who won yaaaayy!</h2>
              <p className="popup-message">Lets play connect four now!!</p>
              <button className="popup-button" onClick={handlePlayConnectFour}>
                Play Connect 4
              </button>
            </div>
          </div>
        </div>
      )}

      {showErrorPopup && (
        <div className="popup-overlay">
          <div className="popup error-popup">
            <div className="popup-content">
              <div className="popup-emoji">😠</div>
              <h2 className="popup-title">Noppp, try again</h2>
              <button className="popup-button" onClick={handleCloseError}>
                Try Again
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
