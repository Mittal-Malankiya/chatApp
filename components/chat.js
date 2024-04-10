import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

const Chat = ({ route, navigation }) => {
  const { name, background } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <Text style={styles.title}>Chat Screen</Text>
      <Text>Welcome, {name}!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default Chat;
