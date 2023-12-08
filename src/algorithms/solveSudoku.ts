import isValidCell from './isValidCell'

type SudokuBoard = (number | null)[][]

function sudokuSolver(data: SudokuBoard): [SudokuBoard, boolean] {
  const solvedBoard = data.map(row => [...row])

  for (let i = 0; i < solvedBoard.length; i++) {
    for (let j = 0; j < solvedBoard[i].length; j++) {
      if (solvedBoard[i][j] === null) {
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
