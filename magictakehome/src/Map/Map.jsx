import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import { DimmerDimmable } from 'semantic-ui-react';

import './Map.css'

import LocationContext from '../LocationContext'

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const Map = () => {

    //Default properties to San Francisco.
    const defaultProps = {
        center: {
        lat: 37.773972,
        lng: -122.431297
        },
        zoom: 12
    };

    const MapPin = ({ }) => <div data-testid='mapPin'><i className='large map marker alternate icon'></i></div>;

    return (
        <LocationContext.Consumer>
            {({myLocations}) => {
                var locations = Object.keys(myLocations)
                return (
                    <div id='mapContainer' data-testid='mapContainer'>
                        <GoogleMapReact
                            bootstrapURLKeys={{key: GOOGLE_MAPS_API_KEY}}
                            defaultCenter={defaultProps.center}
                            defaultZoom={defaultProps.zoom}
                        >
                            {locations.map((location) => {
                                console.log(location)
                                return (
                                    <MapPin
                                        lat={myLocations[location]['coordinates']['lat']}
                                        lng={myLocations[location]['coordinates']['lng']}
                                    />
                                )
                            })}
                        </GoogleMapReact>
                    </div>
                )
            }}
        </LocationContext.Consumer>
    )
}

export default Map;