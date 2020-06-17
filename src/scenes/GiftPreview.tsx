import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import { generate } from 'shortid'
import { inject, observer } from 'mobx-react'
import * as Animated from 'react-native-animatable'
import { useTranslation } from 'react-i18next'

import { Text, Button, StockBrand, Present } from '../components'
import { FontSizes, Sizes, Spaces, Colors } from '../styles'
import Root from '../stores'
import toRows from '../utils/toRows'

type GiftPreviewProps = {
  root?: Root
}

const GiftPreview: React.FC<GiftPreviewProps> = ({
  root,
}: GiftPreviewProps) => {
  const { buyer, ui, stocks } = root as Root
  const { t } = useTranslation()

  useEffect(() => {
    if (!ui.hideBuyCart) {
      ui.toggleBuyCart(false)
    }
  })

  useEffect(() => {
    return function cleanup() {
      ui.toggleBuyCart()
    }
  }, [])

  const goBack = () => {
    buyer.previous()
  }

  const goNext = () => {
    buyer.next()
  }


  return (
    <Animated.View
      animation="slideInRight"
      duration={200}
      style={styles.container}
    >
      <Present gift={buyer.gift} />
      <View style={styles.footer}>
        <Button onPress={goNext} style={{ marginBottom: Spaces.vertical * 2 }}>
          <Text>{t('continueToOrder')}</Text>
        </Button>
        <TouchableOpacity onPress={goBack}>
          <Text style={{ color: Colors.primary }}>{t('editGift')}</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    overflow: 'scroll'
  },
  card: {
    width: '80%',
    alignSelf: 'center',
    height: Sizes.windowHeight * 0.4,
    padding: Spaces.vertical * 2,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 5,
    borderColor: '#03a678',
  },
  footer: {
    marginTop: Spaces.vertical * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    position: 'relative',
    padding: Spaces.vertical,
    alignItems: 'center',
    zIndex: 1,
  },
  items: {
    flexDirection: 'row',
  },
  removeItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  price: {
    color: Colors.primary,
  },
})

export default inject('root')(observer(GiftPreview))
