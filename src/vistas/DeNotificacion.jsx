import { ArrowLeft } from 'lucide-react';
import { TIPOS } from '../js/Notificaciones';
import '../styles/Notificaciones.css';

const DeNotificacion = ({ notificacion, onVolver, onNavegar }) => {
  if (!notificacion) return null;

  const tipo  = TIPOS[notificacion.tipo] ?? TIPOS.mensaje;
  const fecha = new Date(notificacion.fecha).toLocaleString('es-MX', {
    dateStyle: 'long',
    timeStyle: 'short',
  });

  const labelBoton = {
    chat:      'Ir al Chat',
  }[tipo.ruta] ?? 'Ver más';

  return (
    <div className="detalle-notif">
      <div className="detalle-notif-bar">
        <button className="detalle-back-btn" onClick={onVolver}>
          <ArrowLeft size={20} />
          <span>Volver</span>
        </button>
      </div>

      <div className="detalle-card">
        <div className="detalle-header">
          <div className="detalle-icon" style={{ background: `${tipo.color}20`, color: tipo.color }}>
            {tipo.icon}
          </div>
          <div>
            <span className="detalle-tipo-label" style={{ color: tipo.color }}>{tipo.label}</span>
            <h2 className="detalle-titulo">{notificacion.titulo}</h2>
            <span className="detalle-fecha">{fecha}</span>
          </div>
        </div>

        <div className="detalle-campos">
          <div className="detalle-campo">
            <span className="detalle-campo-label">Remitente</span>
            <span className="detalle-campo-valor">{notificacion.remitente}</span>
          </div>
          <div className="detalle-campo">
            <span className="detalle-campo-label">Descripción</span>
            <span className="detalle-campo-valor">{notificacion.descripcion}</span>
          </div>
        </div>

        <button
          className="detalle-accion-btn"
          style={{ background: tipo.color }}
          onClick={() => onNavegar(tipo.ruta)}
        >
          {labelBoton}
        </button>
      </div>
    </div>
  );
};

export default DeNotificacion;
