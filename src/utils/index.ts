export function jsonToFormData(params: any) {
  const fd = new FormData()
  for (let i in params) {
    fd.append(i, params[i])
  }
  return fd
}

export function formatAddress(str: string, https: boolean = false): string {
  let address = str
  const config = https ? 'https' : 'http'

  if (!address.startsWith(config)) {
    address = `${config}://${address}`
  }
  if (address.endsWith('/')) {
    address = address.substring(0, address.length - 1)
  }
  return address
}

export function arrayDistinct<T>(arr: T[], key: keyof T) {
  return arr.reduce((r: T[], i: T) => {
    if (!r.find(j => i[key] === j[key])) r.push(i)
    return r
  }, [])
}

export function arrayRemoveEmpty<T>(arr: T[], key: keyof T) {
  return arr.filter(i => i[key])
}

export const throttle = (fn: Function, delay = 2000) => {
  let timer: any = null
  return (...argv: any) => {
    if (timer) return
    timer = setTimeout(() => {
      fn.apply(fn, argv)
      timer = null
    })
  }
}

export const dataToString = (text: any) => {
  if (text === undefined || text === null) {
    return ''
  }
  return String(text)
}

export const compareArray = (arr1: any[], arr2: any[], ...keys: string[]) => {
  if (arr1.length !== arr2.length) {
    return false
  }

  if (!keys.length) {
    return jsonString(arr1) === jsonString(arr2)
  }

  return jsonString(map(sort(arr1))) === jsonString(map(sort(arr2)))

  function jsonString(arr: any[]) {
    return JSON.stringify(arr)
  }

  function sort(arr: any[]): any[] {
    keys.forEach(k => {
      arr.sort((a:any, b:any) => (a[k] - b[k]))
    })
    return arr
  }

  function map(arr:any[]): any[] {
    // [{a,b},{a,b}]
    return arr.map(i => (keys.reduce((r,k)=> (r + i[k]),'')))
  }
}

const objectToString = Object.prototype.toString;
const toTypeString = (value: any) => objectToString.call(value);
export const isPlainObject = (val: any) => toTypeString(val) === '[object Object]';
export const isArray = Array.isArray;

export function isEmpty(any: any) {
  if (typeof any === 'number') return false
  if (typeof any === 'undefined') return true
  if (any === null) return true
  if (Object.keys(any).length === 0) return true
  if (Array.isArray(any) && any.length === 0) return true
  return false
}

export function getUuid () {
  if (typeof crypto === 'object') {
    if (typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID()
    }
    if (typeof crypto.getRandomValues === 'function' && typeof Uint8Array === 'function') {
      const callback = (c:string) => {
        const num = Number(c)
        return (num ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (num / 4)))).toString(16)
      }
      return ('' + 1e7+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, callback)
    }
  }
  let timestamp = new Date().getTime()
  let perforNow = (typeof performance !== 'undefined' && performance.now && performance.now() * 1000) || 0
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let random = Math.random() * 16
    if (timestamp > 0) {
      random = (timestamp + random) % 16 | 0
      timestamp = Math.floor(timestamp / 16)
    } else {
      random = (perforNow + random) % 16 | 0
      perforNow = Math.floor(perforNow / 16)
    }
    return (c === 'x' ? random : (random & 0x3) | 0x8).toString(16)
  })
}