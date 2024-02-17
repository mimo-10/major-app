/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { StatusBar } from "react-native";
import Realm from "realm";
import { useRealm, useQuery } from "@realm/react";

const Home = ({ navigation }) => {
	const realm = useRealm();
	const data = useQuery("User", (data) => {
		return data;
	});
	console.log(data[0]);
	return (
		<View>
			<StatusBar />
			<Link href='/Test'>{data[0].function}</Link>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({});
