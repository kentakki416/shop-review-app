import type { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import type { RootStackParamList } from '../types/navigation'
import type { RouteProp } from '@react-navigation/native'
import ShopDetail from '../components/ShopDetail'
import { useEffect } from 'react'
import { FloatingActionButton } from '../components/FloatingActionButton'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Shop'>
  route: RouteProp<RootStackParamList, 'Shop'>
}

const ShopScreen = (props: Props): JSX.Element => {
  const {navigation, route} = props
  const {shop} = route.params

  useEffect(() => {
    navigation.setOptions({title: shop.name})
  }, [shop])

  return (
    <SafeAreaView style={styles.container}>
      <ShopDetail shop={shop}/>
      <FloatingActionButton
        iconName="plus"
        onPress={() => {navigation.navigate("CreateReview", {shop})}}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  }
})

export default ShopScreen
