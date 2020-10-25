import React from 'react'
import ItineraryRow from './ItineraryRow'

import LocationContext from '../LocationContext'

import './Itinerary.css'

const Itinerary = (props) => {
    return (
        <LocationContext.Consumer>
            {({myLocations}) => {

                var locations = Object.keys(myLocations)

                return (
                    <div id='itineraryContainer'>
                        <div>My Itinerary</div>
                        {locations.map((location) => {
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