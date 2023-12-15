import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import Menu from "../../components/menu/menu";
import "./filter.css";
import Content from "../../components/content/content";
import { Pagination } from "react-bootstrap";
import Footer from "../../components/footer/footer";
import { Spinner } from 'react-bootstrap';
import PropTypes from 'prop-types';


export default function Filter({ section }) {
  //ESTADO PARA CONTROLAR SI SE ENCONTRO CONTENIDO SEGUN LOS FILTROS DEL USUARIO
  const [resultsFound, setResultsFound] = useState(true);
  //ESTADO PARA MOSTRAR QUE SE ESTA CARGANDO EL CONTENIDO
  const [loading, setLoading] = useState(false);
  //ESTADO PARA DETERMINAR A QUE URL SE HACE EL FETCH
  const [contentToDisplay, setContentToDisplay] = useState("");
  //SE HACE FETCH A DISCOVER
  const [discoverContent, setDiscoverContent] = useState([]);
  //SE HACE FETCH A SEARCH
  const [searchContent, setSearchContent] = useState([]);
  //TITULO QUE EL USUARIO INGRESA
  const [searchTitle, setSearchTitle] = useState("");
  //AÑO QUE EL USUARIO INGRESA
  const [titleYear, setTitleYear] = useState("");
  //GENEROS QUE EL USUARIO SELECCIONE
  const [selectedGenres, setSelectedGenres] = useState([]);
  //COMO QUIERE EL USUARIO ORDENAR EL CONTENIDO
  const [orderSelected, setOrderSelected] = useState("");

  /*ESTADOS PARA CONTROLAR QUE FILTROS SE MUESTRAN*/
  const [filterByTitle, setFilterByTitle] = useState(false);
  const [filterByYear, setFilterByYear] = useState(false);
  const [filterByGenres, setFilterByGenres] = useState(false);
  const [orderBy, setOrderBy] = useState(false);


  //PAGINACIÓN
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const handlePageChange = (newPage) => {
    // Solo hacemos la solicitud si la nueva página es diferente a la actual
    if (newPage !== currentPage) {
      setLoading(true);
      setContentToDisplay("");
      setDiscoverContent([]);
      setSearchContent([]);
      setCurrentPage(newPage);
    }
  };

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


  //LIMPIA EL CONTENIDO SI SE CAMBIA DE SECCION
  useEffect(() => {
    setResultsFound(false);
    setLoading(false);
    setContentToDisplay("");
    setDiscoverContent([]);
    setSearchContent([]);
    setSearchTitle("");
    setTitleYear("");
    setSelectedGenres([]);
    setOrderSelected("");

    setFilterByTitle(false);
    setFilterByYear(false);
    setFilterByGenres(false);
    setOrderBy(false);


    setCurrentPage(1);
    setTotalPages(1);
  }, [section])


  //LIMPIAMOS EL CONTENIDO SI NO HAY NINGUN FILTRO ACTIVO O SI ESTAN VACIOS LOS INPUTS
  useEffect(() => {
    if (!filterByTitle && !filterByYear && !filterByGenres && !orderBy) {
      setResultsFound(false);
      setLoading(false);
      setContentToDisplay("");
      setDiscoverContent([]);
      setSearchContent([]);
      setCurrentPage(1);
      setTotalPages(1);
    }
    else if (searchTitle === "" && titleYear.length !== 4 && selectedGenres.length === 0 && orderSelected === "") {
      setResultsFound(false);
      setLoading(false);
      setContentToDisplay("");
      setDiscoverContent([]);
      setSearchContent([]);
      setCurrentPage(1);
      setTotalPages(1);
    }
  }, [filterByTitle, filterByYear, filterByGenres, orderBy, searchTitle, titleYear, selectedGenres, orderSelected])



  //PEDIMOS EL CONTENIDO SEGUN LOS SWITCHES E INPUTS ACTIVOS
  useEffect(() => {
    switch (true) {
      // Solo se activa si hay título y no hay otros filtros activos
      case filterByTitle && !filterByGenres && !orderBy && !filterByYear && searchTitle.length === 4:
        setContentToDisplay("search");
        search();
        break;

      // Solo se activa si está activo el filtro de año y no hay otros filtros activos
      case !filterByTitle && !filterByGenres && !orderBy && filterByYear && titleYear.length === 4:
        setContentToDisplay("discover");
        discover();
        break;

      // Solo se activa si está activo el filtro de géneros y no hay otros filtros activos
      case !filterByTitle && filterByGenres && !orderBy && !filterByYear && selectedGenres.length > 0:
        setContentToDisplay("discover");
        discover();
        break;

      // Solo se activa si está activo el filtro de ordenar por y no hay otros filtros activos
      case !filterByTitle && !filterByGenres && orderBy && !filterByYear && orderSelected !== "":
        setContentToDisplay("discover");
        discover();
        break;

      // Título + Año
      case filterByTitle && searchTitle !== "" && !filterByGenres && !orderBy:
        if (filterByYear && titleYear.length === 4) {
          setContentToDisplay("search");
          search();
        } else {
          setContentToDisplay("search");
          search();
        }
        break;

      // Géneros + Año
      case filterByGenres && selectedGenres.length > 0 && !filterByTitle:
        if (filterByYear && titleYear.length === 4) {
          setContentToDisplay("discover");
          discover();
        } else {
          setContentToDisplay("discover");
          discover();
        }
        break;

      // Ordenar por + Año
      case orderBy && orderSelected !== "":
        if (filterByYear && titleYear.length === 4) {
          setContentToDisplay("discover");
          discover();
        } else {
          setContentToDisplay("discover");
          discover();
        }
        break;

      // Géneros + Ordenar por
      case filterByGenres && selectedGenres.length > 0 && orderBy && orderSelected !== "":
        setContentToDisplay("discover");
        discover();
        break;

      // Año + Géneros + Ordenar por
      case filterByYear && filterByGenres && orderBy && titleYear.length === 4 && selectedGenres.length > 0 && orderSelected !== "":
        setContentToDisplay("discover");
        discover();
        break;

      default:
        // Manejar el caso por defecto o no hacer nada si ninguna de las condiciones coincide.
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterByGenres, filterByTitle, filterByYear, orderBy, searchTitle, titleYear, selectedGenres, orderSelected, currentPage]);



  /* FUNCIÓN PARA FILTRAR CON DISCOVER (MAS OPCIONES DE FILTRO) */
  const discover = async () => {
    const apiKey = "d0d395de73e3847bf1733bffabf19cc8";
    const lenguaje = "es-MX";
    let url = `https://api.themoviedb.org/3/discover/${section}?include_adult=false${section === "tv" ? "&include_null_first_air_dates=false" : ""}&language=${lenguaje}&page=${currentPage}&sort_by=${orderBy && orderSelected ? orderSelected : "popularity.desc"}${section === "tv" ? `&first_air_date_year=${titleYear}` : `&primary_release_year=${titleYear}`}${filterByGenres && selectedGenres.length !== 0 ? `&with_genres=${selectedGenres.join(",")}` : ""}&api_key=${apiKey}`

    try {
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        setDiscoverContent(data.results);
        setTotalPages(data.total_pages);
        setResultsFound(data.results.length > 0);
      } else if (response.status === 401) {
        console.log("Error de login");
      } else {
        console.log(
          `Error al realizar la solicitud. Codigo de error: ${response.status}`
        );
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }

  /* FUNCIÓN PARA FILTRAR CON SEARCH (MENOS OPCIONES DE FILTRO) */
  const search = async () => {
    const apiKey = "d0d395de73e3847bf1733bffabf19cc8";
    const lenguaje = "es-MX";
    let url = `https://api.themoviedb.org/3/search/${section}?query=${searchTitle}${section === "tv" ? `&first_air_date_year=${titleYear}` : `&primary_release_year=${titleYear}`}&include_adult=false&language=${lenguaje}&page=${currentPage}&api_key=${apiKey}`

    try {
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        setSearchContent(data.results);
        setTotalPages(data.total_pages);
        setResultsFound(data.results.length > 0);
      } else if (response.status === 401) {
        console.log("Error de login");
      } else {
        console.log(
          `Error al realizar la solicitud. Codigo de error: ${response.status}`
        );
      }
    } catch (error) {
      console.log(error);
    }
    finally {
      setLoading(false);
    }
  }


  /*CONTROLAR LOS GENEROS QUE SE AGREGAN O ELIMINAN*/
  const handleGenreChange = (genreId) => {
    // Clonar el array de géneros seleccionados
    const updatedGenres = [...selectedGenres];

    // Comprobar si el género ya está en la lista
    const genreIndex = updatedGenres.indexOf(genreId);

    if (genreIndex !== -1) {
      // Si está presente, quitarlo
      updatedGenres.splice(genreIndex, 1);
    } else {
      // Si no está presente, agregarlo
      updatedGenres.push(genreId);
    }

    // Actualizar el estado con la nueva lista de géneros seleccionados
    setSelectedGenres([...updatedGenres]);
    setCurrentPage(1);
  };

  //SWITCHES DE LOS FILTROS
  //FILTRO DEL TITULO
  const handleTitleSwitchChange = () => {
    if (!filterByTitle) {
      setFilterByTitle(true);
    } else {
      setFilterByTitle(false);
      setSearchTitle("");
    }
  };
  //FILTRO DEL AÑO
  const handleYearSwitchChange = () => {
    if (!filterByYear) {
      setFilterByYear(true);
    } else {
      setFilterByYear(false);
      setTitleYear("");
    }
  };
  /*FILTRO DE LOS GENEROS*/
  const handleGenresSwitchChange = () => {
    if (!filterByGenres) {
      setFilterByGenres(true);
    } else {
      setFilterByGenres(false);
      setSelectedGenres([]);
    }
  };
  /*FILTRO DE ORDENAR*/
  const handleOrderSwitchChange = () => {
    if (!orderBy) {
      setOrderBy(true);
    } else {
      setOrderBy(false);
      setOrderSelected("");
    }
  };
  /*LÓGICA FILTRO DE ORDENAR*/
  const handleOrderChange = (e) => {
    const selectedValue = e.target.value;
    setOrderSelected(selectedValue);
    setCurrentPage(1);
  };
  /*LÓGICA FILTRO AÑO*/
  const handleYearChange = (e) => {
    const inputYear = e.target.value.replace(/\D/g, ''); // Elimina caracteres no numéricos
    setTitleYear(inputYear.substring(0, 4)); // Limita la longitud a 4 dígitos
  };


  /*EVITAR ENVIO DEL FORM DEL FILTER*/
  const handleSubmit = (e) => {
    e.preventDefault(); // Evitar el envío del formulario
    // No necesitas realizar ninguna acción aquí ya que la función filterContent se llama en useEffect
  };

  // Lista de géneros para películas
  const movieGenres = [
    { id: 12, name: "Aventura" },
    { id: 14, name: "Fantasía" },
    { id: 16, name: "Animación" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Terror" },
    { id: 28, name: "Acción" },
    { id: 35, name: "Comedia" },
    { id: 36, name: "Historia" },
    { id: 37, name: "Western" },
    { id: 53, name: "Suspenso" },
    { id: 80, name: "Crimen" },
    { id: 878, name: "Ciencia ficción" },
    { id: 9648, name: "Misterio" },
    { id: 99, name: "Documental" },
    { id: 10402, name: "Música" },
    { id: 10749, name: "Romance" },
    { id: 10751, name: "Familia" },
    { id: 10752, name: "Bélica" },
  ];

  // Lista de géneros para series
  const tvGenres = [
    { id: 16, name: "Animación" },
    { id: 18, name: "Drama" },
    { id: 35, name: "Comedia" },
    { id: 37, name: "Western" },
    { id: 80, name: "Crimen" },
    { id: 99, name: "Documental" },
    { id: 9648, name: "Misterio" },
    { id: 10751, name: "Familia" },
    { id: 10759, name: "Acción y Aventura" },
    { id: 10762, name: "Infantil" },
    { id: 10763, name: "Noticias" },
    { id: 10764, name: "Reality" },
    { id: 10766, name: "Telenovela" },
    { id: 10768, name: "Guerra y Política" },
    { id: 10767, name: "Programa de entrevistas" },
    { id: 10765, name: "Ciencia Ficción y Fantasía" },
  ];

  const genreList = section === "movie" ? movieGenres : tvGenres;

  return (
    <>
      <section id="filter" className={searchContent.length === 0 && discoverContent.length === 0 ? "h-100" : ""}>
        <Menu section={section} />
        <Form id="filter-form" onSubmit={handleSubmit}>
          <h3 className="text-info text-center mb-3">
            {section === "movie" ? "Filtrar peliculas" : "Filtrar series"}
          </h3>

          {/*SWITCHES PARA MOSTRAR LOS FILTROS*/}
          <Form.Group
            className={`text-light ${filterByTitle || filterByYear || filterByGenres || orderBy ? "mb-2" : ""
              }`}
          >
            <Form.Check
              type="switch"
              id="title-switch"
              label="Filtar por titulo"
              onChange={handleTitleSwitchChange}
              checked={filterByTitle}
              disabled={filterByGenres || orderBy}
            />
            <Form.Check
              type="switch"
              id="year-switch"
              label="Filtrar por año"
              onChange={handleYearSwitchChange}
              checked={filterByYear}
              disabled={false}
            />{" "}
            <Form.Check
              type="switch"
              id="genres-switch"
              label="Filtrar por generos"
              onChange={handleGenresSwitchChange}
              checked={filterByGenres}
              disabled={filterByTitle}
            />
            <Form.Check
              type="switch"
              id="order-switch"
              label="Ordenar por"
              onChange={handleOrderSwitchChange}
              checked={orderBy}
              disabled={filterByTitle}
            />
          </Form.Group>

          {/*FILTRO DEL TITULO*/}
          {filterByTitle && (
            <Form.Group className="mb-3">
              <Form.Label className="d-inline-block">Titulo</Form.Label>

              {/*FILTRO DEL TITULO*/}
              <Form.Control
                id="title-search"
                type="text"
                placeholder={
                  section === "movie"
                    ? "Nombre de la pelicula"
                    : "Nombre de la serie"
                }
                onChange={(e) => setSearchTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>
          )}

          {/*FILTRO DEL AÑO*/}
          {filterByYear && (
            <Form.Group className="mb-3">
              <Form.Label>Año</Form.Label>
              <Form.Control
                id="year-search"
                onChange={handleYearChange}
                type="text"
                maxLength={4}
                value={titleYear}
                inputMode="numeric"
                onKeyDown={(e) => {
                  // Permite borrar caracteres uno por uno
                  if (e.key === 'Backspace') {
                    setTitleYear((prevYear) => prevYear.slice(0, -1));
                  }

                  // Ignora el input si no es un número
                  if (!/^\d$/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
              ></Form.Control>
            </Form.Group>
          )}

          {/*FILTRO DE LOS GENEROS*/}
          {filterByGenres && (
            <Form.Group id="genre-filter">
              <Form.Label className="text-center mb-2">Géneros</Form.Label>
              <div id="checkbox-container">
                {genreList.map((genre) => (
                  <Form.Check
                    className="genre-checkbox"
                    key={genre.id}
                    label={genre.name}
                    type="checkbox"
                    id={`genre-checkbox-${genre.id}`}
                    onChange={() => handleGenreChange(genre.id)}
                    checked={selectedGenres.includes(genre.id)}
                  />
                ))}
              </div>
            </Form.Group>
          )}

          {/*FILTRO DE ORDENAMIENTO*/}
          {orderBy && (
            <Form.Group className="mt-2">
              <Form.Label>Ordenar</Form.Label>
              <Form.Select
                aria-label="Ordenar"
                className="mt-1"
                onChange={handleOrderChange}
                value={orderSelected}
              >
                <option value="">Seleccione una opción</option>
                <option value="popularity.asc">Popularidad ascendente</option>
                <option value="popularity.desc">Popularidad descendente</option>
                <option value="revenue.asc">Ingresos ascendentes</option>
                <option value="revenue.desc">Ingresos descendentes</option>
                <option value="primary_release_date.asc">
                  Fecha de lanzamiento ascendente
                </option>
                <option value="primary_release_date.desc">
                  Fecha de lanzamiento descendente
                </option>
                <option value="vote_average.asc">
                  Calificación promedio ascendente
                </option>
                <option value="vote_average.desc">
                  Calificación promedio descendente
                </option>
                <option value="vote_count.asc">
                  Conteo de votos ascendente
                </option>
                <option value="vote_count.desc">
                  Conteo de votos descendente
                </option>
              </Form.Select>
            </Form.Group>
          )}
        </Form>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center flex-grow-1">
            <Spinner animation="grow" role="status" className="text-light" />
            <span className="text-light ms-2 fs-5">Cargando</span>
          </div>
        ) : (
          <>
            {contentToDisplay && resultsFound &&
              <Content
                headerName={section === "tv" ? "Series Filtradas" : "Peliculas Filtradas"}
                typeOfContent={section === "tv" ? "tv" : "movie"}
                content={contentToDisplay === "search" ? searchContent : discoverContent}
              />
            }

            {!resultsFound && contentToDisplay && !loading && (
              <p className="d-flex justify-content-center align-items-center flex-grow-1 text-danger text-center fs-2 p-3">No se encontraron resultados con los filtros seleccionados.</p>
            )}


            {(contentToDisplay !== "" && resultsFound && (searchContent.length > 0 || discoverContent.length > 0)) && (
              <Pagination className="justify-content-center" size="lg">{generatePaginationItems()}</Pagination>
            )}

            <Footer />
          </>
        )}

      </section>
    </>
  );
}


Filter.propTypes = {
  section: PropTypes.string.isRequired,
  // otras PropTypes si las hay
};