import { Playlist } from '@/entities/data';
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { useSelector } from 'react-redux';
import PlaylistCard from "../../components/playlist-card";
import { RootState as R } from '../../constants/store';
import { getTheme } from '../../constants/theme';
async function getPlaylistsByUserId(userId: string): Promise<Playlist[]> {
  const user = await AsyncStorage.getItem('user');
  return user ? JSON.parse(user).playlists : [];
}

const PlaylistScreen: React.FC = () => {
  const userId = useLocalSearchParams().userId as string;
  const [playlists, setPlaylists] = React.useState<Playlist[]>([]);
  
  React.useEffect(() => {
    const fetchPlaylists = async () => {
      const userPlaylists = await getPlaylistsByUserId(userId);
      setPlaylists(userPlaylists);
    };
    fetchPlaylists();
  }, [userId]);

  const router = useRouter();
  const navigation = useNavigation();

  // Get theme from Redux
  const mode = useSelector((state: R) => state.theme.mode);
  const accentColor = useSelector((state: R) => state.theme.accentColor);

  // Dynamic background color based on theme
  const getBgColor = () => {
    if (mode === 'dark') return '#121212';
    if (mode === 'custom') return accentColor;
    return '#fff';
  };
  const { colors } = getTheme(mode as any, accentColor);
  // Dynamic text color
  const getTextColor = () => (mode === 'dark' ? '#fff' : '#121212');

  // Dynamic card color
  const getCardColor = () => (mode === 'dark' ? '#181818' : '#f5f5f5');

  // Dynamic description color
  const getDescColor = () => (mode === 'dark' ? '#b3b3b3' : '#555');

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
    <View style={{ flexDirection: "row", alignItems: "center", margin: 20, marginBottom: 0 }}>
      <TouchableOpacity
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
        style={{ marginRight: 12, backgroundColor: colors.card, borderRadius: 8, padding: 4 }}
      >
        <Ionicons name="menu" size={28} color={colors.text} />
      </TouchableOpacity>
      <Text style={[styles.header, { color: colors.text }]}>Playlists</Text>
    </View>
    {playlists.map((item) => (
      <PlaylistCard
        key={item.id}
        id={item.id}
        title={item.title}
        description={item.description}
        image={item.image}
        onClick={() => router.push(`/songs?playlistId=${item.id}`)}
        cardColor={colors.card}
        textColor={colors.text}
        descColor={colors.description}
        accent={colors.accent}
      />
    ))}
  </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    margin: 20,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    borderRadius: 8,
    marginBottom: 16,
    alignItems: "center",
    padding: 12,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 8,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  desc: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default PlaylistScreen;
