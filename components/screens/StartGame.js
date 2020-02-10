import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
	StyleSheet,
	Dimensions,
	KeyboardAvoidingView,
	ScrollView
} from 'react-native';

import MainButton from '../ruComponents/MainButton';
import Card from '../ruComponents/Card';
import Input from '../ruComponents/Input';
import NumberContainer from '../ruComponents/NumberContainer';
import Colors from '../ruComponents/constant/colors';

const StartGame = (props) => {
	const [ enteredValue, setEnteredValue ] = useState('');
	const [ selectedNumber, setSelectedNumber ] = useState();
	const [ confirmed, setConfirmed ] = useState(false);
	const [ buttonWidth, setButtonWidth ] = useState(Dimensions.get('window').width / 4);

	const handleNumInput = (inputText) => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ''));
	};

	const handleReset = () => {
		setEnteredValue('');
		setConfirmed(false);
	};

	const handleConfirmation = () => {
		const selectedNum = parseInt(enteredValue);
		if (isNaN(selectedNum) || selectedNum <= 0) {
			Alert.alert('Invalid Number', 'Number between 1 to 99', [
				{ text: 'Okay', style: 'destructive', onPress: handleReset }
			]);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(selectedNum);
		setEnteredValue('');
		Keyboard.dismiss();
	};

	const renderConfirmationCard = () => {
		return (
			<Card style={styles.summaryContainer}>
				<Text>Selected Number</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>
				<MainButton style={styles.roundedBtn} onPress={() => props.onStartGame(selectedNumber)}>
					START GAME
				</MainButton>
			</Card>
		);
	};

	useEffect(() => {
		const updateLayout = () => {
			setButtonWidth(Dimensions.get('window').width / 4);
		};

		Dimensions.addEventListener('change', updateLayout);
		return () => {
			Dimensions.removeEventListener('change', updateLayout);
		};
	});

	return (
		<ScrollView>
			<KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
				<TouchableWithoutFeedback
					onPress={() => {
						Keyboard.dismiss();
					}}
				>
					<View style={styles.screen}>
						<Text style={styles.title}>Start a New Game</Text>
						<Card style={styles.inputContainer}>
							<Text style={styles.startgameTitle}>Enter a Number</Text>
							<Input
								style={styles.input}
								blurOnSubmit
								autoCapitalize="none"
								autoCorrect={false}
								keyboardType="number-pad"
								maxLength={2}
								onChangeText={handleNumInput}
								value={enteredValue}
							/>
							<View style={styles.buttonContainer}>
								<View style={{ width: buttonWidth }}>
									<Button title="Reset" color={Colors.secondary} onPress={handleReset} />
								</View>
								<View style={{ width: buttonWidth }}>
									<Button title="Confirm" color={Colors.primary} onPress={handleConfirmation} />
								</View>
							</View>
						</Card>
						{confirmed ? renderConfirmationCard() : null}
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		padding: 10,
		alignItems: 'center'
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
		fontFamily: 'open-sans-bold'
	},
	inputContainer: {
		width: '80%',
		maxWidth: '95%',
		minWidth: 300,
		alignItems: 'center'
	},
	buttonContainer: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'space-between',
		paddingHorizontal: 20
	},
	// button: {
	// 	// width: 100
	// 	// width: Dimensions.get('window').width / 3
	// },
	input: {
		width: 50,
		textAlign: 'center',
		height: 30,
		borderBottomColor: 'gray',
		borderBottomWidth: 1,
		marginVertical: 10
	},
	summaryContainer: {
		width: '80%',
		marginTop: 20,
		alignItems: 'center'
	},
	startgameTitle: {
		fontFamily: 'open-sans'
	},
	roundedBtn: {
		borderRadius: 25
	}
});

export default StartGame;
