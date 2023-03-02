import './Horaires.css'
import Select from 'react-select'
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import fleche_gauche from '../img/fleche_gauche.svg'


const Horaires = () => {

    const [horaires, setHoraires] = useState([]);
    const [isSearched, setSearched] = useState(false);
    const [isOptionSelected, setOptionSelected] = useState(false);

    const handleSubmit = async (e) => {
        console.log('test')
        e.preventDefault()
        const listeHoraires = await fetch(`http://localhost:8000/stops`);
        const horaires = await listeHoraires.json()
        console.log(horaires)
        setHoraires(horaires);
        console.log(horaires)
        setSearched(true);
    };

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

    return (
        <>
            <Header />
            <Link className='retour' to='/'>
                <img className='fleche' src={fleche_gauche} alt='retour' />
            </Link>
            <div>
                <Select className='select' options={options} />
                {/* {isOptionSelected ?
                <div id='results' className='horaires-results'>
                    {horaires.map(horaire => {
                        return (
                            <p className='horaire'>Arrivée : {horaire.arrival} / Départ : {horaire.departure}</p>
                        )
                    })}
                </div>
                :
                <>
                </>
            }  */}
                <button className='submit-button' onClick={(e) => handleSubmit(e)}>Rechercher</button>
            </div>

            {isSearched ?
                <div id='results' className='horaires-results'>
                    {horaires.map(horaire => {
                        console.log("horaire de horaires.map : " + horaire)
                        return (
                            <p className='horaire'>Arrivée : {horaire.arrival} / Départ : {horaire.departure}</p>
                        )
                    })}
                </div>
                :
                <>
                </>
            }        </>
    )
}

export default Horaires