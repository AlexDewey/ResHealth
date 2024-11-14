import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">HealthDB</Link>
      </div>
    </nav>
  );
}

export default NavBar;
