import React from 'react'

import { Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css';
import './SearchRow.css'
/*
    Search Bar searched results row.
    Shows Location title and an + icon button.
*/
const SearchRow = (props) => {
    return (
        <div className='searchRowContainer'>
            <div id='searchRowTitle'>{props.location}</div>
            <div id='searchRowButtonContainer'>
                <Button icon='plus' size='mini' color='blue'></Button>
            </div>
        </div>
    )
}

export default SearchRow;