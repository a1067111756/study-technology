import './index.css';
import React from 'react'
import { Footer } from 'antd'

class GlobalFooter extends React.Component{
  render () {
    return(
      <Footer className="site-layout-background" style={{ padding: 0 }}></Footer>
    );
  }
}

export default GlobalFooter;
