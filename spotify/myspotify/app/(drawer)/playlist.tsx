import * as React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import PlaylistCard from "../../components/playlist-card";
const playlists = [
  {
    id: "1",
    title: "Chill Hits",
    description: "Relax and unwind with chill tunes.",
    image: require("../../images/shrek.jpg"),
  },
  {
    id: "2",
    title: "Top 50 Global",
    description: "The world’s biggest hits.",
    image: require("../../images/shrek.jpg"),
  },
  {
    id: "3",
    title: "Mood Booster",
    description: "Get happy with today’s dose of feel-good songs!",
    image: require("../../images/shrek.jpg"),
  },
];

const PlaylistScreen = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const renderItem = ({ item }: { item: (typeof playlists)[0] }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.desc}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          margin: 20,
          marginBottom: 0,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={{ marginRight: 12 }}
        >
          <Ionicons name="menu" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.header}>Playlists</Text>
      </View>
      {playlists.map((item) => (
        <PlaylistCard
          key={item.id}
          id={item.id}
          title={item.title}
          description={item.description}
          image={item.image}
          onClick={() => router.push(`/songs?playlistId=${item.id}`)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    margin: 20,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#181818",
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
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  desc: {
    color: "#b3b3b3",
    fontSize: 14,
    marginTop: 4,
  },
});

export default PlaylistScreen;
