import React, { useState } from 'react'
import Search from '../Search/Search'
import Itinerary from '../Itinerary/Itinerary'
import Map from '../Map/Map'

import LocationContext from '../LocationContext'
import { useEffect } from 'react'

import './Home.css'

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const Home = (props) => {
    const [myLocations, setMyLocations] = useState({})

    useEffect(() => {
        console.log('hello')
    }, [myLocations])

    const getLatAndLong = async(location) => {
        const splitLocation = location.split()
        const locationPlus = splitLocation.join('+')
        var uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${locationPlus}+San+Francisco,+CA&key=${GOOGLE_MAPS_API_KEY}`
        var response = await fetch(uri)
                    .then(response => response.json())
                    .then(data => {
                        return data
                    })
                    .catch(error => console.log(error))
        return response
    }

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
            setMyLocations(temp)
        }
    }

    function removeLocation (location) {
        var temp = {...myLocations}
        delete temp[location]
        setMyLocations(temp)
    }

    return (
        <div>
            <LocationContext.Provider value={{myLocations, addLocations, removeLocation}}>
                <div><Search /></div>
                <div id='mapAndItineraryContainer'>
                    <div><Map /></div>
                    <div><Itinerary /></div>
                </div>
            </LocationContext.Provider>
        </div>
    )
}

export default Home;