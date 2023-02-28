import './Home.css';
import fleche_droite from '../img/fleche_droite.svg'
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='home'>
            <Link className='link-bloc' to='/horaires'>
                <p>Horaires en temps réel</p>
                <img className='fleche' src={fleche_droite} alt='vers les horaires' />
            </Link>
            <Link className='link-bloc' to='/trajet'>
                <p>Calculer mon trajet</p>
                <img className='fleche' src={fleche_droite} alt='vers le calcul du trajet' />
            </Link>
            <Link className='link-bloc' to='/sudoku'>
                <p>SUDOKU</p>
                <img className='fleche' src={fleche_droite} alt='vers le sudoku' />
            </Link>
        </div >
    )
}

export default Home