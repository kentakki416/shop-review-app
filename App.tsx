import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import type { Shop } from './src/types/shop'
import { getShops } from './src/lib/firebase'
import ShopReviewItem from './src/components/ShopReviewItem'
import { AppNavigator } from './src/navigation/AppNavigator'
import type { User } from './src/types/user'
import { UserContext } from './src/contexts/userContexts'

export default function App() {
    const [user, setUser] = useState<User | null>(null)
    const [shops, setShops] = useState<Shop[]>([])

    useEffect(() => {
        getFirebaseItems()
    }, [])

    const getFirebaseItems = async() => {
        const shops = await getShops()
        setShops(shops)
    }

    return (
        <UserContext.Provider value={{user, setUser}}>
            <AppNavigator />
        </UserContext.Provider>
    )

}
