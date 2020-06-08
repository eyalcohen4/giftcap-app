import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'

import { Colors } from '../styles'

export type CircleSize = 'big' | 'small' | number

type CircleProps = {
  size?: CircleSize
  color?: Colors
  children?: ReactNode
}

function createSize(size: string | number) {
  const sizes = {
    small: 50,
    big: 80,
  }

  if (typeof size === 'string') {
    return {
      width: sizes[size],
      height: sizes[size],
      borderRadius: sizes[size] / 2,
    }
  }

  return {
    width: size,
    height: size,
    borderRadius: size / 2,
  }
}

const Circle: React.FC<CircleProps> = ({
  size,
  color,
  children,
}: CircleProps) => {
  const circleSize = createSize(size)
  const computed = StyleSheet.create({
    size: circleSize,
    color: { backgroundColor: color },
  })

  return (
    <View style={[styles.circle, computed.size, computed.color]}>
      {children}
    </View>
  )
}

Circle.defaultProps = {
  color: Colors.white,
  size: 'big'
}

const styles = StyleSheet.create({
  circle: {
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
    elevation: 1,
  },
})

export default Circle
