import React from 'react'

import { Button } from 'semantic-ui-react'

import LocationContext from '../LocationContext'
import 'semantic-ui-css/semantic.min.css';
import './SearchRow.css'

/*
    props: location: String
    Search Bar searched results row.
    Shows Location title and an + icon button/ x icon button.
*/
const SearchRow = (props) => {

    /*
        Params: newLocation: String, addLocations: function
        - Add new location to Itinerary List. Calls Home addLocations function.
    */
    const addLocation = (newLocation, addLocations) => {    
        addLocations(newLocation)
    }
    /*
        Params: newLocation: String, removeLocations: function
        - Removes old location from Itinerary List. Calls Home removeLocation function.
    */
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