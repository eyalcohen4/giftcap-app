import React from 'react'
import { Text as DefaultText, StyleSheet } from 'react-native'
import { Colors, FontSizes } from '../styles'

type Text = {
  children: React.ReactNode
  size?: FontSizes
  style?: any
  bold?: boolean
  bolder?: boolean
  font?: string,
  color?: Colors
}

const Text: React.FC<Text> = ({
  children,
  size,
  color,
  style,
  font,
  bold,
  bolder,
}: Text) => {
  const styles = StyleSheet.create({
    text: {
      fontFamily: font || bold ? 'AssistantBold' : bolder ? 'AssistantExtraBold' : 'Assistant',
      fontSize: size,
      color,
    },
  })

  return <DefaultText style={[styles.text, style]}>{children}</DefaultText>
}

Text.defaultProps = {
  size: FontSizes.regular,
  color: Colors.white,
}

export default Text
