import React from 'react'
import { render, screen } from '@testing-library/react'
import { act } from 'react-dom/test-utils'

import LocationContext from '../LocationContext'
import Map from './Map'
import {MockData} from '../mock/MockData'

test('renders the Map Component', () => {
    render(<LocationContext.Provider value={{myLocations: MockData}} ><Map /></LocationContext.Provider>)
    const pins = screen.getAllByTestId('mapContainer')
})

test('tests two MapPins', () => {
    render(<LocationContext.Provider value={{myLocations: MockData}} ><Map /></LocationContext.Provider>)
    const pins = screen.getAllByTestId('mapPin')
    expect(pins.length).toBe(2)
})

test('tests one MapPin', () => {
    render(<LocationContext.Provider value={{myLocations: {'555 Market St.': MockData['555 Market St.']}}} ><Map /></LocationContext.Provider>)
    const pins = screen.getAllByTestId('mapPin')
    expect(pins.length).toBe(1)
})

test('tests zero MapPins', () => {
    render(<LocationContext.Provider value={{myLocations: {}}} ><Map /></LocationContext.Provider>)
    expect(screen.queryByTestId('mapPin')).toBeNull()
})