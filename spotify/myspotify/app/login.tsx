import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const Login = () => {
  const router = useRouter();

  return (
    <LinearGradient
      colors={['#232526', '#111010']}
      start={[0.5, 0]}
      end={[0.5, 1]}
      style={styles.container}
    >
      <Image source={require('../images/Spotify_logo_without_text.svg.png')} style={styles.logo} />
      <Text style={styles.title}>Spotify</Text>
      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          style={[styles.input, { marginTop: 30 }]}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />
        <Text style={styles.forgot}>Forgot password?</Text>
        <TouchableOpacity
          style={styles.loginButton}
          activeOpacity={0.8}
          onPress={() => router.push('/(drawer)/playlist')}
        >
          <Text style={styles.loginButtonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.connectText}>Be Correct With</Text>
      <View style={styles.socialRow}>
        <Image source={require('../images/facebook.png')} style={styles.fbIcon} />
        <Image source={require('../images/social.png')} style={styles.fbIcon} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: '#888' }}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => router.push('/sign-up')}>
          <Text style={{ color: '#1DB954' }}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  fbIcon: {
    width: 36,
    height: 36,
    marginHorizontal: 5,
    // tintColor, shadow, elevation removed for Expo compatibility
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logo: {
    width: 120,
    height: 120,
    marginTop: 100,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  form: {
    width: '85%',
    alignItems: 'center',
    marginTop: 80,
  },
  input: {
    width: '100%',
    height: 44,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 22,
    marginBottom: 16,
    paddingHorizontal: 18,
    color: '#fff',
    fontSize: 16,
  },
  forgot: {
    alignSelf: 'flex-end',
    color: '#888',
    fontSize: 13,
    marginBottom: 24,
    marginRight: 8,
  },
  loginButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 0,
    marginBottom: 10,
    width: '100%',
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
    textAlign: 'center',
    width: '100%',
  },
  connectText: {
    color: '#1DB954',
    fontSize: 12,
    marginTop: 10,
  },
});

export default Login;