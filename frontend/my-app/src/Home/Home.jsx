import './Home.css';
import fleche_droite from '../img/fleche_droite.svg'
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

const Home = () => {
    return (
        <>
            <Header />
            <div className='home'>
                <Link className='link-bloc' to='/horaires'>
                    <p>Horaires en temps réel</p>
                    <img className='fleche' src={fleche_droite} alt='vers les horaires' />
                </Link>
                <Link className='link-bloc' to='/trajet'>
                    <p>Calculer mon trajet</p>
                    <img className='fleche' src={fleche_droite} alt='vers le calcul du trajet' />
                </Link>
                <Link className='link-bloc' to='/contact'>
                    <p>Une idée ? Une demande ? </p>
                    <img className='fleche' src={fleche_droite} alt='vers contact' />
                </Link>
            </div >
        </>
    )
}

export default Home