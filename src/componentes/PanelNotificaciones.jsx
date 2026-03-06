import { useEffect, useRef } from 'react';
import { X, CheckCheck, Bell } from 'lucide-react';
import { TIPOS } from '../js/Notificaciones';
import '../styles/Notificaciones.css';

const formatFecha = (fecha) => {
  const ahora = new Date();
  const diff  = Math.floor((ahora - new Date(fecha)) / 1000);
  if (diff < 60)   return 'Ahora mismo';
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)} h`;
  return new Date(fecha).toLocaleDateString('es-MX', { day: '2-digit', month: 'short' });
};

const PanelNotificaciones = ({
  notificaciones,
  onMarcarLeida,
  onMarcarTodas,
  onEliminar,
  onVerDetalle,
  onCerrar,
}) => {
  const panelRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (panelRef.current && !panelRef.current.contains(e.target)) {
        onCerrar();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onCerrar]);

  const handleClick = (notif) => {
    if (!notif.leida) onMarcarLeida(notif.id);
    onVerDetalle(notif);
    onCerrar();
  };

  return (
    <div className="notif-panel" ref={panelRef}>
      {/* Cabecera */}
      <div className="notif-panel-header">
        <div className="notif-panel-title">
          <Bell size={18} />
          <span>Notificaciones</span>
        </div>
        <div className="notif-panel-actions">
          {notificaciones.some(n => !n.leida) && (
            <button className="notif-mark-all" onClick={onMarcarTodas} title="Marcar todas como leídas">
              <CheckCheck size={16} />
            </button>
          )}
          <button className="notif-close-btn" onClick={onCerrar}>
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Lista */}
      <div className="notif-list">
        {notificaciones.length === 0 ? (
          <div className="notif-empty">
            <span className="notif-empty-icon">🔔</span>
            <p>No tienes notificaciones</p>
          </div>
        ) : (
          notificaciones.map((notif) => {
            const tipo = TIPOS[notif.tipo] ?? TIPOS.mensaje;
            return (
              <div
                key={notif.id}
                className={`notif-item ${notif.leida ? 'leida' : 'no-leida'}`}
                onClick={() => handleClick(notif)}
              >
                <div
                  className="notif-item-icon"
                  style={{ background: `${tipo.color}20`, color: tipo.color }}
                >
                  {tipo.icon}
                </div>

                <div className="notif-item-body">
                  <div className="notif-item-top">
                    <span className="notif-item-titulo">{notif.titulo}</span>
                    {!notif.leida && <span className="notif-dot" />}
                  </div>
                  <p className="notif-item-desc">{notif.descripcion}</p>
                  <span className="notif-item-fecha">{formatFecha(notif.fecha)}</span>
                </div>

                <button
                  className="notif-delete-btn"
                  onClick={(e) => { e.stopPropagation(); onEliminar(notif.id); }}
                  title="Eliminar"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default PanelNotificaciones;
