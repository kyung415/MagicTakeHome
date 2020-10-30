import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'

import LocationContext from '../LocationContext'
import Search from './Search'
import * as api from '../api/SFFilm'
import {MockData} from '../mock/MockData'

api.getLocations = jest.fn()

test('renders the search bar', async () => {
    api.getLocations.mockResolvedValueOnce(MockData)
    render(<Search />)
    screen.getByPlaceholderText('Search for movie locations')
});

test('typing in search bar renders the SearchBar rows', () => {
    
    api.getLocations.mockResolvedValueOnce(MockData)
    render(<LocationContext.Provider value={{addLocations: jest.fn()}}><Search /></LocationContext.Provider>)
    
    const input = screen.getByPlaceholderText('Search for movie locations')
    
    fireEvent.change(input, {target: {value: '5'}})
    const rows1 = screen.getAllByTestId('searchRowTitle')
    expect(rows1.length).toBe(2);

    fireEvent.change(input, {target: {value: '55'}})
    const rows2 = screen.getAllByTestId('searchRowTitle')
    expect(rows2.length).toBe(1);

    fireEvent.change(input, {target: {value: 'a'}})
    expect(screen.queryByTestId('searchRowTitle')).toBeNull()
});