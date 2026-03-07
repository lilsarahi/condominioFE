const BASE_URL = "http://localhost:8000/api";

const ServReservas = {

  obtener: async () => {
    const res = await fetch(`${BASE_URL}/reservas`);
    if (!res.ok) throw new Error("Error al obtener reservas");
    return res.json(); 
  },

  crear: async (data) => {
    const res = await fetch(`${BASE_URL}/reservas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al crear reserva");
    return res.json(); 
  },

  actualizar: async (id, data) => {
    const res = await fetch(`${BASE_URL}/reservas/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Error al actualizar reserva");
    return res.json();
  },

  eliminar: async (id) => {
    const res = await fetch(`${BASE_URL}/reservas/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Error al eliminar reserva");
    return res.json(); 
  },

};

export default ServReservas;