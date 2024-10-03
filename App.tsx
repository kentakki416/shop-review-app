import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import type { Shop } from './src/types/shop'
import { getShops } from './src/lib/firebase'
import ShopReviewItem from './src/components/ShopReviewItem'
import { AppNavigator } from './src/navigation/AppNavigator'

export default function App() {

    const [shops, setShops] = useState<Shop[]>([])

    useEffect(() => {
        getFirebaseItems()
    }, [])

    const getFirebaseItems = async() => {
        const shops = await getShops()
        setShops(shops)
    }

    return (
      <AppNavigator />
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
