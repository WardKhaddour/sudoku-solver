import { ChangeEvent, useState } from 'react'
import isSudokuValid from '../algorithms/isSudokuValid'
import solve from '../algorithms/solveSudoku'
import generateSudokuBoard from '../algorithms/generateBoard'
import './SudokuBoard.css'

const SudokuBoardSizes = {
  SMALL: 4,
  MEDIUM: 9,
  LARGE: 16,
}

const init = generateSudokuBoard(
  SudokuBoardSizes.MEDIUM,
  SudokuBoardSizes.MEDIUM * SudokuBoardSizes.MEDIUM -
    SudokuBoardSizes.MEDIUM +
    2,
)

function SudokuBoard() {
  const [grid, setGrid] = useState(init.map(row => [...row]))
  const [initialGrid, setInitialGrid] = useState(init.map(row => [...row]))
  const [boardSize, setBoardSize] = useState(SudokuBoardSizes.MEDIUM)

  const isValid = isSudokuValid(grid)

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
    console.log(initialGrid)

    setGrid(newGrid)
  }

  const handleSolveSudoku = () => {
    if (!isValid) {
      const solvedGrid = solve(initialGrid)
      setGrid([...solvedGrid])
      return
    }
    const solvedGrid = solve(grid)
    setGrid([...solvedGrid])
  }

  const changeBoardSize = (size: number) => {
    const newGrid = generateSudokuBoard(size, size * size - size + 2)
    setInitialGrid(newGrid.map(row => [...row]))
    setGrid(newGrid.map(row => [...row]))
    setBoardSize(size)
  }

  return (
    <>
      <div className="actions">
        <button onClick={() => changeBoardSize(SudokuBoardSizes.SMALL)}>
          Small ({SudokuBoardSizes.SMALL}x{SudokuBoardSizes.SMALL})
        </button>
        <button onClick={() => changeBoardSize(SudokuBoardSizes.MEDIUM)}>
          MEDIUM ({SudokuBoardSizes.MEDIUM}x{SudokuBoardSizes.MEDIUM})
        </button>
        <button onClick={() => changeBoardSize(SudokuBoardSizes.LARGE)}>
          LARGE ({SudokuBoardSizes.LARGE}x{SudokuBoardSizes.LARGE})
        </button>
      </div>
      <div
        className="grid-container"
        style={{
          gridTemplateColumns: `repeat(${grid.length}, 50px)`,
          gridTemplateRows: `repeat(${grid.length}, 50px)`,
        }}
      >
        {grid.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <input
                min={1}
                max={boardSize}
                key={rowIndex - colIndex}
                value={cell || ''}
                onChange={e => handleInputChange(e, rowIndex, colIndex)}
                disabled={initialGrid[rowIndex][colIndex] !== null}
              />
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleSolveSudoku}>Solve Sudoku</button>

      {isValid ? (
        <p className="valid">Board is Valid!</p>
      ) : (
        <p className="invalid">Board is Invalid:(</p>
      )}
    </>
  )
}

export default SudokuBoard
