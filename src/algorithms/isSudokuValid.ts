const isSudokuValid = (grid: (number | null)[][]) => {
  // Check rows and columns
  for (let i = 0; i < 9; ++i) {
    const rowSet = new Set()
    const colSet = new Set()

    for (let j = 0; j < 9; ++j) {
      // Check rows
      if (grid[i][j] !== null) {
        if (rowSet.has(grid[i][j])) {
          return false // Duplicate in the same row
        }
        rowSet.add(grid[i][j])
      }

      // Check columns
      if (grid[j][i] !== null) {
        if (colSet.has(grid[j][i])) {
          return false // Duplicate in the same column
        }
        colSet.add(grid[j][i])
      }
    }
  }

  // Check 3x3 subgrids
  for (let blockRow = 0; blockRow < 9; blockRow += 3) {
    for (let blockCol = 0; blockCol < 9; blockCol += 3) {
      const subGridSet = new Set()

      for (let i = blockRow; i < blockRow + 3; ++i) {
        for (let j = blockCol; j < blockCol + 3; ++j) {
          if (grid[i][j] !== null) {
            if (subGridSet.has(grid[i][j])) {
              return false // Duplicate in the same subgrid
            }
            subGridSet.add(grid[i][j])
          }
        }
      }
    }
  }

  return true // The Sudoku board is valid
}

export default isSudokuValid
