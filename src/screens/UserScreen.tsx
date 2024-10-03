import React, { useState } from "react";
import { StyleSheet, SafeAreaView, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import { RouteProp } from "@react-navigation/native";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'User'>
  route: RouteProp<RootStackParamList, 'User'>
}

const UserScreen = ({ navigation, route }: Props): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    setLoading(true);
    // const updatedAt = firebase.firestore.Timestamp.now();
    // await updateUser(user.id, { name, updatedAt });
    // setUser({ ...user, name, updatedAt });
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Form
        value={name}
        onChangeText={(text) => {
          setName(text);
        }}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} /> */}
      <Text>User Screen</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default UserScreen;
