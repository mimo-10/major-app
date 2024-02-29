/** @format */

import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Dimensions,
	FlatList,
	Image,
	Animated,
	TouchableOpacity,
	ActivityIndicator,
} from "react-native";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "react-native";
import Realm from "realm";
import { useRealm, useQuery } from "@realm/react";
import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";
import RNRestart from "react-native-restart";
import { State } from "./_layout";
import Menu from "../../src/assets/menu.svg";
import FastImage from "react-native-fast-image";
import { toTitleCase } from "../../src/utils";
import { colors } from "../../src/constants/styles";

import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";

import Skeleton from "react-native-reanimated-skeleton"; //// build

import { getAds, getQuote } from "../../src/utils/response";

import Home1 from "../../src/components/Home1";
import Home2 from "../../src/components/Home2";
import Ads from "../../src/components/Ads";
import HomeHeader from "../../src/components/HomeHeader";

const { width, height } = Dimensions.get("screen");

const Home = ({ navigation }) => {
	const mainRef = useRef(null);

	const { t, i18n } = useTranslation();
	const { theme, dark, setdark, user } = State();
	const router = useRouter();
	const [Index, setIndex] = useState(0);

	console.log("tets");
	return (
		<View style={[styles.container, { backgroundColor: theme.bg }]}>
			<StatusBar barStyle={"dark-content"} />

			<View
				style={{
					justifyContent: "space-between",
					paddingVertical: height / 47,
					paddingHorizontal: height / 28,
					width: width,
					flexDirection: "row",
				}}
			>
				<Menu
					color={theme.opp}
					onPress={() => {
						setdark(!dark);
						// i18n.changeLanguage("ar");
						// I18nManager.forceRTL(false);
						// I18nManager.allowRTL(false);
						// RNRestart.restart();
					}}
					style={{ transform: [{ scale: height / 700 }] }}
				/>

				<Pressable onPress={() => {}}>
					<Image
						style={{
							width: height / 17.5,
							height: height / 17.5,
							borderRadius: height / 70,
						}}
						source={{
							uri: user.pic,
						}}
					/>
				</Pressable>
			</View>

			<ScrollView
				contentContainerStyle={{ justifyContent: "center" }}
				style={[
					{
						width: width,
						height: height,

						display: "flex",
						gap: height / 700,
					},
					{ backgroundColor: theme.bg },
				]}
				ref={mainRef}
			>
				<HomeHeader />
				<Ads />
				<View
					style={{
						marginVertical: height / 37,
						gap: height / 50,

						alignItems: "center",
					}}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "flex-end",
							width: 0.85 * width,
						}}
					>
						<Text
							style={{
								fontFamily: "f1Bold",
								fontSize: height / 43,
								textTransform: "capitalize",
								color: theme.opp,
							}}
						>
							{t("upcoming classes")}
						</Text>
						<TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
							<Text
								style={{
									fontFamily: "f2SBold",
									fontSize: height / 58,
									textTransform: "capitalize",
									color: theme.opp,
								}}
							>
								{t("see more")}
							</Text>
						</TouchableOpacity>
					</View>
					<Home1 mainRef={mainRef} />

					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "flex-end",
							width: 0.85 * width,
						}}
					>
						<Text
							style={{
								fontFamily: "f1Bold",
								fontSize: height / 43,
								textTransform: "capitalize",
								color: theme.opp,
							}}
						>
							{t("recommended classes")}
						</Text>
						<TouchableOpacity activeOpacity={0.6} onPress={() => {}}>
							<Text
								style={{
									fontFamily: "f2SBold",
									fontSize: height / 58,
									textTransform: "capitalize",
									color: theme.opp,
								}}
							>
								{t("see more")}
							</Text>
						</TouchableOpacity>
					</View>
					<Home2 mainRef={mainRef} />
				</View>

				<View></View>
				<View></View>
			</ScrollView>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({
	container: {
		// backgroundColor: "red",
		alignItems: "center",
		// justifyContent: "center",
		width: width,
		height: height,

		display: "flex",
		gap: height / 700,
	},
});
