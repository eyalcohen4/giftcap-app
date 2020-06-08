import React from 'react'
import { View, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

import { Text, Circle } from './'
import { FontSizes, Colors } from '../styles'

type PriceProps = {
  value: number
}

const Price: React.FC<PriceProps> = ({ value }: PriceProps) => {
  const { t } = useTranslation()

  return (
    <Circle size={65}>
      <View style={styles.container}>
        <Text size={FontSizes.small} style={styles.price} bold>
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
        flex: 1
    },
  price: {
    color: Colors.primary,
  },
})

export default Price
