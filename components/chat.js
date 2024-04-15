import { useEffect, useState } from "react";
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import {
  StyleSheet,
  View,
  Platform,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  onSnapshot,
  query,
  orderBy,
  collection,
  addDoc,
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomActions from "./CustomActions";
import MapView from "react-native-maps";
import { Audio } from "expo-av";

// Destructure name and background from route.params
const Chat = ({ db, route, navigation, isConnected, storage }) => {
  const { userID } = route.params;
  const { name, background } = route.params;
  const [messages, setMessages] = useState([]);
  let soundObject = null;

  let unsubMessages;
  // useEffect hook to set messages options
  // Create a query to get the "messages" collection from the Firestore database
  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

      // Subscribe to changes in the "messages" collection using onSnapshot.
      // This function will be called whenever there are changes in the collection.
      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]); // isConnected used as a dependency value and will allow the component to call the callback of useEffect whenewer the isConnected prop's value changes.

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };
  // Call this function if the isConnected prop turns out to be false in useEffect()
  const loadCachedMessages = async () => {
    // The empty array is for cachedMessages in case AsyncStorage() fails when the messages item hasn’t been set yet in AsyncStorage.
    const cachedMessages = (await AsyncStorage.getItem("messages")) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0]);
  };

  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#484848",
          },
          left: {
            backgroundColor: "#FFF",
          },
        }}
      />
    );
  };

  const renderCustomActions = (props) => {
    return <CustomActions storage={storage} {...props} userID={userID} />;
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }
    return null;
  };

  const renderMessageAudio = (props) => {
    return (
      <View {...props}>
        <TouchableOpacity
          style={{ backgroundColor: "#FF0", borderRadius: 10, margin: 5 }}
          onPress={async () => {
            try {
              // Log the URI for debugging
              console.log(
                "Playing sound from URI:",
                props.currentMessage.audio
              );

              // Stop and unload any currently playing sound first
              if (soundObject) {
                await soundObject.unloadAsync();
                soundObject.setOnPlaybackStatusUpdate(null); // Remove event listener
                soundObject = null;
              }

              // Create a new sound object
              soundObject = new Audio.Sound();
              await soundObject.loadAsync({ uri: props.currentMessage.audio });
              soundObject.setOnPlaybackStatusUpdate((status) => {
                if (status.didJustFinish && !status.isLooping) {
                  soundObject.unloadAsync(); // Unload after playing
                }
              });
              await soundObject.playAsync();
            } catch (error) {
              console.error("Error playing sound:", error);
              Alert.alert("Playback Error", "Failed to play sound.");
            }
          }}
        >
          <Text style={{ textAlign: "center", color: "black", padding: 5 }}>
            Play Sound
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  /* Render a View component with dynamic background color */
  return (
    <View style={[styles.container, { backgroundColor: background }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        renderMessageAudio={renderMessageAudio}
        user={{
          _id: userID,
          name: name,
        }}
      />
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#C00",
    padding: 10,
    zIndex: 1,
  },
  logoutButtonText: {
    color: "#FFF",
    fontSize: 10,
  },
});
export default Chat;
