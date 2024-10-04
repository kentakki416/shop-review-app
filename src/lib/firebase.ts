
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, orderBy, query, where, setDoc, doc, getDoc } from 'firebase/firestore'
import { getAuth, signInAnonymously} from 'firebase/auth'
import type { Shop } from '../types/shop'
import { initialUser, type User } from '../types/user'
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
// // const auth = initializeAuth(app, {
// //   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// // })
const db = getFirestore(app)

export const getShops = async() => {
    // refrence: 参照。取得や更新などはrefrenceに対して行う
    // snapshot: スナップショット。データの状態を表す.docsででデータを取得できる
    const ref = collection(db, 'shops')
    const q = query(ref, orderBy('score', 'desc'))
    const querySnapshot = await getDocs(q)
    const shops = querySnapshot.docs.map((doc) => doc.data() as Shop)
    return shops
}

export const signin = async() => {
    // 匿名認証
    const auth = getAuth()
    const userCredential = await signInAnonymously(auth)
    const {uid} = userCredential.user

    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);
    if(userDoc.exists()) {
        // ユーザー登
        await setDoc(doc(db, 'users', uid), initialUser)
        return {
            ...initialUser,
            id: uid
        } as User;
    } else {
        return {
            id: uid,
            ...userDoc.data() as User
        } as User;
    }    
}
