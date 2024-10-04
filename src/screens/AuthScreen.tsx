import { useContext, useEffect } from 'react'
import { ActivityIndicator, StyleSheet, Text, SafeAreaView } from 'react-native'
import { signin } from '../lib/firebase'
import { UserContext } from '../contexts/userContexts'

const AuthScreen = (): JSX.Element => {
  const {setUser} = useContext(UserContext)
  useEffect(() => {
    const fetchUser = async () => {
      
      const user = await signin()
      setUser(user)
    }
    fetchUser()
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <ActivityIndicator size="large" />
      <Text style={styles.text}>ログイン中...</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
  }
})

export default AuthScreen;
