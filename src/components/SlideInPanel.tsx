import React, { useState } from 'react'
import { StyleSheet, View, PanResponder, TouchableOpacity } from 'react-native'
import { observer, inject } from 'mobx-react'
import * as Animatable from 'react-native-animatable'

import { Text } from './'
import { Colors, Sizes, Spaces } from '../styles'
import { useTranslation } from 'react-i18next'

type SlideInPanelProps = {
  children: React.ReactNode
  isOpen: boolean
  onClose?: Function
  height?: number

  showTouchable?: boolean
}

const SlideInPanel: React.FC<SlideInPanelProps> = ({
  isOpen,
  onClose,
  height,
  showTouchable,
  children,
}: SlideInPanelProps) => {
  const { t } = useTranslation()
  let viewRef

  const handleClose = () => {
    viewRef.slideOutDown(350)
    setTimeout(() => {
      onClose()
    }, 250)
  }

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      if (gestureState.dy > 5) {
        handleClose()
      }
    },
  })

  return isOpen ? (
    <Animatable.View
      {...panResponder.panHandlers}
      ref={(ref) => (viewRef = ref)}
      animation="slideInUp"
      style={[styles.container, { height: height || Sizes.slideInPanel }]}
      easing="ease-in"
      duration={200}
    >
      {showTouchable ? <View style={styles.touchable} /> : null}
      <View style={styles.content}>{children}</View>
      <TouchableOpacity onPress={handleClose}>
        <Text style={styles.back}>{t('back')}</Text>
      </TouchableOpacity>
    </Animatable.View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: Spaces.vertical,
    alignItems: 'center',
    shadowColor: 'rgba(145, 145, 145, 0.2)',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 30,
    shadowOpacity: 1,
  },
  touchable: {
    width: 105,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#d8d8d8',
  },
  content: {
    marginTop: Spaces.vertical * 3,
  },
  back: {
    marginTop: Spaces.vertical,
    color: Colors.primary,
  },
})

SlideInPanel.defaultProps = {
  showTouchable: true,
}

export default observer(SlideInPanel)
