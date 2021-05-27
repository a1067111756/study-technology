import Cookies from 'js-cookie'

export function getCookie(key: string) {
  return Cookies.get(key)
}

export function getCookieJSON(key: string) {
  return Cookies.getJSON(key)
}

export function setCookie(key: string, data: string) {
  return Cookies.set(key, data)
}

export function removeCookie(key: string) {
  return Cookies.remove(key)
}
