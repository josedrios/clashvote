import { useState } from 'react'

function SearchResult({playerData}) {
return (
    <div id='search-result-container'>
      {playerData ? JSON.stringify(playerData, null, 2) : "NULL"}
    </div>
  )
}

export default SearchResult