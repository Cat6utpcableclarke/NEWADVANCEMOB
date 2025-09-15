import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const Greet = () => {
  const { name } = useLocalSearchParams<{ name?: string }>();
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello {name}</Text>
      <Button
        title="Go To Test 1"
        onPress={() => router.push('/test1')}
      />
      <Button
        title="Go To Component Showcase"
        onPress={() => router.push('/component-showcase')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Greet;
