import { SudokuBoard } from './SudokuBoard';
import { SudokuCell } from './SudokuCell';
import { useState } from 'react';
import SudokuControls from './SudokuControls';
import './Sudoku.css';

function checkIsSolved(grid, solvedGrid, setIsSolved) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (grid[i][j].value !== solvedGrid[i][j]) {
                 return;
            }
        }
    }
    setIsSolved(true);
}

async function fillGrid(setGrid, difficulty, options) {
    try {
    let res = await fetch(`https://sudoku-generator1.p.rapidapi.com/sudoku/generate?&difficulty=${difficulty}`, options)
        let puzzle = await res.json();
        puzzle = puzzle.puzzle;
        let grid = new Array(9);

        for (let i = 0; i < 9; i++) {
            grid[i] = [];
            for (let j = 0; j < 9; j++) {
                let val = puzzle[i * 9 + j];
                grid[i][j] = new SudokuCell(val, [], val !== '.', false);
            }
        }
        setGrid(grid);
        return puzzle;
    } catch (err) {
        console.log(err);
    }
}

async function fillSolvedSudoku(setSolvedGrid, puzzle, options) {
    try {
        let solution = await fetch(`https://sudoku-generator1.p.rapidapi.com/sudoku/solve?&puzzle=${puzzle}`, options)
        let solved = await solution.json();
        solved = solved.solution;
        let answer = new Array(9);

        for (let i = 0; i < 9; i++) {
            answer[i] = [];
            for (let j = 0; j < 9; j++) {
                let val = solved[i * 9 + j];
                answer[i][j] = val;
            }
        }
        console.log(answer);
        setSolvedGrid(answer);
    } catch (err) {
        console.log(err);
    }
}

async function generateSudoku(difficulty, setGrid, setSolvedGrid, setIsSolved) {
    setIsSolved(false);
    
    console.log(`generating ${difficulty} sudoku...`)
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f9b91f0ffcmsh3a8de3500d8810ap1da5f4jsn96910048d5db',
            'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com'
        }
    };

    let puzzle = fillGrid(setGrid, difficulty, options);
    fillSolvedSudoku(setSolvedGrid, puzzle, options);
}

const Sudoku = () => {
    
    const [grid, setGrid] = useState(new Array(9).fill(new Array(9).fill('.')));
    const [selectedCell, setSelectedCell] = useState([0, 0]);
    const [solvedGrid, setSolvedGrid] = useState(new Array(9).fill(new Array(9).fill('.')));
    const [isSolved, setIsSolved] = useState(false);
    const [isPencil, setIsPencil] = useState(false);

    return (
    <>
        <div id="DifficultyButtons">
            <button onClick={() => generateSudoku('easy', setGrid, setSolvedGrid, setIsSolved)}>Easy</button>
            <button onClick={() => generateSudoku('medium', setGrid, setSolvedGrid, setIsSolved)}>Medium</button>
            <button onClick={() => generateSudoku('hard', setGrid, setSolvedGrid, setIsSolved)}>Hard</button>
        </div>

        {isSolved ? <h1>YOU WIN!</h1> : <></>}

        <div id="SudokuGrid">
            <SudokuBoard grid={grid} setSelectedCell={setSelectedCell}/>
        </div>

        <div id="SudokuControls">
            <div id="SudokuOptions">
                <button onClick={() => checkIsSolved(grid, solvedGrid, setIsSolved)}>Check</button>
                <button onClick={() => setIsPencil(!isPencil)} style={{backgroundColor: isPencil ? "darkgrey" : "white"}}>Pencil</button>
            </div>
            <SudokuControls selectedCell={selectedCell} setGrid={setGrid} grid={grid} isPencil={isPencil} />
        </div>
    </>
    )
}

export { Sudoku };