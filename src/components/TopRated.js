import React ,{useState,useEffect}from 'react'
import MovieCard from './MovieCard';
export default function TopRated() {
  const [movies,setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error,setError] = useState(null);
  
   useEffect(()=>{
    const fetchMovies = async()=>{
      const Api_key = "c45a857c193f6302f2b5061c3b85e743";
      const ApiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${Api_key}&language=en-US&page=${currentPage}`;
      try{
          const response = await fetch(ApiUrl);
          if(!response.ok){
            throw new Error(`HTTP error! Status : ${response.status}`);
  
          }
          const data = await response.json();
          
          setMovies(data.results);
  
      }catch(err){
        setError(err.message);
      }
    }
  
    fetchMovies();
   },[currentPage])

   const handleNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };


  return (
    <>
    <div className='topic'><h1>Top Rated</h1></div>
    <div className='movie_container'>
            {error ? (<p>Error: {error}</p>) : ( 
              <>
                {movies.map((movie)=>(
                <MovieCard key={movie.id} {...movie}/>
                ))}
              </>
              
            )
            }
    
    </div>
    <div className="pagination-tab">
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button className="page-link" onClick={handlePrevious}>
                Previous
              </button>
            </li>
            {[...Array(5)].map((_, index) => (
              <li
                key={index + 1}
                className={`page-item ${
                  currentPage === index + 1 ? 'active' : ''
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button className="page-link" onClick={handleNext}>
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}
