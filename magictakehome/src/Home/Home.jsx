import React, { useState, useEffect } from 'react'
import Search from '../Search/Search'
import Itinerary from '../Itinerary/Itinerary'
import Map from '../Map/Map'

import LocationContext from '../LocationContext'
import {getLatAndLong} from '../api/GoogleMaps'
import './Home.css'

const Home = (props) => {
    const [myLocations, setMyLocations] = useState({})

    useEffect(() => {
        if (localStorage.getItem('myLocations') === null) {
            localStorage.setItem('myLocations', JSON.stringify({}))
        }
        else {
            setMyLocations(JSON.parse(localStorage.getItem('myLocations')))
        }
    }, [])

    async function addLocations (location) {
        const locationData = JSON.parse(localStorage.getItem('locations'))
        var temp = {...myLocations}

        const googleMapsLocationsInfo = await getLatAndLong(location)
        console.log(googleMapsLocationsInfo)

        //Not enough information was found.
        if (googleMapsLocationsInfo.status !== 'OK') {
            alert('Could not find information about location!')
        }
        else {
            locationData[location]['formatted_address'] = googleMapsLocationsInfo['results'][0]['formatted_address'] 
            locationData[location]['coordinates'] = googleMapsLocationsInfo['results'][0]['geometry']['location']

            temp[location] = locationData[location]
            console.log(temp[location])
            localStorage.setItem('myLocations', JSON.stringify(temp))
            setMyLocations(temp)
        }
    }

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