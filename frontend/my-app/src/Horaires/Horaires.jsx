import './Horaires.css'
import Select from 'react-select'
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import fleche_gauche from '../img/fleche_gauche.svg'


const Horaires = () => {

    const [horaires, setHoraires] = useState([]);
    const [isSearched, setSearched] = useState(false);
    const [isDirectionSelected, setDirectionSelected] = useState(false);
    const [stops, setStops] = useState([]);

    const handleSubmit = async () => {
        const listeHoraires = await fetch(`http://localhost:8000/stops`);
        const horaires = await listeHoraires.json()
        setHoraires(horaires);
        findAllStops(horaires)
    };

    const showStops = () => {
        setDirectionSelected(true)
    }

    const showDirection = () => {

    }

    const showResult = () => {
        setSearched(true);
    }

    const findAllStops = (arr) => {
        let stopsArray = [];
        for (let index = 0; index < arr.length; index++) {
            const stop = arr[index]
            stopsArray.push({ value: stop.id, label: stop.name })
        }
        setStops(stopsArray)
    }

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
            <div className='form'>
                <Select className='select' options={options} onChange={() => { handleSubmit(); showStops() }} />
                {isDirectionSelected ?
                    <div id='results' className='horaires-results'>
                        <Select className='select' options={stops} />
                    </div>
                    :
                    <>
                    </>
                }
                <button className='submit-button' type='submit' onClick={() => showResult()}>Rechercher</button>
            </div>

            {isSearched ?
                <div id='results' className='horaires-results'>
                    {horaires.map(horaire => {
                        console.log("horaire de horaires.map : " + horaire)
                        return (
                            <div className='listeStops'>
                                <h3>{horaire.name}</h3>
                                <p className='horaire'>Arrivée : {horaire.arrival}</p>
                                <p className='horaire'>Départ : {horaire.departure}</p>
                            </div>
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