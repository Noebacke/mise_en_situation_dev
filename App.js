import React, { useState } from "react";
import Select from "react-select";

const SearchBar = () => {
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");

  const arret= [
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

  const customStyles = {
    control: (provided) => ({
      ...provided,
      height: 50,
      borderRadius: 0,
      borderBottom: "none",
      boxShadow: "none",
      borderColor: "#ccc",
      "&:hover": {
        borderColor: "#ccc",
      },
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: 0,
      borderRadius: 0,
      boxShadow: "none",
      borderBottom: "1px solid #ccc",
    }),
    menuList: (provided) => ({
      ...provided,
      maxHeight: 200,
      overflowY: "auto",
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#ccc" : "white",
      "&:hover": {
        backgroundColor: "#ccc",
      },
    }),
  };

  return (
    <div className="search-bar">
      <div>
        <label htmlFor="depart">Départ:</label>
        <Select
          options={options}
          value={{ value: depart, label: depart }}
          onChange={onDepartChange}
          styles={customStyles}
          placeholder="Point de départ"
          isSearchable={true}
          menuPlacement="top"
        />
      </div>
      <div>
        <label htmlFor="arrivee">Arrivée:</label>
        <Select
          options={options}
          value={{ value: arrivee, label: arrivee }}
          onChange={onArriveeChange}
          styles={customStyles}
          placeholder="Point d'arrivée"
          isSearchable={true}
          menuPlacement="top"
        />
      </div>
      <button>Recherche</button>
    </div>
  );
};

export default SearchBar;
