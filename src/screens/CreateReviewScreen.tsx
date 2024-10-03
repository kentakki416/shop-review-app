import type { StackNavigationProp } from '@react-navigation/stack'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import type { RootStackParamList } from '../types/navigation'
import type { RouteProp } from '@react-navigation/native'
import { IconButton } from '../components/IconButton'
import { useEffect } from 'react'

type Props = {
  navigation:StackNavigationProp<RootStackParamList, 'CreateReview'>
  route: RouteProp<RootStackParamList, 'CreateReview'>
}
const CreateReviewScreen = (props: Props): JSX.Element => {
  const {shop} = props.route.params
  const {navigation} = props
  
  useEffect(() => {
    navigation.setOptions({
      title:shop.name,
      headerLeft: () => {
        return (
        <IconButton name="x" onPress={() =>  navigation.goBack()}/>
        )
      }
    })
  })

  return (
    <SafeAreaView style={styles.container}>
      <Text>CreateReviewScreen</Text>
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#fff',
    alignItems:'center',
    justifyContent:'center'
  }
})

export default CreateReviewScreen
