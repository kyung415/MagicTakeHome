import React, { useState, useEffect } from 'react'
import { Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import SearchRow from './SearchRow'
import { getLocations } from '../api/SFFilm'

import './Search.css'

/*
    Search Component
*/
const Search = () => {

    const [searchBarText, setSearchBarText] = useState('') //state for text in search bar.
    const [searchedList, setSearchedList] = useState([]) //unchange list of locations (global list)
    const [searchRowLocations, setSearchRowLocations] = useState([]) //filtered list of locations

    const getData = async() => {
        const locations = await getLocations()
        const keys = Object.keys(locations)

        //Cache SF Film Location Data
        localStorage.setItem('locations', JSON.stringify(locations))
        setSearchedList(keys)
    }

    //Filter locations from all location list using the searchbar text. Used when search bar text is changed.
    const filterLocations = (s, locationsList) => {
        const filteredLocations = locationsList.filter(function(x) {
            return s === x.substr(0, s.length).toLowerCase()
        })
        return filteredLocations
    }

    //On change function for typing in search bar. Show overlay when typing in search bar.
    const searchTyped = (e, setSearchBarText) => {
        let body = document.getElementById('searchResultsContainer')
        let overlay = document.getElementById('overlay')
        if (e.target.value === '') {
            body.style.display = 'none';
            overlay.style.display = 'none';
        }
        else {
            body.style.display = 'block';
            overlay.style.display = 'block';
        }
        setSearchBarText(e.target.value)
    }

    //Click transparent overlay to collapse search result container. Click outside of search results to close it.
    const overlayClick = () => {
        let overlay = document.getElementById('overlay')
        let body = document.getElementById('searchResultsContainer')
        overlay.style.display = 'none';
        body.style.display = 'none';
    }

    //Initial load
    useEffect(() => {

        //Check if locations have not been cached.
        if (localStorage.getItem('locations') === null) {
            getData()
        }
        else {
            const locations = JSON.parse(localStorage.getItem('locations'))
            const keys = Object.keys(locations)
            setSearchedList(keys)
        }
    }, [])

    //When typing in search bar, update the filtered list/search results.
    useEffect(() => {
        const filteredList = filterLocations(searchBarText, searchedList)
        setSearchRowLocations(filteredList)
    }, [searchBarText])

    return (
        <div id='searchBarContainer'>
            <div id='overlay' onClick={() => overlayClick()}></div>
            <Input placeholder="Search for movie locations" value={searchBarText} onChange={(e) => searchTyped(e, setSearchBarText)} style={{width: "75%"}}/>
            <div id='searchResultsContainer'>
                {searchBarText === ''
                    ? <div></div>
                    : searchRowLocations.map((result) => {
                        return (
                            <div key={result+'_s'}>
                                <SearchRow location={result} />
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search;