import axios from 'axios'

import { Gift } from './types';
class Api {
  /**
   * send response to myplay node api.
   * @param {string} method - HTTP Verb, one of: 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'.
   * @param {string} url - endpoint
   * @param {Object} data
   * @param {Object} headers
   * @param {Boolean} originalURL - Should send the original URL
   *
   * @return {Promise} axios response object
   */
  async sendRequest(
    method: 'GET' | 'POST' | 'PATCH' | 'PUT',
    url: string,
    data?: any,
    headers?: any
  ) {
    const base = 'http://9d9925a3e077.ngrok.io'
    const fullUrl = `${base}/${url}`

    return axios({
      url: fullUrl,
      data,
      method,
      headers,
    }).catch((error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data);
        // console.log(error.response.status);
        // console.log(error.response.headers);

        // @TODO Chain this error to function level handling */

        return error.response
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request)
        throw new Error(error)
      } else {
        console.log(error)
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message)
      }
    })
  }

  async getStocks() {
    const request = await this.sendRequest('GET', 'stocks')
    return request.data.stocks
  }

  async getCategories() {
    const request = await this.sendRequest('GET', 'categories')
    return request.data.categories
  }

  async createGift(gift: Gift) {
    const request = await this.sendRequest('POST', 'gifts', {
      ...gift
    })

    return request.data.gift
  }
}

export default new Api()
