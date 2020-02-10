import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, ScrollView, FlatList, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../ruComponents/NumberContainer';
import Card from '../ruComponents/Card';
import DefaultStyles from '../ruComponents/constant/default-style';
import MainButton from '../ruComponents/MainButton';

const generateRandomNumberBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndmNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndmNum === exclude) {
		return generateRandomNumberBetween(min, max, exclude);
	} else {
		return rndmNum;
	}
};

const GameScreen = (props) => {
	const initialGuess = generateRandomNumberBetween(1, 100, props.userChoice);
	const [ currentGuess, setCurrentGuess ] = useState(initialGuess);
	const [ pastGuesses, setPastGuesses ] = useState([ initialGuess.toString() ]);
	const [ availableDeviceWidth, setAvailableDeviceWidth ] = useState(Dimensions.get('window').width);
	const [ availableDeviceHeight, setAvailableDeviceHeight ] = useState(Dimensions.get('window').height);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		const updateLayout = () => {
			setAvailableDeviceWidth(Dimensions.get('window').width);
			setAvailableDeviceHeight(Dimensions.get('window').height);
		};
		Dimensions.addEventListener('change', updateLayout);

		return () => {
			Dimensions.removeEventListener('change');
		};
	});

	useEffect(
		() => {
			if (currentGuess === userChoice) {
				onGameOver(pastGuesses.length);
			}
		},
		[ currentGuess, userChoice, onGameOver ]
	);

	const handleNextGuess = (direction) => {
		if (
			(direction === 'lower' && currentGuess < props.userChoice) ||
			(direction === 'greater' && currentGuess > props.userChoice)
		) {
			Alert.alert("Don't lie!", 'Your Guess is Wrong', [ { text: 'Sorry!', style: 'cancel' } ]);
			return;
		}
		if (direction === 'lower') {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess;
		}
		const nextNumber = generateRandomNumberBetween(currentLow.current, currentHigh.current, currentGuess);
		setCurrentGuess(nextNumber);
		// setRounds((currentRounds) => currentRounds + 1);
		setPastGuesses((curPastGuesses) => [ nextNumber.toString(), ...curPastGuesses ]);
	};

	const renderListItem = (listLength, itemData) => {
		console.log(itemData);
		return (
			<View style={styles.listItem}>
				<Text style={DefaultStyles.bodyText}>#{listLength - itemData.index}</Text>
				<Text style={DefaultStyles.bodyText}>{itemData.item}</Text>
			</View>
		);
	};

	if (availableDeviceHeight < 500) {
		return (
			<View style={styles.screen}>
				<Text style={DefaultStyles.titleText}>Opponent's Guess</Text>
				<View style={styles.customStyle}>
					<MainButton
						style={styles.roundedBtn}
						onPress={() => handleNextGuess('lower')}
						size={24}
						color="white"
					>
						<Ionicons name="md-remove" />
					</MainButton>
					<NumberContainer>{currentGuess}</NumberContainer>
					<MainButton
						style={styles.roundedBtn}
						onPress={() => handleNextGuess('greater')}
						size={24}
						color="white"
					>
						<Ionicons name="md-add" />
					</MainButton>
				</View>
				<View style={styles.listContainer}>
					<FlatList
						contentContainerStyle={styles.list}
						keyExtractor={(item) => item}
						data={pastGuesses}
						renderItem={renderListItem.bind(this, pastGuesses.length)}
					/>
				</View>
			</View>
		);
	}

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.titleText}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.buttonContainer}>
				<MainButton style={styles.roundedBtn} onPress={() => handleNextGuess('lower')} size={24} color="white">
					<Ionicons name="md-remove" />
				</MainButton>
				<MainButton
					style={styles.roundedBtn}
					onPress={() => handleNextGuess('greater')}
					size={24}
					color="white"
				>
					<Ionicons name="md-add" />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) => {
						return renderListItem(guess, pastGuesses.length - index);
					})}
				</ScrollView> */}
				<FlatList
					contentContainerStyle={styles.list}
					keyExtractor={(item) => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: Dimensions.get('window').height > 600 ? 20 : 5,
		width: '80%'
	},
	roundedBtn: {
		borderRadius: 25
	},
	listContainer: {
		flex: 1,
		width: '80%'
	},
	list: {
		// alignItems: 'center',
		justifyContent: 'flex-end',
		flexGrow: 1
	},
	listItem: {
		width: '100%',
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 15,
		marginVertical: 10,
		backgroundColor: 'white',
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	customStyle: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
		width: '80%'
	}
});

export default GameScreen;
