import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'

import colors from '../utils/colors'

type HeaderProps = {}

const Header: React.FC<HeaderProps> = ({}: HeaderProps) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Text>{t('headerTitle')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 184,
    backgroundColor: colors.primary,
  },
})

export default Header
