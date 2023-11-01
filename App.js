import React, { useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FavoriteScreen, HomeScreen, ProfileScreen } from './src/screens';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 70,
            position: 'absolute',
            bottom: 16,
            right: 16,
            left: 16,
            borderRadius: 10,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let rn = route.name;

            if (rn === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (rn === 'Search') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (rn === 'Favorite') {
              iconName = focused ? 'bookmark' : 'bookmark-outline';
            } else if (rn === 'Profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'rgb(84, 194, 37)',
          tabBarInactiveTintColor: 'black',
        })}>
        <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarShowLabel: false }} />
        {/* <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarShowLabel: false }} /> */}
        <Tab.Screen name="Favorite" component={FavoriteScreen} options={{ tabBarShowLabel: false }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarShowLabel: false }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

