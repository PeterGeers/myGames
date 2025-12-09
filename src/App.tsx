import React, { useState, useEffect, useCallback } from 'react';
import { GameState, Question, Theme } from './types';
import { loadThemes, saveThemes } from './themes';
import './App.css';

const INITIAL_STATE: GameState = {
  playerName: '',
  selectedTheme: '',
  currentRound: 0,
  score: 0,
  lives: 3,
  timeLeft: 40,
  gamePhase: 'welcome'
};

function App() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_STATE);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; correct: boolean } | null>(null);
  const [themes, setThemes] = useState<Theme[]>([]);
  const [showEditor, setShowEditor] = useState(false);

  const getRandomTheme = () => themes[Math.floor(Math.random() * themes.length)];
  
  const getCurrentQuestion = useCallback(() => {
    const theme = themes.find(t => t.id === gameState.selectedTheme);
    if (!theme) return null;
    
    const difficulties = ['easy', 'medium', 'hard'] as const;
    const difficulty = difficulties[Math.min(gameState.currentRound, 2)];
    const questions = theme.questions.filter(q => q.difficulty === difficulty);
    
    return questions[Math.floor(Math.random() * questions.length)];
  }, [gameState.selectedTheme, gameState.currentRound, themes]);

  useEffect(() => {
    loadThemes().then(setThemes);
  }, []);

  useEffect(() => {
    if (gameState.gamePhase === 'playing' && !currentQuestion) {
      const question = getCurrentQuestion();
      setCurrentQuestion(question);
      setGameState(prev => ({ ...prev, timeLeft: 40 }));
    }
  }, [gameState.gamePhase, currentQuestion, getCurrentQuestion]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState.gamePhase === 'playing' && gameState.timeLeft > 0) {
      timer = setTimeout(() => {
        setGameState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (gameState.timeLeft === 0 && gameState.gamePhase === 'playing') {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [gameState.timeLeft, gameState.gamePhase]);

  const startGame = (themeName: string) => {
    const theme = themeName === 'random' ? getRandomTheme() : themes.find(t => t.title === themeName);
    if (!theme) return;
    
    setGameState(prev => ({
      ...prev,
      selectedTheme: theme.id,
      gamePhase: 'playing',
      currentRound: 0,
      score: 0,
      lives: 3
    }));
    setCurrentQuestion(null);
    setFeedback(null);
  };

  const handleTimeUp = () => {
    setFeedback({ message: 'Tijd is op! 😰', correct: false });
    setGameState(prev => ({ 
      ...prev, 
      lives: prev.lives - 1,
      gamePhase: 'feedback'
    }));
  };

  const checkAnswer = (selectedAnswer?: string) => {
    if (!currentQuestion) return;
    
    const answer = selectedAnswer || userAnswer;
    const correct = answer.toLowerCase().trim() === currentQuestion.answer.toLowerCase();
    
    if (correct) {
      setFeedback({ message: '🎉 Correct! Goed gedaan!', correct: true });
      setGameState(prev => ({ 
        ...prev, 
        score: prev.score + 10,
        gamePhase: 'feedback'
      }));
    } else {
      setFeedback({ message: `❌ Fout! Het antwoord was: ${currentQuestion.answer}`, correct: false });
      setGameState(prev => ({ 
        ...prev, 
        lives: prev.lives - 1,
        gamePhase: 'feedback'
      }));
    }
    setUserAnswer('');
  };

  const nextRound = () => {
    if (gameState.lives <= 0) {
      setGameState(prev => ({ ...prev, gamePhase: 'gameover' }));
      return;
    }

    if (gameState.currentRound >= 2) {
      setGameState(prev => ({ ...prev, gamePhase: 'gameover' }));
      return;
    }

    setGameState(prev => ({ 
      ...prev, 
      currentRound: prev.currentRound + 1,
      gamePhase: 'playing'
    }));
    setCurrentQuestion(null);
    setFeedback(null);
  };

  const resetGame = () => {
    setGameState(INITIAL_STATE);
    setCurrentQuestion(null);
    setUserAnswer('');
    setFeedback(null);
  };

  const renderWelcome = () => (
    <div>
      <h1>🎮 Kids Quiz Game</h1>
      <p>Welkom! Kies een thema en test je kennis!</p>
      
      <input
        type="text"
        placeholder="Je naam..."
        className="input"
        value={gameState.playerName}
        onChange={(e) => setGameState(prev => ({ ...prev, playerName: e.target.value }))}
        aria-label="Voer je naam in"
      />
      
      <div className="theme-grid">
        {themes.map(theme => (
          <button
            key={theme.id}
            className="theme-card"
            onClick={() => startGame(theme.title)}
            aria-label={`Kies thema ${theme.title}`}
          >
            <h3>{theme.title}</h3>
            <p>{theme.description}</p>
          </button>
        ))}
        <button
          className="theme-card"
          onClick={() => startGame('random')}
          aria-label="Kies willekeurig thema"
        >
          <h3>🎲 Random</h3>
          <p>Verras me!</p>
        </button>
      </div>
    </div>
  );

  const renderGame = () => {
    const theme = themes.find(t => t.id === gameState.selectedTheme);
    
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div className="score">Score: {gameState.score}</div>
          <div className={gameState.timeLeft <= 10 ? 'timer urgent' : 'timer'}>
            ⏰ {gameState.timeLeft}s
          </div>
        </div>
        
        <div className="lives">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className={i < gameState.lives ? 'heart' : 'heart lost'}>
              ❤️
            </div>
          ))}
        </div>

        <h2>{theme?.title} - Ronde {gameState.currentRound + 1}</h2>
        
        {currentQuestion && (
          <div>
            <div style={{ 
              background: 'var(--accent-yellow)', 
              padding: '2rem', 
              borderRadius: '15px', 
              margin: '2rem 0',
              fontSize: '1.2rem'
            }}>
              {currentQuestion.prompt}
            </div>
            
            {currentQuestion.type === 'multiple-choice' && currentQuestion.choices ? (
              <div className="theme-grid" style={{ marginTop: '2rem' }}>
                {currentQuestion.choices.map((choice, index) => (
                  <button
                    key={index}
                    className="theme-card"
                    onClick={() => checkAnswer(choice)}
                    aria-label={`Kies antwoord ${choice}`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Je antwoord..."
                  className="input"
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && checkAnswer()}
                  aria-label="Voer je antwoord in"
                  autoFocus
                />
                
                <button 
                  className="btn" 
                  onClick={() => checkAnswer()}
                  disabled={!userAnswer.trim()}
                >
                  Antwoord!
                </button>
              </>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderFeedback = () => (
    <div>
      <div className={`feedback ${feedback?.correct ? 'correct confetti' : 'incorrect'}`}>
        {feedback?.message}
      </div>
      
      <div className="score">Score: {gameState.score}</div>
      
      <button className="btn" onClick={nextRound}>
        {gameState.lives <= 0 || gameState.currentRound >= 2 ? 'Bekijk resultaat' : 'Volgende ronde'}
      </button>
    </div>
  );

  const renderGameOver = () => {
    const highScore = localStorage.getItem('highScore');
    const isNewHighScore = !highScore || gameState.score > parseInt(highScore);
    
    if (isNewHighScore) {
      localStorage.setItem('highScore', gameState.score.toString());
    }
    
    return (
      <div>
        <h1>🏆 Spel afgelopen!</h1>
        <div className="score" style={{ fontSize: '1.5rem', padding: '1rem 2rem' }}>
          EindScore: {gameState.score}
        </div>
        
        {isNewHighScore && (
          <div className="feedback correct confetti">
            🎉 Nieuwe hoogste score!
          </div>
        )}
        
        {highScore && (
          <p>Hoogste score: {highScore}</p>
        )}
        
        <button className="btn" onClick={resetGame}>
          🔄 Speel opnieuw
        </button>
        <button className="btn btn-secondary" onClick={() => setShowEditor(true)}>
          ⚙️ Vragen bewerken
        </button>
      </div>
    );
  };

  const renderEditor = () => (
    <div>
      <h2>⚙️ Vragen Editor</h2>
      <p>Download het bestand, bewerk het, en vervang het in de public map.</p>
      <button className="btn" onClick={() => saveThemes(themes)}>
        💾 Download questions.json
      </button>
      <button className="btn btn-secondary" onClick={() => setShowEditor(false)}>
        ← Terug naar spel
      </button>
      <div style={{ marginTop: '2rem', textAlign: 'left', fontSize: '0.9rem' }}>
        <h3>Instructies:</h3>
        <ol>
          <li>Klik op "Download questions.json"</li>
          <li>Open het bestand in een teksteditor</li>
          <li>Voeg nieuwe vragen toe of bewerk bestaande</li>
          <li>Sla het bestand op als "questions.json"</li>
          <li>Vervang het bestand in de public map</li>
          <li>Herlaad de pagina</li>
        </ol>
      </div>
    </div>
  );

  return (
    <div className="app">
      <div className="game-container">
        {showEditor && renderEditor()}
        {!showEditor && gameState.gamePhase === 'welcome' && renderWelcome()}
        {!showEditor && gameState.gamePhase === 'playing' && renderGame()}
        {!showEditor && gameState.gamePhase === 'feedback' && renderFeedback()}
        {!showEditor && gameState.gamePhase === 'gameover' && renderGameOver()}
      </div>
    </div>
  );
}

export default App;