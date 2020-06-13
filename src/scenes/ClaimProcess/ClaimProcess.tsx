import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { inject, observer } from 'mobx-react'
import { AntDesign } from '@expo/vector-icons'
import * as Aminated from 'react-native-animatable'

import giftImage from '../../../assets/gift.png'
import VerifyPhone from './VerifyPhone'
import Register from './Register'
import ClaimLogin from './ClaimLogin'
import { Text, Present, Button, StepPanel } from '../../components'
import { Gift } from '../../types'
import Root from '../../stores'
import { useTranslation } from 'react-i18next'
import { Colors, FontSizes, Spaces } from '../../styles'
import { HOME_ROUTE_NAME, MY_GIFTS_ROUTE_NAME } from '../../constants'

type ClaimProcessProps = {
  route?: any
  navigation?: any
  root?: Root
}

type ClaimProps = {
  gift: Gift
  onNext: Function
}

const ID_NOT_PROVIDED_ERROR = 'no-id-provided'
const CANT_FIND_GIFT_ERROR = 'no-gift-found'

const Claim: React.FC<ClaimProps> = ({ gift, onNext }: ClaimProps) => {
  const { t } = useTranslation()

  return (
    <View>
      <View style={styles.header}>
        <Text color={Colors.primary} size={FontSizes.larger} bolder>
          {t('youGotAGift')}
          {gift?.giverName}
        </Text>
      </View>
      <View style={styles.main}>
        <Text>{gift?.message}</Text>
        <Present gift={gift} style={styles.present} />
      </View>
      <View style={styles.footer}>
        <Button onPress={() => onNext()} style={styles.next}>
          <AntDesign
            name="gift"
            size={32}
            color={Colors.white}
            style={styles.nextIcon}
          />
          <Text>{t('getTheGift')}</Text>
        </Button>
      </View>
    </View>
  )
}

const ClaimProcess: React.FC<ClaimProcessProps> = ({
  root,
  route,
  navigation,
}: ClaimProcessProps) => {
  const { user, claim } = root as Root
  const { params } = route

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isClaimFailes, setIsClaimFailed] = useState(null)
  const [step, setStep] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    async function getGift(id) {
      try {
        await claim.fetchGift(id)

        if (!claim.gift) {
          setError(CANT_FIND_GIFT_ERROR)
        }

        setIsLoading(false)
      } catch (error) {
        setError(CANT_FIND_GIFT_ERROR)
        return
      }
    }

    const idFromUrl = params?.id

    if (!idFromUrl) {
      setError(ID_NOT_PROVIDED_ERROR)
      navigation.navigate(HOME_ROUTE_NAME)
      return
    }

    getGift(idFromUrl)
  }, [])

  const handleClaimStart = async () => {
    await claim.sendVerificationSms()
    setStep(step + 1)
  }

  const handleClaimAuthSuccess = async () => {
    if (!claim.verifyProcess.isVerificationSucced) {
      return
    }

    setStep(step + 1)
  }

  const handleFinishRegister = async () => {
    await claim.claimGift(user.data._id, claim.gift._id)

    setStep(step + 1)

    setTimeout(() => {
      navigation.navigate(MY_GIFTS_ROUTE_NAME)
    }, 3 * 1000)
  }

  return (
    <View>
      {error ? (
        <Text>{t('noSuchGift')}</Text>
      ) : isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <StepPanel show={step === 0}>
            <Claim gift={claim.gift} onNext={handleClaimStart} />
          </StepPanel>
          <StepPanel show={step === 1}>
            <Aminated.View animation="slideInRight" duration={150}>
              <VerifyPhone onNext={() => handleClaimAuthSuccess()} />
            </Aminated.View>
          </StepPanel>
          <StepPanel show={step === 2}>
            <Aminated.View animation="slideInRight" duration={150}>
              {claim.isClaimerRegistered ? (
                <ClaimLogin onNext={() => handleFinishRegister()} />
              ) : (
                <Register onNext={() => handleFinishRegister()} />
              )}
            </Aminated.View>
          </StepPanel>
          <StepPanel show={step === 3}>
            <Aminated.View animation="slideInRight" duration={150}>
              <View style={styles.finish}>
                <Text size={FontSizes.large} bold color={Colors.primary}>
                  {t(
                    claim.isClaimerRegistered
                      ? 'loginFromClaimSuccess'
                      : 'howFun'
                  )}
                </Text>
                <Text size={FontSizes.large} bold color={Colors.primary}>
                  {t('welcomeTo')}
                  {t('GiftCap')}
                </Text>
                <Image source={giftImage} style={styles.finishImage} />
                <View style={styles.footer}>
                  <Text size={FontSizes.large} bold color={Colors.primary}>
                    {t('redirectToPresent')}
                  </Text>
                </View>
              </View>
            </Aminated.View>
          </StepPanel>
        </>
      )}
    </View>
  )
}

// @todo: change to stocks number instead of money

const styles = StyleSheet.create({
  header: {
    marginVertical: Spaces.vertical * 2,
    alignItems: 'center',
  },
  present: {
    height: 300,
    width: 300,
    marginTop: Spaces.vertical * 2,
    borderWidth: 2,
  },
  main: {},
  footer: {
    marginVertical: Spaces.vertical * 2,
    alignItems: 'center',
  },
  next: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nextIcon: {
    paddingRight: Spaces.horizontal,
  },
  finish: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishImage: {
    width: 100,
    height: 100,
    marginVertical: Spaces.vertical * 5,
  },
})

export default inject('root')(observer(ClaimProcess))
