import "./home.css";
import { useState, useEffect } from "react";
import Menu from "../../components/menu/menu";
import Content from "../../components/content/content";
import Footer from "../../components/footer/footer";
import { Spinner } from 'react-bootstrap';

export default function Home() {
  const [homeLoading, setHomeLoading] = useState(false);
  const [popularMovies, setPopularMovies] = useState([]);
  const [popularSeries, setPopularSeries] = useState([]);

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
    setTimeout(() => {
      setHomeLoading(false);
    }, 1000);
  }

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
        setPopularSeries(data.results);
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
    setTimeout(() => {
      setHomeLoading(false);
    }, 1000);
  }

  useEffect(() => {
    setHomeLoading(true);
    LoadPopularMovies();
    LoadPopularTv();
  }, []);

  return (
    <section id="home" className={homeLoading ? "d-flex flex-column align-items-center vh-100" : ""}>
      <Menu section="home" />
      {popularMovies.length > 0 && popularSeries.length > 0 && !homeLoading ?
        (<>
          <Content
            headerName="Series populares"
            typeOfContent="tv"
            content={popularSeries}
          />



          <Content
            headerName="Peliculas populares"
            typeOfContent="movie"
            content={popularMovies}
          />
        </>)
        : <div className="d-flex justify-content-center align-items-center flex-grow-1">
          <Spinner animation="grow" role="status" className="text-light" />
          <span className="text-light ms-2 fs-5">Cargando</span>
        </div>
      }
      {popularMovies.length > 0 && popularSeries.length > 0 && !homeLoading &&
        <Footer />}
    </section>
  );
}
