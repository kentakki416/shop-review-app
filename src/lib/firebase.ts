
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, orderBy, query, where, setDoc, doc, getDoc, addDoc, type DocumentSnapshot, type DocumentData } from 'firebase/firestore'
import { getAuth, initializeAuth, signInAnonymously } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage'
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Shop } from '../types/shop'
import { initialUser, type User } from '../types/user'
import type { Review } from '../types/review'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FB_APP_ID,
    measurementId: process.env.EXPO_PUBLIC_FB_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
// initializeAuth(app, {
//     persistence: getReactNativePersistence(AsyncStorage)
//   })
const db = getFirestore(app)

const storage = getStorage(app, 'gs://shop-review-df043.appspot.com')

export const getShops = async() => {
    // refrence: 参照。取得や更新などはrefrenceに対して行う
    // snapshot: スナップショット。データの状態を表す.docsででデータを取得できる
    const ref = collection(db, 'shops')
    const q = query(ref, orderBy('score', 'desc'))
    const querySnapshot = await getDocs(q)
    const shops = querySnapshot.docs.map(
        (doc) => ({...doc.data(), id: doc.id} as Shop)
    )
    return shops
}

export const signin = async() => {
    // 匿名認証
    const auth = getAuth()
    const userCredential = await signInAnonymously(auth)
    const { uid } = userCredential.user

    const userDocRef = doc(db, 'users', uid)
    const userDoc = await getDoc(userDocRef)
    if (userDoc.exists()) {
        // ユーザー登
        await setDoc(doc(db, 'users', uid), initialUser)
        return {
            ...initialUser,
            id: uid,
        } as User
    } else {
        return {
            id: uid,
            ...(userDoc as  DocumentSnapshot<DocumentData, DocumentData>).data() as User,
        } as User
    }
}

export const updateUser = async(userId: string, params: any) => {
    await setDoc(doc(db, 'users', userId), params)
}

export const setReview = async(shopId: string, review: Review) => {
    const reviewCollection = doc(db, 'shops', shopId, 'reviews')
    return await setDoc(reviewCollection, review)
}

export const createReviewRef = async (shopId: string) => {
    const docRef = doc(db, 'shops', shopId, 'reviews')
    const docSnap = await getDoc(docRef)
    return docSnap.data()
}

export const uploadImage = async(uri: string, path: string) => {
    // uriをblobに変換
    const localUri = await fetch(uri)
    const blob = await localUri.blob()
    // storageにアップロード
    const storageRef = ref(storage, path)

    let downloadUrl = ''
    try {
        await uploadBytes(storageRef, blob)
        downloadUrl = await getDownloadURL(storageRef)
    } catch (e) {
        console.log(e)
    }
    return downloadUrl
}
