function setCellValue(grid, selectedCell, value, setGrid, isPencil) {
    const x = selectedCell[0];
    const y = selectedCell[1];

    console.log(x, y);
    if (grid[x][y].isGiven) {
        return;
    }

    const newGrid = [...grid];
    if (isPencil) {
        if (newGrid[x][y].pencilmarks.includes(value)) {
            newGrid[x][y].pencilmarks = newGrid[x][y].pencilmarks.filter((mark) => mark !== value);
            newGrid[x][y].isPenciled = newGrid[x][y].pencilmarks.length > 0;
        } else {
            newGrid[x][y].pencilmarks.push(value);
            newGrid[x][y].pencilmarks.sort();
            newGrid[x][y].isPenciled = true;
        }
    } else {
        newGrid[x][y].value = value;
    }

    setGrid(newGrid);
}

const SudokuControls = ({ selectedCell, setGrid, grid, isPencil }) => {
    return (
        <div id="SudokuControls">
            <div id="row1">
                <button onClick={ () =>
                    setCellValue(grid, selectedCell, '1', setGrid, isPencil)
                }>1</button>
                <button onClick={ () =>
                    setCellValue(grid, selectedCell, '2', setGrid, isPencil)
                }>2</button>
                <button onClick={ () =>
                    setCellValue(grid, selectedCell, '3', setGrid, isPencil)
                }>3</button>
            </div>

            <div id="row2">
                <button onClick={ () =>
                    setCellValue(grid, selectedCell, '4', setGrid, isPencil)
                }>4</button>
                <button onClick={ () =>
                    setCellValue(grid, selectedCell, '5', setGrid, isPencil)
                }>5</button>
                <button onClick={ () =>
                    setCellValue(grid, selectedCell, '6', setGrid, isPencil)
                }>6</button>
            </div>

            <div id="row3">
                <button onClick={ () =>
                    setCellValue(grid, selectedCell, '7', setGrid, isPencil)   
                }>7</button>
                <button onClick={ () =>
                    setCellValue(grid, selectedCell, '8', setGrid, isPencil)   
                }>8</button>
                <button onClick={ () =>
                    setCellValue(grid, selectedCell, '9', setGrid, isPencil)   
                }>9</button>
            </div>
        </div>
    )
}

export default SudokuControls