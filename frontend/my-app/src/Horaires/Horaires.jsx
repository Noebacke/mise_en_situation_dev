import './Horaires.css'
import Select from 'react-select'
import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import { Link } from 'react-router-dom';
import fleche_gauche from '../img/fleche_gauche.svg'


const Horaires = () => {

    const [horaires, setHoraires] = useState([]);
    const [horairesFinal, setHorairesFinal] = useState([]);
    const [isSearched, setSearched] = useState(false);
    const [isDirectionSelected, setDirectionSelected] = useState(false);
    const [directions, setDirections] = useState([]);
    const [direction, setDirection] = useState();
    const [isTransportSelected, setTransportSelected] = useState(false);
    const [stop, setStop] = useState();
    const [stops, setStops] = useState([]);

    const handleSubmit = async () => {
        const listeHoraires = await fetch(`http://localhost:8000/stops`);
        const horaires = await listeHoraires.json()
        setHoraires(horaires)
        findAllDirections(horaires)
        findStopsByDirection(horaires)
    };

    const findAllDirections = (arr) => {
        let directionsArray = [];
        let directionsArrayFinal = [];
        for (let index = 0; index < arr.length; index++) {
            const stop = arr[index]
            if (!directionsArray.includes(stop.destination)) {
                directionsArray.push(stop.destination);
                directionsArrayFinal.push({ value: stop.destination, label: stop.destination })
            }
        }
        const directionsArrayFinalCOPY = [...directionsArrayFinal]
        setDirections(directionsArrayFinalCOPY)
    }

    const showDirection = () => {
        setTransportSelected(true)
    }

    const getDirectionValue = (e) => {
        const text = e.value;
        setDirection(text)
    }


    const findStopsByDirection = (arr) => {
        let stopsArray = [];
        let stopsArrayFinal = []
        for (let index = 0; index < arr.length; index++) {
            const stop = arr[index]
            if (stop.direction === direction) {
                if (!stopsArray.includes(stop.name)) {
                    stopsArray.push(stop.name)
                    stopsArrayFinal.push({ value: stop.id_stop, label: stop.name })
                }
            }
        }
        setStops(stopsArrayFinal)
    }

    const showStops = () => {
        setDirectionSelected(true)
    }

    const getStopValue = (e) => {
        let text = e;
        setStop(text)
    }


    const findHorairesByStop = (arr) => {
        let horairesArray = [];
        let horairesArrayFinal = []
        for (let index = 0; index < arr.length; index++) {
            const arret = arr[index]
            if (arret.id_stop === stop.value) {
                if (!horairesArray.includes(arret.name)) {
                    horairesArray.push(arret.name)
                    horairesArrayFinal.push({ "departure": arret.departure, "value": arret.id_stop, "label": arret.name })
                }

            }
        }
        setHorairesFinal(horairesArrayFinal)
    }

    const showResult = () => {
        setSearched(true);
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


    useEffect(() => {
    }, [direction]);

    useEffect(() => {
    }, [stop]);

    return (
        <>
            <Header />
            <Link className='retour' to='/'>
                <img className='fleche' src={fleche_gauche} alt='retour' />
            </Link>
            <div className='form'>
                <Select className='select' options={options} onChange={() => { handleSubmit(); showDirection() }} />
                {isTransportSelected ?
                    <div id='results' className='directions'>
                        <Select className='select' options={directions} onChange={(e) => {
                            getDirectionValue(e); findStopsByDirection(horaires); showStops();
                        }} />
                    </div>
                    :
                    <>
                    </>
                }
                {isDirectionSelected ?
                    <div id='results' className='directions'>
                        <Select className='select' options={stops} onChange={(e) => {
                            getStopValue(e); findHorairesByStop(horaires)
                        }} />
                    </div>
                    :
                    <>
                    </>
                }
                <button className='submit-button' type='submit' onClick={() => showResult()}>Rechercher</button>
            </div>

            {isSearched ?
                <div id='results' className='horaires-results'>
                    {horairesFinal.map(horaire => {
                        return (
                            <div className='listeStops'>
                                <h3>{horaire.label}</h3>
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