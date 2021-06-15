// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Home from './screens/home';
import Navigation from './routes/homeStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation />
      {/* <Home /> */}
    </SafeAreaProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   title: {
//     fontWeight: "bold",
//     fontSize: 35,
//     textAlign: "center",
//     marginVertical: 10,
//   },
//   content: {
//     // backgroundColor: "red",
//   },
//   listContainer: {
//     paddingBottom: 100,
//     marginTop: 0,
//   },
// });
