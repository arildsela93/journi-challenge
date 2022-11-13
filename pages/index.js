import Search from "../components/search/Search";
import { useState } from "react";

const Home = () => {
    const [countries, setCountries] = useState([]);

    // Get search value from user input
    const getSearchValue = async (e) => {
        try {
            // Get user input keyword
            const value = e.target.value.replace(/\s/g,"");

            // Make a request to /api/search
            // And wait for response data
            const response = await fetch("/api/search", {
                method: "POST",
                body: JSON.stringify(value),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            const data = await response.json();

            // Save all countries returned and send back to '<Search />' component
            setCountries(() => value ? data : []);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <>
            <Search countries={countries} getSearchValue={getSearchValue}/>
        </>
    )
}

export default Home;
