import React from 'react'
import { Image, View, StyleSheet } from 'react-native'
import { useTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'

import giftImage from '../../assets/gift.png'
import { Text, Button } from '../components'
import { Colors, FontSizes, Spaces } from '../styles'
import { HOME_ROUTE_NAME } from '../constants'

type GiftSentProps = {
  root?: Root
}

const GiftSent: React.FC<GiftSentProps> = ({ root, navigation }: GiftSentProps) => {
  const { t } = useTranslation()
  const { buyer } = root as Root

  const handleBuyMore = () => {
    navigation.navigate(HOME_ROUTE_NAME)
    buyer.finish()
  }

  return (
    <View style={styles.container}>
      <Text bolder size={FontSizes.larger} style={{ color: Colors.primary }}>
        {t('thanks')}
      </Text>
      <View style={styles.main}>
        <Text
          bold
          style={{ color: Colors.primary, marginBottom: Spaces.vertical * 2 }}
        >
          {t('giftOnTheWay')}
          {buyer.gift.receiverName}
        </Text>
        <Image source={giftImage} style={styles.image}></Image>
        <Button onPress={handleBuyMore} style={{ marginTop: Spaces.vertical * 2 }}>
          <Text>{t('buyMoreButton')}</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spaces.vertical * 2,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    },
  image: {
    height: 150,
    width: 150
  }
})

export default inject('root')(observer(GiftSent))
