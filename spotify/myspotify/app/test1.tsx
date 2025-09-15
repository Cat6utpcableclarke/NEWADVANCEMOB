import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

const Test1: React.FC = () => {
  const [count, setCount] = useState(0);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.text}>This is the Test1 screen</Text>
      <Text style={styles.text}>Click The Button! {count}</Text>
      <Button title="Click Me" onPress={() => setCount(count + 1)} />
      <Button
        title="Go Greet"
        onPress={() => router.push({ pathname: '/greet', params: { name: 'John' } })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
  },
});

export default Test1;