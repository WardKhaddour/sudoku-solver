type SudokuBoard = (number | null)[][]

function isValidCell(board: SudokuBoard, row: number, col: number, k: number) {
  for (let i = 0; i < board.length; i++) {
    // Check row and column
    if (board[row][i] === k || board[i][col] === k) {
      return false
    }

    // Check subGrid
    const subGridStartRow =
      Math.floor(row / Math.sqrt(board.length)) * Math.sqrt(board.length)
    const subGridStartCol =
      Math.floor(col / Math.sqrt(board.length)) * Math.sqrt(board.length)
    if (
      board[subGridStartRow + Math.floor(i / Math.sqrt(board.length))][
        subGridStartCol + (i % Math.sqrt(board.length))
      ] === k
    ) {
      return false
    }
  }
  return true
}

export default isValidCell
