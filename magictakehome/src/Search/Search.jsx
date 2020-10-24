import React, { useState, useEffect } from 'react'
import { Input } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';

import SearchRow from './SearchRow'

import './Search.css'

//GET request for all movie set locations.
async function getLocations () {
    return await fetch('https://data.sfgov.org/resource/yitu-d5am.json', {
        method: 'GET',
        data: {
            limit: 5000,
            app_token: 'D1s06FaoBcQOYysp2jmpT8xOU'

        }
    })
    .then(response => response.json())
    .then(data => {

        //Get rid of duplicate locations using a Set.
        var final = new Set();
        for (var i = 0; i < data.length; i++) {
            if (data[i]['locations'] !== undefined) {
                final.add(data[i]['locations'])
            }
        }
        let setValues = final.values()
        return Array.from(setValues)
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

    var searchedResults

    const getData = async() => {
        const locations = await getLocations()
        setSearchedList(locations)
    }

    //Initial load
    useEffect(() => {
        getData()
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
        <div>
            <Input placeholder="Search for movie locations" value={searchBarText} onChange={(e) => searchTyped(e, setSearchBarText)} style={{width: "400px"}}/>
            <div>
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