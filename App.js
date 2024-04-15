import Start from "./components/start"; // Correct casing for component name
import Chat from "./components/chat"; // Correct casing for component name

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// import functions for initializing firestore
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);
// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // Define a new state that represents the network connectivity status
  const connectionStatus = useNetInfo();
  // useEffect to display an alert popup if no internet connection

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

  // Initialize Firebase Storage handler
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    /* Wrap the app with NavigationContainer */
    <NavigationContainer>
      {/* Create a stack navigator with initial route Start  */}
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
