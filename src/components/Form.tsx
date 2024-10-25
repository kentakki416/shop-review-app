import { StyleSheet, Text, TextInput, View } from 'react-native'

type Props = {
  onChangeText: (teshxt: string) => void
  value: string
  label: string
}
const Form = (props: Props): JSX.Element => {
    const { onChangeText, value, label } = props

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={(text) => onChangeText(text)}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        height: 40,
        borderColor: '#999',
        borderBottomWidth: 1,
    },
    label: {
        fontWeight: 'bold',
        color: '#999',
    },
})

export default Form
