import React from 'react'
import styles from './index.less'

const LoginPage: React.FC = () => {
  return(
    <div className={styles.container}>
      {/* 左侧 */}
      <div className={styles.leftContent}></div>
      {/* 右侧 */}
      <div className={styles.rightBanner}>
        <img src={require('@/assets/images/img-login-banner.svg')} />
        <p>Mi Shop</p>
      </div>
    </div>
  )
}

export default LoginPage