import React, { useEffect, useState } from 'react'
import axios from '../../../utils/axios'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'
import './row.css'

const Row = ({ title, fetchUrl, isLargeRow }) => {  // Fixed component declaration
  const [movies, setMovies] = useState([]) // Fixed typo in setMovies
  const [trailerUrl, setTrailerUrl] = useState("")
  const baseUrl = "https://image.tmdb.org/t/p/original/"

  useEffect(() => {
    (async () => {  
      try {
        const request = await axios.get(fetchUrl)
        setMovies(request.data.results) // Fixed setMovies call
      } 
      catch (error) {
        console.log("error", error)
      }
    })()
  }, [fetchUrl])

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('')
    } else {
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search)
          setTrailerUrl(urlParams.get('v'))
        })
        .catch(error => console.log(error))
    }
  }

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    },
  }

  return (
    <div className='row'>
      <h1>{title}</h1>
      <div className='row_posters'>
        {movies?.map((movie, index) => (
          <img 
            onClick={() => handleClick(movie)} // Added movie parameter
            key={index} 
            src={`${baseUrl}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
            alt={movie.name}
            className={`row_poster ${isLargeRow && 'row_posterLarge'}`} // Fixed className logic
          />
        ))}
      </div>
      <div style={{ padding: '40px' }}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
    </div>
  )
}

export default Row