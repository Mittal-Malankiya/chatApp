import Start from "./components/start"; // Correct casing for component name
import Chat from "./components/chat"; // Correct casing for component name

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { LogBox } from "react-native";

// Create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyC5oOrKF8g4AdEPL5BSHzrXV3UPtO9evjE",
    authDomain: "chatapp-bc5d8.firebaseapp.com",
    projectId: "chatapp-bc5d8",
    storageBucket: "chatapp-bc5d8.appspot.com",
    messagingSenderId: "456976462183",
    appId: "1:456976462183:web:bfaa7c287bc3c467f67fc2",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
