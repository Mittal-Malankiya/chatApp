import Start from "./components/start"; // Correct casing for component name
import Chat from "./components/chat"; // Correct casing for component name

// import react Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAf9XIFKjOSkkFIIeKN2OdOU9XVsrfPe2g",
    authDomain: "chatapp-79bfb.firebaseapp.com",
    projectId: "chatapp-79bfb",
    storageBucket: "chatapp-79bfb.appspot.com",
    messagingSenderId: "581704454136",
    appId: "1:581704454136:web:0d666262d53b3c6970500d",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen
          name="Chat"
          component={Chat}
          initialParams={{ db }} // Pass db as initialParams
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
