import { useRoute } from '@react-navigation/native';
import * as React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useReducer } from 'react';
import Animated, { Layout, FadeIn, FadeOut } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
type Song = { id: string; title: string };
type Playlist = { id: string; title: string; songs: Song[] };

const savePlaylists = async (playlists: Playlist[]) => {
  try {
    await AsyncStorage.setItem('playlists', JSON.stringify(playlists));
  } catch (e) {
    // handle error
  }
};
const playlists: Playlist[] = [
  {
    id: '1',
    title: 'Chill Hits',
    songs: [
      { id: 's1', title: 'Song A' },
      { id: 's2', title: 'Song B' },
    ],
  },
  {
    id: '2',
    title: 'Top 50 Global',
    songs: [
      { id: 's3', title: 'Song C' },
      { id: 's4', title: 'Song D' },
    ],
  },
  {
    id: '3',
    title: 'Mood Booster',
    songs: [
      { id: 's5', title: 'Song E' },
    ],
  },
];

type State = Playlist[];
type Action =
  | { type: 'ADD_SONG'; playlistId: string; song: Song }
  | { type: 'REMOVE_SONG'; playlistId: string; songId: string }
  | { type: 'UNDO'; history: State[] }
  | { type: 'REDO'; future: State[] }
  | { type: 'INIT'; playlists: Playlist[] };

function reducer(state: State, action: Action): State {
  let newState: State = state;
  switch (action.type) {
    case 'ADD_SONG': {
      const { playlistId, song } = action;
      newState = state.map(p =>
        p.id === playlistId
          ? { ...p, songs: [...p.songs, song] }
          : p
      );
      break;
    }
    case 'REMOVE_SONG': {
      const { playlistId, songId } = action;
      newState = state.map(p =>
        p.id === playlistId
          ? { ...p, songs: p.songs.filter(s => s.id !== songId) }
          : p
      );
      break;
    }
    case 'UNDO': {
      if (action.history && action.history.length > 0) {
        newState = action.history[action.history.length - 1];
      }
      break;
    }
    case 'REDO': {
      if (action.future && action.future.length > 0) {
        newState = action.future[0];
      }
      break;
    }
    case 'INIT': {
      newState = action.playlists;
      break;
    }
    default:
      break;
  }
  // Always persist playlists after any change except INIT
  if (action.type !== 'INIT') {
    savePlaylists(newState);
  }
  return newState;
}

const SongsScreen: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, playlists);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [newSongTitle, setNewSongTitle] = React.useState('');
  const [history, setHistory] = React.useState<State[]>([]);
  const [future, setFuture] = React.useState<State[]>([]);
  const route = useRoute();
  const { playlistId } = route.params as { playlistId: string };
  const playlist = state.find((p: Playlist) => p.id === playlistId);
  
  React.useEffect(() => {
  const loadPlaylists = async () => {
    const data = await AsyncStorage.getItem('playlists');
    if (data) {
      dispatch({ type: 'INIT', playlists: JSON.parse(data) });
    }
  };
  loadPlaylists();
}, []);
  if (!playlist) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Playlist not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{playlist.title} Songs</Text>
      <FlatList
        data={playlist.songs}
        keyExtractor={item => item.id}
        renderItem={({ item }: { item: Song }) => (
          <Animated.View 
          layout={Layout.springify()}
          entering={FadeIn}
          exiting={FadeOut}
          style={styles.songRow}>
            <Text style={styles.songTitle}>{item.title}</Text>
            <TouchableOpacity
              style={styles.removeBtn}
              onPress={() => {
                setHistory([...history, state]);
                dispatch({ type: 'REMOVE_SONG', playlistId, songId: item.id });
              }}
            >
              <Text style={{ color: '#fff' }}>Remove</Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        ListEmptyComponent={<Text style={{ color: '#888', textAlign: 'center', marginTop: 32 }}>No songs in this playlist.</Text>}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.spotifyBtn}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.btnText}>Add Song</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spotifyBtn}
          onPress={() => {
            if (history.length > 0) {
              setFuture([state, ...future]);
              dispatch({ type: 'UNDO', history });
              setHistory(history.slice(0, -1));
            }
          }}
        >
          <Text style={styles.btnText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.spotifyBtn}
          onPress={() => {
            if (future.length > 0) {
              setHistory([...history, state]);
              dispatch({ type: 'REDO', future });
              setFuture(future.slice(1));
            }
          }}
        >
          <Text style={styles.btnText}>Redo</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add Song</Text>
            <TextInput
              style={styles.input}
              placeholder="Song Title"
              placeholderTextColor="#888"
              value={newSongTitle}
              onChangeText={setNewSongTitle}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity
                style={styles.spotifyBtn}
                onPress={() => {
                  if (newSongTitle.trim()) {
                    setHistory([...history, state]);
                    dispatch({
                      type: 'ADD_SONG',
                      playlistId,
                      song: { id: Date.now().toString(), title: newSongTitle },
                    });
                    setNewSongTitle('');
                    setModalVisible(false);
                  }
                }}
              >
                <Text style={styles.btnText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.spotifyBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  header: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  songRow: {
    backgroundColor: '#181818',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  songTitle: {
    color: '#fff',
    fontSize: 16,
    flex: 1,
  },
  removeBtn: {
    backgroundColor: '#b71c1c',
    borderRadius: 6,
    padding: 8,
    marginLeft: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  spotifyBtn: {
    backgroundColor: '#1DB954',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 4,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#181818',
    borderRadius: 12,
    padding: 24,
    width: '80%',
  },
  modalTitle: {
    color: '#1DB954',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 8,
    padding: 10,
    marginBottom: 18,
    fontSize: 16,
  },
});
export default SongsScreen;