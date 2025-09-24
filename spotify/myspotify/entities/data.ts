
type Song = { id: string; title: string };
type Playlist = { id: string; title: string; image: any; description: string; songs: Song[] };
type UserData = { id: string; name: string; email: string ; password: string ; genre: string ; profilePicture: any ; playlists: Playlist[] };
const userData: UserData[] = [
  {
    id: '1',
    name: 'Shrek_1',
    email: 'Shrek@gmail.com',
    password: 'password123',
    genre: '',
    profilePicture: require('../images/shrek.jpg'), 
  playlists: [
    {
      id: '1',
      title: 'Chill Hits',
      image: require('../images/shrek.jpg'),
      description: 'Relax and unwind with these chill tunes.',
      songs: [
        { id: 's1', title: 'Song A' },
        { id: 's2', title: 'Song B' },
      ],
    },
    {
      id: '2',
      title: 'Top 50 Global',
        image: require('../images/shrek.jpg'),
        description: 'The hottest tracks around the world right now.',
      songs: [
        { id: 's3', title: 'Song C' },
        { id: 's4', title: 'Song D' },
      ],
    },
    {
      id: '3',
      title: 'Mood Booster',
        image: require('../images/shrek.jpg'),
        description: 'Feel good with these upbeat songs.',
      songs: [
        { id: 's5', title: 'Song E' },
      ],
    },
  ],
},
  // Add more users as needed
];
export { Playlist, Song, userData, UserData };

