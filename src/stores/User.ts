import { observable, computed, autorun } from 'mobx'
import { AsyncStorage } from 'react-native'

import { Gift } from './../types'
import api from '../api'

interface ITokens {
  access: string
  refresh: string
}

interface UserData {
  _id: string
  phone: string
  name: string
}

class User {
  @observable data: UserData = {}
  @observable tokens: ITokens = {
    access: '',
    refresh: '',
  }
  @observable gifts: Gift[] = []

  load = async () => {
    const token = await AsyncStorage.getItem('giftcap/accessToken')
    const user = await AsyncStorage.getItem('giftcap/user')

    await this.setTokens(token, '')
    this.data = JSON.parse(user)
  }

  register = async (phone: string, password: string, token: string) => {
    try {
      const request = await api.register({ phone, password, token })

      if (!request) {
        throw new Error('failed to register')
      }

      const { login, user } = request

      if (!login || !login.accessToken) {
        throw new Error('no access token returned from request')
      }

      this.setTokens(login.accessToken, login.refreshToken)
      this.setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  login = async (phone: string, password: string) => {
    try {
      const request = await api.login(phone, password)

      if (!request) {
        throw new Error('failed to login')
      }
      const { user, accessToken, refreshToken } = request

      if (!user || !accessToken) {
        throw new Error('no user or access token returned from request')
      }

      this.setTokens(accessToken, refreshToken)
      this.setUser(user)
    } catch (error) {
      console.log(error)
    }
  }

  setTokens = (access: ITokens['access'], refresh: ITokens['refresh']) => {
    this.tokens.access = access
    this.tokens.refresh = refresh

    api.setAccessToken(this.tokens.access)
    this.persistTokens()
  }

  persistTokens = () => {
    AsyncStorage.setItem('giftcap/accessToken', this.tokens.access)
    AsyncStorage.setItem('giftcap/refreshToken', this.tokens.refresh)
  }

  persistUser = () => {
    AsyncStorage.setItem('giftcap/user', JSON.stringify(this.data))
  }

  setUser = (user: any) => {
    this.data = user
    this.persistUser()
  }

  getUserGifts = async () => {
    if (!this.isLoggedIn || !this.data?._id) {
      return
    }

    const gifts = await api.getUserGifts(this.data._id)

    if (!gifts || !gifts.length) {
      return
    }

    this.gifts = gifts
  }

  @computed get isLoggedIn() {
    return Boolean(this.tokens.access && this.data?._id)
  }

  @computed get giftsValue() {
    if (!this.gifts) {
      return 0
    }

    return this.gifts.reduce((acc, gift) => {
      if (!gift.items) {
        return acc
      }

      const itemsValue = gift.items.reduce(
        (itemsValueAcc, { value }) => itemsValueAcc + parseInt(value),
        0
      )
      
      return acc + itemsValue
    }, 0)
  }
}

export default User
