import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

import { Colors } from '../styles'

type CircleProps = {
  size?: 'big' | 'small'
  color?: Colors
  children?: ReactNode
}

const smallSize = 50
const bigSize = 80
const sizes = {
  big: {
    width: bigSize,
    height: bigSize,
    borderRadius: bigSize / 2,
  },
  small: {
    width: smallSize,
    height: smallSize,
    borderRadius: smallSize / 2,
  },
}

const Circle: React.FC<CircleProps> = ({
  size,
  color,
  children,
}: CircleProps) => {
  const computed = StyleSheet.create({
    size: sizes[size || 'big'],
    color: { backgroundColor: color },
  })

  return <View style={[styles.circle, computed.size, computed.color]}>{children}</View>
}

Circle.defaultProps = {
  color: Colors.white,
}

const styles = StyleSheet.create({
  circle: {
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 1
  },
})

export default Circle
