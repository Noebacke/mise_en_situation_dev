import './Horaires.css'
import Select from 'react-select'
import { useState } from 'react';

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
        { value: [{ type: 'Bus' }, { ligne: '95' }], label: 'Bus 95' },

    ]

    console.log(options.map(option => console.log(option.value)))

    return (
        <>
            <h1>Horaires</h1>
            <form>
                <Select className='select' options={options} />
                <input className='submit-button' type="submit" value="Submit" onClick={handleSubmit()} />
            </form>
        </>
    )
}

export default Horaires