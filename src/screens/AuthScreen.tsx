import { ActivityIndicator, StyleSheet, Text, SafeAreaView } from 'react-native'

const AuthScreen = (): JSX.Element => {
  // const { signIn } = useAuth();

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
