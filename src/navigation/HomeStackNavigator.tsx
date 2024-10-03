import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import ShopScreen from '../screens/ShopScreen'
import { RootStackParamList } from '../types/navigation'
import CreateReviewScreen from '../screens/CreateReviewScreen'

const Stack = createStackNavigator<RootStackParamList>()
const RootStack = createStackNavigator<RootStackParamList>()

const MainStack = (): JSX.Element => {
    return (
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#000'
          }}
        >
            <Stack.Screen 
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen name="Shop" component={ShopScreen} />
        </Stack.Navigator>
    )
}

const HomeStackNavigator = (): JSX.Element => {
  return (
    <RootStack.Navigator>
      <RootStack.Group screenOptions={{presentation: 'modal'}}>
        <RootStack.Screen
          name="Main"
          component={MainStack}
          options={{headerShown: false}}
        />
        <RootStack.Screen name="CreateReview" component={CreateReviewScreen} />
      </RootStack.Group>
    </RootStack.Navigator>
  )
}
export default HomeStackNavigator
