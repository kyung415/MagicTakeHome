import React from 'react'
import { Button } from 'semantic-ui-react'

import LocationContext from '../LocationContext'

import './ItineraryRow.css'

function deleteLocation (deleteLocation, myLocations, changeLocations) {
    // console.log(newLocation)
    console.log(myLocations)
    var temp = myLocations.splice(0, myLocations.length)

    var index = temp.indexOf(deleteLocation)
    temp.splice(index, 1)
    
    changeLocations(temp)
}

const ItineraryRow = (props) => {
    return (
        <LocationContext.Consumer>
            {({myLocations, changeLocations}) => {
                return (
                    <div className='itineraryRowContainer'>
                        <div id='itineraryRowTitle'>{props.location}</div>
                        <div id='itineraryRowButtonContainer'>
                            <Button icon='remove' size='mini' color='red' onClick={() => deleteLocation(props.location, myLocations, changeLocations)}></Button>
                        </div>
                    </div>
                )
            }}
        </LocationContext.Consumer>
    )
}

export default ItineraryRow;