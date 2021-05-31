import React from 'react';
import { Images } from '../../Themes';
import './Styles/styles.css';

function Header() {
  return (
    <div className="header">
      <img className="logo-img" src={Images.logo} alt="spark" />
    </div>
  );
}

export default Header;
