import React from 'react'
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native'
import { Text } from './'
import { Colors, Spaces, FontSizes } from '../styles'

type InputProps = TextInputProps & {
  symbol?: string,
  error?: string,
  style?: any
}

const Input: React.FC<InputProps> = ({ symbol, error, style, ...rest }: InputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.input, { borderColor: error ? Colors.error : Colors.primary, fontWeight: 'bold' }, style]}
        placeholderTextColor={Colors.primary}
        {...rest}
      />
      {symbol ? <Text size={FontSizes.small} bold style={styles.text}>{symbol}</Text> : null}
      <Text size={FontSizes.small} style={styles.error}>{error || ""}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  input: {
    height: 40,
    width: 220,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: Spaces.horizontal,
    textAlign: 'right',
    color: Colors.primary,
  },
  text: {
    position: 'absolute',
    right: 0,
    top: 5,
    color: Colors.primary
  },
  error: {
    marginTop: Spaces.vertical / 2,
    color: Colors.error,
    textAlign: 'center'
  }
})

export default Input
