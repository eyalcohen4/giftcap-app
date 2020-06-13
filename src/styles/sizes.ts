import { Dimensions } from 'react-native'

export default {
  windowHeight: Dimensions.get('window').height,
  windowWidth: Dimensions.get('window').width,
  header: 80,
  slideInPanel: Dimensions.get('window').height * 0.65,
  cartHeight: Dimensions.get('window').height * 0.25,
}
