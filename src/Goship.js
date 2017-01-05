'use strict'
import axios from 'axios'
import ValidateShipment from './Validates/ValidateShipment'
import ValidateAuth from './Validates/ValidateAuth'
import ValidateRate from './Validates/ValidateRate'
/**
 * define default option for class
 * @type {json}
 */
var defaultOptions = {
  username: null,
  password: null,
  client_id: null,
  client_secret: null,
  access_token: null,
  workspace: 'production',
  version: 'v1',
  proxy: {}
}
/**
 * check valid attr default option
 * @param  {function} attr
 * @return {boolean}
 */
var isValidOption = (attr) => {
  return defaultOptions.hasOwnProperty(attr)
}
/**
 *
 */
class Goship {
  constructor (options) {
    this.options = {
      access_token: null
    }
    this.auth = {}
    if (typeof options !== 'undefined') {
      this.setUp(options)
    }
  }
  /**
   * getup class
   * @param {json} options
   */
  setUp (options) {
    let _opts = {}
    let auth = {
      username: null,
      password: null,
      client_id: null,
      client_secret: null,
    }
    for (const key of Object.keys(options)) {
      if (isValidOption(key) && !auth.hasOwnProperty(key)) {
        _opts[key] = options[key]
      }
      if (auth.hasOwnProperty(key)) {
        this.auth[key] = options[key]
      }
    }

    let opts = Object.assign(defaultOptions, _opts)
    for (const key of Object.keys(opts)) {
      this[key] = opts[key]
    }
  }
  /**
   * generate token
   * @param  {string} token
   * @return {string}       token
   */
  generateToken (token) {
    return 'Bearer ' + token
  }
  /**
   * config request for axios
   * @param  {json} configs
   * @return {json}         axios config
   */
  configRequest (configs) {
    let defaultConfig = {
      headers: {Accept: 'application/json'},
      params: {},
      timeout: 1000,
      proxy: this.proxy
    }

    if (this.workspace === 'sandbox') {
      defaultConfig.baseURL = `https://sandbox.goship.io/api/ext_${this.version}/`
    } else if (this.workspace === 'dev') {
      defaultConfig.baseURL = `http://goship.dev/api/ext_${this.version}/`
    } else {
      defaultConfig.baseURL = `https://api.goship.io/api/ext_${this.version}/`
    }

    return Object.assign(defaultConfig, configs)
  }
  /**
   * get login url
   * @return {string} login url
   */
  generateLoginUrl () {
    if (this.workspace === 'sandbox') {
      return `https://sandbox.goship.io/api/${this.version}/login`
    } else if (this.workspace === 'dev') {
      return `http://goship.dev/api/${this.version}/login`
    } else {
      return `https://api.goship.io/api/${this.version}/login`
    }
  }
  /**
   * excute http request
   * @param  {string} endPoint url
   * @param  {string} method   ['GET', 'POST', 'DELETE', 'PUT']
   * @param  {json} data
   * @param  {json} options
   * @return {promise}
   */
  api(endPoint, method, data, options) {
    if (typeof method === 'undefined') {
      method = 'GET'
    }
    if (typeof options === 'undefined') {
      options = {}
    }
    let _defaultHeader = {
      Accept: 'application/json',
      Authorization: this.generateToken(this.access_token)
    }
    let configs = {
      url: endPoint,
      method: method,
      headers: Object.assign({}, typeof options.headers === 'undefined' ? _defaultHeader : Object.assign({Accept: 'application/json'}, options.headers)),
      params: Object.assign({}, typeof options.params === 'undefined' ? {} : options.params)
    }
    if (typeof data !== 'undefined' ) {
      configs.data = data
    }
    return axios(this.configRequest(configs))
  }
  /**
   * get token
   * @return {promise}
   */
  getToken () {
    if (ValidateAuth.valid(this.auth)) {
      return this.api(this.generateLoginUrl(), 'POST', this.auth, {params: {id: 1}})
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.response.data
      })
    }
  }
  /**
   * get rates
   * @param  {json} params
   * @return {promise}
   */
  getRates (params) {
    if (ValidateRate.valid(params)) {
      return this.api('shipment/rates', 'POST', {shipment: params})
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.response.data
      })
    }
  }
  /**
   * create shipment
   * @param  {json} shipment
   * @return {promise}
   */
  createShipment (shipment) {
    if (ValidateShipment.valid(shipment)) {
      if (!this.options.access_token) {
        return this.getToken().then(response => {
          if (response.code === 200) {
            this.access_token = response.access_token
            return this._sendCreateShipmentResquest({shipment: shipment})
          } else {
            return {message: 'Authentication fail'}
          }
          return response
        })
      } else {
        return this._sendCreateShipmentResquest({shipment: shipment})
      }
    }
  }
  /**
   * get detail shipment
   * @param  {string} id shipment code
   * @return {promise}
   */
  detailShipment (id) {
    if (!this.options.access_token) {
      return this.getToken().then(response => {
        this.access_token = response.access_token
        if (response.code === 200) {
          return this._sendDetailShipmentResquest(id)
        } else {
          return {message: 'Authentication fail'}
        }
        return response
      })
    } else {
      return this._sendDetailShipmentResquest(id)
    }
  }
  /**
   * track shipment
   * @param  {string} id shipment code
   * @return {promise}
   */
  trackShipment (id) {
    if (!this.options.access_token) {
      return this.getToken().then(response => {
        this.access_token = response.access_token
        if (response.code === 200) {
          return this._sendTrackShipmentResquest(id)
        } else {
          return {message: 'Authentication fail'}
        }
        return response
      })
    } else {
      return this._sendTrackShipmentResquest(id)
    }
  }
  /**
   * send create shipment request
   * @param  {json} data
   * @return {promise}
   */
  _sendCreateShipmentResquest (data) {
    return this.api('shipment/create', 'POST', data)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.response.data
      })
  }
  /**
   * excute detail shipment request
   * @param  {string} id shipment code
   * @return {promise}
   */
  _sendDetailShipmentResquest (id) {
    return this.api(`shipment/info/${id}`)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.response.data
      })
  }
  /**
   * excute track shipment request
   * @param  {string} shipment code
   * @return {promise}
   */
  _sendTrackShipmentResquest (id) {
    return this.api(`shipment/track/${id}`)
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        return error.response.data
      })
  }
}

export default Goship
