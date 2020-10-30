import React, {useState} from 'react'
import { Button } from 'semantic-ui-react'

import LocationContext from '../LocationContext'

import './ItineraryRow.css'

const ItineraryRowDataContainer = (props) => {
    const data = props.locationData

    const title = (data['title'] !== undefined) ? data['title'] : 'Not available'
    const director = (data['director'] !== undefined) ? data['director'] : 'Not available'
    const productionCompany = (data['production_company'] !== undefined) ? data['production_company'] : 'Not available'
    const distributor = (data['distributor'] !== undefined) ? data['distributor'] : 'Not available'
    const releaseYear = (data['release_year'] !== undefined) ? data['release_year'] : 'Not available'
    const writer = (data['writer'] !== undefined) ? data['writer'] : 'Not available'
    
    var actors = []
    for (var i = 1; i < 4; i++) {
        let actor = data['actor_'+i]
        if (actor !== '') {
            actors.push(actor)
        }
    }

    const actorsStr = actors.join(', ')

    return (
        <div className='itineraryRowDataContainer' data-testid='itineraryRowData'>
            <h1>Movie Title: {title}</h1>
            <h1>Director: {director}</h1>
            <h1>Production Company: {productionCompany}</h1>
            <h1>Distributor: {distributor}</h1>
            <h1>Release Year: {releaseYear}</h1>
            <h1>Writer: {writer}</h1>
            <h1>Actors: {actorsStr}</h1>
        </div>
    )
}

const ItineraryRow = (props) => {
    const [showInfo, setShowInfo] = useState(false)

    const locationData = props.locationData
    const location = props.location

    const deleteLocation = (deleteLocation, removeLocation, e) => {
        e.stopPropagation()
        removeLocation(deleteLocation)
    }
    
    const showLocationInfo = (showInfo, setShowInfo) => {
        if (showInfo) {
            setShowInfo(false)
        }
        else {
            setShowInfo(true)
        }
    }

    return (    
        <div>
            <div id='itineraryRowContainer' onClick={() => showLocationInfo(showInfo, setShowInfo)} data-testid='itineraryRow'>
                <div>
                    <i className='large map marker alternate icon'></i>
                </div>
                <div id='itineraryRowLocationInfo'>
                    <div className='itineraryRowTitle' style={{'fontWeight': 'bold'}}>{location}</div>
                    <div className='itineraryRowTitle'>{locationData['formatted_address']}</div>
                </div>
                <div id='itineraryRowButtonContainer'>
                    <Button icon='remove' size='mini' color='red' onClick={(e) => deleteLocation(location, props.removeLocation, e)}></Button>
                </div>
            </div>
            <div>
                {showInfo
                    ? <ItineraryRowDataContainer location={location} locationData={locationData} />
                    : <div></div>
                }
            </div>
        </div>
    )
}

export default ItineraryRow;