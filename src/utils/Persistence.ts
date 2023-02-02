import { getCookie, setCookie } from "./Cookie"
import { getUuid } from "./index"

function parse(data: string | null | undefined) {
  if (!data) return null
  try {
    return JSON.parse(data)
  } catch (e) {
    return null
  }
}

function compare(a: any, b: any, key: string) {
  if (!key) {
    if (a > b) return a
    return b
  }
  if (a[key] > b[key]) return a
  return b
}

export class Persistence {
  public pre: string = 'persistence-'
  public key: string = ''
  public timeout: number = 3650

  constructor(key: string) {
    this.key = key
  }

  private write(data: string) {
    const key = this.pre + this.key

    const result: any = { date: +new Date(), data }
    const resultStr = JSON.stringify(result)

    sessionStorage.setItem(key, resultStr)
    localStorage.setItem(key, resultStr)
    setCookie(key, resultStr, this.timeout)

    return result
  }
  public read() {
    const key = this.pre + this.key
    let result: any = null

    let sKValue = parse(sessionStorage.getItem(key))
    let lKValue = parse(localStorage.getItem(key))
    let cKValue = parse(getCookie(key))

    if (sKValue && lKValue && cKValue) {
      result = compare(sKValue, lKValue, 'date')
      result = compare(result, cKValue, 'date')
    } else if (sKValue && lKValue && !cKValue) {
      result = compare(sKValue, lKValue, 'date')
    } else if (sKValue && !lKValue && cKValue) {
      result = compare(sKValue, cKValue, 'date')
    } else if (!sKValue && lKValue && cKValue) {
      result = compare(lKValue, cKValue, 'date')
    } else if (sKValue && !lKValue && !cKValue) {
      result = sKValue
    } else if (!sKValue && lKValue && !cKValue) {
      result = lKValue
    } else if (!sKValue && !lKValue && cKValue) {
      result = cKValue
    }

    return this.write(result ? result.data : getUuid())
  }
}