const isSudokuValid = (grid: (number | null)[][]): boolean => {
  for (let i = 0; i < grid.length; ++i) {
    const rowSet = new Set()
    const colSet = new Set()

    for (let j = 0; j < grid[i].length; ++j) {
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

  // Check subgrids
  for (
    let blockRow = 0;
    blockRow < grid.length;
    blockRow += Math.sqrt(grid.length)
  ) {
    for (
      let blockCol = 0;
      blockCol < grid[0].length;
      blockCol += Math.sqrt(grid.length)
    ) {
      const subGridSet = new Set()

      for (let i = blockRow; i < blockRow + Math.sqrt(grid.length); ++i) {
        for (let j = blockCol; j < blockCol + Math.sqrt(grid.length); ++j) {
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
