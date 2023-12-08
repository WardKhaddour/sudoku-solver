import { ChangeEvent, useState } from 'react'

import './SudokuBoard.css'

function SudokuBoard() {
  const initialGrid = [
    [5, 3, null, null, 7, null, null, null, null],
    [6, null, null, 1, 9, 5, null, null, null],
    [null, 9, 8, null, null, null, null, 6, null],
    [8, null, null, null, 6, null, null, null, 3],
    [4, null, null, 8, null, 3, null, null, 1],
    [7, null, null, null, 2, null, null, null, 6],
    [null, 6, null, null, null, null, 2, 8, null],
    [null, null, null, 4, 1, 9, null, null, 5],
    [null, null, null, null, 8, null, null, 7, 9],
  ]
  const [grid, setGrid] = useState(initialGrid)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    row: number,
    col: number,
  ) => {
    const value = e.target?.value === '' ? null : parseInt(e.target.value, 10)
    if (!value || value > 9 || value < 1) return

    const newGrid = [...grid]
    newGrid[row][col] = value
    setGrid(newGrid)
  }

  const isSudokuValid = () => {
    return true
  }

  const solveSudoku = () => {
    setGrid(initialGrid)
  }

  return (
    <>
      <div className="grid-container">
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <input
                min={1}
                max={9}
                key={colIndex}
                value={cell || ''}
                onChange={e => handleInputChange(e, rowIndex, colIndex)}
                disabled={initialGrid[rowIndex][colIndex] !== null}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={solveSudoku}>Solve Sudoku</button>
      {isSudokuValid() && <p>Sudoku is valid!</p>}
    </>
  )
}

export default SudokuBoard
