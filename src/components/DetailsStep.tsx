import React, { useState } from 'react'
import { observer, inject } from 'mobx-react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useTranslation } from 'react-i18next'
import * as Animated from 'react-native-animatable'

import { Text, Input, Button, Present } from './'
import Root from '../stores'
import validatePhone from '../utils/validate-phone'
import validateEmail from '../utils/validate-email'
import { Colors, Spaces } from '../styles'

type DetailsStepProps = {
  root?: Root
  onFinish: Function
}

const ReceiverDetails = ({ onSubmit }) => {
  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({ name: '', phone: '' })

  const handleSend = () => {
    const isPhoneValid = validatePhone(phone)
    const errors = {
      name: name ? '' : t('nameIsRequired'),
      phone: phone
        ? !isPhoneValid
          ? t('invalidPhone')
          : ''
        : t('phoneIsRequired'),
    }
    setErrors(errors)

    if (errors.name || errors.phone || !isPhoneValid) {
      return
    }

    onSubmit({
      receiverName: name,
      receiverPhone: phone,
      message: message,
    })
  }

  return (
    <View style={styles.stepContainer}>
      <View style={{ marginBottom: Spaces.vertical * 2 }}>
        <Text style={{ color: Colors.primary }}>{t('reciverDetails')}</Text>
      </View>
      <Input
        style={styles.input}
        value={name}
        error={errors.name}
        onChangeText={(value) => setName(value)}
        placeholder={t('receiverName')}
      />
      <Input
        keyboardType="numeric"
        error={errors.phone}
        style={styles.input}
        value={phone}
        onChangeText={(value) => setPhone(value)}
        placeholder={t('phone')}
        subtext={t('phoneInputSubtext')}
      />
      <Input
        style={[styles.input, { height: 150, textAlignVertical: 'top' }]}
        numberOfLines={10}
        multiline
        value={message}
        onChangeText={(value) => setMessage(value)}
        placeholder={t('messageOptional')}
      />
      <Button
        small
        style={{ marginTop: Spaces.vertical * 5 }}
        onPress={handleSend}
      >
        <Text>{t('next')}</Text>
      </Button>
    </View>
  )
}

const GiverDetails = ({ onSubmit }) => {
  const { t } = useTranslation()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '' })

  const handleSend = () => {
    const isEmailValid = validateEmail(email)
    console.log(isEmailValid)
    const errors = {
      name: name ? '' : t('nameIsRequired'),
      email: email
        ? !isEmailValid
          ? t('invalidEmail')
          : ''
        : t('emailIsRequired'),
    }
    setErrors(errors)

    if (errors.name || errors.email || !isEmailValid) {
      return
    }

    onSubmit({
      giverName: name,
      giverEmail: email,
    })
  }

  return (
    <Animated.View
      style={styles.stepContainer}
      animation="slideInRight"
      duration={200}
    >
      <View style={{ marginBottom: Spaces.vertical * 2 }}>
        <Text style={{ color: Colors.primary }}>{t('giverDetails')}</Text>
      </View>
      <Input
        style={styles.input}
        value={name}
        error={errors.name}
        onChangeText={(value) => setName(value)}
        placeholder={t('giverName')}
      />
      <Input
        error={errors.email}
        style={styles.input}
        value={email}
        onChangeText={(value) => setEmail(value)}
        placeholder={t('giverEmail')}
        subtext={t('emailInputSubtext')}
      />
      <Button
        style={{ marginTop: Spaces.vertical * 5 }}
        small
        onPress={handleSend}
      >
        <Text>{t('next')}</Text>
      </Button>
    </Animated.View>
  )
}

const PaymentDetails = ({ gift, onSubmit }) => {
  const { t } = useTranslation()

  const [creditNumber, setCreditNumber] = useState('')
  const [date, setMonth] = useState('')
  const [year, setYear] = useState('')
  const [personId, setPersonId] = useState('')
  const [errors, setErrors] = useState({ name: '', email: '' })

  const handleSend = () => {
    onSubmit()
  }

  return (
    <Animated.View
      style={styles.stepContainer}
      animation="slideInRight"
      duration={200}
    >
      <View style={{ marginBottom: Spaces.vertical * 2 }}>
        <Text style={{ color: Colors.primary }}>{t('payment')}</Text>
      </View>
      <Input
        style={styles.input}
        value={creditNumber}
        error={errors.name}
        onChangeText={(value) => setCreditNumber(value)}
        keyboardType="numeric"
        placeholder={t('creditCardNum')}
      />
      <View style={{ flexDirection: 'row' }}>
        <View style={[styles.date, { marginRight: Spaces.horizontal / 2 }]}>
          <Input
            error={errors.email}
            style={styles.input}
            value={date}
            maxLength={2}
            onChangeText={(value) => setMonth(value)}
            placeholder={t('month')}
            keyboardType="numeric"
          />
          </View>
          <View style={[styles.date]}>
          <Input
            error={errors.email}
            style={[styles.input]}
            value={year}
            maxLength={2}
            onChangeText={(value) => setYear(value)}
            placeholder={t('year')}
            keyboardType="numeric"
          />
          </View>
      </View>
      <Input
        style={styles.input}
        value={personId}
        error={errors.name}
        onChangeText={(value) => setPersonId(value)}
        keyboardType="numeric"
        placeholder={t('personId')}
      />
      <Button
        style={{ marginTop: Spaces.vertical * 5 }}
        small
        onPress={handleSend}
      >
        <Text>{t('sendGift')}</Text>
      </Button>
      <Present light style={styles.present} gift={gift} />
    </Animated.View>
  )
}

const DetailsStep: React.FC<DetailsStepProps> = ({
  root,
  onFinish,
}: DetailsStepProps) => {
  const { buyer } = root as Root
  const { t } = useTranslation()
  const steps = [
    {
      component: ReceiverDetails,
      name: 'receiver',
    },
    {
      component: GiverDetails,
      name: 'giver',
    },
    {
      component: PaymentDetails,
      name: 'payment',
    },
  ]
  const [step, setStep] = useState(0)

  const Comp = steps[step].component

  const handleNext = async (data) => {
    if (steps[step].name === 'receiver') {
      buyer.gift.receiverName = data.receiverName
      buyer.gift.receiverPhone = data.receiverPhone
      buyer.gift.message = data.message
    }

    if (steps[step].name === 'giver') {
      buyer.gift.giverEmail = data.giverEmail
      buyer.gift.giverName = data.giverName
    }

    if (steps[step].name === 'payment') {
      await buyer.buy()
      onFinish()
    }

    if (steps[step + 1]) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step === 0) {
      buyer.previous()
    }

    setStep(step - 1)
  }

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Comp onSubmit={handleNext} gift={buyer.gift} />
        <TouchableOpacity onPress={handleBack}>
          <Text style={styles.back}>{t('back')}</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepContainer: {
    width: '80%',
    alignItems: 'center',
  },
  input: {},
  back: {
    marginTop: Spaces.vertical * 2,
    color: Colors.primary,
  },
  present: {
    height: 180,
    width: 250,
    marginTop: Spaces.vertical * 2,
    borderWidth: 2,
  },
  date: { 
    width: '50%',
  }
})

export default inject('root')(observer(DetailsStep))
