
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, orderBy, query } from 'firebase/firestore'
import type { Shop } from '../types/shop'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FB_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// // const auth = initializeAuth(app, {
// //   persistence: getReactNativePersistence(ReactNativeAsyncStorage),
// // })
const db = getFirestore(app)

export const getShops = async() => {
  // refrence: 参照。取得や更新などはrefrenceに対して行う
  // snapshot: スナップショット。データの状態を表す.docsででデータを取得できる
  const querySnapshot = await getDocs(collection(db, 'shops'))
  const shops = querySnapshot.docs.map((doc) => doc.data() as Shop)
  return shops
}
