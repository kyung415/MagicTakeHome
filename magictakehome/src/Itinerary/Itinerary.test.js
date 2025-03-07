import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import LocationContext from '../LocationContext'
import Itinerary from './Itinerary'

import {MockData} from '../mock/MockData'

test('renders the Itinerary Component', () => {
    render(<LocationContext.Provider value={{myLocations: MockData, removeLocation: jest.fn()}}><Itinerary /></LocationContext.Provider>)
    screen.getByTestId('itineraryContainer')
})

test('testing two Itinerary rows/entries', () => {
    render(<LocationContext.Provider value={{myLocations: MockData, removeLocation: jest.fn()}}><Itinerary /></LocationContext.Provider>)
    const itinerary = screen.getByTestId('itineraryContainer')
    
    //2 entries
    const rows = screen.getAllByTestId('itineraryRow')
    expect(rows.length).toBe(2)
})

test('testing one Itinerary row/entry', () => {
    render(<LocationContext.Provider value={{myLocations: {'555 Market St.': MockData['555 Market St.']}, removeLocation: jest.fn()}}><Itinerary /></LocationContext.Provider>)
    const itinerary = screen.getByTestId('itineraryContainer')
    
    //1 entry
    const rows = screen.getAllByTestId('itineraryRow')
    expect(rows.length).toBe(1)
})

test('testing zero Itinerary rows/entries', () => {
    render(<LocationContext.Provider value={{myLocations: {}, removeLocation: jest.fn()}}><Itinerary /></LocationContext.Provider>)
    const itinerary = screen.getByTestId('itineraryContainer')
    
    //0 entries
    const rows = screen.queryByTestId('itineraryRow')
    expect(rows).toBeNull()
})

test('testing remove itnerary button click', () => {
    var removeLocation = jest.fn()
    render(<LocationContext.Provider value={{myLocations: {'555 Market St.': MockData['555 Market St.']}, removeLocation: removeLocation}}><Itinerary /></LocationContext.Provider>)
    
    const button = screen.getByTestId('removeItineraryRow')
    fireEvent.click(button)

    expect(removeLocation).toHaveBeenCalledTimes(1)
})