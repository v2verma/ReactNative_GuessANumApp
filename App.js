import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import Header from './components/Header';
import StartGame from './components/screens/StartGame';
import GameScreen from './components/screens/GameScreen';
import GameOver from './components/screens/GameOver';

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
	});
};

export default function App() {
	const [ userNumber, setUserNumber ] = useState();
	const [ guessedRounds, setGuessedRounds ] = useState(0);
	const [ assetsLoaded, setAssetsLoaded ] = useState(false);

	if (!assetsLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setAssetsLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}

	const handleNewGame = () => {
		setGuessedRounds(0);
		setUserNumber(null);
	};

	const handleStartGame = (selectedNumber) => {
		setUserNumber(selectedNumber);
	};

	const handleGameOver = (numOfRounds) => {
		setGuessedRounds(numOfRounds);
	};

	let content = <StartGame onStartGame={handleStartGame} />;

	if (userNumber && guessedRounds <= 0) {
		content = <GameScreen userChoice={userNumber} onGameOver={handleGameOver} />;
	} else if (guessedRounds > 0) {
		content = <GameOver userNumber={userNumber} roundsNumber={guessedRounds} onRestart={handleNewGame} />;
	}

	return (
		<SafeAreaView style={styles.root}>
			<Header title="Guess a Number" />
			{content}
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	root: {
		flex: 1
	}
});
