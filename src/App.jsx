// import { useState } from 'react'
// import './App.css'
// import Menu from './componentes/MenuComp'
// import Header from './componentes/HeaderComp'
// import Inicio from './vistas/Inicio'
// import Chat from './vistas/Chat'
// import Reservas from './vistas/Reservas'
// import Login from './vistas/Login'

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false)
//   const [currentView, setCurrentView] = useState('inicio')
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

//   const renderView = () => {
//     switch(currentView) {
//       case 'inicio':
//         return <Inicio />
//       case 'reservas':
//         return <Reservas />
//       case 'chat':
//         return <Chat />
//       default:
//         return <Inicio />
//     }
//   }

//   if (!isLoggedIn) {
//     return <Login onLogin={() => setIsLoggedIn(true)} />
//   }

//   return (
//     <div className="app">
//       <Menu 
//         currentView={currentView} 
//         setCurrentView={setCurrentView}
//         isMobileMenuOpen={isMobileMenuOpen}
//         setIsMobileMenuOpen={setIsMobileMenuOpen}
//       />
//       <div className="main-content">
//         <Header 
//           isMobileMenuOpen={isMobileMenuOpen}
//           setIsMobileMenuOpen={setIsMobileMenuOpen}
//         />
//         <div className="content-area">
//           {renderView()}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App

// src/App.jsx

import { useState } from 'react';
import './App.css';
import Menu    from './componentes/MenuComp';
import Header  from './componentes/HeaderComp';
import Inicio  from './vistas/Inicio';
import Chat    from './vistas/Chat';
import Reservas from './vistas/Reservas';
import Login   from './vistas/Login';
import DetalleNotificacion from './vistas/DeNotificacion';
import useNotificaciones from './js/Notificaciones';

function App() {
  const [isLoggedIn, setIsLoggedIn]           = useState(false);
  const [currentView, setCurrentView]         = useState('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [detalleNotif, setDetalleNotif]       = useState(null);

  const currentUser = 'Sarahí Ortíz';

  const {
    notificaciones,
    noLeidas,
    marcarLeida,
    marcarTodasLeidas,
    eliminar,
  } = useNotificaciones(currentUser);

  const handleVerDetalle = (notif) => {
    setDetalleNotif(notif);
    setCurrentView('detalle-notif');
  };

  const handleNavegar = (ruta) => {
    setDetalleNotif(null);
    setCurrentView(ruta);
  };

  const renderView = () => {
    if (currentView === 'detalle-notif' && detalleNotif) {
      return (
        <DetalleNotificacion
          notificacion={detalleNotif}
          onVolver={() => { setDetalleNotif(null); setCurrentView('inicio'); }}
          onNavegar={handleNavegar}
        />
      );
    }
    switch (currentView) {
      case 'inicio':   return <Inicio />;
      case 'reservas': return <Reservas />;
      case 'chat':     return <Chat />;
      default:         return <Inicio />;
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="app">
      <Menu
        currentView={currentView}
        setCurrentView={setCurrentView}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="main-content">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          notificaciones={notificaciones}
          noLeidas={noLeidas}
          onMarcarLeida={marcarLeida}
          onMarcarTodas={marcarTodasLeidas}
          onEliminar={eliminar}
          onVerDetalle={handleVerDetalle}
        />
        <div className="content-area">
          {renderView()}
        </div>
      </div>
    </div>
  );
}

export default App;
