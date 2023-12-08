type SudokuBoard = (number | null)[][]

function isValidCell(board: SudokuBoard, row: number, col: number, k: number) {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3)
    const n = 3 * Math.floor(col / 3) + (i % 3)
    if (board[row][i] == k || board[i][col] == k || board[m][n] == k) {
      return false
    }
  }
  return true
}

function sudokuSolver(data: SudokuBoard): [SudokuBoard, boolean] {
  const solvedBoard = data.map(row => [...row])

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (solvedBoard[i][j] == null) {
        for (let k = 1; k <= 9; k++) {
          if (isValidCell(solvedBoard, i, j, k)) {
            solvedBoard[i][j] = k
            if (sudokuSolver(solvedBoard)[1]) {
              return [solvedBoard, true]
            } else {
              solvedBoard[i][j] = null
            }
          }
        }
        return [solvedBoard, false]
      }
    }
  }
  return [solvedBoard, true]
}

function solve(board: SudokuBoard) {
  let sudokuBoard = board.map(row => [...row])
  const isFull = () => sudokuBoard.every(row => row.every(Boolean))
  while (!isFull()) {
    sudokuBoard = sudokuSolver(sudokuBoard)[0]
  }

  return sudokuBoard
}

export default solve
