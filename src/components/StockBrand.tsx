import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'

import { Circle, Text } from './'
import { Stock } from '../types'

type StockBrandProps = {
  stock: Stock
  handleClick: Function
}

const StockBrand: React.FC<StockBrandProps> = ({
  stock,
  handleClick,
}: StockBrandProps) => {
  return (
    <TouchableOpacity style={{ height: '100%' }} onPress={() => handleClick(stock)}>
      <Circle>
        <View style={styles.container}>
          <Image
            source={{ uri: stock.logo }}
            style={{ height: 50, width: 50 }}
            resizeMode="contain"
          />
        </View>
      </Circle>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})

export default StockBrand
