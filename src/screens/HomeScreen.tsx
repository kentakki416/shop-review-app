import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import type { Shop } from '../types/shop'
import { getShops } from '../lib/firebase'
import ShopReviewItem from '../components/ShopReviewItem'
import type { RootStackParamList } from '../types/navigation'
import type { StackNavigationProp } from '@react-navigation/stack'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
}

const HomeScreen = ({navigation}: Props) => {

    const [shops, setShops] = useState<Shop[]>([])

    useEffect(() => {
        getFirebaseItems()
    }, [])

    const getFirebaseItems = async() => {
        const shops = await getShops()
        setShops(shops)
    }

    const onPressShop = (shop: Shop) => {
      navigation.navigate("Shop", {shop})
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={shops}
                renderItem={({ item }: {item: Shop}) => (
                    <ShopReviewItem shop={item} onPress={() => {onPressShop(item)}}/>
                )}
                keyExtractor={(item, index) => index.toString()}
                numColumns={2}
            />
        </SafeAreaView>
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

export default HomeScreen
