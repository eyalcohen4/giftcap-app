import axios from 'axios'

import { Gift } from './types'
class Api {
  accessToken: string = null

  setAccessToken = (token: string) => {
    this.accessToken = token
  }

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
    const base = 'http://localhost:5000'
    const fullUrl = `${base}/${url}`

    const headersWithKey = {
      ...headers,
      'x-api-key': 'bfAD%dnJUgVn.f5N',
      Authorization: this.accessToken ? `Bearer ${this.accessToken}` : '',
    }

    return axios({
      url: fullUrl,
      data,
      method,
      headers: headersWithKey,
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
      } else {
        console.log(error)
        // Something happened in setting up the request that triggered an Error
        throw new Error(error.message)
      }
    })
  }

  async getStocks() {
    const request = await this.sendRequest('GET', 'stocks')
    return request?.data?.stocks
  }

  async getCategories() {
    const request = await this.sendRequest('GET', 'categories')
    return request?.data?.categories
  }

  async getGift(id: string) {
    const request = await this.sendRequest('GET', `gifts/${id}`)
    return request?.data
  }

  async createGift(gift: Gift) {
    const request = await this.sendRequest('POST', 'gifts', {
      ...gift,
    })

    return request?.data?.gift
  }

  async verifyPhone(giftId: string) {
    const request = await this.sendRequest('POST', 'auth/verifyPhone', {
      giftId,
    })

    return request?.data?.token
  }

  async register(params: { phone: string; password: string; token: string }) {
    const request = await this.sendRequest('POST', 'auth/register', {
      user: {
        phone: params.phone,
        password: params.password,
      },
      token: params.token,
    })

    return request?.data
  }

  async verifyPin(giftId: string, token: string, pin: string) {
    const request = await this.sendRequest('POST', 'auth/verifyPin', {
      giftId,
      token,
      pin,
    })

    return request?.data?.success
  }

  async claimGift(userId: string, giftId: string) {
    if (!this.accessToken) {
      throw new Error('cant claim gift without access token')
    }

    const request = await this.sendRequest('POST', `gifts/${giftId}/claim`, {
      userId,
    })

    return request?.data
  }

  async login(phone: string, password: string) {
    const request = await this.sendRequest('POST', `auth/login`, {
      user: {
        phone,
        password,
      },
    })

    return request?.data
  }

  getUserGifts = async (id: string) => {
    const request = await this.sendRequest('GET', `users/${id}/gifts`)

    return request?.data?.gifts
  }
}

export default new Api()
