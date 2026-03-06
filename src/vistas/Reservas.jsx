import { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import '../styles/Reservas.css';

const areaData = [
  {
    id: 1,
    nombre: 'Piscina',
    estado: 'Disponible',
    imagen: '',
  },
  {
    id: 2,
    nombre: 'Área de parrillas',
    estado: 'Ocupado',
    imagen: '',
  },
  {
    id: 3,
    nombre: 'Salón de eventos',
    estado: 'Disponible',
    imagen: '',
  },
];

const reservasIniciales = [
  { id: 1, area: 'Piscina', fecha: '14/02/2026', estado: 'Confirmada' },
  { id: 2, area: 'Salón de eventos', fecha: '19/10/2026', estado: 'Pendiente' },
];

const Reservas = () => {
  const [reservas, setReservas] = useState(reservasIniciales);
  const [modalOpen, setModalOpen] = useState(false);
  const [editando, setEditando] = useState(null);
  const [form, setForm] = useState({ area: '', fecha: '' });

  const abrirReserva = (area) => {
    setEditando(null);
    setForm({ area: area.nombre, fecha: '' });
    setModalOpen(true);
  };

  const abrirEditar = (reserva) => {
    setEditando(reserva.id);
    setForm({ area: reserva.area, fecha: reserva.fecha });
    setModalOpen(true);
  };

  const eliminar = (id) => {
    setReservas(reservas.filter((r) => r.id !== id));
  };

  const guardar = () => {
    if (!form.area || !form.fecha) return;
    if (editando) {
      setReservas(reservas.map((r) =>
        r.id === editando ? { ...r, area: form.area, fecha: form.fecha } : r
      ));
    } else {
      const nueva = {
        id: Date.now(),
        area: form.area,
        fecha: form.fecha,
        estado: 'Pendiente',
      };
      setReservas([...reservas, nueva]);
    }
    setModalOpen(false);
    setForm({ area: '', fecha: '' });
    setEditando(null);
  };

  return (
    <div className="reservas-page">
      <section className="reservas-section">
        <h2 className="reservas-section-title">Áreas comunes</h2>
        <div className="areas-grid">
          {areaData.map((area) => (
            <div className="area-card" key={area.id}>
              <div className="area-img-wrapper">
                <img src={area.imagen} alt={area.nombre} className="area-img" />
              </div>
              <div className="area-info">
                <p className="area-nombre">{area.nombre}</p>
                <div className="area-footer">
                  <span className={`area-estado ${area.estado === 'Disponible' ? 'disponible' : 'ocupado'}`}>
                    {area.estado}
                  </span>
                  <button
                    className="btn-reservar"
                    onClick={() => abrirReserva(area)}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reservas-section">
        <h2 className="reservas-section-title">Mis Reservas</h2>
        <div className="reservas-table-wrapper">
          <table className="reservas-table">
            <thead>
              <tr>
                <th>Área</th>
                <th>Fecha</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length === 0 ? (
                <tr>
                  <td colSpan={4} className="tabla-vacia">No tienes reservas activas</td>
                </tr>
              ) : (
                reservas.map((r) => (
                  <tr key={r.id}>
                    <td>{r.area}</td>
                    <td>{r.fecha}</td>
                    <td>
                      <span className={`estado-badge ${r.estado === 'Confirmada' ? 'confirmada' : 'pendiente'}`}>
                        {r.estado}
                      </span>
                    </td>
                    <td className="acciones-cell">
                      <button className="btn-accion editar" onClick={() => abrirEditar(r)}>
                        <Pencil size={15} /> Editar
                      </button>
                      <button className="btn-accion eliminar" onClick={() => eliminar(r.id)}>
                        <Trash2 size={15} /> Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">{editando ? 'Editar Reserva' : 'Nueva Reserva'}</h3>

            <div className="modal-field">
              <label className="modal-label">Área</label>
              <select
                className="modal-input"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
              >
                <option value="">Seleccionar área</option>
                {areaData.map((a) => (
                  <option key={a.id} value={a.nombre}>{a.nombre}</option>
                ))}
              </select>
            </div>

            <div className="modal-field">
              <label className="modal-label">Fecha</label>
              <input
                type="date"
                className="modal-input"
                value={form.fecha}
                onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-cancelar" onClick={() => setModalOpen(false)}>Cancelar</button>
              <button className="btn-guardar" onClick={guardar}>
                {editando ? 'Guardar cambios' : 'Reservar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservas;
