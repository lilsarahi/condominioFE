import { Megaphone, Package } from 'lucide-react';
import '../styles/Inicio.css';
import { useEchoPublic } from '@laravel/echo-react';


const Inicio = () => {


useEchoPublic("channel-name", ".Mensaje", (data) => {
  console.log(data.text);
})

  return (
    <div className="inicio">
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">TU CONDOMINIO, AHORA EN LA PALMA DE TU MANO</h1>
        </div>
      </section>
      <br></br>

      <div className="inicio-grid">
        <div className="card payment-card">
          <h2 className="card-title">¡Hola, Sarahi!</h2>
          <p className="payment-label">Próximo pago:</p>
          <p className="payment-amount">$220.00</p>
          <button className="btn-primary">Pagar ahora</button>
        </div>
        <br></br>

        <div className="card reservas-card">
          <h3 className="card-subtitle">Mis Reservas</h3>
          <div className="reservation-item">
            <input type="checkbox" id="salon" />
            <label htmlFor="salon">
              <span className="reservation-name">Salón de eventos</span>
              <br></br>
              <span className="reservation-date">Octubre 19, 2026</span>
            </label>
          </div>
        </div>
        <br></br>

        <div className="card notices-card">
          <div className="notice-item">
            <div className="notice-icon notice-icon-purple">
              <Megaphone size={24} color="white" />
            </div>
            <div className="notice-content">
              <h4 className="notice-title">Mantenimiento de asensores</h4>
              <p className="notice-date">Jueves 16 de Enero 2026</p>
            </div>
          </div>
          <br></br>
          <div className="notice-item">
            <div className="notice-icon notice-icon-blue">
              <Megaphone size={24} color="white" />
            </div>
            <div className="notice-content">
              <h4 className="notice-title">Fumigación de áreas comunes</h4>
              <p className="notice-date">Mañana</p>
            </div>
          </div>
        </div>

        <br></br>
        <div className="card correspondence-card">
          <h3 className="card-subtitle">Correspondencia</h3>
          <div className="correspondence-empty">
            <Package size={48} color="#9CA3AF" />
            <p className="empty-text">No tienes correspondencia en recepción</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inicio;