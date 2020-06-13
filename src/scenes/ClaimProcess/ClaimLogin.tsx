import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import Root from '../../stores'
import { Text, Input, Button } from '../../components'
import { Spaces, Colors, FontSizes } from '../../styles'

type LoginProps = {
  root?: Root
  onNext: Function
}

const Login: React.FC<LoginProps> = ({ root, onNext }: LoginProps) => {
  const { user, claim } = root
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const PASSWORD_LENGTH = 6

  const { t } = useTranslation()

  const handleVerify = async () => {
    try {
      if (!password || password.length !== PASSWORD_LENGTH) {
        setError(t('passwordMissing'))
        return
      }

      await user.login(claim.gift.receiverPhone, password)

      if (!user.isLoggedIn) {
        setError(t('somethingWentWrong'))
        return
      }

      onNext()
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
        <Text
          style={styles.title}
          color={Colors.primary}
          size={FontSizes.small}
        >
          {t('noticedYouHaveUser')}
        </Text>
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
        <Button onPress={handleVerify}>
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
