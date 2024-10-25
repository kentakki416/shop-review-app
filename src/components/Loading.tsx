import { ActivityIndicator, StyleSheet, View } from 'react-native'

type Props = {
  visible: boolean
}

const Loading = (props: Props): JSX.Element => {
  const { visible } = props

  return visible? (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  ): <></>;
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Loading
