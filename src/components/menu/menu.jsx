import "./menu.css";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

export default function Menu({ section }) {
  return (
    <nav id="menu">
      <menu className="d-flex list-unstyled align-items-center m-0 h-100 column-gap-4 column-gap-md-5 px-3">
        {/* BOTON INICIO */}
        <li>
          <Link to="/home" className="btn fs-2 border-0 p-0 m-0">
            <svg
              width="48"
              height="48"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill={`${section === "home" ? "#2bff0d" : "#000"}`}
                d="M18.178 11.373a.7.7 0 0 1 .7.7v5.874c.027.812-.071 1.345-.434 1.68c-.338.311-.828.4-1.463.366H3.144C2.5 19.961 2 19.7 1.768 19.173c-.154-.347-.226-.757-.226-1.228v-5.873a.7.7 0 0 1 1.4 0v5.873c0 .232.026.42.07.562l.036.098l-.003-.01c.001-.013.03-.008.132-.002h13.84c.245.014.401 0 .456-.001l.004-.001c-.013-.053.012-.27 0-.622v-5.897a.7.7 0 0 1 .701-.7M10.434 0c.264 0 .5.104.722.297l8.625 8.139a.7.7 0 1 1-.962 1.017l-8.417-7.944l-9.244 7.965a.7.7 0 0 1-.915-1.06L9.689.277l.086-.064c.214-.134.428-.212.66-.212"
              />
            </svg>
          </Link>
        </li>

        {/* BOTON PELICULAS */}
        <li className="btn fs-2 border-0 p-0 m-0 navbar-button">
          <button
            className={`fs-2 p-0 m-0 border-0 ${
              section === "movie" ||
              section === "/movie/popular" ||
              section === "/movie/top_rated"
                ? "button-active"
                : ""
            }`}
          >
            Peliculas
          </button>
          <ul className="dropdown-list">
            <Link to="/movies/explore">Explorar</Link>
            <Link to="/movies/popular">Populares</Link>
            <Link to="/movies/top-rated">Top Rating</Link>
          </ul>
        </li>

        {/* BOTON SERIES */}
        <li className="btn fs-2 border-0 p-0 m-0 navbar-button">
          <button
            className={`fs-2 p-0 m-0 border-0 ${
              section === "tv" ||
              section === "/tv/popular" ||
              section === "/tv/top_rated"
                ? "button-active"
                : ""
            } `}
          >
            Series
          </button>
          <ul className="dropdown-list">
            <Link to="/series/explore">Explorar</Link>
            <Link to="/series/popular">Populares</Link>
            <Link to="/series/top-rated">Top Rating</Link>
          </ul>
        </li>
      </menu>
    </nav>
  );
}

Menu.propTypes = {
  section: PropTypes.string.isRequired,
  // otras PropTypes si las hay
};