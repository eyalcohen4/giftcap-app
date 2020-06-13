import React, { useState, useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import Root from '../stores'
import { Text, Input, Button } from '../components'
import { Spaces, Colors, FontSizes } from '../styles'
import validatePhone from '../utils/validate-phone'
import { MY_GIFTS_ROUTE_NAME, HOME_ROUTE_NAME } from '../constants'

type LoginProps = {
  root?: Root
  navigation?: any
}

const Login: React.FC<LoginProps> = ({ root, navigation }: LoginProps) => {
  const { user, claim } = root
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [error, setError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const PASSWORD_LENGTH = 6

  const { t } = useTranslation()

  useEffect(() => {
    if (user.isLoggedIn) {
      navigation.navigate(MY_GIFTS_ROUTE_NAME)
    }
  }, [])

  const login = async () => {
    try {
      if (!password || password.length !== PASSWORD_LENGTH) {
        setError(t('passwordMissing'))
        return
      }

      if (!validatePhone(phone)) {
        setPhoneError(t('invalidPhone'))
        return
      }

      await user.login(phone, password)

      if (!user.isLoggedIn) {
        setError(t('somethingWentWrong'))
        return
      }

      navigation.navigate(HOME_ROUTE_NAME)
    } catch (error) {
      console.log(error)
      setError(t('somethingWentWrong'))
    }
  }

  const handleSetPassword = (value: string) => {
    if (value.length > PASSWORD_LENGTH) {
      return
    }

    setPassword(value)
  }

  const handleSetPhone = (phone) => {
    if (isNaN(phone)) {
      return
    }

    setPhone(phone)
  }

  return (
    <View>
      <View style={styles.header}>
        <Text
          bolder
          style={styles.title}
          color={Colors.primary}
          size={FontSizes.larger}
        >
          {t('login')}
        </Text>
      </View>
      <View style={styles.inputContainer}>
        <Input
          error={phoneError}
          keyboardType="numeric"
          placeholder={t('phone')}
          value={phone}
          onChangeText={(value) => handleSetPhone(value)}
          style={styles.input}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          secureTextEntry
          error={error}
          keyboardType="numeric"
          placeholder={t('loginPassword')}
          subtext={t('loginPasswordSubtext')}
          value={password}
          maxLength={PASSWORD_LENGTH}
          onChangeText={(value) => handleSetPassword(value)}
          style={styles.input}
        />
      </View>
      <View style={styles.footer}>
        <Button onPress={login}>
          <Text>{t('next')}</Text>
        </Button>
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
    marginTop: Spaces.vertical * 2,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    alignSelf: 'center',
    justifyContent: 'center',
    width: '80%',
  },
  input: {},
})

export default inject('root')(observer(Login))
