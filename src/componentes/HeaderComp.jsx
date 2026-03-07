import { useState } from 'react';
import { Menu as MenuIcon, Bell } from 'lucide-react';
import '../styles/Header.css';
import logo from '../assets/logo.jpeg';
import PanelNotificaciones from './PanelNotificaciones';

const Header = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  notificaciones,
  noLeidas,
  onMarcarLeida,
  onMarcarTodas,
  onEliminar,
  onVerDetalle,
}) => {
  const [panelAbierto, setPanelAbierto] = useState(false);
  const [shake, setShake]               = useState(false);
  const [prevNoLeidas, setPrevNoLeidas] = useState(noLeidas);

  if (noLeidas > prevNoLeidas) {
    setPrevNoLeidas(noLeidas);
    setShake(true);
    setTimeout(() => setShake(false), 600);
  } else if (noLeidas < prevNoLeidas) {
    setPrevNoLeidas(noLeidas);
  }

  return (
    <header className="header">
      <div className="header-left">
        <button
          className="menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <MenuIcon size={24} />
        </button>
        <img src={logo} alt="Condominius" className="header-logo" />
        <span className="site-name">Condominius</span>
      </div>

      <div className="header-actions">
        <div className="notif-wrapper">
          <button
            className={`notification-btn ${shake ? 'nueva' : ''}`}
            onClick={() => setPanelAbierto(v => !v)}
          >
            <Bell size={20} />
            {noLeidas > 0 && (
              <span className="notification-badge">
                {noLeidas > 9 ? '9+' : noLeidas}
              </span>
            )}
          </button>

          {panelAbierto && (
            <PanelNotificaciones
              notificaciones={notificaciones}
              onMarcarLeida={onMarcarLeida}
              onMarcarTodas={onMarcarTodas}
              onEliminar={onEliminar}
              onVerDetalle={onVerDetalle}
              onCerrar={() => setPanelAbierto(false)}
            />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
