import { SudokuBoard } from './SudokuBoard';
import { SudokuCell } from './SudokuCell';
import { useState } from 'react';
import { SudokuControls, setCellValue } from './SudokuControls';
import './Sudoku.css';
import { Link } from 'react-router-dom';
import fleche_gauche from '../img/fleche_gauche.svg'
import Header from '../Header/Header';

var config = require('./conf.json');

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
            'X-RapidAPI-Key': config.key,
            'X-RapidAPI-Host': 'sudoku-generator1.p.rapidapi.com'
        }
    };

    let puzzle = await fillGrid(setGrid, difficulty, options);
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
            <Header />
            <div className='SudokuPage'>
                <Link className='retour' to='/'>
                    <img className='fleche' src={fleche_gauche} alt='vers les horaires' />
                </Link>
                <div id="DifficultyButtons">
                    <button onClick={() => generateSudoku('easy', setGrid, setSolvedGrid, setIsSolved)}>Easy</button>
                    <button onClick={() => generateSudoku('medium', setGrid, setSolvedGrid, setIsSolved)}>Medium</button>
                    <button onClick={() => generateSudoku('hard', setGrid, setSolvedGrid, setIsSolved)}>Hard</button>
                </div>

                {isSolved ? <h1>YOU WIN!</h1> : <></>}

                <div id="SudokuGrid">
                    <SudokuBoard grid={grid} setSelectedCell={setSelectedCell} />
                </div>

                <div id="SudokuControls">
                    <div id="SudokuOptions">
                        <button onClick={() => checkIsSolved(grid, solvedGrid, setIsSolved)}>Check</button>
                        <button onClick={() => setIsPencil(!isPencil)} style={{ backgroundColor: isPencil ? "darkgrey" : "white" }}>Pencil</button>
                        <button onClick={() => setCellValue(grid, selectedCell, '.', setGrid, false)}>Clear cell</button>
                    </div>
                    <SudokuControls selectedCell={selectedCell} setGrid={setGrid} grid={grid} isPencil={isPencil} />
                </div>
            </div>
        </>
    )
}

export { Sudoku };