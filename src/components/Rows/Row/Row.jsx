import React, { useEffect, useState } from 'react'
import './row.css'
import axios from '../../../utils/axios'
import movieTrailer from 'movie-trailer'
import YouTube from 'react-youtube'

function Row({title, fetchUrl, isLargeRow}) {
  let {movies, setMoveis} = useState([])
  let {trailerUrl, setTrailerUrl} = useState("")
  let baseUrl = "https://image.tmdb.org/t/p/original"

  useEffect(()=>{
    (async () => {
      try {
        console.log(fetchUrl)
        let request = await axios.get(`http://localhost:4000/api/${fetchUrl}`)
        console.log(request)
        setMoveis(request.data.results)
      } catch (error) {
        console.log("error", error)
      }
    })()
  }, [fetchUrl]);
  let handleClick = (movie)=>{
    if (trailerUrl){
      setTrailerUrl('')
    }else{
      movieTrailer(movie?.title || movie?.name || movie?.original_name)
        .then((url)=>{
          console.log (url)
          const urlParams = new URLSearchParams(new URL(url).search)
          console.log (urlParams)
          console.log (urlParams.get)
          console.log(urlParams.get('v'))
          setTrailerUrl(urlParams.get('v'))
        })
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
        {movies?.map((movie, index)=>(
          <img onClick={()=>handleClick()}
               key={index} src={`${baseUrl}${isLargeRow ? movie.poster_path: movie.backdrop_path}` } alt= {movie.name} 
               className={`row_poster ${isLargeRow && 'row_posterLarge'}`} />
        ))}
      </div>
      <div style={{padding: '40px'}}>
        {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
     
    </div>
  )
}

export default Row