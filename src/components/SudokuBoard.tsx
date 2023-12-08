import { ChangeEvent, useState } from 'react'

import isSudokuValid from '../algorithms/isSudokuValid'
import solve from '../algorithms/solveSudoku'
import './SudokuBoard.css'
import generateSudokuBoard from '../algorithms/generateBoard'

const initialGrid = generateSudokuBoard(75)

function SudokuBoard() {
  const [grid, setGrid] = useState(initialGrid)

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    row: number,
    col: number,
  ) => {
    const value = e.target?.value === '' ? null : parseInt(e.target.value, 10)

    if (value) {
      if (value > 9 || value < 1) return
    }

    const newGrid = [...grid]
    newGrid[row][col] = value
    setGrid(newGrid)
  }

  const handleSolveSudoku = () => {
    setGrid(solve(initialGrid))
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
      <button onClick={handleSolveSudoku}>Solve Sudoku</button>

      {isSudokuValid(grid) ? (
        <p className="valid">Board is Valid!</p>
      ) : (
        <p className="invalid">Board is Valid:(</p>
      )}
    </>
  )
}

export default SudokuBoard
