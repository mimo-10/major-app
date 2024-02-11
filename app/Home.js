/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "react-native";

const Home = ({ navigation }) => {
	return (
		<View>
			<StatusBar />
			<Link href='/Test'>Home</Link>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({});
