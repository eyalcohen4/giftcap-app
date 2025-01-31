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
  elliptic?: boolean,
  showTouchable?: boolean
}

const SlideInPanel: React.FC<SlideInPanelProps> = ({
  isOpen,
  onClose,
  height,
  showTouchable,
  elliptic,
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
      if (onClose && gestureState.dy > 3) {
        handleClose()
      }
    },
  })

  const ellipticStyle = elliptic ? {
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    shadowColor: 'rgba(145, 145, 145, 0.8)',
  } : {
    shadowColor: 'rgba(145, 145, 145, 0.2)',
  }

  return isOpen ? (
    <Animatable.View
      {...panResponder.panHandlers}
      ref={(ref) => (viewRef = ref)}
      animation="slideInUp"
      style={[styles.container, { height: height || Sizes.slideInPanel }, ellipticStyle]}
      easing="ease-in"
      duration={200}
    >
      {showTouchable ? <View style={styles.touchable} /> : null}
      <View
        style={[
          styles.content,
          { marginTop: showTouchable ? Spaces.vertical : 0 },
        ]}
      >
        {children}
      </View>
      <TouchableOpacity onPress={handleClose}>
        {onClose ? <Text style={styles.back}>{t('back')}</Text> : null}
      </TouchableOpacity>
    </Animatable.View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingTop: Spaces.vertical,
    alignItems: 'center',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowRadius: 30,
    shadowOpacity: 1
  },
  touchable: {
    width: 105,
    height: 10,
    borderRadius: 8,
    backgroundColor: '#d8d8d8',
  },
  content: {
    flex: 1,
    width: '100%',
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
