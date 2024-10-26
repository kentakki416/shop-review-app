import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import type { Shop } from './src/types/shop'
import { getShops } from './src/lib/firebase'
import ShopReviewItem from './src/components/ShopReviewItem'
import { AppNavigator } from './src/navigation/AppNavigator'
import type { User } from './src/types/user'
import { UserContext } from './src/contexts/userContexts'
import type { Review } from './src/types/review'
import { ReviewsContext } from './src/contexts/reviewsContext'

export default function App() {
    const [user, setUser] = useState<User | null>(null)
    const [shops, setShops] = useState<Shop[]>([])
    const [reviews, setReviews] = useState<Review[]>([])

    useEffect(() => {
        getFirebaseItems()
    }, [])

    const getFirebaseItems = async() => {
        const shops = await getShops()
        setShops(shops)
    }

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <ReviewsContext.Provider value={{ reviews, setReviews }}>
                <AppNavigator />
            </ReviewsContext.Provider>
        </UserContext.Provider>
    )

}
