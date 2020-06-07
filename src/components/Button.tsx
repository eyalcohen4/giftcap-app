import React, { ReactNode } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../styles'
import { Text } from './'

type ButtonProps = {
  children: ReactNode,
  onPress: Function
  style?: any
}

const Button: React.FC<ButtonProps> = ({ children, onPress, style }: ButtonProps) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    width: 240,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15
  },
})

export default Button
