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
): boolean {
  for (let i = 0; i < 9; i++) {
    const m = 3 * Math.floor(row / 3) + Math.floor(i / 3)
    const n = 3 * Math.floor(col / 3) + (i % 3)
    if (board[row][i] === num || board[i][col] === num || board[m][n] === num) {
      return false
    }
  }
  return true
}

function fillBoard(board: SudokuBoard): boolean {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        const numbers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
        for (const num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num
            if (fillBoard(board)) {
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

function generateSudokuBoard(emptyCellsCount: number): SudokuBoard {
  if (emptyCellsCount < 0 || emptyCellsCount > 81) {
    throw new Error('Invalid number of empty cells. Must be between 0 and 81.')
  }

  const emptyBoard: SudokuBoard = Array.from({ length: 9 }, () =>
    Array(9).fill(null),
  )
  fillBoard(emptyBoard)

  // Randomly remove cells to create empty spaces
  const flatBoard = emptyBoard.flat()
  const indicesToRemove = shuffle(
    Array.from({ length: 81 }, (_, index) => index),
  ).slice(0, emptyCellsCount)
  indicesToRemove.forEach(index => {
    flatBoard[index] = null
  })

  // Convert the flat array back to a 2D array
  const resultBoard: SudokuBoard = []
  while (flatBoard.length) {
    resultBoard.push(flatBoard.splice(0, 9))
  }

  return resultBoard
}

export default generateSudokuBoard
