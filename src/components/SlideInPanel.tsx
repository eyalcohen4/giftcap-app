import React from 'react'
import { StyleSheet, View } from 'react-native'
import { observer, inject } from 'mobx-react'
import * as Animatable from 'react-native-animatable'
import { Colors, Sizes } from '../styles'

type SlideInPanelProps = {
  isOpen: boolean
  children: React.ReactNode,
  onClose?: Function
}

const SlideInPanel: React.FC<SlideInPanelProps> = ({
  isOpen,
  onClose,
  children,
}: SlideInPanelProps) => {
  // @TODO: Handle Close
  return isOpen ? (
    <Animatable.View animation="slideInUp" style={styles.container}>
      <View style={styles.touchable}  />
      {children}
    </Animatable.View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    height: Sizes.slideInPanel,
    backgroundColor: Colors.white,
    paddingTop: 5
  },
  touchable: {
    width: 105,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#d8d8d8',
  },
})

export default observer(SlideInPanel)
