import './App.css';
import Home from './Home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Horaires from './Horaires/Horaires';
import Trajet from './Trajet/Trajet';
import { Sudoku } from './EasterEgg/Sudoku';
import TrajetResultat from './Trajet/TrajetResultat';
import Loader from './Loader/Loader';
import Contact from './Contact/Contact';

function App() {
  return (
    <>
    <Loader/>   
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="horaires" element={<Horaires />} />
        <Route path="trajet" element={<Trajet />} />
        <Route path="trajet/results" element={<TrajetResultat />} />
        <Route path="sudoku" element={<Sudoku/>} />
        <Route path="contact" element={<Contact/>} /> 
      </Routes>
    </BrowserRouter>
</>
  );
}

export default App;
