import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      // Check if user is already logged in
      const user = await AsyncStorage.getItem('user');
      
      if (user) {
        // User is logged in, redirect to playlist
        const userData = JSON.parse(user);
        router.replace({ 
          pathname: "/(drawer)/playlist", 
          params: { userId: userData.id } 
        });
      } else {
        // User is not logged in, redirect to login
        router.replace('/login');
      }
    } catch (error) {
      console.error('Error checking auth status:', error);
      // On error, default to login screen
      router.replace('/login');
    }
  };

  // Show loading spinner while checking auth status
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#1f2122ff' }}>
      <ActivityIndicator size="large" color="#1DB954" />
    </View>
  );
}