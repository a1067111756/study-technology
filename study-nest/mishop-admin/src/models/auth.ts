import { useState, useCallback } from 'react';
import localTango from 'local-tango'

export default () => {
  // token
  const [token, setToken] = useState(localTango.getItemString('token', ''))

  // 用户信息
  const [userInfo, setUserInfo] = useState(localTango.getItemJSON('userInfo', {}))

  // 设置认证信息
  const setAuthInfo = useCallback((loginRes: APIS.ILoginRes) => {
    setToken(loginRes.token)
    localTango.setItemString('token', loginRes.token)

    setUserInfo(loginRes.userInfo)
    localTango.setItemJSON('userInfo', loginRes.userInfo as any)
  }, [])

  return {
    token,
    userInfo,
    setAuthInfo
  }
}
