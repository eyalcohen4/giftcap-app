import React from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  Platform,
} from 'react-native'
import { Text } from './'
import { Colors, Spaces, FontSizes } from '../styles'

type InputProps = TextInputProps & {
  symbol?: string
  error?: string
  style?: any,
  containerStyle?: any
  fill?: boolean
  subtext?: string
}

const Input: React.FC<InputProps> = ({
  symbol,
  error,
  fill,
  style,
  containerStyle,
  subtext,
  ...rest
}: InputProps) => {
  const textColor = fill ? Colors.white : Colors.primary
  const placeholderColor = fill ? Colors.white : Colors.primaryDark

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: error ? Colors.error : Colors.primary,
              backgroundColor: fill ? Colors.primary : 'transparent',
              color: textColor,
              fontWeight: 'bold',
            },
            style,
          ]}
          placeholderTextColor={placeholderColor}
          {...rest}
        />
        {symbol ? (
          <Text
            bold
            color={textColor}
            size={FontSizes.small}
            style={styles.symbol}
          >
            {symbol}
          </Text>
        ) : null}
      </View>
      <Text color={Colors.error} size={FontSizes.small} style={styles.error}>
        {error || ''}
      </Text>
      <Text color={Colors.primary} size={FontSizes.smaller} style={styles.subtext}>
        {!error && subtext ? subtext : ''}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginVertical: Spaces.vertical,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    width: '100%',
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    padding: Spaces.horizontal,
    textAlign: Platform.OS === 'ios' ? 'right' : 'left',
  },
  symbol: {
    position: 'absolute',
    right: 10,
    top: 5
  },
  error: {
    marginTop: Spaces.vertical / 2,
    textAlign: 'center',
  },
  subtext: {
    marginTop: Spaces.vertical / 2,
    textAlign: 'left',
    alignSelf: 'flex-start'
  }
})

export default Input
