import React, { useEffect } from 'react'
import { generate } from 'shortid'
import { View, ScrollView, StyleSheet, SnapshotViewIOS } from 'react-native'
import { inject, observer } from 'mobx-react'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'

import { Text, StockBrand, Circle } from '../components'
import Root from '../stores'
import { Colors, Spaces, FontSizes } from '../styles'
import { HeaderIcons, Gift } from '../types'

type MyGiftsProps = {
  root?: Root
  navigation: any
}

type GiftPreviewProps = {
  gift: Gift
}

const GiftPreviewValue = ({
  label,
  value,
  style,
}: {
  label?: string
  value?: any
  style?: any
}) => {
  return (
    <View style={[styles.value, style]}>
      <Text color={Colors.primary} size={FontSizes.small}>
        {value}
      </Text>
      <Text color={Colors.black} size={FontSizes.smaller}>
        {label}
      </Text>
    </View>
  )
}

const GiftPreview: React.FC<GiftPreviewProps> = ({
  gift,
}: GiftPreviewProps) => {
  const { t } = useTranslation()
  const value = gift?.items?.reduce(
    (acc, { value }) => acc + parseInt(value),
    0
  )

  return (
    <View style={styles.gift}>
      <ScrollView
        style={{ maxHeight: 100 }}
        contentContainerStyle={styles.giftStocks}
        horizontal
      >
        {gift?.items?.map(({ stock }) => (
          <StockBrand
            key={generate()}
            stock={stock}
            handleClick={() => {}}
          />
        ))}
      </ScrollView>
      <Grid style={styles.valuesGrid}>
        <Row>
          <Col>
            <GiftPreviewValue label={t('from')} value={gift.giverName} />
          </Col>
          <Col>
            <GiftPreviewValue
              label={t('date')}
              value={dayjs(gift.createdAt).format('DD.MM.YYYY')}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <GiftPreviewValue
              label={t('value')}
              value={`${value}${t('currency')}`}
            />
          </Col>
          <Col>
            <GiftPreviewValue
              label={t('numberOfStocks')}
              value={gift.items?.length}
            />
          </Col>
        </Row>
      </Grid>
    </View>
  )
}

const MyGifts: React.FC<MyGiftsProps> = ({ root }: MyGiftsProps) => {
  const { t } = useTranslation()
  const { user, ui } = root as Root

  useEffect(() => {
    async function getUserGifts() {
      if (!user.gifts || !user.gifts.length) {
        await user.getUserGifts()
      }
    }

    getUserGifts()

    ui.setHeaderIcon(HeaderIcons.gift)
    return function cleanup() {
      ui.setHeaderIcon(HeaderIcons.search)
    }
  }, [])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text color={Colors.primary} bolder>
        {t('myGifts')}
      </Text>
      <View style={styles.overviewContainer}>
        <View style={styles.overview}>
          <Circle style={{ justifyContent: 'center' }}>
            <GiftPreviewValue
              style={{ width: 'auto' }}
              label={t('numberOfGifts')}
              value={user?.gifts?.length || 0}
            />
          </Circle>
        </View>
        <View style={styles.overview}>
          <Circle style={{ justifyContent: 'center' }}>
            <GiftPreviewValue
              style={{ width: 'auto' }}
              label={t('change')}
              value="15% ↑"
            />
          </Circle>
        </View>
        <View style={styles.overview}>
          <Circle style={{ justifyContent: 'center' }}>
            <GiftPreviewValue
              style={{ width: 'auto' }}
              label={t('value')}
              value={`${user.giftsValue}${t('currency')}`}
            />
          </Circle>
        </View>
      </View>
      {user.gifts?.map((gift) => (
        <View key={gift._id} style={styles.giftContainer}>
          <GiftPreview gift={gift} />
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 99999,
    overflow: 'visible',
    marginVertical: Spaces.vertical * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewContainer: {
    flexDirection: 'row',
    marginTop: Spaces.vertical * 3,
    marginBottom: Spaces.vertical
  },
  overview: {
    marginHorizontal: Spaces.horizontal,
  },
  giftContainer: {
    marginVertical: Spaces.vertical * 3,
  },
  gift: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spaces.vertical * 2,
    width: 300,
    height: 250,
    backgroundColor: Colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.23)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    shadowOpacity: 1,
    elevation: 1,
  },
  value: {
    width: 120,
    height: 50,
    margin: Spaces.vertical,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valuesGrid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  giftStocks: {
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 100,
  },
})

export default inject('root')(observer(MyGifts))
