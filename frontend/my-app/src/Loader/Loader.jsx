import { useEffect, useState } from 'react';
import loader from '../img/Loader.gif'
import './Loader.css'

const Loader = () => {


    const [isVisible, setVisible] = useState(true);


    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, 7500)
    }, []);


    return (
        <>
            {isVisible ?
                <div id='loader' className='loader-page'>
                    <img id='loader-img' src={loader} alt='loader' />
                </div>
                :
                <>
                </>
            }
        </>

    )
}

export default Loader;