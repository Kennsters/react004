//importing our components, cdn and also bringing in useState and useEffect
import React, { useState, useEffect } from 'react'
import Form from './components/Form'
import Card from './components/Card'
import GifContext from './utils/GifContext'
import axios from 'axios'

const App = () => {
  //State is essentially an object that you can call parts of. It's like 'this', but defined by you. So here we hold in a search string and a gif object.
  //gifState is the name of the object and setGifState is the function in which we add new information to our object
  const [gifState, setGifState] = useState({
    search: '',
    gif: {}
  })

  //this is a method. event.target.name = our search bar
  //event.target.value is the value of the search input
  gifState.handleInputChange = event => {
    setGifState({ ...gifState, [event.target.name]: event.target.value })
  }

  gifState.handleSearchGIPHY = event => {
    event.preventDefault()
    axios.get(`https://api.giphy.com/v1/gifs/search?api_key=so6QOTNdmWKPObKhaL11EhE7gGtpiiqG&q=${gifState.search}&limit=20&rating=g`)
      .then(({ data }) => {
        let gif = data.data[Math.floor(Math.random() * data.data.length)]
        setGifState({ ...gifState, gif })
      })
  }

  useEffect(() => {
    axios.get('https://api.giphy.com/v1/gifs/search?api_key=so6QOTNdmWKPObKhaL11EhE7gGtpiiqG&q=cats&limit=20&rating=g')
      .then(({ data }) => {
        let gif = data.data[Math.floor(Math.random() * data.data.length)]
        setGifState({ ...gifState, gif })
      })
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <h1>GIPHY App</h1>
      <GifContext.Provider value={gifState} >
        <Form />
        {
          gifState.gif.title ? <Card /> : null
        }
      </GifContext.Provider>
    </>
  )
}

export default App