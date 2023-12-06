import React from 'react'

function MapPopUp({ street, area, postcode }) {
        return (
        <div>
            <p>{street}</p>
            <p>{area}</p>
            <p>{postcode}</p>
        </div>
        )
    }
    

export default MapPopUp