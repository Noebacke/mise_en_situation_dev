import Header from "../Header/Header"
import React, { useState } from "react";
import Select from "react-select";
import './Trajet.css'
import fleche_gauche from '../img/fleche_gauche.svg'
import { Link } from "react-router-dom";

const Trajet = () => {
    const [depart, setDepart] = useState("");
    const [arrivee, setArrivee] = useState("");

    const arret = [
        "Bordeaux",
        "Lormont",
        "Pessac",
        "Mérignac",
        "Talence",
        "Le Haillan",
        "Blanquefort",
        "Bègles",
    ];

    const options = arret.map((mot) => ({ value: mot, label: mot }));

    const onDepartChange = (selectedOption) => {
        setDepart(selectedOption.value);
    };

    const onArriveeChange = (selectedOption) => {
        setArrivee(selectedOption.value);
    };


    return (
        <>
            <Header />
            <Link className='retour' to='/'>
                <img className='fleche' src={fleche_gauche} alt='retour' />
            </Link>
            <div className="search-bar">
                <div>
                    <label htmlFor="depart">Départ:</label>
                    <Select
                        options={options}
                        value={{ value: depart, label: depart }}
                        onChange={onDepartChange}
                        placeholder="Point de départ"
                        isSearchable={true}
                    />
                </div>
                <div>
                    <label htmlFor="arrivee">Arrivée:</label>
                    <Select
                        options={options}
                        value={{ value: arrivee, label: arrivee }}
                        onChange={onArriveeChange}
                        placeholder="Point d'arrivée"
                        isSearchable={true}
                    />
                </div>
                <button className=".button-trajet" type="submit">Recherche</button>
            </div>
        </>
    );
};

export default Trajet;