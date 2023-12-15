import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createHashRouter, RouterProvider} from 'react-router-dom';
import Welcome from './routes/welcome/welcome.jsx';
import Home from './routes/home/home.jsx';
import Filter from './routes/filter/filter.jsx';
import MoviesAndSeries from './routes/moviesAndSeries/moviesAndSeries.jsx';
import NotFound from './routes/notFound/notFound.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';


const router = createHashRouter([
  {
    path: "/",
    element: <Welcome />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/movies",
    element: <Filter section="movie" />
  },
  {
    path: "/movies/explore",
    element: <Filter section="movie" />
  },
  {
    path: "/movies/popular",
    element: <MoviesAndSeries section="/movie/popular" />
  },
  {
    path: "/movies/top-rated",
    element: <MoviesAndSeries section="/movie/top_rated" />
  },
  {
    path: "/series",
    element: <Filter section="tv" />
  },
  {
    path: "/series/explore",
    element: <Filter section="tv" />
  },
  {
    path: "/series/popular",
    element: <MoviesAndSeries section="/tv/popular" />
  },
  {
    path: "/series/top-rated",
    element: <MoviesAndSeries section="/tv/top_rated" />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
