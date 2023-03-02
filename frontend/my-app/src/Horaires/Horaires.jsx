import './Horaires.css'
import Select from 'react-select'
import { useState } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import fleche_gauche from '../img/fleche_gauche.svg'


const Horaires = () => {

    const [horaires, setHoraires] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault()
        const research = e.target.search.value;
        const cocktailResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${research}`);
        const horaires = await cocktailResponse.json();
        setHoraires(horaires.drinks);
    };

    console.log(horaires)

    const options = [
        { value: [{ type: 'tram' }, { ligne: 'A' }], label: 'Tram A' },
        { value: 'Tram B', label: 'Tram B' },
        { value: 'Tram C', label: 'Tram C' },
        { value: 'Tram D', label: 'Tram D' },
        { value: 'Tram D', label: 'Tram D' },
        { value: [{ type: 'Bus' }, { ligne: '09' }], label: 'Bus 09' },
        { value: [{ type: 'Bus' }, { ligne: '12' }], label: 'Bus 12' },
        { value: [{ type: 'Bus' }, { ligne: '32' }], label: 'Bus 32' },
        { value: [{ type: 'Bus' }, { ligne: '54' }], label: 'Bus 54' },
        { value: [{ type: 'Bus' }, { ligne: '80' }], label: 'Bus 80' },
        { value: [{ type: 'Bus' }, { ligne: '95' }], label: 'Bus 95' },


    ]

    console.log(options.map(option => console.log(option.value)))

    return (
        <>
            <Header />
            <Link className='retour' to='/'>
                <img className='fleche' src={fleche_gauche} alt='retour' />
            </Link>
            <form>
                <Select className='select' options={options} />
                <button className='submit-button' type="submit" onClick={handleSubmit()}>Rechercher</button>
            </form>
        </>
    )
}

export default Horaires