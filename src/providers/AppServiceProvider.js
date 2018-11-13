/* eslint constructor-super: "error" */
/* eslint-env es6 */
import ServiceProvider from './ServiceProvider'
import MpAuthService from '../services/mp/AuthService'
import HttpAuthService from '../services/http/AuthService'
import ShoppingCartService from '../services/http/ShoppingCartService'
import SessionService from '../services/cache/SessionService'
import Base64Service from '../services/encrypt/Base64Service'
import MD5Service from '../services/encrypt/MD5Service'
import JsonService from '../services/encrypt/JsonService'
import HrefService from '../services/mp/HrefService'
import ScanCodeService from '../services/mp/ScanCodeService'
import MyStoreScanCodeService from '../services/http/MyStoreScanCodeService'
import PopupService from '../services/mp/PopupService'
import TencentMapService from '../services/mp/TencentMapService'
import StorageService from '../services/mp/StorageService'
export default class AppServiceProvider extends ServiceProvider {
  constructor (app) {
    super(app)
    Date.prototype.format = function (format) {
      let o = {
        'M+': this.getMonth() + 1, // month
        'd+': this.getDate(), // day
        'h+': this.getHours(), // hour
        'm+': this.getMinutes(), // minute
        's+': this.getSeconds(), // second
        'q+': Math.floor((this.getMonth() + 3) / 3), // quarter
        'S': this.getMilliseconds() // millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
        }
      }
      return format
    }

    String.prototype.trim = function (char, type) {
      if (char) {
        if (type === 'left') {
          return this.replace(new RegExp('^\\' + char + '+', 'g'), '')
        } else if (type === 'right') {
          return this.replace(new RegExp('\\' + char + '+$', 'g'), '')
        }
        return this.replace(new RegExp('^\\' + char + '+|\\' + char + '+$', 'g'), '')
      }
      return this.replace(/^\s+|\s+$/g, '')
    }
  }
  register () {
    this.app.register('base64', Base64Service)
    this.app.register('md5', MD5Service)
    this.app.register('json', JsonService)
    this.app.register('mp.auth', MpAuthService)
    this.app.register('http.auth', HttpAuthService)
    this.app.register('http.shoppingCart', ShoppingCartService)
    this.app.register('session', SessionService)
    this.app.register('href', HrefService)
    this.app.register('scan', ScanCodeService)
    this.app.register('scanCodeService', MyStoreScanCodeService)
    this.app.register('popup', PopupService)
    this.app.register('map', TencentMapService)
    this.app.register('mp.storage', StorageService)
  }
  boot () {

  }
}
