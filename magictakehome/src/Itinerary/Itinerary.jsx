import React from 'react'
import ItineraryRow from './ItineraryRow'

import LocationContext from '../LocationContext'

import './Itinerary.css'

const Itinerary = (props) => {
    return (
        <LocationContext.Consumer>
            {({myLocations}) => {
                console.log(myLocations)
                return (
                    <div id='itineraryContainer'>
                        <div>My Itinerary</div>
                        {myLocations.map((location) => {
                            console.log(location)
                            return (
                                <div>
                                    <ItineraryRow location={location} />
                                </div>
                            )
                        })}
                    </div>
                )
            }}
        </LocationContext.Consumer>
    )
}

export default Itinerary;