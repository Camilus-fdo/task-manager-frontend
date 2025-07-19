/* eslint-disable padding-line-between-statements */
import config from '../../configs/app'
import axios from 'axios'
/**
 * Base API Class that can be use to connect the apis
 */
export default class BaseAPI {
    /**
     * base url
     * @type {string}
     * @private
     */
    _baseURL = ''

    _headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }

    _config = {
      'headers': this._headers
    }

    constructor () {
      this._baseURL = config.apiUrl

    }

    _getPath (pathArr) {
      return pathArr.join('/')
    }

    post (payload, pathArr) {
      const url = this._baseURL
      return axios.post(url + this._getPath(pathArr), payload, this._config)
    }

    get (pathArr, params = {}) {
      const url = this._baseURL
      return axios.get(url + this._getPath(pathArr), { ...this._config, params })
    }

    delete (pathArr) {
      const url = this._baseURL
      return axios.delete(url + this._getPath(pathArr), this._config)
    }

    put(payload, pathArr) {
      const url = this._baseURL
      return axios.put(url + this._getPath(pathArr), payload, this._config)
    }
}
