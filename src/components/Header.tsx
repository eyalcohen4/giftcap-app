import React from 'react'
import { TouchableWithoutFeedback, View, StyleSheet, Image } from 'react-native'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'
import { inject, observer } from 'mobx-react'
import { useTranslation } from 'react-i18next'

import { Text } from './'
import { Spaces, Colors, FontSizes, Sizes } from '../styles'
import iconWhite from '../../assets/icon-white.png'
import Root from '../stores'
import { CATEGORIES_ROUTE_NAME, MY_GIFTS_ROUTE_NAME } from '../constants'
import Ui from '../stores/Ui'
import { HeaderIcons } from '../types'

type HeaderProps = {
  root?: Root
  onGoToLogin: Function
  onSearch: Function
}

const Header: React.FC<HeaderProps> = ({
  root,
  onGoToLogin,
  onSearch,
}: HeaderProps) => {
  const { t } = useTranslation()
  const { user, ui } = root

  const userName = user.data?.name

  const ICONS_SIZE = 40
  const LOGO_SIZE = 50

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => onSearch()}>
        <View style={styles.search}>
          {user.isLoggedIn && ui.headerRightIcon === HeaderIcons.gift ? (
            <>
              <AntDesign
                name="gift"
                size={ICONS_SIZE - 5}
                color={Colors.white}
              />
              <Text color={Colors.white} size={FontSizes.smaller - 2}>
                {t('newGift')}
              </Text>
            </>
          ) : (
            <>
              <AntDesign
                name="search1"
                size={ICONS_SIZE - 5}
                color={Colors.white}
              />
              <Text color={Colors.white} size={FontSizes.smaller}>
                {t('search')}
              </Text>
            </>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.logoContainer}>
        <Image
          source={iconWhite}
          style={{ height: LOGO_SIZE, width: LOGO_SIZE, marginBottom: Spaces.horizontal }}
          resizeMode="contain"
        />
      </View>
      <View>
        <TouchableWithoutFeedback onPress={() => onGoToLogin()}>
          <View style={styles.account}>
            <MaterialCommunityIcons
              name="account-circle-outline"
              size={40}
              color={Colors.white}
            />
            <Text color={Colors.white} size={FontSizes.smaller}>
              {user.isLoggedIn ? userName : t('login')}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: Sizes.header,
    backgroundColor: Colors.primary,
    paddingVertical: Spaces.vertical * 2,
    overflow: 'visible',
  },
  search: {
    alignItems: 'center',
    paddingLeft: Spaces.horizontal * 1,
  },
  logoContainer: {
    alignItems: 'flex-end',
  },
  title: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    textAlign: 'center',
  },
  account: {
    alignItems: 'center',
    paddingRight: Spaces.horizontal * 1,
  },
})

export default inject('root')(observer(Header))
