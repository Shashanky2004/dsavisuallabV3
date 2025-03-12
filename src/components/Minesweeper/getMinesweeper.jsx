// Constants for game configuration
const MINES_PERCENTAGE = 0.15; // 15% of cells will be mines
const ANIMATION_TYPES = {
  REVEAL: 'REVEAL',
  FLAG: 'FLAG',
  GAME_OVER: 'GAME_OVER',
  WIN: 'WIN'
};

// Helper function to count adjacent mines
const countAdjacentMines = (board, row, col) => {
  const directions = [-1, 0, 1, 0, -1, -1, 1, 1, -1];
  let count = 0;
  
  for (let i = 0; i < directions.length - 1; i++) {
    const newRow = row + directions[i];
    const newCol = col + directions[i + 1];
    
    if (newRow >= 0 && newRow < board.length && 
        newCol >= 0 && newCol < board[0].length &&
        board[newRow][newCol].isMine) {
      count++;
    }
  }
  
  return count;
};

// Helper function to check if game is won
const checkWin = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col].isMine && !board[row][col].isFlagged) return false;
      if (!board[row][col].isMine && !board[row][col].isRevealed) return false;
    }
  }
  return true;
};

// Helper function to reveal all mines
const revealAllMines = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col].isMine) {
        board[row][col].isRevealed = true;
      }
    }
  }
};

// Helper function to reveal all non-mine cells
const revealAllSafeCells = (board) => {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (!board[row][col].isMine) {
        board[row][col].isRevealed = true;
      }
    }
  }
};

export const getMinesweeper = (board, row, col, action = 'reveal') => {
  // Handle flag action
  if (action === 'flag') {
    if (!board[row][col].isRevealed) {
      board[row][col].isFlagged = !board[row][col].isFlagged;
      return {
        board,
        gameOver: false,
        won: checkWin(board),
        message: board[row][col].isFlagged ? 'Cell flagged' : 'Cell unflagged'
      };
    }
    return { board, gameOver: false, won: false, message: 'Cannot flag revealed cell' };
  }

  // Handle reveal action
  if (board[row][col].isFlagged) {
    return { board, gameOver: false, won: false, message: 'Cannot reveal flagged cell' };
  }

  if (board[row][col].isMine) {
    revealAllMines(board);
    return {
      board,
      gameOver: true,
      won: false,
      message: 'Game Over! You hit a mine!'
    };
  }

  // Reveal empty cells
  const queue = [[row, col]];
  const visited = Array(board.length).fill().map(() => Array(board[0].length).fill(false));
  visited[row][col] = true;

  while (queue.length > 0) {
    const [currentRow, currentCol] = queue.shift();
    board[currentRow][currentCol].isRevealed = true;
    
    const adjacentMines = countAdjacentMines(board, currentRow, currentCol);
    board[currentRow][currentCol].distance = adjacentMines;

    if (adjacentMines === 0) {
      // Reveal adjacent cells
      const directions = [-1, 0, 1, 0, -1, -1, 1, 1, -1];
      for (let i = 0; i < directions.length - 1; i++) {
        const newRow = currentRow + directions[i];
        const newCol = currentCol + directions[i + 1];
        
        if (newRow >= 0 && newRow < board.length && 
            newCol >= 0 && newCol < board[0].length &&
            !visited[newRow][newCol] && 
            !board[newRow][newCol].isMine && 
            !board[newRow][newCol].isFlagged) {
          visited[newRow][newCol] = true;
          queue.push([newRow, newCol]);
        }
      }
    }
  }

  const won = checkWin(board);
  if (won) {
    revealAllSafeCells(board);
    return {
      board,
      gameOver: true,
      won: true,
      message: 'Congratulations! You won!'
    };
  }

  return {
    board,
    gameOver: false,
    won: false,
    message: 'Cell revealed'
  };
};

// Helper function to create initial board with mines
export const createInitialBoard = (rows, cols) => {
  const board = Array(rows).fill().map(() => 
    Array(cols).fill().map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      distance: 0
    }))
  );

  // Place mines randomly
  const totalCells = rows * cols;
  const numMines = Math.floor(totalCells * MINES_PERCENTAGE);
  let minesPlaced = 0;

  while (minesPlaced < numMines) {
    const row = Math.floor(Math.random() * rows);
    const col = Math.floor(Math.random() * cols);
    
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  return board;
};
