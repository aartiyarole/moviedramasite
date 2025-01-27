
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Navbar from './components/Navbar';
import TopRated from './components/TopRated'
import UpcomingMovie from './components/UpcomingMovie'
import MovieDetails from './components/MovieDetails'
import Home from './components/Home';
import SearchedMovie from './components/SearchedMovie';
function App() {
  return (
   
           <BrowserRouter>
           <Navbar/>
           <Routes>
   
               <Route  path="/" element={<Home/>}></Route>
               <Route path="/top_rated" element={<TopRated />}></Route>
               <Route path="/upcoming" element={<UpcomingMovie/>}></Route>
               <Route path="/search/:searchQuery" element={<SearchedMovie />} />
               <Route  path="/movie/:movie_id" element={<MovieDetails/>}></Route>
           </Routes>
           </BrowserRouter>
  );
}

export default App;
