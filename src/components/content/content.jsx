import "./content.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import PropTypes from 'prop-types';

export default function Content({ headerName, typeOfContent, content }) {
  /*OBJETO QUE EL USUARIO LE HIZO CLICK*/
  const [selectedItem, setSelectedItem] = useState(null);

  /*MOSTRAR U OCULTAR EL MODAL*/
  const [show, setShow] = useState(false);

  /* ABRIR MODAL */
  const handleClose = () => setShow(false);
  /* CERRAR MODAL */
  const handleShow = (item) => {
    setSelectedItem(item);
    setShow(true);
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
    { id: 10765, name: "Ciencia Ficción y Fantasía" },
    { id: 10766, name: "Telenovela" },
    { id: 10767, name: "Programa de entrevistas" },
    { id: 10768, name: "Guerra y Política" },
  ];

  return (
    <>
      {content.length > 0 && (
        <ul id="content" className="row m-0 px-0 row-gap-5 container-fluid">
          <h2 className="header">
            {content.length > 0 ? headerName : ""}
          </h2>
          {content && (
            content.map((item, index) => (
              <li key={index} className="col-12 col-md-6 col-xxl-3 list-unstyled">
                <figure>
                  <div className="content-img">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={`poster de ${typeOfContent === "tv" ? item.name : item.title
                        }`}
                      title={typeOfContent === "tv" ? item.name : item.title}
                      onClick={() => handleShow(item)}
                      onError={(e) => {
                        e.target.src = `data:image/svg+xml;utf8,${encodeURIComponent(
                          "<svg width=\"256\" height=\"256\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" d=\"M5.615 20q-.67 0-1.143-.472Q4 19.056 4 18.385V5.805q0-.095.01-.172q.01-.077.048-.154l-1.235-1.24q-.14-.14-.153-.342q-.012-.2.153-.366q.16-.16.354-.16q.194 0 .354.16l16.938 16.938q.146.146.153.344q.007.199-.159.364q-.165.16-.353.162q-.189.003-.354-.162l-1.216-1.215q-.096.019-.173.028q-.077.01-.173.01H5.615Zm2.193-3.5h7.27l-2.555-2.537l-1.138 1.512l-1.562-1.887q-.13-.142-.313-.142t-.314.162l-1.711 2.246q-.143.211-.031.429q.111.217.354.217ZM20 17.175L6.825 4h11.56q.67 0 1.143.472q.472.472.472 1.143v11.56Z\"/></svg>"
                        )}`;
                        e.target.onerror = null; // Para evitar bucles infinitos si la imagen de error también falla
                      }}
                    />
                  </div>
                  <figcaption>
                    {typeOfContent === "tv" ? item.name : item.title}
                  </figcaption>
                </figure>
              </li>
            ))
          )}
        </ul>
      )}

      <Modal show={show} onHide={handleClose} size="md" centered>
        <Modal.Header className="border-0 pb-0">
          <Modal.Title className="fs-4 text-light">
            {selectedItem ? selectedItem.title || selectedItem.name : ""}
          </Modal.Title>
          <svg
            id="modal-close"
            className="align-self-start rounded"
            onClick={handleClose}
            xmlns="http://www.w3.org/2000/svg"
            width="2.5em"
            height="2.5em"
            viewBox="0 0 24 24"
          >
            <path
              fill="white"
              d="M6.4 19L5 17.6l5.6-5.6L5 6.4L6.4 5l5.6 5.6L17.6 5L19 6.4L13.4 12l5.6 5.6l-1.4 1.4l-5.6-5.6L6.4 19Z"
            />
          </svg>
        </Modal.Header>
        {selectedItem && (
          <Modal.Body className="pb-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${selectedItem.backdrop_path}`}
              alt={`poster de ${typeOfContent === "tv" ? selectedItem.name : selectedItem.title
                }`}
              title={typeOfContent === "tv" ? selectedItem.name : selectedItem.title}
              onError={(e) => {
                e.target.src = `data:image/svg+xml;utf8,${encodeURIComponent(
                  "<svg width=\"128\" height=\"128\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" d=\"M5.615 20q-.67 0-1.143-.472Q4 19.056 4 18.385V5.805q0-.095.01-.172q.01-.077.048-.154l-1.235-1.24q-.14-.14-.153-.342q-.012-.2.153-.366q.16-.16.354-.16q.194 0 .354.16l16.938 16.938q.146.146.153.344q.007.199-.159.364q-.165.16-.353.162q-.189.003-.354-.162l-1.216-1.215q-.096.019-.173.028q-.077.01-.173.01H5.615Zm2.193-3.5h7.27l-2.555-2.537l-1.138 1.512l-1.562-1.887q-.13-.142-.313-.142t-.314.162l-1.711 2.246q-.143.211-.031.429q.111.217.354.217ZM20 17.175L6.825 4h11.56q.67 0 1.143.472q.472.472.472 1.143v11.56Z\"/></svg>"
                )}`;
                e.target.onerror = null; // Para evitar bucles infinitos si la imagen de error también falla
              }}
              className="rounded mb-2"
            />
            <p className="fs-6 text-light">
              {selectedItem?.overview || "Sin descripción disponible."}
            </p>

            <ul className="list-unstyled">
              <li>
                <p className="m-0 fst-italic details">
                  Géneros:{" "}
                  {selectedItem &&
                    selectedItem.genre_ids &&
                    selectedItem.genre_ids.length > 0
                    ? selectedItem.genre_ids.map((genreId, index) => {
                      const genresArrayToCompare =
                        typeOfContent === "movie" ? movieGenres : tvGenres;
                      const foundGenre = genresArrayToCompare.find(
                        (item) => item.id === genreId
                      );
                      return foundGenre ? (
                        <span key={index}>
                          {foundGenre.name}
                          {index < selectedItem.genre_ids.length - 1
                            ? ", "
                            : ""}
                        </span>
                      ) : null;
                    })
                    : "Sin información de géneros."}
                </p>
              </li>

              <li>
                <p className="m-0 fst-italic d-flex column-gap-1 details">
                  Calificación:
                  <span>{Math.ceil(selectedItem?.vote_average)}</span>
                  <svg
                    id="rating-star"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="yellow"
                      d="m24 11l3.9 7.9l8.7 1.3l-6.3 6.1l1.5 8.7l-7.8-4.1l-7.8 4.1l1.5-8.7l-6.3-6.1l8.7-1.3z"
                    />
                  </svg>
                </p>
              </li>

              <li>
                <p className="m-0 fst-italic d-flex column-gap-2 details">
                  {typeOfContent === "movie" ? "Fecha de lanzamiento:" : "Emitido por primera vez:"}
                  <span>
                    {selectedItem
                      ? selectedItem.release_date ||
                      selectedItem.first_air_date
                      : "Sin información"}
                  </span>
                </p>
              </li>
            </ul>
          </Modal.Body>
        )}
        <Modal.Footer className="border-0 pt-0">
          <Button variant="success" className="border">
            Ver {typeOfContent === "tv" ? "serie" : "película"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

Content.propTypes = {
  headerName: PropTypes.string.isRequired,
  typeOfContent: PropTypes.string.isRequired,
  content: PropTypes.array.isRequired
}