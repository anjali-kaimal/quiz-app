import React, { useState, useEffect } from 'react';
import './ConnectFour.css';
import prizeImage from './IMG_1113.JPG';

const ROWS = 6;
const COLS = 7;
const USER_COLOR = '#6ba3ff'; // Blue for user
const COMPUTER_COLOR = '#ff6b9d'; // Pink for computer

function ConnectFour({ onGameEnd }) {
  const [board, setBoard] = useState(Array(ROWS).fill(null).map(() => Array(COLS).fill(null)));
  const [currentPlayer, setCurrentPlayer] = useState('user');
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [winningCells, setWinningCells] = useState([]);
  const [showPrizeButton, setShowPrizeButton] = useState(false);
  const [showPrizePopup, setShowPrizePopup] = useState(false);

  const checkWinner = (board, row, col, player) => {
    const directions = [
      [[0, 1], [0, -1]], // horizontal
      [[1, 0], [-1, 0]], // vertical
      [[1, 1], [-1, -1]], // diagonal \
      [[1, -1], [-1, 1]]  // diagonal /
    ];

    for (let direction of directions) {
      let count = 1;
      let cells = [[row, col]];
      
      for (let [dr, dc] of direction) {
        let r = row + dr;
        let c = col + dc;
        while (r >= 0 && r < ROWS && c >= 0 && c < COLS && board[r][c] === player) {
          count++;
          cells.push([r, c]);
          r += dr;
          c += dc;
        }
      }
      
      if (count >= 4) {
        return cells;
      }
    }
    return null;
  };

  const dropPiece = (col, player) => {
    if (gameOver) return false;
    
    for (let row = ROWS - 1; row >= 0; row--) {
      if (board[row][col] === null) {
        const newBoard = board.map(r => [...r]);
        newBoard[row][col] = player;
        setBoard(newBoard);
        
        const winCells = checkWinner(newBoard, row, col, player);
        if (winCells) {
          setWinningCells(winCells);
          setGameOver(true);
          setWinner(player);
          if (player === 'user') {
            setTimeout(() => {
              setShowPrizeButton(true);
            }, 1000);
          }
        }
        
        return true;
      }
    }
    return false;
  };

  const handleColumnClick = (col) => {
    if (currentPlayer === 'user' && !gameOver) {
      if (dropPiece(col, 'user')) {
        setCurrentPlayer('computer');
      }
    }
  };

  const getComputerMove = () => {
    const availableCols = [];
    for (let col = 0; col < COLS; col++) {
      if (board[0][col] === null) availableCols.push(col);
    }
    if (availableCols.length === 0) return null;

    for (let col of availableCols) {
      for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === null) {
          const testBoard = board.map(r => [...r]);
          testBoard[row][col] = 'user';
          if (checkWinner(testBoard, row, col, 'user')) {
            const otherCols = availableCols.filter(c => c !== col);
            if (otherCols.length > 0) return otherCols[Math.floor(Math.random() * otherCols.length)];
          }
          break;
        }
      }
    }

    for (let col of availableCols) {
      for (let row = ROWS - 1; row >= 0; row--) {
        if (board[row][col] === null) {
          const testBoard = board.map(r => [...r]);
          testBoard[row][col] = 'computer';
          if (checkWinner(testBoard, row, col, 'computer')) {
            const otherCols = availableCols.filter(c => c !== col);
            if (otherCols.length > 0) return otherCols[Math.floor(Math.random() * otherCols.length)];
          }
          break;
        }
      }
    }

    return availableCols[Math.floor(Math.random() * availableCols.length)];
  };

  const handleRedeemPrize = () => setShowPrizePopup(true);
  const handleClosePrizePopup = () => setShowPrizePopup(false);

  useEffect(() => {
    if (currentPlayer === 'computer' && !gameOver) {
      const timer = setTimeout(() => {
        const col = getComputerMove();
        if (col !== null && dropPiece(col, 'computer')) setCurrentPlayer('user');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameOver, board]);

  const isCellWinning = (row, col) => winningCells.some(([r, c]) => r === row && c === col);

  return (
    <div className="connect-four-container">
      <div className="connect-four-header">
        <h2 className="connect-four-title">Connect four to get a special prize</h2>
        <div className="player-indicators">
          <div className="player-indicator">
            <div className="color-dot" style={{ background: USER_COLOR }}></div>
            <span>Aadarsh</span>
          </div>
          <div className="player-indicator">
            <div className="color-dot" style={{ background: COMPUTER_COLOR }}></div>
            <span>Anjali</span>
          </div>
        </div>
        {!gameOver && (
          <p className="turn-text">
            {currentPlayer === 'user' ? 'Your turn!' : 'Ammu is thinking...'}
          </p>
        )}
        {gameOver && winner === 'user' && (
          <p className="winner-text">This is one time I'll let you win on purpose :P</p>
        )}
      </div>
      
      <div className="connect-four-board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="board-row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`board-cell ${cell ? 'filled' : ''} ${isCellWinning(rowIndex, colIndex) ? 'winning' : ''}`}
                onClick={() => handleColumnClick(colIndex)}
                style={{ cursor: currentPlayer === 'user' && !gameOver ? 'pointer' : 'default' }}
              >
                {cell && (
                  <div
                    className="heart-piece"
                    style={{ color: cell === 'user' ? USER_COLOR : COMPUTER_COLOR }}
                  >
                    ❤️
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {showPrizeButton && winner === 'user' && (
        <button className="redeem-prize-button" onClick={handleRedeemPrize}>
          Redeem Your Prize
        </button>
      )}
      
      {showPrizePopup && (
        <div className="popup-overlay">
          <div className="envelope-container">
            <div className="letter">
              <div className="letter-content">
                <div className="popup-emoji">❤️</div>
                <img src={prizeImage} alt="Prize" className="popup-image" />
                <h2 className="popup-title">Unlimited hugs and kisses redeemed!</h2>
                <button className="popup-button" onClick={handleClosePrizePopup}>
                  Laaav you
                </button>
              </div>
            </div>
            <div className="envelope">
              <div className="envelope-flap"></div>
              <div className="envelope-body"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ConnectFour;
