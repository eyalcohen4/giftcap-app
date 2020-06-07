import React from 'react'
import { useFonts } from '@use-expo/font'
import { Text as DefaultText, View } from 'react-native'
import { AppLoading } from 'expo'

type Text = {
  children: React.ReactNode,
  size: FontSizes
}

const Text: React.FC<Text> = ({
  children,
  size
}: Text) => {
  return (
    <DefaultText style={{ fontFamily: 'Varela', fontSize: size }}>{children}</DefaultText>
  )
}

Text.defaultProps = {
    size: FontSizes.regular
}

export default Text
