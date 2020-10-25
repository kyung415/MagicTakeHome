import React, { useState, useEffect } from 'react'
import { Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import SearchRow from './SearchRow'

import './Search.css'

const SF_FILM_APP_TOKEN = process.env.REACT_APP_SF_FILM_APP_TOKEN

//GET request for all movie set locations.
async function getLocations () {
    return await fetch('https://data.sfgov.org/resource/yitu-d5am.json', {
        method: 'GET',
        data: {
            limit: 5000,
            app_token: SF_FILM_APP_TOKEN

        }
    })
    .then(response => response.json())
    .then(data => {

        var final = {}
        for (var i = 0; i < data.length; i++) {
            var location = data[i]['locations']
            if (location !== undefined) {
                final[location] = data[i]
            }
        }

        return final
    })
    .catch(error => console.log(error))
}


//Filter locations from global list using the searchbar text. Used when search bar text is changed.
function filterLocations (s, globalList) {
    const filteredLocations = globalList.filter(function(x) {
        return s === x.substr(0, s.length).toLowerCase()
    })
    return filteredLocations
}

function searchTyped (e, setSearchBarText) {
    setSearchBarText(e.target.value)
}

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

    //Initial load
    useEffect(() => {
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

    useEffect(()=> {
        console.log('yo')
    }, [searchRowLocations])

    return (
        <div id='searchBarContainer'>
            <Input placeholder="Search for movie locations" value={searchBarText} onChange={(e) => searchTyped(e, setSearchBarText)} style={{width: "400px"}}/>
            <div id='searchResultsContainer'>
                {searchBarText === ''
                    ? <div></div>
                    : searchRowLocations.map((result) => {
                        return (
                            <div>
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