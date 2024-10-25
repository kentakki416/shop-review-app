import { StyleSheet, Text, TouchableOpacity, type GestureResponderEvent } from 'react-native'

type Props = {
  text: string
  onPress: (event: GestureResponderEvent) => void
}

const Button = (props: Props):JSX.Element => {
    const { text, onPress } = props

    return (
        <TouchableOpacity style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    )
}

const styles =StyleSheet.create({
    container: {
        backgroundColor: '#000',
        height: 40,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#fff',
    },
})

export default Button
