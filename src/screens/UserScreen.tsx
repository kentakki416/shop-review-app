import React, { useContext, useState } from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../types/navigation'
import { RouteProp } from '@react-navigation/native'
import Form from '../components/Form'
import Button from '../components/Button'
import { UserContext } from '../contexts/userContexts'
import { updateUser } from '../lib/firebase'
import { Timestamp } from 'firebase/firestore'
import Loading from '../components/Loading'

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>
  route: RouteProp<RootStackParamList, 'User'>
}

const UserScreen = ({ navigation, route }: Props): JSX.Element => {
    const { user, setUser } = useContext(UserContext)
    const [loading, setLoading] = useState<boolean>(false)
    const [name, setName] = useState<string>('')

    const onSubmit = async() => {
        setLoading(true)
        const updatedAt = Timestamp.now()
        const userId = user?.id ? user.id : ''
        await updateUser(userId, { name, updatedAt })
        setUser({ ...user, name, updatedAt })
        setLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Form value={name} onChangeText={(text) => {setName(text)}} label="名前" />
            {/* <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} /> */}
            <Button onPress={onSubmit} text="保存する" />
            <Loading visible={loading} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
})

export default UserScreen
