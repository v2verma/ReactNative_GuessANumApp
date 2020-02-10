import React from 'react';
import { View, Text, TouchableOpacity, TouchableNativeFeedback, StyleSheet, Platform } from 'react-native';

import Colors from '../ruComponents/constant/colors';

const MainButton = (props) => {
	let ButtonComponent = TouchableOpacity;

	if (Platform.OS === 'android' && Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback;
	}

	return (
		<View style={styles.btnContainer}>
			<ButtonComponent activeOpacity={0.7} onPress={props.onPress}>
				<View style={{ ...styles.button, ...props.style }}>
					<Text style={styles.buttonText}>{props.children}</Text>
				</View>
			</ButtonComponent>
		</View>
	);
};

const styles = StyleSheet.create({
	btnContainer: {
		borderRadius: 25,
		overflow: 'hidden'
	},
	button: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30
	},
	buttonText: {
		color: 'white',
		fontFamily: 'open-sans',
		fontSize: 18
	}
});

export default MainButton;
