type SudokuBoard = (number | null)[][]

function shuffle(array: number[]): number[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

function isValid(
  board: SudokuBoard,
  row: number,
  col: number,
  num: number,
  boardSize: number,
): boolean {
  for (let i = 0; i < boardSize; i++) {
    if (board[row][i] === num || board[i][col] === num) {
      return false
    }
  }

  const subgridSize = Math.sqrt(boardSize)
  const startRow = Math.floor(row / subgridSize) * subgridSize
  const startCol = Math.floor(col / subgridSize) * subgridSize

  for (let i = 0; i < subgridSize; i++) {
    for (let j = 0; j < subgridSize; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false
      }
    }
  }

  return true
}
function fillBoard(board: SudokuBoard, boardSize: number): boolean {
  for (let row = 0; row < boardSize; row++) {
    for (let col = 0; col < boardSize; col++) {
      if (board[row][col] === null) {
        const numbers = shuffle(
          Array.from({ length: boardSize }, (_, i) => i + 1).slice(
            0,
            boardSize,
          ),
        )
        for (const num of numbers) {
          if (isValid(board, row, col, num, boardSize)) {
            board[row][col] = num
            if (fillBoard(board, boardSize)) {
              return true
            }
            board[row][col] = null
          }
        }
        return false
      }
    }
  }
  return true
}
function generateSudokuBoard(
  boardSize: number,
  emptyCellsCount: number,
): SudokuBoard {
  if (boardSize < 1 || boardSize > 25) {
    throw new Error('Invalid board size. Must be between 1 and 25.')
  }

  const emptyBoard: SudokuBoard = Array.from({ length: boardSize }, () =>
    Array(boardSize).fill(null),
  )
  fillBoard(emptyBoard, boardSize)

  // Randomly remove cells to create empty spaces
  const flatBoard = emptyBoard.flat()

  const indicesToRemove = shuffle(
    Array.from({ length: boardSize * boardSize }, (_, index) => index),
  ).slice(0, emptyCellsCount)

  indicesToRemove.forEach(index => {
    flatBoard[index] = null
  })

  // Convert the flat array back to a 2D array
  const resultBoard: SudokuBoard = []
  while (flatBoard.length > 0) {
    resultBoard.push(flatBoard.splice(0, boardSize))
  }

  return resultBoard
}

export default generateSudokuBoard
