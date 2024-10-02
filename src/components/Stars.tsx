import { StyleSheet, Text, View } from 'react-native'
import {FontAwesome} from "@expo/vector-icons"

type Props = {
  score: number;
  startSize? : number;
  textSize?: number;
}

const Stars = (props: Props):JSX.Element => {
  const {score, startSize = 16, textSize} = props

  return (
    <View style={styles.container}>
      <FontAwesome
        name={score >= 1 ? 'star' :score >= 0.5 ? 'star-half-o' : 'star-o' }
        style={[styles.star, {fontSize: startSize}]}
      />
      <FontAwesome
        name={score >= 2 ? 'star' :score >= 1.5 ? 'star-half-o' : 'star-o' }
        style={[styles.star, {fontSize: startSize}]}
      />
      <FontAwesome
        name={score >= 3 ? 'star' :score >= 2.5 ? 'star-half-o' : 'star-o' }
        style={[styles.star, {fontSize: startSize}]}
      />
      <FontAwesome
        name={score >= 4 ? 'star' :score >= 3.5 ? 'star-half-o' : 'star-o' }
        style={[styles.star, {fontSize: startSize}]}
      />
      <FontAwesome
        name={score >= 5 ? 'star' :score >= 4.5 ? 'star-half-o' : 'star-o' }
        style={[styles.star, {fontSize: startSize}]}
      />
      <Text style={[styles.scoreText, {fontSize: textSize}]}>{score}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: '#800',
    marginRight: 4,
  },
  scoreText: {
    color: "#000",
    fontWeight: 'bold',
  }
})

export default Stars

