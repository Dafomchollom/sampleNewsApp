import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/home';
import ArticleDetails from '../screens/articleDetails';
import { NavigationContainer } from '@react-navigation/native';

const screens = {
  Home: {
    screen: Home,
  },
  ArticleDetails: {
    screen: ArticleDetails,
  },
};

const Stack = createStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="News"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#f4511e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="News"
          component={Home}
          options={{ title: 'News' }}
        />
        {/* <Stack.Screen name="Details">
          {(props) => <ArticleDetails {...props} />}
        </Stack.Screen> */}
        <Stack.Screen
          name="Details"
          component={ArticleDetails}
          options={{ title: 'Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
