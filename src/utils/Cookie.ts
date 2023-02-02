export function setCookie(name: string, value: string, expiredays: number) {
  const date = new Date()
  date.setTime(date.getTime() + (expiredays * 24 * 3600 * 1000))
  document.cookie = `${name}=${escape(value)}${expiredays == null ? '' : '; expires=' + date.toGMTString()}`
}

export function getCookie(name: string) {
  if (document.cookie.length > 0) {
    let begin = document.cookie.indexOf(`${name}=`)
    if (begin != -1) {
      begin += name.length + 1
      let end = document.cookie.indexOf(';', begin)
      if (end == -1) end = document.cookie.length
      return unescape(document.cookie.substring(begin, end))
    }
  }
  return null
}

export function delCookie(name: string) {
  if (getCookie(name)) {
    document.cookie = `${name}=; expires=Thu, 01-Jan-70 00:00:01 GMT`
  }
}