import React from 'react'
import "./Card.css"
import {Link} from 'react-router-dom'
export default function MovieCard({id,title,vote_average,poster_path}) {
    const imgUrl = `https://image.tmdb.org/t/p/w500/${poster_path}`;
    
  return (
    <Link to={`/movie/${id}`}>
        <div className='movie_card' >
            <img className="movie_poster" src={imgUrl} alt={title}></img>
            <h2 className='movie_title'>{title}</h2>
            <p className='movie_rating'><span>Rating: </span>{vote_average}</p>
        </div>
    </Link>
  )
}
