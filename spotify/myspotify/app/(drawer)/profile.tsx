import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const user = {
  name: 'Shrek',
  username: '@shrek',
  followers: 1234,
  following: 56,
  image: require('../../images/shrek.jpg'),
};

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <Image source={user.image} style={styles.avatar} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.username}>{user.username}</Text>
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
        <TouchableOpacity style={styles.editButton}>
          <Ionicons name="pencil" size={18} color="#1DB954" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Playlists</Text>
        {/* You can map over user's playlists here */}
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
