import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

import { Text, Circle } from './'
import { FontSizes, Colors } from '../styles'

type PriceProps = {
  value: number
  isSelected?: boolean
}

const Price: React.FC<PriceProps> = ({ value, isSelected }: PriceProps) => {
  const { t } = useTranslation()

  return (
    <Circle size={65} color={isSelected ? Colors.primary : Colors.white}>
      <View style={styles.container}>
        <Text
          size={FontSizes.small}
          color={isSelected ? Colors.white : Colors.primary}
          bold
        >
          {value}
          {t('currency')}
        </Text>
      </View>
    </Circle>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
})

export default Price
