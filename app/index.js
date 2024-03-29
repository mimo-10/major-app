/** @format */
import "react-native-gesture-handler";
import React, { useCallback, useEffect, useState, useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import {
	GestureHandlerRootView,
	TapGestureHandler,
	GestureDetector,
	Gesture,
} from "react-native-gesture-handler";
import Animated, { useSharedValue } from "react-native-reanimated";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./(tabs)/Home";
import Test from "./Test";
// import { Link } from "@react-navigation/native";
import { Link, Redirect, router } from "expo-router";

import { useQuery, useRealm } from "@realm/react";

SplashScreen.preventAutoHideAsync();

let customFonts = {
	f1Black: require("../src/assets/fonts/Metropolis-Black.otf"),
	f1Bold: require("../src/assets/fonts/Metropolis-Bold.otf"),
	f1Regular: require("../src/assets/fonts/Metropolis-Regular.otf"),
	f1Medium: require("../src/assets/fonts/Metropolis-Medium.otf"),
	f1Thin: require("../src/assets/fonts/Metropolis-Thin.otf"),
	f2Black: require("../src/assets/fonts/Gilroy-Black.ttf"),
	f2Bold: require("../src/assets/fonts/Gilroy-Bold.ttf"),
	f2Regular: require("../src/assets/fonts/Gilroy-Regular.ttf"),
	f2Medium: require("../src/assets/fonts/Gilroy-Medium.ttf"),
	f2Thin: require("../src/assets/fonts/Gilroy-Thin.ttf"),
	f2SBold: require("../src/assets/fonts/Gilroy-SemiBold.ttf"),
};

export default function Page() {
	const [appIsReady, setAppIsReady] = useState(false);
	const realm = useRealm();
	useEffect(() => {
		async function prepare() {
			try {
				// realm.write(() => {
				// 	realm.deleteAll();
				// });

				await Font.loadAsync(customFonts);
				// await new Promise((resolve) => setTimeout(resolve, 20));
			} catch (e) {
				console.warn(e);
			} finally {
				setAppIsReady(true);
			}
		}
		prepare();
	}, []);
	let state = useQuery("Onboard", (states) => {
		return states;
	});

	let user = useQuery("User", (data) => {
		return data;
	});
	state = state[0] ? state[0].state : false;
	console.log(state, user.length);
	const onLayoutRootView = useCallback(async () => {
		if (appIsReady) {
			await SplashScreen.hideAsync();
		}
	}, [appIsReady]);

	if (!appIsReady) {
		return null;
	}

	if (!state) {
		return <Redirect href={"/Onboards"} />;
	} else if (user.length) {
		return <Redirect href={"/Home"} />;
	} else {
		return <Redirect href={"/Login"} />;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		padding: 24,
	},
	tap: { flex: 1, backgroundColor: "red" },
	main: {
		flex: 1,
		justifyContent: "center",
		maxWidth: 960,
		marginHorizontal: "auto",
	},
	title: {
		fontSize: 64,
		fontWeight: "bold",
	},
	subtitle: {
		fontSize: 36,
		fontFamily: "f1Bold",
		color: "#38434D",
	},
});
