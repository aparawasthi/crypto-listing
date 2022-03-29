import React from 'react';
import logo from '../../assets/images/logo.svg';
import './Header.scss';

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="Logo for website" />
    </header>
  );
}

export default Header;
