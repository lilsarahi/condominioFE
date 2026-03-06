import { useState } from 'react';
import '../styles/Login.css';
import logo from '../assets/logo.jpeg';

const Login = ({ onLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo-wrapper">
          <div className="login-logo-circle">
            <img src={logo} alt="Condominius" className="login-logo" />
          </div>
        </div>

        <h1 className="login-title">Inicio de sesión</h1>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-field">
            <label className="login-label">Usuario</label>
            <input
              type="text"
              placeholder="Ingresar usuario"
              className="login-input"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label className="login-label">Contraseña</label>
            <input
              type="password"
              placeholder="Ingresar contraseña"
              className="login-input"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Iniciar sesión
          </button>

          <a href="#" className="login-forgot">
            Recuperar contraseña
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
