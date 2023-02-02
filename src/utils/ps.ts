import AES from 'crypto-js/aes'
import Pkcs7 from 'crypto-js/pad-pkcs7'
import ECB from 'crypto-js/mode-ecb'
import Utf8 from 'crypto-js/enc-utf8'
import Hex from 'crypto-js/enc-hex'
import MD5 from 'crypto-js/md5'

const options = {
  mode: ECB,
  padding: Pkcs7
}

export function encode(text:string, key = md5('BR4aFw6rKdNy8CCy')) {
  console.log('text', text)
  return AES.encrypt(Utf8.parse(text), Utf8.parse(key), options).toString()
}

export function decode(text:string, key = md5('BR4aFw6rKdNy8CCy')) {
  return AES.decrypt(text, Utf8.parse(key), options).toString(Utf8)
}

export function md5(text:string) {
  return MD5(text).toString(Hex)
}

export function randomString(len:number) {
  len = len || 32
  const chars = 'ABCDEFGHJKLMNOPQRSTWXYZabcdefhijkmnprstwxyz12345678' /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
  const maxPos = chars.length
  let ret = ''
  for (let i = 0; i < len; i++) {
    ret += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return ret
}

export function arraySignSort (arr: any[]){
  for (let i = 0; i < arr.length; i++){
    for (let j = 0; j < arr.length - 1; j++){
      if (('' + arr[j]) > ('' + arr[j + 1])){
        const t = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = t
      }
    }
  }
}
