import { Home, Calendar, MessageCircle } from 'lucide-react';
import '../Styles/Menu.css';

const Menu = ({ currentView, setCurrentView, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'reservas', label: 'Reservas', icon: Calendar },
    { id: 'chat', label: 'Chat', icon: MessageCircle }
  ];

  const handleMenuClick = (id) => {
    setCurrentView(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {isMobileMenuOpen && (
        <div 
          className="menu-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <aside className={`menu ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        <nav className="menu-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${currentView === item.id ? 'active' : ''}`}
                onClick={() => handleMenuClick(item.id)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>
    </>
  );
};

export default Menu;