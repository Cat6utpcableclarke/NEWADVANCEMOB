import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const SignUp= () => {
  const router = useRouter();
  return (
    <LinearGradient
      colors={['#232526', '#111010']}
      start={[0.5, 0]}
      end={[0.5, 1]}
      style={styles.container}
    >
      <View style={styles.logoRow}>
        <Image source={require('../images/Spotify_logo_without_text.svg.png')} style={styles.logo} />
        <Text style={styles.title}>Spotify</Text>
      </View>

      <View style={styles.form}>
        <TextInput
          placeholder="Username"
          placeholderTextColor="#888"
          style={[styles.input, { marginTop: 30 }]}
        />
        <TextInput
          placeholder="Email"
          placeholderTextColor="#888"
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.signupButton} activeOpacity={0.8}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.connectText}>Or sign up with</Text>
      <View style={styles.socialRow}>
        <Image source={require('../images/facebook.png')} style={styles.fbIcon} />
        <Image source={require('../images/social.png')} style={styles.fbIcon} />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 7 }}>
        <Text style={{ color: '#888' }}>Already have an account? </Text>
        <TouchableOpacity onPress={() => {router.push('/login')}}>
          <Text style={{ color: '#1DB954' }}>Sign In</Text>
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
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
    marginBottom: 5,
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
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 0,
  },
  form: {
    width: '85%',
    alignItems: 'center',
    marginTop: 60,
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
  signupButton: {
    backgroundColor: '#1DB954',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 0,
    marginBottom: 10,
    width: '100%',
  },
  signupButtonText: {
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

export default SignUp;
