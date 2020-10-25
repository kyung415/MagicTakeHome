import React from 'react'
import { Button } from 'semantic-ui-react'

import LocationContext from '../LocationContext'

import './ItineraryRow.css'

function deleteLocation (deleteLocation, removeLocation) {
    removeLocation(deleteLocation)
}

const ItineraryRow = (props) => {
    return (
        <LocationContext.Consumer>
            {({myLocations, removeLocation}) => {
                
                return (
                    <div className='itineraryRowContainer'>
                        <div id='itineraryRowTitle'>{props.location}</div>
                        <div id='itineraryRowButtonContainer'>
                            <Button icon='remove' size='mini' color='red' onClick={() => deleteLocation(props.location, removeLocation)}></Button>
                        </div>
                    </div>
                )
            }}
        </LocationContext.Consumer>
    )
}

export default ItineraryRow;