import SudokuRow from "./SudokuRow";
import "./Sudoku.css";

const SudokuBoard = ({ grid, setSelectedCell }) => {
    return grid.map((row, i) => {
        return (
            <div id="SudokuRow" key={"row " + i}>
                <SudokuRow 
                    row={row} 
                    i={i} 
                    setSelectedCell={setSelectedCell}
                />
            </div>
            )
        })

}

export { SudokuBoard };