import React, { useState } from 'react';

const DiceRollingGame = () => {
  const [dice, setDice] = useState([1, 1]);
  const [isRolling, setIsRolling] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [rollCount, setRollCount] = useState(0);
  const [currentRoll, setCurrentRoll] = useState(0);
  const [gameHistory, setGameHistory] = useState([]);
  const [targetScore, setTargetScore] = useState(50);
  const [gameWon, setGameWon] = useState(false);

  const getDiceFace = (number) => {
    const faces = {
      1: '⚀',
      2: '⚁',
      3: '⚂',
      4: '⚃',
      5: '⚄',
      6: '⚅'
    };
    return faces[number];
  };

  const rollDice = () => {
    if (isRolling || gameWon) return;
    
    setIsRolling(true);
    
    // Animate rolling effect
    const rollAnimation = setInterval(() => {
      setDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ]);
    }, 100);

    setTimeout(() => {
      clearInterval(rollAnimation);
      
      const newDice = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1
      ];
      
      setDice(newDice);
      setIsRolling(false);
      
      const rollSum = newDice[0] + newDice[1];
      const newTotalScore = totalScore + rollSum;
      const newRollCount = rollCount + 1;
      
      setCurrentRoll(rollSum);
      setTotalScore(newTotalScore);
      setRollCount(newRollCount);
      
      // Add to game history
      const newHistoryEntry = {
        roll: newRollCount,
        dice: [...newDice],
        sum: rollSum,
        totalScore: newTotalScore
      };
      setGameHistory(prev => [newHistoryEntry, ...prev.slice(0, 9)]);
      
      // Check if target score reached
      if (newTotalScore >= targetScore) {
        setGameWon(true);
      }
    }, 1000);
  };

  const resetGame = () => {
    setDice([1, 1]);
    setTotalScore(0);
    setRollCount(0);
    setCurrentRoll(0);
    setGameHistory([]);
    setGameWon(false);
  };

  const getScoreColor = () => {
    if (totalScore >= targetScore) return { color: '#10b981' };
    if (totalScore >= targetScore * 0.8) return { color: '#f59e0b' };
    return { color: '#3b82f6' };
  };

  const getBonusMessage = () => {
    if (dice[0] === dice[1]) {
      return `🎯 Double ${dice[0]}s! Nice roll!`;
    }
    if (currentRoll === 12) {
      return '🔥 Maximum roll! Incredible!';
    }
    if (currentRoll === 2) {
      return '😅 Snake eyes! Better luck next time!';
    }
    if (currentRoll >= 10) {
      return '⭐ Great roll!';
    }
    return '';
  };

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #1e1b4b 0%, #1e3a8a 50%, #312e81 100%)',
    padding: '1rem',
    fontFamily: 'Arial, sans-serif'
  };

  const cardStyle = {
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '1rem',
    padding: '2rem',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
  };

  const diceStyle = {
    width: '80px',
    height: '80px',
    background: 'white',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '3rem',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  };

  const rollingDiceStyle = {
    ...diceStyle,
    animation: 'spin 0.1s linear infinite',
    transform: 'scale(1.1)'
  };

  const buttonStyle = {
    padding: '1rem 2rem',
    borderRadius: '1rem',
    fontWeight: 'bold',
    fontSize: '1.125rem',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    border: 'none',
    background: 'linear-gradient(to right, #ec4899, #8b5cf6)',
    color: 'white',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)'
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    background: '#6b7280',
    cursor: 'not-allowed'
  };

  return (
    <div style={containerStyle}>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg) scale(1.1); }
          to { transform: rotate(360deg) scale(1.1); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .pulse { animation: pulse 2s ease-in-out infinite; }
        .hover-scale:hover { transform: scale(1.05); }
        .grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; }
        @media (max-width: 768px) {
          .grid-md-2 { display: block; }
          .grid-md-2 > * { margin-bottom: 2rem; }
        }
      `}</style>
      
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 'bold', 
            color: 'white', 
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem'
          }}>
            🏆 Dice Rolling Challenge 🏆
          </h1>
          <p style={{ color: '#bfdbfe' }}>Roll the dice and reach your target score!</p>
        </div>

        <div className="grid-md-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {/* Game Area */}
          <div style={cardStyle}>
            <div style={{ textAlign: 'center' }}>
              {/* Dice Display */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                {dice.map((die, index) => (
                  <div
                    key={index}
                    style={isRolling ? rollingDiceStyle : diceStyle}
                    className="hover-scale"
                  >
                    {getDiceFace(die)}
                  </div>
                ))}
              </div>

              {/* Current Roll Info */}
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ 
                  fontSize: '4rem', 
                  fontWeight: 'bold', 
                  color: 'white', 
                  marginBottom: '0.5rem' 
                }}>
                  {currentRoll || (dice[0] + dice[1])}
                </div>
                <div style={{ color: '#bfdbfe' }}>Current Roll</div>
                {getBonusMessage() && (
                  <div style={{ 
                    color: '#fcd34d', 
                    fontWeight: '600', 
                    marginTop: '0.5rem' 
                  }} className="pulse">
                    {getBonusMessage()}
                  </div>
                )}
              </div>

              {/* Roll Button */}
              <button
                onClick={rollDice}
                disabled={isRolling || gameWon}
                style={isRolling || gameWon ? disabledButtonStyle : buttonStyle}
                className="hover-scale"
              >
                {isRolling ? 'Rolling...' : gameWon ? 'Game Won!' : 'Roll Dice 🎲'}
              </button>
            </div>
          </div>

          {/* Score Panel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Current Stats */}
            <div style={cardStyle}>
              <h3 style={{ 
                fontSize: '1.25rem', 
                fontWeight: 'bold', 
                color: 'white', 
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                🎯 Game Stats
              </h3>
              
              <div className="grid-2">
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', ...getScoreColor() }}>
                    {totalScore}
                  </div>
                  <div style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>Total Score</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>
                    {rollCount}
                  </div>
                  <div style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>Rolls</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#fbbf24' }}>
                    {targetScore}
                  </div>
                  <div style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>Target</div>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#c084fc' }}>
                    {rollCount > 0 ? (totalScore / rollCount).toFixed(1) : '0.0'}
                  </div>
                  <div style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>Average</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div style={{ marginTop: '1rem' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '0.875rem', 
                  color: '#bfdbfe',
                  marginBottom: '0.25rem'
                }}>
                  <span>Progress</span>
                  <span>{Math.min(100, Math.round((totalScore / targetScore) * 100))}%</span>
                </div>
                <div style={{ 
                  width: '100%', 
                  height: '0.75rem', 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  borderRadius: '9999px'
                }}>
                  <div style={{
                    height: '0.75rem',
                    borderRadius: '9999px',
                    background: 'linear-gradient(to right, #10b981, #3b82f6)',
                    width: `${Math.min(100, (totalScore / targetScore) * 100)}%`,
                    transition: 'width 0.5s ease'
                  }}></div>
                </div>
              </div>

              {gameWon && (
                <div style={{
                  marginTop: '1rem',
                  padding: '1rem',
                  background: 'rgba(34, 197, 94, 0.2)',
                  borderRadius: '0.5rem',
                  border: '1px solid rgba(34, 197, 94, 0.3)'
                }}>
                  <div style={{ color: '#86efac', fontWeight: 'bold', textAlign: 'center' }}>
                    🎉 Congratulations! You reached {targetScore} points in {rollCount} rolls!
                  </div>
                </div>
              )}
            </div>

            {/* Target Score Selector */}
            <div style={cardStyle}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: 'white', marginBottom: '0.75rem' }}>
                Target Score
              </h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {[25, 50, 75, 100].map(target => (
                  <button
                    key={target}
                    onClick={() => setTargetScore(target)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '0.5rem',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      background: targetScore === target ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                      color: targetScore === target ? 'white' : '#bfdbfe'
                    }}
                    className="hover-scale"
                  >
                    {target}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset Button */}
            <button
              onClick={resetGame}
              style={{
                width: '100%',
                background: 'linear-gradient(to right, #ef4444, #ec4899)',
                color: 'white',
                fontWeight: 'bold',
                padding: '0.75rem 1.5rem',
                borderRadius: '1rem',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
              className="hover-scale"
            >
              🔄 Reset Game
            </button>
          </div>
        </div>

        {/* Game History */}
        {gameHistory.length > 0 && (
          <div style={{ ...cardStyle, marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', marginBottom: '1rem' }}>
              Recent Rolls
            </h3>
            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {gameHistory.map((entry, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    padding: '0.75rem',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center',
                    marginBottom: '0.25rem'
                  }}>
                    <div style={{ color: '#bfdbfe', fontSize: '0.875rem' }}>Roll #{entry.roll}</div>
                    <div style={{ display: 'flex', gap: '0.25rem' }}>
                      {entry.dice.map((die, diceIndex) => (
                        <span key={diceIndex} style={{ fontSize: '1rem' }}>
                          {getDiceFace(die)}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div style={{ color: 'white', fontWeight: 'bold', fontSize: '0.875rem' }}>
                    Sum: {entry.sum} | Total: {entry.totalScore}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiceRollingGame;