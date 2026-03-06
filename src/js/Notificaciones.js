import { useState, useCallback } from 'react';
import { useEchoPublic } from '@laravel/echo-react';

export const TIPOS = {
  mensaje:  { label: 'Mensaje',  icon: '💬', color: '#3B82F6', ruta: 'chat' },
};

let _idCounter = 1;

const Notificaciones = (currentUser = '') => {
  const [notificaciones, setNotificaciones] = useState([]);

  const agregar = useCallback((tipo, datos) => {
    setNotificaciones(prev => [{
      id:    _idCounter++,
      tipo,
      leida: false,
      fecha: new Date(),
      ...datos,
    }, ...prev]);
  }, []);

  const marcarLeida = useCallback((id) => {
    setNotificaciones(prev =>
      prev.map(n => n.id === id ? { ...n, leida: true } : n)
    );
  }, []);

  const marcarTodasLeidas = useCallback(() => {
    setNotificaciones(prev => prev.map(n => ({ ...n, leida: true })));
  }, []);

  const eliminar = useCallback((id) => {
    setNotificaciones(prev => prev.filter(n => n.id !== id));
  }, []);

  useEchoPublic('chat', '.mensaje.enviado', (data) => {
    const remitente = data.remitente ?? 'Usuario';
    if (currentUser && remitente === currentUser) return;
    agregar('mensaje', {
      titulo:      `Mensaje de ${remitente}`,
      descripcion: data.mensaje,
      remitente,
      extra: data,
    });
  });

  const noLeidas = notificaciones.filter(n => !n.leida).length;

  return { notificaciones, noLeidas, agregar, marcarLeida, marcarTodasLeidas, eliminar };
};

export default Notificaciones;