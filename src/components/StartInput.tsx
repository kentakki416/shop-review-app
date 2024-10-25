import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'

type Props = {
  score: number
  startSize: number
  onChangeScore: (value: number) => void
}

const StartInput = (props: Props): JSX.Element => {

  const { score, startSize, onChangeScore } = props

  const starts = [1,2,3,4,5].map((starCount) => (
      <TouchableOpacity
        key={starCount.toString()}
        onPress={() => onChangeScore(starCount)}>
          <FontAwesome
            name={starCount <= score ? 'star' : 'star-o'}
            size={startSize}
            style={{marginRight: 4}}
            />
        </TouchableOpacity>
  ))

  return (
    <View style={styles.container}>
      {starts}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  star: {
    marginRight: 8,
    fontSize: 24,
    color: "#900",
  },
  scoreText: {
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
})


export default StartInput
