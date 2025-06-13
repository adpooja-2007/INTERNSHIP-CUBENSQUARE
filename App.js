import React, { useState, useEffect } from 'react';

const MemoryGame = () => {
  const symbols = ['🎮', '🎯', '🎲', '🎪'];
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  // Initialize game
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Create pairs and add one extra card to make it 9 cards total
    const gameCards = [...symbols, ...symbols, symbols[0]];
    const shuffledCards = gameCards
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({
        id: index,
        symbol,
        isFlipped: false,
        isMatched: false
      }));
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedPairs([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (cardId) => {
    if (flippedCards.length === 2) return;
    
    const card = cards.find(c => c.id === cardId);
    if (card.isFlipped || card.isMatched) return;

    const newFlippedCards = [...flippedCards, cardId];
    setFlippedCards(newFlippedCards);

    // Update card state
    setCards(prevCards => 
      prevCards.map(c => 
        c.id === cardId ? { ...c, isFlipped: true } : c
      )
    );

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      checkForMatch(newFlippedCards);
    }
  };

  const checkForMatch = (flippedCardIds) => {
    const [firstCard, secondCard] = flippedCardIds.map(id => 
      cards.find(c => c.id === id)
    );

    setTimeout(() => {
      if (firstCard.symbol === secondCard.symbol) {
        // Match found
        setMatchedPairs(prev => [...prev, firstCard.symbol]);
        setCards(prevCards => 
          prevCards.map(c => 
            flippedCardIds.includes(c.id) 
              ? { ...c, isMatched: true } 
              : c
          )
        );
        
        // Check win condition
        const newMatchedCount = cards.filter(c => 
          flippedCardIds.includes(c.id) || c.isMatched
        ).length;
        
        if (newMatchedCount >= 8) {
          setGameWon(true);
        }
      } else {
        // No match, flip back
        setCards(prevCards => 
          prevCards.map(c => 
            flippedCardIds.includes(c.id) 
              ? { ...c, isFlipped: false } 
              : c
          )
        );
      }
      setFlippedCards([]);
    }, 1000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        color: 'white'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
        }}>
          🧠 Memory Game
        </h1>
        
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '10px 20px',
            borderRadius: '25px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            Moves: <strong>{moves}</strong>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.2)',
            padding: '10px 20px',
            borderRadius: '25px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.3)'
          }}>
            Matched: <strong>{cards.filter(c => c.isMatched).length}/9</strong>
          </div>
        </div>
      </div>

      {/* Game Board */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        maxWidth: '400px',
        width: '100%',
        marginBottom: '30px'
      }}>
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            style={{
              width: '120px',
              height: '120px',
              perspective: '1000px',
              cursor: 'pointer'
            }}
          >
            <div style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
              transform: card.isFlipped || card.isMatched ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}>
              {/* Card Back */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                border: '2px solid rgba(255,255,255,0.3)',
                fontSize: '2rem'
              }}>
                ❓
              </div>
              
              {/* Card Front */}
              <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                background: card.isMatched 
                  ? 'linear-gradient(135deg, #48dbfb, #0abde3)' 
                  : 'linear-gradient(135deg, #ff9ff3, #f368e0)',
                borderRadius: '15px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
                border: '2px solid rgba(255,255,255,0.3)',
                transform: 'rotateY(180deg)',
                fontSize: '3rem'
              }}>
                {card.symbol}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <button
        onClick={initializeGame}
        style={{
          background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
          border: 'none',
          color: 'white',
          padding: '15px 30px',
          fontSize: '1.1rem',
          fontWeight: 'bold',
          borderRadius: '25px',
          cursor: 'pointer',
          boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
        onMouseOver={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
        }}
        onMouseOut={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.2)';
        }}
      >
        New Game
      </button>

      {/* Win Modal */}
      {gameWon && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '20px',
            textAlign: 'center',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            maxWidth: '400px',
            width: '90%',
            animation: 'bounce 1s ease-in-out'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 'bold',
              color: '#333',
              marginBottom: '15px'
            }}>
              Congratulations!
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: '#666',
              marginBottom: '30px'
            }}>
              You completed the game in <strong style={{ color: '#667eea' }}>{moves}</strong> moves!
            </p>
            <button
              onClick={initializeGame}
              style={{
                background: 'linear-gradient(45deg, #48dbfb, #0abde3)',
                border: 'none',
                color: 'white',
                padding: '15px 30px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                borderRadius: '25px',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                transition: 'transform 0.2s'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0,0,0);
          }
          40%, 43% {
            transform: translate3d(0,-30px,0);
          }
          70% {
            transform: translate3d(0,-15px,0);
          }
          90% {
            transform: translate3d(0,-4px,0);
          }
        }
      `}</style>
    </div>
  );
};

export default MemoryGame;