import type { Shop } from '../types/shop'
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native'
import Stars from './Stars'

const {width} = Dimensions.get('window')
const CONTAINER_WIDTH = width/2
const PADDING = 16
const IMAGE_WIDTH = CONTAINER_WIDTH - PADDING * 2

type Props = {
  shop: Shop
}
const ShopReviewItem = (props: Props): JSX.Element => {
  const { name, place, imageUrl, score } = props.shop
  
  return (
    <View style={styles.container}>
      <Image source={{uri: imageUrl}} style={styles.image}/>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.placeText}>{place}</Text>
      <Stars score={score}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    padding: PADDING,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 0.7,
  },
  nameText: {
    fontSize: 16,
    color: '#000',
    marginTop: 8,
    fontWeight: 'bold',
  },
  placeText: {
    fontSize: 12,
    color: '#888',
    marginVertical: 8,
  },
})

export default ShopReviewItem
