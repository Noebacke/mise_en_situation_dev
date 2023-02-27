import TBMarche from '../img/TBMarche.svg';
import './Header.css';


const Header = () => {

    return (
        <div id="header">
            <a href='/home'>
                <img src={TBMarche} alt="TBMarche Logo" />
            </a>
        </div>
    )
}

export default Header