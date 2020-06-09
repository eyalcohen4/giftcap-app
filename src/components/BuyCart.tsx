import React from 'react'
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { inject, observer } from 'mobx-react'
import Root from '../stores'

import { Button, StockBrand, Text } from './'
import { Colors, FontSizes, Spaces } from '../styles'
import { useTranslation } from 'react-i18next'

type BuyCartProps = {
  root?: Root,
  onPressNext: Function
}

const BuyCart: React.FC<BuyCartProps> = ({ root, onPressNext }: BuyCartProps) => {
  const { t } = useTranslation()
  const { buyer, stocks, ui } = root as Root

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.items}
        horizontal={true}
        contentContainerStyle={{ backgroundColor: 'transparent' }}
      >
        {buyer.gift.items?.map((item) => (
          <View key={item.symbol} style={styles.item}>
            <TouchableOpacity style={styles.removeItem} onPress={() => buyer.removeGiftItem(item)}>
              <MaterialIcons
                name="remove-circle-outline"
                size={28}
              />
            </TouchableOpacity>
            <StockBrand
              stock={stocks.getStockBySymbol(item.symbol)}
              size="small"
              handleClick={() => {}}
            />
            <Text size={FontSizes.smaller} style={styles.price}>
              {item.value}
              {t('currency')}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.next}>
        <Button onPress={onPressNext}>
          <Text>{t('next')}</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: Spaces.vertical * 2,
  },
  items: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  item: {
    position: 'relative',
    padding: Spaces.vertical,
    alignItems: 'center',
    zIndex: 1,
  },
  removeItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  price: {
    color: Colors.primary,
  },
  next: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

export default inject('root')(observer(BuyCart))
