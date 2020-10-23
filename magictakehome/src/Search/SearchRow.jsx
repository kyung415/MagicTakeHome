import React from 'react'

/*
    Search Bar searched results row.
    Shows Location title and an + icon button.
*/
const SearchRow = (props) => {
    return (
        <div>
            <div>{props.location}</div>
            <button>+</button>
        </div>
    )
}

export default SearchRow;