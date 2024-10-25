import { useContext, useEffect, useState } from 'react'
import type { StackNavigationProp } from '@react-navigation/stack'
import { Image, SafeAreaView, StyleSheet, View } from 'react-native'
import type { RootStackParamList } from '../types/navigation'
import type { RouteProp } from '@react-navigation/native'
import { IconButton } from '../components/IconButton'
import TextArea from '../components/TextArea'
import StartInput from '../components/StartInput'
import Button from '../components/Button'
import { UserContext } from '../contexts/userContexts'
import { Timestamp } from 'firebase/firestore'
import { createReviewRef, setReview, uploadImage } from '../lib/firebase'
import type { Review } from '../types/review'
import { pickImage } from '../lib/image-picker'
import { getExtension } from '../utils/file'

type Props = {
  navigation:StackNavigationProp<RootStackParamList, 'CreateReview'>
  route: RouteProp<RootStackParamList, 'CreateReview'>
}
const CreateReviewScreen = (props: Props): JSX.Element => {
    const { shop } = props.route.params
    const { navigation } = props

    const {user, setUser} = useContext(UserContext)
    const [text, setText] = useState<string>('')
    const [score, setScore] = useState<number>(3)
    const [imageUri, setImageUri] = useState<string>('')

    const onSubmit = async() => {
        // documentのIDを先に取得
        const reviewDocRef = await createReviewRef(shop.id || '')

        // storageのpahtを決定
        const ext = getExtension(imageUri)
        const storagePath = `reviews/${reviewDocRef?.id}.${ext}`
        // 画像storageにアップロード
        const downloadUrl = await uploadImage(imageUri, storagePath)
        // reviewドキュメメントを作成
        const shopId = shop.id || ''
        console.log('shopId', shopId)
        const review = {
            user: {
                name: user?.name,
                id: user?.id
            },
            shop: {
                name: shop.name,
                id: shopId,
            },
            text:text,
            score: score,
            imageUrl : downloadUrl,
            updatedAt: Timestamp.now(),
            createdAt: Timestamp.now()
        } as Review
        
        await setReview(shopId, review)
    }

    const onPickImage = async() => {        
        const uri = await pickImage() || ''
        setImageUri(uri)
    }

    useEffect(() => {
        navigation.setOptions({
            title:shop.name,
            headerLeft: () => {
                return (
                    <IconButton name="x" onPress={() =>  navigation.goBack()}/>
                )
            },
        })
    })

    return (
        <SafeAreaView style={styles.container}>
            <StartInput score={score} startSize={24} onChangeScore={(value) => setScore(value)} />
            <TextArea
                value={text}
                onChangeText={(value) => setText(value)}
                label="レビュー"
                placeholder="レビューを書いてください"
            />
            <View style={styles.photoContainer}>
                <IconButton name="camera" onPress={onPickImage} color="#ccc" />
                {!!imageUri && (
                    <Image source={{uri: imageUri}} style={styles.image} />
                )}
            </View>
            <Button text="レビューを投稿する" onPress={onSubmit} />
                
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
    },
    photoContainer: {
        margin: 8,
    },
    image: {
        width: 100,
        height: 100,
        margin: 8
    }
})

export default CreateReviewScreen
