import React from 'react'
import Row from '../Row/Row'
import requests from '../../../utils/request'

function RowList() {
  return (
    <div>
      <Row title= 'NETFLIS ORIGINALS'
           fetchUrl={requests.fetchNetflixOriginals}/>
    </div>
  )
}

export default RowList