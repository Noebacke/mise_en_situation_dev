import { Link } from 'react-router-dom';
import TBMarche from '../img/TBMarche.svg';
import './Header.css';


const Header = () => {

    return (
        <div id="header">
            <Link className='retour' to='/sudoku'>
                <img id='logo' src={TBMarche} alt="TBMarche Logo" />
            </Link>
        </div>
    )
}

export default Header