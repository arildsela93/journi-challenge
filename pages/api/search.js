import getDistance from "../../helpers/get-distance";
import countriesJSON from "../../json/countries-metadata.json";
import locationJSON from "../../json/location.json";

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Get user search keyword
        const searchKeyword = req.body;

        // Get all countries
        const countries = countriesJSON.countries;

        // Get user location
        // I have used static JSON to get user location, because the API you had provided reached limit of usage
        const location = locationJSON;
        const userLatitude = location.latitude;
        const userLongitude = location.longitude;

        // Filter all countries by search keyword and then order countries by comparing the distance from user to that country
        let filteredCountries = countries.filter(country => {
            return country.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1;
        }).sort((a, b) => {
            const firstValue = getDistance(userLatitude, userLongitude, a.lat, a.lng, "K");
            const secondValue = getDistance(userLatitude, userLongitude, b.lat, b.lng, "K");
            return firstValue - secondValue;
        })

        // Sending back all filtered countries
        res.status(201).json(filteredCountries);
    }
}
