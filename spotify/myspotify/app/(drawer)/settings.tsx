import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RootState as R } from '../../constants/store';
import { getTheme } from '../../constants/theme';
import { useSelector } from 'react-redux';

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

  // Get theme from Redux
  const mode = useSelector((state: R) => state.theme.mode);
  const accentColor = useSelector((state: R) => state.theme.accentColor);

  // Get colors from your theme helper
  const { colors } = getTheme(mode as any, accentColor);

  // Dynamic styles
  const containerStyle = { backgroundColor: colors.background, flex: 1 };
  const headerStyle = { color: colors.text, fontSize: 32, fontWeight: 'bold', margin: 20 };
  const sectionTitleStyle = { color: colors.primary, fontSize: 16, fontWeight: 'bold', marginBottom: 10, marginTop: 10 };
  const rowStyle = {
    backgroundColor: colors.card,
    borderRadius: 8,
    marginBottom: 10,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
  };
  const labelStyle = { color: colors.text, fontSize: 16, flex: 1 };

  return (
    <ScrollView style={[styles.container, containerStyle]}>
      <Text style={headerStyle}>Settings</Text>
      {settings.map((section) => (
        <View key={section.section} style={styles.section}>
          <Text style={sectionTitleStyle}>{section.section}</Text>
          {section.data.map((item) => (
            <View key={item.label} style={rowStyle}>
              <Ionicons name={item.icon as any} size={22} color={colors.accent} style={styles.icon} />
              <Text style={labelStyle}>{item.label}</Text>
              {item.type === 'switch' ? (
                <Switch
                  value={switchStates[item.label as SwitchLabel]}
                  onValueChange={() => handleToggle(item.label as SwitchLabel)}
                  thumbColor={switchStates[item.label as SwitchLabel] ? colors.accent : '#888'}
                  trackColor={{ true: colors.accent + '55', false: '#444' }}
                />
              ) : (
                <TouchableOpacity onPress={item.onPress} style={styles.action}>
                  <Ionicons name="chevron-forward" size={20} color={colors.desc} />
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
  },
  section: {
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 16,
  },
  action: {
    marginLeft: 8,
  },
});

export default Settings;
