import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import Root from '../../stores'
import useInterval from '../../hooks/use-interval'
import { Text, Input, Button } from '../../components'
import { Spaces, Colors, FontSizes } from '../../styles'
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'

type VerifyPhoneProps = {
  root?: Root
  onNext: Function
}

const VerifyPhone: React.FC<VerifyPhoneProps> = ({
  root,
  onNext,
}: VerifyPhoneProps) => {
  const SECOND = 1000
  const MINUTE = 30 * SECOND

  const { claim } = root
  const [smsCode, setSmsCode] = useState('')
  const [timer, setTimer] = useState(MINUTE)
  const [error, setError] = useState('')

  const { t } = useTranslation()

  useInterval(() => {
    if (timer > 0) {
      setTimer(timer - SECOND)
    }
  }, SECOND)

  const handleVerify = async () => {
    try {
      if (!smsCode || smsCode.length !== 4) {
        setError(t('smsCodeMissing'))
        return
      }

      const isSuccess = await claim.verifyPin(smsCode)

      if (!isSuccess) {
        setError(t('wrongPin'))
        return
      }

      onNext()
    } catch (error) {
      setError(t('somethingWentWrong'))
    }
  }

  const handleResend = () => {
    if (timer === 0) {
      claim.sendVerificationSms()
    }
  }

  return (
    <View>
      <View style={styles.header}>
        <Text
          style={styles.title}
          color={Colors.primary}
          size={FontSizes.larger}
        >
          {t('weMakeSureItsYou')}
        </Text>
        <Text style={styles.title} color={Colors.primary} bold>
          {t('weSentYouAnSMSCode')}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          error={error}
          keyboardType="numeric"
          placeholder={t('smsCode')}
          value={smsCode}
          onChangeText={(value) => setSmsCode(value)}
          style={styles.input}
        />
      </View>
      <View style={styles.footer}>
        <Button onPress={handleVerify}>
          <Text>{t('next')}</Text>
        </Button>
        <TouchableWithoutFeedback
          onPress={() => handleResend()}
          style={styles.resend}
        >
          <Text
            size={FontSizes.smaller}
            color={timer === 0 ? Colors.primary : Colors.primaryDark}
            bold
          >
            {t('resendVerifyPhone')} {timer > 0 ? `(${timer / SECOND})` : ''}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginVertical: Spaces.vertical * 2,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: Spaces.vertical,
  },
  footer: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  input: {},
  resend: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: Spaces.vertical * 3,
  },
})

export default inject('root')(observer(VerifyPhone))
