import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react'
import type { Shop } from './src/types/shop'
import { getShops } from './src/lib/firebase'

export default function App() {

  const [shops, setShops] = useState<Shop[]>([])

  useEffect(() => {
    getFirebaseItems()
  }, [])

  const getFirebaseItems = async() => {
    const shops = await getShops()
    setShops(shops)
  }

  return(
    <View style={styles.container}>
      {shops.map((shop, index) => {
        return (
          <Text key={index}>
            {shop.name} {shop.place}
          </Text>
        )
      })}
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
