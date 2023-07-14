// let y = document.getElementById("sdk-grid");

// for(let i=0; i<10; i++){
//     let x = document.createElement("input");
//     x.classList.add('')
//     y.appendChild(x);
// }

function generateSudoku() {
    const sudoku = [...Array(9)].map(() => Array(9).fill(0));
    solveSudoku(sudoku);
    removeCells(sudoku, 30); // Xoá 30 ô để tạo bảng Sudoku dùng cho chơi
    return sudoku;
  }
  
  function solveSudoku(board) {
    const emptyCell = findEmptyCell(board);
    
    if (!emptyCell) {
      return true;
    }
    
    const [row, col] = emptyCell;
    
    // Thử các giá trị từ 1 đến 9 cho ô trống
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(board, row, col, num)) {
        board[row][col] = num;
        
        if (solveSudoku(board)) {
          return true;
        }
        
        board[row][col] = 0;
      }
    }
    
    return false;
  }
  
  function findEmptyCell(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) {
          return [i, j];
        }
      }
    }
    
    return null;
  }
  
  function isValidMove(board, row, col, num) {
    // Kiểm tra hàng
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) {
        return false;
      }
    }
    
    // Kiểm tra cột
    for (let i = 0; i < 9; i++) {
      if (board[i][col] === num) {
        return false;
      }
    }
    
    // Kiểm tra vùng 3x3
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) {
          return false;
        }
      }
    }
    
    return true;
  }
  
  function removeCells(board, numCells) {
    let cellsToRemove = numCells;
    while (cellsToRemove > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        cellsToRemove--;
      }
    }
  }
  
  const sudoku = generateSudoku();
  
  // In ra mảng Sudoku
  sudoku.forEach(row => {
    console.log(row);
  });
  
  