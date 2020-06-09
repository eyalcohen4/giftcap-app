import React, { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../styles'

type ButtonProps = {
  children: ReactNode
  onPress: Function
  small?: boolean
  style?: any
}

const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  small,
  style,
}: ButtonProps) => {
  const sizes = {
    small: { height: 35, width: 150 },
    big: {
      width: 240,
      height: 44,
    },
  }

  const size = small ? sizes.small : sizes.big

  return (
    <TouchableOpacity
      style={[styles.container, { ...size }, style]}
      onPress={onPress}
    >
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
})

Button.defaultProps = {
  size: 'big',
}

export default Button
