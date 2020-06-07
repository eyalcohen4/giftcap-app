import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { useTranslation } from 'react-i18next'

import { Text } from './'
import { Spaces, Colors, FontSizes, Sizes } from '../styles'

type HeaderProps = {}

const Header: React.FC<HeaderProps> = ({}: HeaderProps) => {
  const { t } = useTranslation()
  return (
    <View style={styles.container}>
      <Text size={FontSizes.larger}>{t('GiftCap')}</Text>
      <View style={styles.title}>
        <Text size={FontSizes.large} style={styles.titleText}>
          {t('headerTitle')}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Sizes.header,
    backgroundColor: Colors.primary,
    paddingVertical: Spaces.vertical * 2,
    paddingHorizontal: Spaces.horizontal,
    overflow: 'visible',
  },
  title: {
    alignSelf: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  titleText: {
    textAlign: 'center',
  },
})

export default Header

function Chavron() {
  return (
    <View style={stylesChavron.chevron}>
      <View style={stylesChavron.chevronMain} />
      <View
        style={[stylesChavron.chevronTriangle, stylesChavron.chevronTopLeft]}
      />
      <View
        style={[stylesChavron.chevronTriangle, stylesChavron.chevronTopRight]}
      />
      <View
        style={[stylesChavron.chevronTriangle, stylesChavron.chevronBottomLeft]}
      />
      <View
        style={[
          stylesChavron.chevronTriangle,
          stylesChavron.chevronBottomRight,
        ]}
      />
    </View>
  )
}

const stylesChavron = {
  chevron: {
    width: 150,
    height: 50,
  },
  chevronMain: {
    width: 150,
    height: 50,
    backgroundColor: 'red',
  },
  chevronTriangle: {
    backgroundColor: 'transparent',
    borderTopWidth: 20,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    borderLeftWidth: 75,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderRightColor: 'transparent',
    borderLeftColor: 'red',
  },
  chevronTopLeft: {
    position: 'absolute',
    top: -20,
    left: 0,
  },
  chevronTopRight: {
    position: 'absolute',
    top: -20,
    right: 0,
    transform: [{ scaleX: -1 }],
  },
  chevronBottomLeft: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    transform: [{ scale: -1 }],
  },
  chevronBottomRight: {
    position: 'absolute',
    bottom: -20,
    right: 0,
    transform: [{ scaleY: -1 }],
  },
}
