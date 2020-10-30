import React from 'react'
import ItineraryRow from './ItineraryRow'

import LocationContext from '../LocationContext'

import './Itinerary.css'

/*
    Itinerary Component
*/
const Itinerary = () => {
    return (
        <LocationContext.Consumer>
            {({myLocations, removeLocation}) => {

                var locations = Object.keys(myLocations)

                return (
                    <div id='itineraryContainer' data-testid='itineraryContainer'>
                        <div style={{textAlign:'center', marginTop:'10px', marginBottom: '10px'}}>My Itinerary</div>
                        <div id='itineraryScroll'>
                            {locations.map((location) => {
                                return (
                                    <div>
                                        <ItineraryRow location={location} locationData={myLocations[location]} removeLocation={removeLocation} key={location+'_i'} />
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                )
            }}
        </LocationContext.Consumer>
    )
}

export default Itinerary;