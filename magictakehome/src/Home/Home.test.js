import React from 'react'
import { render, screen } from '@testing-library/react'

import LocationContext from '../LocationContext'
import Home from './Home'
import {MockData} from '../mock/MockData'

test('renders the Home Component', () => {
    render(<LocationContext.Provider><Home /></LocationContext.Provider>)
    screen.getByTestId('homeContainer')
})