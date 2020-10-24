import React from 'react'

import { Button } from 'semantic-ui-react'

import LocationContext from '../LocationContext'
import 'semantic-ui-css/semantic.min.css';
import './SearchRow.css'


//TODO: Change button color when location is already added to the itinerary.
function addLocation (newLocation, myLocations, changeLocations) {
    // console.log(newLocation)
    console.log(myLocations)
    var temp = myLocations.splice(0, myLocations.length)
    temp.push(newLocation)
    
    changeLocations(temp)
}

/*
    Search Bar searched results row.
    Shows Location title and an + icon button.
*/
const SearchRow = (props) => {
    return (
        <LocationContext.Consumer>
            {({myLocations, changeLocations}) => {
                return (
                    <div className='searchRowContainer'>
                        <div id='searchRowTitle'>{props.location}</div>
                        <div id='searchRowButtonContainer'>
                            <Button icon='plus' size='mini' color='blue' onClick={() => addLocation(props.location, myLocations, changeLocations)}></Button>
                        </div>
                    </div>
                )
            }}
        </LocationContext.Consumer>
    )
}

export default SearchRow;