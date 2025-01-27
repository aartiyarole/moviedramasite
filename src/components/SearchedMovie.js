import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './SearchedMovie.css'
export default function SearchedMovie() {
  const Api_key = "c45a857c193f6302f2b5061c3b85e743";
  const { searchQuery } = useParams();
  const decodedQuery = decodeURIComponent(searchQuery); 
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${Api_key}&language=en-US&query=${decodedQuery}&page=1`
        );
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [decodedQuery]);

  const filteredMovies = movies.filter((movie) => {
    const movieTitle = movie.title.toLowerCase();
    const search = decodedQuery.toLowerCase(); 
    return movieTitle.includes(search); 
  });

  return (
    <div>
      <h1 className='topic'>Search Results for "{decodedQuery}"</h1>
      {loading ? (
        <div className='movie-list'>
        <div className="d-flex flex-column justify-content-center align-items-center text-info" id="loader" style={{width:'500px'}}>
            <div className="spinner-border" role="status">
            </div>
            <span className="sr-only">Loading...</span>
        </div>;
      </div>
      ) : (
        <div className="movie-list">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <Link to={`/movie/${movie.id}`}>
                <div key={movie.id} className="movie-item">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    className="movie-poster"
                  />
                  <h3>{movie.title}</h3>
                </div>
              </Link>
            ))
          ) : (
            <p>No movies found that match your search criteria.</p>
          )}
        </div>
      )}
    </div>
  );
}
