import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Horaires from './Horaires/Horaires';
import Trajet from './Trajet/Trajet';
import Sudoku from './EasterEgg/Sudoku';
import TrajetRecherche from './Trajet/TrajetRecherche';
import TrajetResultat from './Trajet/TrajetResultat';
import Loader from './Loader/Loader';

function App() {
  return (
    <>
    <Loader/>
    <Header/>
    
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="horaires" element={<Horaires />} />
        <Route path="trajet" element={<Trajet />} />
        <Route path="trajetRecherche" element={<TrajetRecherche />} />
        <Route path="trajetResultat" element={<TrajetResultat />} />
        <Route path="sudoku" element={<Sudoku/>} /> 
      </Routes>
    </BrowserRouter>
</>
  );
}

export default App;
