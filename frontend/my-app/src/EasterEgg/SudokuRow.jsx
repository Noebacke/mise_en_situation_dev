import React from 'react';

function SudokuRow ({ row, i, setSelectedCell}) {
        return row.map((cell, j) => {
            return (
                <div className="SudokuCell" key={"cell " + 9 * i + j}>
                    <input readOnly
                        style={{
                            borderLeft: (j === 3 || j === 6) ? "2px solid black" : j === 0 ? "4px solid black" : "1px solid darkgrey",
                            borderTop: (i === 3 || i === 6) ? "2px solid black" : i === 0 ? "4px solid black" : "1px solid darkgrey",
                            borderRight: (j === 8) ? "4px solid black" : "1px solid darkgrey",
                            borderBottom: (i === 8) ? "4px solid black" : "1px solid darkgrey",
                            fontSize: cell.isPenciled ? "0.58em" : "2em",
                        }}
                        className= {cell.value === '.' ? "empty" : cell.isGiven ? "given" : "digit"} 
                        value={cell.isPenciled ? cell.pencilmarks.join('') : cell.value === '.' ? '' : cell.value}
                        type="text"
                        onSelect={ () => {
                            setSelectedCell([i, j])}
                        }
                    >
                    </input>
                </div>
            )
        })
}

export default SudokuRow;