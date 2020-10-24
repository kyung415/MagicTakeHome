import React, { useState } from 'react'
import Search from '../Search/Search'
import Itinerary from '../Itinerary/Itinerary'

import LocationContext from '../LocationContext'
import { useEffect } from 'react'

function changeLocations() {
    
}

const Home = (props) => {
    const [myLocations, setMyLocations] = useState([])

    useEffect(() => {
        console.log('hello')
    }, [myLocations])

    function changeLocations (newLocations) {
        console.log('change')
        console.log(myLocations)
        setMyLocations(newLocations)
        console.log(myLocations)
    }
    console.log('rerebder')
    //var value = {myLocations, setMyLocations, changeLocations}

    return (
        <div>
            <LocationContext.Provider value={{myLocations, changeLocations}}>
                <div><Search /></div>
                <div><Itinerary locations={myLocations} /></div>
            </LocationContext.Provider>
        </div>
    )
}

export default Home;