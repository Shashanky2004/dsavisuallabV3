// Optimized N-Queens solver with step-by-step visualization
const ANIMATION_TYPES = {
  PLACE: 'PLACE',
  REMOVE: 'REMOVE',
  SOLUTION: 'SOLUTION'
};

const isSafe = (board, row, col, n) => {
  // Check row on left side
  for (let j = 0; j < col; j++) {
    if (board[row][j] === 'Q') return false;
  }

  // Check upper diagonal on left side
  for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
    if (board[i][j] === 'Q') return false;
  }

  // Check lower diagonal on left side
  for (let i = row, j = col; i < n && j >= 0; i++, j--) {
    if (board[i][j] === 'Q') return false;
  }

  return true;
};

const createBoard = (n) => Array(n).fill().map(() => Array(n).fill('.'));

const copyBoard = (board) => board.map(row => [...row]);

const solve = (col, board, steps, n) => {
  if (col === n) {
    steps.push({
      type: ANIMATION_TYPES.SOLUTION,
      board: copyBoard(board),
      message: `Found a solution!`
    });
    return true;
  }

  let solutionFound = false;
  for (let row = 0; row < n; row++) {
    if (isSafe(board, row, col, n)) {
      // Try placing queen
      board[row][col] = 'Q';
      steps.push({
        type: ANIMATION_TYPES.PLACE,
        board: copyBoard(board),
        position: { row, col },
        message: `Trying queen at row ${row + 1}, column ${col + 1}`
      });

      // Recursively solve for the next column
      if (solve(col + 1, board, steps, n)) {
        solutionFound = true;
      }

      // Backtrack
      board[row][col] = '.';
      steps.push({
        type: ANIMATION_TYPES.REMOVE,
        board: copyBoard(board),
        position: { row, col },
        message: `Backtracking: removing queen from row ${row + 1}, column ${col + 1}`
      });
    }
  }

  return solutionFound;
};

const findAllSolutions = (col, board, solutions, n) => {
  if (col === n) {
    solutions.push(copyBoard(board));
    return;
  }

  for (let row = 0; row < n; row++) {
    if (isSafe(board, row, col, n)) {
      board[row][col] = 'Q';
      findAllSolutions(col + 1, board, solutions, n);
      board[row][col] = '.';
    }
  }
};

export const solveNQueens = (n) => {
  // Validate input
  if (n <= 0) {
    return {
      steps: [],
      solutions: [],
      error: "Board size must be positive"
    };
  }

  if (n === 2 || n === 3) {
    return {
      steps: [],
      solutions: [],
      error: "No solutions exist for this board size"
    };
  }

  const board = createBoard(n);
  const steps = [];
  const solutions = [];

  // First find all solutions
  findAllSolutions(0, board, solutions, n);

  // Then generate steps for visualization using the first solution
  if (solutions.length > 0) {
    solve(0, createBoard(n), steps, n);
  }

  return {
    steps,
    solutions,
    error: null
  };
};
