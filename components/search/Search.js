import classes from "./Search.module.scss";
import { useEffect, useRef, useState } from "react";

const Search = ({countries, getSearchValue}) => {
    const [clickedCountry, setClickedCountry] = useState(null);
    const [isListActive, setIsListActive] = useState(true);
    const inputRef = useRef("");

    // On click get country info and show a box
    const showCountryInfo = (e) => {
        // Get selected country text
        const countryText = e.target.innerText;
        countries.map(country => {
            // Get selected country data and hide list
            if (country.name === countryText) {
                setClickedCountry(country);
                setIsListActive(false);
            }
        })
    }

    useEffect(() => {
        // Hide country info if there search keyword is empty
        if (inputRef.current.value === '') {
            setIsListActive(true);
        }
    }, [clickedCountry, isListActive, countries])

    return (
        <div className={classes.search}>
            <div className={classes.container}>
                <h2 className={classes.h2}>Find the closest country!</h2>
                <input type='text' placeholder='Type a country ...' className={classes.input} onChange={getSearchValue} ref={inputRef} />
                {isListActive ? (
                    <ul className={classes.list}>
                        {countries.map((country, key) => (
                            <li key={key} onClick={showCountryInfo}>
                                <p>{country.name}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <div className={classes.country}>
                        <h4>You have selected: {clickedCountry.name}</h4>
                        <div className={classes.wrapper}>
                            <img src={`data:image/png;base64,${clickedCountry.flag_png}`} alt={clickedCountry.name} />
                            <div>
                                <p>Latitude: {clickedCountry.lat}</p>
                                <p>Longitude: {clickedCountry.lng}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Search;
