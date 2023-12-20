import "./welcome.css";
import { Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import { useEffect, useState } from "react";
import PropTypes from 'prop-types';

export default function Welcome() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularTv, setPopularTv] = useState([]);

  //SOLICITAR PELICULAS MÁS POPULARES DEL MOMENTO
  async function LoadPopularMovies() {
    try {
      const apiKey = "d0d395de73e3847bf1733bffabf19cc8";
      const lenguaje = "es-MX";
      const page = 1;

      let respuesta = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${lenguaje}&page=${page}`
      );

      if (respuesta.status === 200) {
        const data = await respuesta.json();
        setPopularMovies(data.results);
      } else if (respuesta.status === 401) {
        console.log("Error de login");
      } else {
        console.log(
          `Error al realizar la solicitud. Codigo de error: ${respuesta.status}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }
  //SOLICITAR SERIES MÁS POPULARES DEL MOMENTO
  async function LoadPopularTv() {
    try {
      const apiKey = "d0d395de73e3847bf1733bffabf19cc8";
      const lenguaje = "es-MX";
      const page = 1;

      let respuesta = await fetch(
        `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=${lenguaje}&page=${page}`
      );

      if (respuesta.status === 200) {
        const data = await respuesta.json();
        setPopularTv(data.results);
      } else if (respuesta.status === 401) {
        console.log("Error de login");
      } else {
        console.log(
          `Error al realizar la solicitud. Codigo de error: ${respuesta.status}`
        );
      }
    } catch (error) {
      console.log(error);
    }
  }


  //CAROUSEL
  // Obtén los posters de las primeras 5 películas y series
  const moviePosters = popularMovies.slice(0, 10).map(movie => `https://image.tmdb.org/t/p/w500${movie.poster_path}`);
  const tvPosters = popularTv.slice(0, 10).map(show => `https://image.tmdb.org/t/p/w500${show.poster_path}`);

  const AutoCarousel = ({ moviePosters, tvPosters }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
      const intervalId = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % (moviePosters.length + tvPosters.length));
      }, 3000);

      return () => {
        clearInterval(intervalId);
      };
    }, [moviePosters.length, tvPosters.length]);

    return (
      <Carousel activeIndex={index} onSelect={() => { }} interval={null}>
        {[...moviePosters, ...tvPosters].map((poster, idx) => (
          <Carousel.Item key={idx}>
            <img src={poster} alt={`Slide ${idx}`} />
          </Carousel.Item>
        ))}
      </Carousel>
    );
  };

  AutoCarousel.propTypes = {
    moviePosters: PropTypes.arrayOf(PropTypes.string).isRequired,
    tvPosters: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  useEffect(() => {
    LoadPopularMovies();
    LoadPopularTv();
  }, []);



  return (

    <section id="welcome">

      <div id="introduction">
        <h1>
          Bienvenido a <span id="cinema">Cinema</span>
        </h1>
        <p>
          Aquí encontraras las mejores{" "}
          <span className="text-warning">peliculas</span> y{" "}
          <span className="text-warning">series</span> tanto nuevas
          como clásicas.
        </p>
        <Link id="startNow" className="btn btn-warning border border-2 border-light" to="/home">Empezar a ver</Link>
      </div>

      <AutoCarousel moviePosters={moviePosters} tvPosters={tvPosters} />

    </section>




  );
}
