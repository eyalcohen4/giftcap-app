import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity, Image, View } from 'react-native'

import { Circle, Text } from './'
import { Stock } from '../types'
import { CircleSize } from './Circle'

type StockBrandProps = {
  stock: Stock,
  size?: CircleSize,
  handleClick: Function
}

const StockBrand: React.FC<StockBrandProps> = ({
  stock,
  size,
  handleClick,
}: StockBrandProps) => {
  const imageSize = size === 'small' ? 30 : 50

  return (
    <TouchableOpacity onPress={() => handleClick(stock)}>
      <Circle size={size}>
        <View style={styles.container}>
          <Image
            source={{ uri: stock.logo }}
            style={{ height: imageSize, width: imageSize }}
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

StockBrand.defaultProps = {
  size: 'big'
}

export default StockBrand
