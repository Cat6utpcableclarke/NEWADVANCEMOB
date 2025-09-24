import * as React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type PlaylistCardProps = {
	id: string;
	image: any;
	title: string;
	description: string;
	onClick?: () => void;
	cardColor?: string;
    textColor?: string;
    descColor?: string;
    accent?: string;
};

const styles = StyleSheet.create({
	card: {	
		flexDirection: 'row',
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
		fontSize: 18,
		fontWeight: '600',
	},
	desc: {
		fontSize: 14,
		marginTop: 4,
	},
	removeBtn: {
		borderRadius: 6,
		padding: 6,
		marginTop: 8,
		alignSelf: 'flex-start',
	},
});


const PlaylistCard: React.FC<PlaylistCardProps> = ({
    id,
    image,
    title,
    description,
    onClick,
    cardColor = '#181818',
    textColor = '#fff',
    descColor = '#b3b3b3',
    accent = '#1DB954',
}) => {
    return (
        <TouchableOpacity style={[styles.card, { backgroundColor: cardColor }]} onPress={onClick}>
            <Image source={image} style={styles.image} />
            <View style={styles.info}>
                <Text style={[styles.title, { color: textColor }]}>{title}</Text>
                <Text style={[styles.desc, { color: descColor }]}>{description}</Text>
            </View>
        </TouchableOpacity>
    );
};
export default PlaylistCard;
