import { Link } from 'react-router-dom';
import TBMarche from '../img/TBMarche.svg';
import './Header.css';


const Header = () => {

    return (
        <div id="header">
            <img id='logo' src={TBMarche} alt="TBMarche Logo" />
        </div>
    )
}

export default Header