import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TextInput } from 'react-native-gesture-handler';
import * as Animatable from 'react-native-animatable';

const initialUser = {
  name: 'Shrek_1',
  email: 'shrek@gmail.com',
  genre: '',
  followers: 1234,
  following: 56,
  image: require('../../images/shrek.jpg')
};

const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;
const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const genreRegex = /^[A-Za-z ]{2,20}$/;

type ProfilePreviewProps = {
  genre: string;
};

const ProfilePreview = React.memo(({ genre }: ProfilePreviewProps) => {
  let genreImage = require('../../images/shrek.jpg');
  if (genre && genre.toLowerCase().includes('rock')) genreImage = require('../../images/Rock.jpg');
  if (genre && genre.toLowerCase().includes('pop')) genreImage = require('../../images/Pop.jpg');
  if (genre && genre.toLowerCase().includes('jazz')) genreImage = require('../../images/Jazz.jpg');
  return (
    <Animatable.Image
      source={genreImage}
      style={styles.avatar}
      animation={genre ? 'fadeIn' : undefined}
      duration={600}
    />
  );
});

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [user, setUser] = React.useState(initialUser);
  const [nameError, setNameError] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [genreError, setGenreError] = React.useState('');
  const nameInputRef = React.useRef<Animatable.View & { shake: (duration?: number) => void }>(null);
  const emailInputRef = React.useRef<Animatable.View & { shake: (duration?: number) => void }>(null);
  const genreInputRef = React.useRef<Animatable.View & { shake: (duration?: number) => void }>(null);

  const handleNameChange = (name: string) => {
    setUser({ ...user, name });
    if (!usernameRegex.test(name)) {
      setNameError('Name must be 3-20 alphanumeric or underscores');
      nameInputRef.current?.shake(800);
    } else {
      setNameError('');
    }
  };

  const handleEmailChange = (email: string) => {
    setUser({ ...user, email });
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email address');
      emailInputRef.current?.shake(800);
    } else {
      setEmailError('');
    }
  };

  const handleGenreChange = (genre: string) => {
    setUser({ ...user, genre });
    if (!genreRegex.test(genre)) {
      setGenreError('Genre must be 2-20 letters or spaces');
      genreInputRef.current?.shake(800);
    } else {
      setGenreError('');
    }
  };

  const handleEditToggle = () => {
    if (nameError || emailError || genreError) {
      if (nameError) nameInputRef.current?.shake(800);
      if (emailError) emailInputRef.current?.shake(800);
      if (genreError) genreInputRef.current?.shake(800);
      return;
    }
    setIsEditing(!isEditing);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <ProfilePreview genre={user.genre} />
        {isEditing ? (
          <>
            <Animatable.View ref={nameInputRef}>
              <TextInput
                style={[styles.name, { backgroundColor: '#222', padding: 6, borderRadius: 8 }]}
                value={user.name}
                onChangeText={handleNameChange}
                editable={true}
              />
            </Animatable.View>
            {nameError ? <Text style={{ color: 'red', marginBottom: 4 }}>{nameError}</Text> : null}
            <Animatable.View ref={emailInputRef}>
              <TextInput
                style={[styles.username, { backgroundColor: '#222', padding: 6, borderRadius: 8 }]}
                value={user.email}
                onChangeText={handleEmailChange}
                editable={true}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </Animatable.View>
            {emailError ? <Text style={{ color: 'red', marginBottom: 4 }}>{emailError}</Text> : null}
            <Animatable.View ref={genreInputRef}>
              <TextInput
                style={[styles.username, { backgroundColor: '#222', padding: 6, borderRadius: 8 }]}
                value={user.genre}
                onChangeText={handleGenreChange}
                editable={true}
                placeholder="Genre (e.g. Rock, Pop, Jazz)"
              />
            </Animatable.View>
            {genreError ? <Text style={{ color: 'red', marginBottom: 4 }}>{genreError}</Text> : null}
          </>
        ) : (
          <>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}>{user.email}</Text>
            <Text style={styles.username}>{user.genre}</Text>
          </>
        )}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.followers}</Text>
            <Text style={styles.statLabel}>Followers</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{user.following}</Text>
            <Text style={styles.statLabel}>Following</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.editButton} onPress={handleEditToggle}>
          <Ionicons name="pencil" size={18} color="#1DB954" />
          <Text style={styles.editButtonText}>{isEditing ? 'Save' : 'Edit Profile'}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Playlists</Text>
        <View style={styles.playlistRow}>
          <Ionicons name="musical-notes-outline" size={22} color="#1DB954" style={{ marginRight: 10 }} />
          <Text style={styles.playlistName}>Chill Hits</Text>
        </View>
        <View style={styles.playlistRow}>
          <Ionicons name="musical-notes-outline" size={22} color="#1DB954" style={{ marginRight: 10 }} />
          <Text style={styles.playlistName}>Mood Booster</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    alignItems: 'center',
    paddingTop: 40,
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  name: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
  },
  username: {
    color: '#b3b3b3',
    fontSize: 16,
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statBox: {
    alignItems: 'center',
    marginHorizontal: 18,
  },
  statNumber: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#b3b3b3',
    fontSize: 13,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#1DB954',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginTop: 8,
  },
  editButtonText: {
    color: '#1DB954',
    fontSize: 15,
    marginLeft: 6,
    fontWeight: 'bold',
  },
  section: {
    width: '90%',
    marginTop: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  playlistRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  playlistName: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ProfileScreen;
