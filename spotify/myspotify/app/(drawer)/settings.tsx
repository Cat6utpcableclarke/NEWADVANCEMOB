import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const settings = [
  {
    section: 'Account',
    data: [
      { icon: 'person-outline', label: 'Profile', onPress: () => {} },
      { icon: 'mail-outline', label: 'Email', onPress: () => {} },
      { icon: 'key-outline', label: 'Change Password', onPress: () => {} },
    ],
  },
  {
    section: 'Playback',
    data: [
      { icon: 'musical-notes-outline', label: 'Explicit Content', type: 'switch', value: true },
      { icon: 'cellular-outline', label: 'Data Saver', type: 'switch', value: false },
    ],
  },
  {
    section: 'App',
    data: [
      { icon: 'moon-outline', label: 'Dark Mode', type: 'switch', value: true },
      { icon: 'notifications-outline', label: 'Notifications', type: 'switch', value: true },
      { icon: 'help-circle-outline', label: 'Help', onPress: () => {} },
      { icon: 'log-out-outline', label: 'Log Out', onPress: () => {} },
    ],
  },
];

type SwitchLabel = 'Explicit Content' | 'Data Saver' | 'Dark Mode' | 'Notifications';

const Settings = () => {
  const [switchStates, setSwitchStates] = React.useState<Record<SwitchLabel, boolean>>({
    'Explicit Content': true,
    'Data Saver': false,
    'Dark Mode': true,
    'Notifications': true,
  });

  const handleToggle = (label: SwitchLabel) => {
    setSwitchStates((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      {settings.map((section) => (
        <View key={section.section} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.section}</Text>
          {section.data.map((item) => (
            <View key={item.label} style={styles.row}>
              <Ionicons name={item.icon as any} size={22} color="#1DB954" style={styles.icon} />
              <Text style={styles.label}>{item.label}</Text>
              {item.type === 'switch' ? (
                <Switch
                  value={switchStates[item.label as SwitchLabel]}
                  onValueChange={() => handleToggle(item.label as SwitchLabel)}
                  thumbColor={switchStates[item.label as SwitchLabel] ? '#1DB954' : '#888'}
                  trackColor={{ true: '#1DB95455', false: '#444' }}
                />
              ) : (
                <TouchableOpacity onPress={item.onPress} style={styles.action}>
                  <Ionicons name="chevron-forward" size={20} color="#888" />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
    margin: 20,
  },
  section: {
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    color: '#1DB954',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 8,
    marginBottom: 10,
    padding: 14,
  },
  icon: {
    marginRight: 16,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  action: {
    marginLeft: 8,
  },
});

export default Settings;
