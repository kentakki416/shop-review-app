import type { StackNavigationProp } from '@react-navigation/stack'
import { FlatList, SafeAreaView, StyleSheet, Text } from 'react-native'
import type { RootStackParamList } from '../types/navigation'
import type { RouteProp } from '@react-navigation/native'
import ShopDetail from '../components/ShopDetail'
import { useContext, useEffect, useState } from 'react'
import { FloatingActionButton } from '../components/FloatingActionButton'
import type { Review } from '../types/review'
import { getReviews } from '../lib/firebase'
import ReviewItem from '../components/ReviewItem'
import { ReviewsContext } from '../contexts/reviewsContext'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Shop'>
  route: RouteProp<RootStackParamList, 'Shop'>
}

const ShopScreen = (props: Props): JSX.Element => {
    const { navigation, route } = props
    const { shop } = route.params
    const {reviews, setReviews}= useContext(ReviewsContext)


    useEffect(() => {
        navigation.setOptions({ title: shop.name })

        const fetchReviews = async() => {
            const reviews = await getReviews(shop.id)
            setReviews(reviews)
        }
        fetchReviews()
    }, [shop])

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ListHeaderComponent={<ShopDetail shop={shop}/>}
                data={reviews}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={(item) => item.id}/>
            <FloatingActionButton
                iconName="plus"
                onPress={() => {navigation.navigate('CreateReview', { shop })}}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'flex-start',
    },
})

export default ShopScreen
