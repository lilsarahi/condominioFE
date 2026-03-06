import { Menu as MenuIcon, Bell } from 'lucide-react';
import '../Styles/Header.css';
import logo from '../assets/logo.jpeg';  

const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
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
        <button className="notification-btn">
          <Bell size={20} />
          <span className="notification-badge">3</span>
        </button>
      </div>
    </header>
  );
};

export default Header;