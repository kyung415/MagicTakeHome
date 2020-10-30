import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import LocationContext from '../LocationContext'
import Search from './Search'
import * as api from '../api/SFFilm'
import {MockData} from '../mock/MockData'
import { act } from 'react-dom/test-utils'

api.getLocations = jest.fn()

test('renders the search bar', async () => {
    act(() => {
        api.getLocations.mockResolvedValueOnce(MockData)
        render(<Search />)
    })
    screen.getByPlaceholderText('Search for movie locations')
});

test('typing in search bar renders the SearchBar rows', () => {
    act(() => {
        api.getLocations.mockResolvedValueOnce(MockData)
        render(<LocationContext.Provider value={{addLocations: jest.fn(), myLocations: MockData}}><Search /></LocationContext.Provider>)    
    })

    const input = screen.getByPlaceholderText('Search for movie locations')
    
    act(() => {
        fireEvent.change(input, {target: {value: '5'}})
    })
    const rows1 = screen.getAllByTestId('searchRowTitle')
    expect(rows1.length).toBe(2);

    act(() => {
        fireEvent.change(input, {target: {value: '55'}})
    })
    const rows2 = screen.getAllByTestId('searchRowTitle')
    expect(rows2.length).toBe(1);

    act(() => {
        fireEvent.change(input, {target: {value: 'a'}})
    })
    expect(screen.queryByTestId('searchRowTitle')).toBeNull()
});

test('test add button click', async () => {
    api.getLocations.mockResolvedValueOnce(MockData)
    var addLocations = jest.fn()
    render(<LocationContext.Provider value={{addLocations: addLocations, myLocations: {'555 Market St.': MockData['555 Market St.']}}}><Search /></LocationContext.Provider>)

    const input = screen.getByPlaceholderText('Search for movie locations')

    fireEvent.change(input, {target: {value: '5'}})
    const button = screen.getByTestId('addButton')
    fireEvent.click(button)

    expect(addLocations).toHaveBeenCalledTimes(1)
});

test('test remove button click', async () => {
    api.getLocations.mockResolvedValueOnce(MockData)
    var removeLocation = jest.fn()
    render(<LocationContext.Provider value={{removeLocation: removeLocation, myLocations: {'555 Market St.': MockData['555 Market St.']}}}><Search /></LocationContext.Provider>)
    
    const input = screen.getByPlaceholderText('Search for movie locations')

    fireEvent.change(input, {target: {value: '5'}})
    const button = screen.getByTestId('removeButton')
    fireEvent.click(button)

    expect(removeLocation).toHaveBeenCalledTimes(1)
});