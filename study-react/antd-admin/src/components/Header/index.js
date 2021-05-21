import './index.css';
import React from 'react'
import { Header } from 'antd'

class GlobalHeader extends React.Component{
  render () {
    return(
      <Header className="site-layout-background" style={{ padding: 0 }}></Header>
    );
  }
}

export default GlobalHeader;
