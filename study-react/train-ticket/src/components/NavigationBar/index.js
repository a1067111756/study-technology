import './index.css'
import React from 'react';

function NavigationBar (props) {
  const  { title, onBack } = props
  
  return (
    <div className="component-nav-bar__container">
      <span className="iconfont icon-back" onClick={onBack}></span>
      <p className="cnb__title">{title}</p>
      <div className="placeholder"></div>
    </div>
  );
}

export default NavigationBar;