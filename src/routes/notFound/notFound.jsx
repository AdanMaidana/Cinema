import { Link } from 'react-router-dom';
import './notFound.css';

export default function NotFound() {
  return (
    <section id='notFound' className='vh-100 d-flex justify-content-center align-items-center flex-column'>
      <svg width="256" height="256" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" stroke="red" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v4a1 1 0 0 0 1 1h3m0-5v10m3-9v8a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1m7-1v4a1 1 0 0 0 1 1h3m0-5v10"/>
</svg>
      <h2 className='text-danger text-center fs-1'>Página no encontrada</h2>
      <Link to="/home" className='btn btn-warning'>Volver al inicio</Link>
    </section>
  )
}
