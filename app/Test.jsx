/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";

const Test = ({ navigation }) => {
	return (
		<View>
			<Text onPress={() => navigation.navigate("Home")}>Test</Text>
		</View>
	);
};

export default Test;

const styles = StyleSheet.create({});
