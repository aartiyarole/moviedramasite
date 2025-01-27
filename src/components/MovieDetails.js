import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

export default function MovieDetails() {
  const { movie_id } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [credits, setCredits] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const Api_key = 'c45a857c193f6302f2b5061c3b85e743';

      try {
        // Fetch movie details
        const movieResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${Api_key}&language=en-US`
        );
        if (!movieResponse.ok) {
          throw new Error(`HTTP error! Status: ${movieResponse.status}`);
        }
        const movieData = await movieResponse.json();
        setMovieData(movieData);

        // Fetch movie credits
        const creditsResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${Api_key}&language=en-US`
        );
        if (!creditsResponse.ok) {
          throw new Error(`HTTP error! Status: ${creditsResponse.status}`);
        }
        const creditsData = await creditsResponse.json();
        setCredits(creditsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchMovieDetails();
  }, [movie_id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!movieData || !credits) {
    return (
    <div className='movie_cont1'>
      <div class="d-flex flex-column justify-content-center align-items-center text-info" id="loader" style={{width:'500px'}}>
          <div class="spinner-border" role="status">
          </div>
          <span class="sr-only">Loading...</span>
      </div>;
    </div>
    )
  }

  const imgUrl = `https://image.tmdb.org/t/p/w500/${movieData.poster_path}`;
  const backgroundImg = `https://image.tmdb.org/t/p/w500/${movieData.backdrop_path}`;

  return (
    <div>
      <div className="movie_cont1">
        <div
          className="detail"
          style={{ backgroundImage: `url(${backgroundImg})` }}
        >
          <div className="detail-section1">
            <img src={imgUrl} alt={movieData.title} />
            <div className="movie-data">
              <h1>{movieData.title}</h1>
              <p>Rating: {movieData.vote_average}</p>
              <p>Release Date: {movieData.release_date}</p>
              <div className="detail-section2">
                <h1>Overview</h1>
                <p id="movie-overview">{movieData.overview}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="crew-details">
          <h1>Cast Members</h1>
          <div className="crew-gallery">
          {credits.cast
            .filter(
              (castMember) =>
                castMember.profile_path && castMember.character
            )
            .slice(0, 8)
            .map((castMember) => (
              <div key={castMember.id} className="cast-card">
                <img
                  src={`https://image.tmdb.org/t/p/w200/${castMember.profile_path}`}
                  alt={castMember.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/200x300?text=No+Image';
                  }}
                />
                <p>{castMember.name}</p>
                <p className="character">{castMember.character}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}
