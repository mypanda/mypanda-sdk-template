export interface IConfig {
  headers?: any
  url?: any
  method?: any
  data?: any
  params?: any
  success?: any
  failed?: any
  dataType?: any
  timeout?: any
  error?: any
}

function formatParams(data: { [x: string]: string | number | boolean }) {
  let arr = []
  for (let name in data) {
    arr.push(`${encodeURIComponent(name)}=${encodeURIComponent(data[name])}`)
  }
  return arr.join('&')
}

export default function ajax(options: IConfig) {
  return new Promise((resolve, reject) => {
    options = options || {}
    options.method = (options.method || 'GET').toUpperCase()
    options.dataType = options.dataType || 'json'
    options.timeout = options.timeout || 30000

    let data = formatParams(options.data)

    let xhr: XMLHttpRequest
    if (window.ActiveXObject) {
      xhr = new ActiveXObject('Microsoft.XMLHTTP')
    } else {
      xhr = new XMLHttpRequest()
    }

    if (options.method == 'GET') {
      xhr.open('get', options.url + '?' + data, true)
      xhr.send(null)
    } else if (options.method == 'POST') {
      xhr.open('post', options.url + '?' + data, true)
      xhr.send(options.params)
    }

    const timer = setTimeout(function () {
      if (xhr.readyState !== 4) {
        xhr.abort()
      }
      clearTimeout(timer)
    }, options.timeout)

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4) {
        let status = xhr.status
        if ((status >= 200 && status < 300) || status == 304) {
          const result = {
            retCode: 0,
            msg: '',
            data: ''
          }
          try {
            const json = JSON.parse(xhr.responseText)
            resolve(json)
          } catch (error) {
            result.data = xhr.responseText
            resolve(result)
          }
        } else {
          reject({ status })
        }
      }
    }

    xhr.onerror = function () {
      reject(-1)
    }
  })
}