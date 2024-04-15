# chatApp

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [References](#references)
- 
## Description

A chat app for mobile devices using React Native. The app provides users with a chat interface and options to share images, audios and location.

## Dependencies

- **React Native**: Framework for building mobile applications using JavaScript and React.
- **Expo**: Development platform for building React Native applications.
- **GiftedChat**: A library for creating chat interfaces in React Native applications.
- **Google Firebase**: Cloud-based platform that provides various services, including Firestore for real-time database and authentication.
- **AsyncStorage**: Local storage system in React Native for caching and persisting data.
- **Expo ImagePicker**: Expo API for accessing the device's image picker to choose images from the gallery.
- **Expo MediaLibrary**: Expo API for accessing and managing media assets on the device.
- **Expo Location**: Expo API for obtaining location information from a device.
- **react-native-maps**: React Native Map components for iOS + Android.
- **MapView**: Specific component from the react-native-maps library used to display maps in React Native applications.

## Features

- Users can enter their name and choose a background color for the chat screen before joining the chat
- Send and receive messages
- Send and receive images (from media library or device's camera)
- Send and receive locations
- Record, send and receive audio
- Users can view previous messages when offline

## Set up this App

- Clone this repository.
- Navigate to the chat-app folder and run `npm install`
- Set up Firebase for your project:
  - Sign in at Google Firebase
  - Create a project
  - Set up Firestore Database (production mode)
  - Adjust rules from `allow read, write: if false;` to `allow read, write: if true;`
  - Register app(</>) in Project Overview
  - Navigate to the chat-app folder and install the Firebase using `npm install firebase`
  - Initialize Firebase by copying and pasting the provided Firebase configuration into the App.js
- Download Android Studio on your computer or use the Expo Go App on your mobile device
- Run `expo start`

## Installation

To run this project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/chat-app.git
   ```

2. Navigate into the project directory:
   ```bash
   cd chat-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the Expo development server:
   ```bash
   npm start
   ```

## Usage

1. Open the Expo Go app on your mobile device.
2. Scan the QR code displayed in the terminal or Expo Dev Tools.
3. Explore the chat app features and functionality.

## References

1. **Expo**
   - [Expo Documentation](https://expo.dev/)
   - An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.

2. **Android Studio**
   - [Android Studio Documentation](https://developer.android.com/studio)
   - Integrated Development Environment (IDE) for Android app development.

3. **Gifted Chat**
   - [GitHub Repository](https://github.com/FaridSafi/react-native-gifted-chat)
   - A React Native library specifically created for developing chat apps.

4. **Firestore**
   - [Firebase Documentation](https://firebase.google.com/)
   - A cloud-based database service provided by Google Firebase.

5. **NetInfo**
   - [Expo Documentation - NetInfo](https://docs.expo.dev/versions/latest/sdk/netinfo/)
   - Cross-platform API that provides access to network information.

6. **AsyncStorage**
   - [Expo Documentation - AsyncStorage](https://docs.expo.dev/versions/latest/sdk/async-storage/)
   - A library that provides asynchronous, persistent, key-value storage API.

7. **Expo ImagePicker**
   - [Expo Documentation - ImagePicker](https://docs.expo.dev/versions/latest/sdk/imagepicker/)
   - A library that provides access to the system's UI for selecting images and videos.

8. **Expo Location**
   - [Expo Documentation - Location](https://docs.expo.dev/versions/latest/sdk/location/)
   - A library that provides access to geolocation information and events.

---


