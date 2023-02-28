import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Horaires from './Horaires/Horaires';
import Trajet from './Trajet/Trajet';
import Sudoku from './EasterEgg/Sudoku';

function App() {
  return (
    <>
    <Header/>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="horaires" element={<Horaires />} />
        <Route path="trajet" element={<Trajet />} />
        <Route path="sudoku" element={<Sudoku/>} /> 
      </Routes>
    </BrowserRouter>
</>
  );
}

export default App;
