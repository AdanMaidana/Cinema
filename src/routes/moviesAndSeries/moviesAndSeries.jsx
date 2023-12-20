import { useEffect, useState, useCallback } from "react";
import { Pagination } from "react-bootstrap";
import "./moviesAndSeries.css";
import Content from "../../components/content/content";
import Menu from "../../components/menu/menu";
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function MoviesAndSeries({ section }) {
  const [content, setContent] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = useCallback(
    async (page) => {
      try {
        const apiKey = "d0d395de73e3847bf1733bffabf19cc8";
        const language = "es-MX";

        let response = await fetch(
          `https://api.themoviedb.org/3${section}?api_key=${apiKey}&language=${language}&page=${page}`
        );

        if (response.status === 200) {
          const data = await response.json();

          // Introducir una demora de 1,5 segundo (1500 ms) antes de mostrar el contenido
          setTimeout(() => {
            setContent(data.results);
            setTotalPages(data.total_pages);
          }, 1000);

        } else if (response.status === 401) {
          console.log("Error de login");
        } else {
          console.log(
            `Error al realizar la solicitud. Codigo de error: ${response.status}`
          );
        }
      } catch (error) {
        console.error(error);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [section]
  );

  useEffect(() => {
    setContent([]);
    // Al cambiar de sección, reseteamos la página a 1
    setCurrentPage(1);

    // Hacemos la solicitud para la nueva sección y la página 1
    fetchData(1);
  }, [section, fetchData]);

  const handlePageChange = (newPage) => {
    // Solo hacemos la solicitud si la nueva página es diferente a la actual
    if (newPage !== currentPage) {
      setContent([]);
      setCurrentPage(newPage);
      fetchData(newPage);
    }
  };

  //Pagination
  const generatePaginationItems = () => {
    let items = [];
    const maxPagesToShow = 5;

    // Agregamos los botones de Primero y Anterior
    items.push(
      <Pagination.First
        key="first"
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      />
    );
    items.push(
      <Pagination.Prev
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
    );

    // Agregamos números de página alrededor de la página actual
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    for (let number = startPage; number <= endPage; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
          id={number === currentPage ? "pagination-active" : ""}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Agregamos los botones de Siguiente y Último
    items.push(
      <Pagination.Next
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    );
    items.push(
      <Pagination.Last
        key="last"
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      />
    );

    return items;
  };


  return (
    <>
      <Menu section={section} />
      <section id="moviesAndSeries" className={content.length === 0 ? "d-flex flex-column align-items-center vh-100" : ""}>
        {content.length === 0 ? (
          // Muestra el spinner si no hay contenido
          <div className="d-flex justify-content-center align-items-center flex-grow-1">
            <Spinner animation="grow" role="status" className="text-light" />
            <span className="text-light ms-2 fs-5">Cargando</span>
          </div>

        ) : (
          // Muestra el contenido cuando hay elementos
          <>
            {section === "/movie/top_rated" && (
              <Content
                typeOfContent="movie"
                content={content}
                headerName="Mejores peliculas"

              />
            )}
            {section === "/movie/popular" && (
              <Content
                typeOfContent="movie"
                content={content}
                headerName="Peliculas populares"
              />
            )}
            {section === "/tv/top_rated" && (
              <Content
                typeOfContent="tv"
                content={content}
                headerName="Mejores series"
              />
            )}
            {section === "/tv/popular" && (
              <Content
                typeOfContent="tv"
                content={content}
                headerName="Series populares"
              />
            )}

            {/* Paginación */}
            {content.length > 0 && (
              <Pagination className="justify-content-center">
                {generatePaginationItems()}
              </Pagination>
            )}
        
          </>
        )}
      </section>

    </>
  );
}

MoviesAndSeries.propTypes = {
  section: PropTypes.string.isRequired,
  // otras PropTypes si las hay
};