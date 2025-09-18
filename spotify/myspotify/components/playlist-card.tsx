import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from "expo-router";
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
type PlaylistCardProps = {
	id: string;
	image: any;
	title: string;
	description: string;
	onClick?: () => void;
};

const styles = StyleSheet.create({
	card: {	
		flexDirection: 'row',
		backgroundColor: '#181818',
		borderRadius: 8,
		marginBottom: 16,
		alignItems: 'center',
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
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
	desc: {
		color: '#b3b3b3',
		fontSize: 14,
		marginTop: 4,
	},
	removeBtn: {
		backgroundColor: '#b71c1c',
		borderRadius: 6,
		padding: 6,
		marginTop: 8,
		alignSelf: 'flex-start',
	},
});


const PlaylistCard: React.FC<PlaylistCardProps> = ({ id, image, title, description, onClick }) => {
	type RootStackParamList = {
		songs: { playlistId: string };
		// add other routes here if needed
	};
	const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'songs'>>();
	return (
		<TouchableOpacity style={styles.card} onPress={onClick}>
			<Image source={image} style={styles.image} />
			<View style={styles.info}>
				<Text style={styles.title}>{title}</Text>
				<Text style={styles.desc}>{description}</Text>
			</View>
		</TouchableOpacity>
	);
}

export default PlaylistCard;
