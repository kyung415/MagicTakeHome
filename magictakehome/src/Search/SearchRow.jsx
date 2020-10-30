import React from 'react'

import { Button } from 'semantic-ui-react'

import LocationContext from '../LocationContext'
import 'semantic-ui-css/semantic.min.css';
import './SearchRow.css'


//TODO: Change button color when location is already added to the itinerary.

/*
    Search Bar searched results row.
    Shows Location title and an + icon button.
*/
const SearchRow = (props) => {

    const addLocation = (newLocation, addLocations) => {    
        addLocations(newLocation)
    }

    const removeOldLocation = (location, removeLocations) => {
        removeLocations(location)
    }

    const locationTitle = props.location

    return (
        <LocationContext.Consumer>
            {({myLocations, addLocations, removeLocation}) => {
                return (
                    <div className='searchRowContainer'>
                        <div data-testid='searchRowTitle' id='searchRowTitle'>{locationTitle}</div>
                        <div id='searchRowButtonContainer'>
                            {myLocations[locationTitle] === undefined
                            ? <Button icon='plus' size='mini' color='blue' onClick={() => addLocation(locationTitle, addLocations)} data-testid='addButton'></Button>
                            : <Button icon='remove' size='mini' color='red' onClick={() => removeOldLocation(locationTitle, removeLocation)} data-testid='removeButton'></Button>
                            }
                        </div>
                    </div>
                )
            }}
        </LocationContext.Consumer>
    )
}

export default SearchRow;