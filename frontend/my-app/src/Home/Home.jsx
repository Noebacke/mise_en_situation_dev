import './Home.scss';
import fleche_gauche from '../img/fleche_gauche.svg'

const Home = () => {
    return (
        <>
            <div className='bloc-lien'>
                <a href='horaires'>Horaires en temps réel</a>
                <img src={fleche_gauche} alt='vers les horaires' />
            </div>
            <div className='bloc-lien'>
                <a href='trajet'>Calculer son trajet</a>
                <img src={fleche_gauche} alt='vers le calcul du trajet' />
            </div>
        </>
    )
}

export default Home