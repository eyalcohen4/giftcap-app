import { observable } from 'mobx'

import api from '../api'
import { Gift } from './../types'

class Claim {
  @observable gift: Gift = null
  @observable verifyProcess = {
    isSmsSent: false,
    verifyToken: null,
    isVerificationSucced: false,
    isSentFirstTime: false,
  }
  @observable isClaimerRegistered = false

  async fetchGift(id: string) {
    const { gift, hasUser } = await api.getGift(id)

    this.gift = gift
    this.isClaimerRegistered = hasUser
  }

  async sendVerificationSms() {
    try {
      const token = await api.verifyPhone(this.gift._id)
      this.verifyProcess.verifyToken = token
    } catch (error) {
      console.log(error)
    }
  }

  async verifyPin(pin: string) {
    try {
      if (!this.verifyProcess.verifyToken) {
        throw new Error('try to verify without a token ')
      }

      const isSuccess = await api.verifyPin(
        this.gift._id,
        this.verifyProcess.verifyToken,
        pin
      )

      if (!this.verifyProcess.isSentFirstTime) {
        this.verifyProcess.isSentFirstTime = true
      }

      this.verifyProcess.isVerificationSucced = isSuccess
      return this.verifyProcess.isVerificationSucced
    } catch (error) {
      console.log(error)
    }
  }

  async claimGift(userId: string, giftId: string) {
    try {
      await api.claimGift(userId, giftId)
    } catch (error) {
      console.log(error)
    }
  }
}

export default Claim
