import React ,{useState} from 'react'
import './Navbar.css'
import {Link , useNavigate} from 'react-router-dom';
import SearchedMovie from './SearchedMovie';
export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) {
      navigate(`/search/${encodeURIComponent(searchQuery)}`);
    }
  };
  
  return (
    <div>
        <nav className='navbar-container'>
            <div className='navbar-logo'>
              <Link to="/">
                <img src="assets\Img\MovieDrama_Logo.png"/>
              </Link>
            </div>
            <ul>
                <li><Link to="/" className='link'>Popular</Link></li>
                <li><Link to="/top_rated" className='link'>Top Rated</Link></li>
                <li><Link to="/upcoming" className='link'>Upcoming</Link ></li>
                <div className='movie_searchbar'>
                <form className='search_form'>
                      <input type="text"className='search_text' placeholder='Movie Name' value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)}></input>
                      <button className='search_button' onClick={handleSearch}>Search</button>

                </form>
            </div>
            </ul>
            
        </nav>
    </div>
  )
}
