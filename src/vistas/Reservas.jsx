import { useState, useEffect, useRef } from "react";
import { Pencil, Trash2, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import reservasService from "../js/ServReservas";
import "../styles/Reservas.css";

const areaData = [
  { id: 1, nombre: "Piscina",           estado: "Disponible", imagen: null },
  { id: 2, nombre: "Área de parrillas", estado: "Ocupado",    imagen: null },
  { id: 3, nombre: "Salón de eventos",  estado: "Disponible", imagen: null },
];

function LoadingButton({ loading, onClick, disabled, children, className, loadingLabel = "Guardando..." }) {
  const labelRef = useRef(null);
  const spinRef  = useRef(null);

  return (
    <button className={className} onClick={onClick} disabled={disabled || loading}>
      <SwitchTransition mode="out-in">
        <CSSTransition
          key={loading ? "loading" : "idle"}
          timeout={200}
          classNames="btn-label"
          nodeRef={loading ? spinRef : labelRef}
        >
          {loading ? (
            <span ref={spinRef} className="btn-spinner">
              <Loader2 size={15} className="spin" />
              {loadingLabel}
            </span>
          ) : (
            <span ref={labelRef}>{children}</span>
          )}
        </CSSTransition>
      </SwitchTransition>
    </button>
  );
}

const Reservas = () => {
  const [reservas,        setReservas]        = useState([]);
  const [modalOpen,       setModalOpen]       = useState(false);
  const [editando,        setEditando]        = useState(null);
  const [form,            setForm]            = useState({ area: "", fecha: "" });
  const [loadingGuardar,  setLoadingGuardar]  = useState(false);
  const [loadingEliminar, setLoadingEliminar] = useState(false);
  const [alerta,          setAlerta]          = useState({ show: false, mensaje: "", tipo: "success" });
  const [confirmDelete,   setConfirmDelete]   = useState({ show: false, id: null });

  const alertRef = useRef(null);

  useEffect(() => {
    reservasService.obtener()
      .then(setReservas)
      .catch(() => mostrarAlerta("Error al cargar las reservas", "error"));
  }, []);

  const mostrarAlerta = (mensaje, tipo = "success") => {
    setAlerta({ show: true, mensaje, tipo });
    setTimeout(() => setAlerta({ show: false, mensaje: "", tipo: "success" }), 3500);
  };

  const abrirReserva = (area) => {
    setEditando(null);
    setForm({ area: area.nombre, fecha: "" });
    setModalOpen(true);
  };

  const abrirEditar = (r) => {
    setEditando(r.id);
    setForm({ area: r.area, fecha: r.fecha });
    setModalOpen(true);
  };

  const guardar = async () => {
    if (!form.area || !form.fecha) return;
    setLoadingGuardar(true);
    try {
      if (editando) {
        const { reserva } = await reservasService.actualizar(editando, form);
        setReservas((prev) => prev.map((r) => (r.id === editando ? reserva : r)));
        mostrarAlerta("Reserva actualizada correctamente");
      } else {
        const { reserva } = await reservasService.crear(form);
        setReservas((prev) => [...prev, reserva]);
        mostrarAlerta("Reserva creada correctamente");
      }
      setModalOpen(false);
      setForm({ area: "", fecha: "" });
      setEditando(null);
    } catch {
      mostrarAlerta("Error al procesar la reserva", "error");
    } finally {
      setLoadingGuardar(false);
    }
  };

  const confirmarEliminar = async () => {
    setLoadingEliminar(true);
    try {
      await reservasService.eliminar(confirmDelete.id);
      setReservas((prev) => prev.filter((r) => r.id !== confirmDelete.id));
      setConfirmDelete({ show: false, id: null });
      mostrarAlerta("Reserva eliminada correctamente");
    } catch {
      mostrarAlerta("Error al eliminar la reserva", "error");
    } finally {
      setLoadingEliminar(false);
    }
  };

  return (
    <div className="reservas-page">

      <CSSTransition
        in={alerta.show}
        timeout={300}
        classNames="alert"
        unmountOnExit
        nodeRef={alertRef}
      >
        <div ref={alertRef} className={`alerta-reserva ${alerta.tipo === "error" ? "error" : ""}`}>
          {alerta.tipo === "error"
            ? <XCircle size={16} />
            : <CheckCircle size={16} />
          }
          {alerta.mensaje}
        </div>
      </CSSTransition>

      {confirmDelete.show && (
        <div className="modal-overlay">
          <div className="modal-card confirmacion">
            <h3>¿Eliminar esta reserva?</h3>
            <div className="modal-actions">
              <button
                className="btn-cancelar"
                onClick={() => setConfirmDelete({ show: false, id: null })}
                disabled={loadingEliminar}
              >
                Cancelar
              </button>
              <LoadingButton
                className="btn-eliminar"
                loading={loadingEliminar}
                loadingLabel="Eliminando..."
                onClick={confirmarEliminar}
              >
                Eliminar
              </LoadingButton>
            </div>
          </div>
        </div>
      )}

      <section className="reservas-section">
        <h2 className="reservas-section-title">Áreas comunes</h2>
        <div className="areas-grid">
          {areaData.map((area) => (
            <div className="area-card" key={area.id}>
              <div className="area-img-wrapper">
                {area.imagen && (
                  <img src={area.imagen} alt={area.nombre} className="area-img" />
                )}
              </div>
              <div className="area-info">
                <p className="area-nombre">{area.nombre}</p>
                <div className="area-footer">
                  <span className={`area-estado ${area.estado === "Disponible" ? "disponible" : "ocupado"}`}>
                    {area.estado}
                  </span>
                  <button className="btn-reservar" onClick={() => abrirReserva(area)}>
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
                  <td colSpan={4} className="tabla-vacia">No tienes reservas</td>
                </tr>
              ) : (
                reservas.map((r) => (
                  <tr key={r.id}>
                    <td>{r.area}</td>
                    <td>{r.fecha}</td>
                    <td>
                      <span className={`estado-badge ${r.estado === "Confirmada" ? "confirmada" : "pendiente"}`}>
                        {r.estado}
                      </span>
                    </td>
                    <td className="acciones-cell">
                      <button className="btn-accion editar" onClick={() => abrirEditar(r)}>
                        <Pencil size={15} /> Editar
                      </button>
                      <button className="btn-accion eliminar" onClick={() => setConfirmDelete({ show: true, id: r.id })}>
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
        <div className="modal-overlay" onClick={() => !loadingGuardar && setModalOpen(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">
              {editando ? "Editar Reserva" : "Nueva Reserva"}
            </h3>

            <div className="modal-field">
              <label className="modal-label">Área</label>
              <select
                className="modal-input"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                disabled={loadingGuardar}
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
                disabled={loadingGuardar}
              />
            </div>

            <div className="modal-actions">
              <button
                className="btn-cancelar"
                onClick={() => setModalOpen(false)}
                disabled={loadingGuardar}
              >
                Cancelar
              </button>
              <LoadingButton
                className="btn-guardar"
                loading={loadingGuardar}
                loadingLabel="Guardando..."
                onClick={guardar}
              >
                {editando ? "Guardar cambios" : "Reservar"}
              </LoadingButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reservas;
