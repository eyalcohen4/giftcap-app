import React from 'react'
import { Text as DefaultText, View } from 'react-native'
import { Colors, FontSizes } from '../styles'

type Text = {
  children: React.ReactNode
  size?: FontSizes
  style?: any
  bold?: boolean
}

const Text: React.FC<Text> = ({ children, size, style, bold }: Text) => {
  return (
    <DefaultText
      style={{
        fontFamily: bold ? 'RubikBold' : 'rubik',
        fontSize: size,
        color: Colors.white,
        textAlign: 'right',
        ...style,
      }}
    >
      {children}
    </DefaultText>
  )
}

Text.defaultProps = {
  size: FontSizes.regular,
}

export default Text
