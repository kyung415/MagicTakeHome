import React, { useState, useEffect } from 'react'
import Search from '../Search/Search'
import Itinerary from '../Itinerary/Itinerary'
import Map from '../Map/Map'

import LocationContext from '../LocationContext'
import {getLatAndLong} from '../api/GoogleMaps'
import './Home.css'

const Home = () => {
    const [myLocations, setMyLocations] = useState({})

    //Initialize myLocations in cache if null or set local myLocations object to the cached data.
    useEffect(() => {
        if (localStorage.getItem('myLocations') === null) {
            localStorage.setItem('myLocations', JSON.stringify({}))
        }
        else {
            setMyLocations(JSON.parse(localStorage.getItem('myLocations')))
        }
    }, [])

    /*
        Params: location: String
        -Adds location to myLocations. Will add location to Itinerary List and Map.
    */
    async function addLocations (location) {
        const locationData = JSON.parse(localStorage.getItem('locations'))
        var temp = {...myLocations}

        const googleMapsLocationsInfo = await getLatAndLong(location)

        //No Google Map data was found for the targeted location.
        if (googleMapsLocationsInfo.status !== 'OK') {
            alert('Could not find information about location!')
        }
        else {
            locationData[location]['formatted_address'] = googleMapsLocationsInfo['results'][0]['formatted_address'] 
            locationData[location]['coordinates'] = googleMapsLocationsInfo['results'][0]['geometry']['location']

            temp[location] = locationData[location]

            localStorage.setItem('myLocations', JSON.stringify(temp))
            setMyLocations(temp)
        }
    }

    /*
        Params: location: String
        -Removes location from myLocations. Will remove location from Itinerary List and Map.
    */
    function removeLocation (location) {
        var temp = {...myLocations}
        delete temp[location]
        localStorage.setItem('myLocations', JSON.stringify(temp))
        setMyLocations(temp)
    }

    return (
        <div id='homeContainer' data-testid='homeContainer'>
            <LocationContext.Provider value={{myLocations, addLocations, removeLocation}}>
                <div id='homeSearchContainer'><Search /></div>
                <div id='homeMapAndItineraryContainer'>
                    <div><Map /></div>
                    <div><Itinerary /></div>
                </div>
            </LocationContext.Provider>
        </div>
    )
}

export default Home;