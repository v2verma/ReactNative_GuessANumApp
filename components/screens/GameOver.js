import React from 'react';
import { View, Text, Button, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';

import DefaultStyles from '../ruComponents/constant/default-style';
import Colors from '../ruComponents/constant/colors';
import MainButton from '../ruComponents/MainButton';

const GameOver = (props) => {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<Text style={DefaultStyles.titleText}>The Game is Over!</Text>
				<View style={styles.imgContainer}>
					<Image style={styles.img} source={require('../../assets/success.png')} resizeMode="cover" />
				</View>
				<View style={styles.resultContainer}>
					<Text style={styles.resultText}>
						Your Mobile needed
						<Text style={styles.highlight}>{props.roundsNumber}</Text>
						rounds to guess the number
						<Text style={styles.highlight}>{props.userNumber}</Text>
					</Text>
				</View>
				<MainButton style={styles.roundedBtn} onPress={() => props.onRestart()}>
					New Game
				</MainButton>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10
	},
	imgContainer: {
		width: Dimensions.get('window').width * 0.5,
		maxWidth: '80%',
		height: Dimensions.get('window').height * 0.27,
		borderRadius: Dimensions.get('window').width * 0.5,
		borderWidth: 3,
		borderColor: 'gray',
		overflow: 'hidden',
		marginVertical: Dimensions.get('window').height / 30
	},
	img: {
		width: '100%',
		height: '100%'
	},
	resultContainer: {
		marginHorizontal: 30,
		marginVertical: Dimensions.get('window').height / 60
	},
	resutText: {
		fontFamily: 'open-sans',
		textAlign: 'center',
		fontSize: Dimensions.get('window').height < 400 ? 16 : 20
	},
	highlight: {
		color: Colors.primary,
		fontFamily: 'open-sans-bold'
	},
	roundedBtn: {
		borderRadius: 25
	}
});

export default GameOver;
