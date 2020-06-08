import React, { useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

import { Text, Button, StockBrand, Price, Input } from './'
import { Stock } from '../types'
import { Colors, Spaces, FontSizes } from '../styles'
import { TouchableHighlight } from 'react-native-gesture-handler'

type AddStockProps = {
  stock: Stock
  handleAdd: Function
}

const AddStock: React.FC<AddStockProps> = ({
  stock,
  handleAdd,
}: AddStockProps) => {
  const [value, setValue] = useState()
  const [error, setError] = useState('')
  const { t } = useTranslation()

  const defaultValues = [100, 300, 500]

  const handleValueChange = (value) => {
    console.log(value)
    setValue(value)
  }

  const handleAddPress = () => {
    if (!value) {
      setError(t('addStockNoValueError'))
      return
    }

    handleAdd({ symbol: stock.symbol, value })
  }

  return (
    <View style={styles.container}>
      <View style={styles.brand}>
        <StockBrand stock={stock} handleClick={() => {}} />
        <Text bold style={styles.name}>
          {stock.name}
        </Text>
      </View>
      <View style={styles.value}>
        <Text size={FontSizes.larger} style={styles.cta}>
          {t('addStockPrice')}
        </Text>
        <View style={styles.prices}>
          {defaultValues.map((value) => (
            <TouchableOpacity
              key={value}
              style={styles.price}
              onPress={() => handleValueChange(`${value}`)}
            >
              <Price value={value} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.input}>
          <Input
            value={value}
            onChangeText={handleValueChange}
            placeholder={t('sum')}
            symbol={t('currency')}
            error={error}
          />
        </View>
      </View>
      <View style={styles.footer}>
        <Button onPress={() => handleAddPress()}>{t('addToGift')}</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  name: {
    color: Colors.black,
    marginTop: Spaces.vertical,
  },
  cta: {
    color: Colors.primary,
  },
  brand: {
    height: 100,
    alignItems: 'center',
  },
  value: {
    marginTop: Spaces.vertical * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  prices: {
    flexDirection: 'row',
    marginTop: Spaces.vertical,
  },
  price: {
    paddingHorizontal: Spaces.horizontal,
  },
  input: {
    marginTop: Spaces.vertical * 2,
  },
  footer: {
    marginTop: Spaces.vertical * 2,
    alignItems: 'center',
  },
})

export default observer(AddStock)
