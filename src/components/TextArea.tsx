import { StyleSheet, Text, TextInput, View } from 'react-native'



// Propsの型定義
type Props = {
  onChangeText: (text: string) => void
  value: string
  label: string
  height?: number
  placeholder?: string
}

const TextArea = (props:Props):JSX.Element => {
	const {onChangeText, value, label, height, placeholder} = props 
	

	
	const onSubmit = async() => {
		// 
	}
	
	return (
    <View style={[styles.container, !!height && {height}]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        multiline
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmit}
        placeholder={placeholder}
      />
    </View>
  )
	
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    height: 120,
    borderColor: '#999',
    borderBottomWidth: 1,
    marginTop: 8,
  },
  label: {
    fontWeight: "bold",
    color: '#999'
  }
})

export default TextArea // ローカルパッケージは{}を使わずにimportする
