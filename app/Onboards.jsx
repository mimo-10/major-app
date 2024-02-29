/** @format */

import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	Dimensions,
	Animated,
	TouchableOpacity,
	Pressable,
	StatusBar,
	TouchableWithoutFeedback,
} from "react-native";
import React, { useRef } from "react";

import { Link, router } from "expo-router";
import { colors } from "../src/constants/styles";

import { LinearGradient } from "expo-linear-gradient";
import Realm from "realm";
import { useRealm } from "@realm/react";

const bgs = ["#fff", "#fffffe", "#fffeff"];
const DATA = [
	{
		title: "Welcome to MAJOR",
		description:
			"Welcome, where you can find your favorite Classroom, Teacher, location and price",
		image: require("../src/assets/onboard1.png"),
		key: "0200",
	},
	{
		title: `MAJOR helps you be best`,
		description: "Get a motivating continous environnement with your teachers",
		image: require("../src//assets/onboard2.png"),
		key: "1120",
	},
	{
		title: " Ease your Subscription",
		description: "Pick your favorite classroom, teacher, location and price",

		image: require("../src/assets/onboards3.png"),
		key: "00",
	},
];

const { width, height } = Dimensions.get("screen");

const Onboards = () => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const realm = useRealm();
	const listRef = useRef();
	let itemIndex = 0;
	// const backgroundColor = scrollX.interpolate({
	// 	inputRange: bgs.map((_, index) => index * width),
	// 	outputRange: bgs.map((bg) => bg),
	// });

	const skipOpacity = scrollX.interpolate({
		inputRange: [width, 2 * width],
		outputRange: [1, 0],
	});
	const textTransformOut = scrollX.interpolate({
		inputRange: [0, width, 2 * width],
		outputRange: [0, 0, width * 0.4 > 150 ? 150 : width * 0.4],
	});
	const textTransformIn = scrollX.interpolate({
		inputRange: [0, width, 2 * width],
		outputRange: [
			-(width * 0.4 > 150 ? 150 : width * 0.4),
			-(width * 0.4 > 150 ? 150 : width * 0.4),
			0,
		],
	});

	return (
		<View style={styles.container}>
			<StatusBar barStyle={"dark-content"} />
			<Pressable
				style={{
					marginTop: height / 14,

					alignSelf: "flex-end",
					marginRight: width / 10,
				}}
				android_disableSound={true}
				onPress={() => {
					listRef.current?.scrollToEnd();
				}}
			>
				<Animated.Text
					style={{
						fontSize: width / 17,
						alignSelf: "flex-end",

						opacity: skipOpacity,
						fontFamily: "f2SBold",
						color: colors.bColor,
					}}
				>
					Skip
				</Animated.Text>
			</Pressable>

			<Animated.FlatList
				bounces={false}
				bouncesZoom={false}
				ref={listRef}
				horizontal
				onViewableItemsChanged={({ changed, viewableItems }) => {
					itemIndex = viewableItems[0].index;
				}}
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={32}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false },
				)}
				pagingEnabled
				keyExtractor={(item) => item.key}
				data={DATA}
				renderItem={({ item, index }) => {
					const Viewopacity = scrollX.interpolate({
						inputRange: [0, width, width * 2],
						outputRange: [0, 1, 0],
					});
					const Titleopacity = scrollX.interpolate({
						inputRange: [
							(index - 1) * width,
							index * width,
							width * (index + 1),
						],
						outputRange: [0, 1, 0],
					});

					return (
						<Animated.View
							style={{
								alignItems: "center",
								display: "flex",
								width: width,
								height: (height * 3) / 5,
								// backgroundColor: "red",
								justifyContent: "center",
							}}
							key={index}
						>
							<Animated.View style={styles.main}>
								<Animated.Image
									source={item.image}
									style={{
										width: (5 * width) / 6,
										height: 225,
										resizeMode: "contain",
										opacity: Titleopacity,
									}}
								/>
							</Animated.View>

							<Animated.Text
								style={[
									styles.title,
									// { color: backgroundColor },
									{ opacity: Titleopacity },
								]}
							>
								{item.title}
							</Animated.Text>
							<Animated.Text
								style={[styles.discription, { opacity: Titleopacity }]}
							>
								{item.description}
							</Animated.Text>
						</Animated.View>
					);
				}}
			/>
			<View
				style={{
					flexDirection: "row",
					display: "flex",
					alignItems: "center",
					justifyContent: "space-between",
					gap: 7,
					marginBottom: height / 23,

					width: width,
					paddingHorizontal: width / 8.5,
				}}
			>
				<View
					style={{
						flexDirection: "row",
						display: "flex",
						alignItems: "center",
						gap: 12,
					}}
				>
					{DATA.map((_, index) => {
						const indecator = scrollX.interpolate({
							inputRange: [
								(index - 2) * width,
								(index - 1) * width,
								index * width,
								width * (index + 1),
								width * (index + 2),
							],
							outputRange: [0.7, 0.9, 1.2, 0.9, 0.7],
							extrapolate: "clamp",
						});
						const widthAnimation = scrollX.interpolate({
							inputRange: [
								(index - 1) * width,
								index * width,
								width * (index + 1),
							],
							outputRange: [10, 14, 10],
							extrapolate: "clamp",
						});

						const Indecatoropacity = scrollX.interpolate({
							inputRange: [
								(index - 2) * width,
								(index - 1) * width,
								index * width,
								width * (index + 1),
								width * (index + 2),
							],
							outputRange: [0.3, 0.6, 1, 0.7, 0.5],
						});

						return (
							<Animated.View
								key={index * 2}
								style={{
									backgroundColor: colors.d2Color,
									borderRadius: 4,
									height: 8,
									opacity: Indecatoropacity,
									flexDirection: "row",
									transform: [{ scale: indecator }],
									width: widthAnimation,
								}}
							></Animated.View>
						);
					})}
				</View>

				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						if (itemIndex < 2) {
							listRef.current?.scrollToIndex({
								index: itemIndex + 1,
								Animated: true,
							});
						} else {
							// const val = SyncStorage.set(
							// 	"didOnboarding",

							// 	"true",
							// );
							// const onboardCheck = async () => {
							// 	return await AsyncStorage.setItem("didOnboard", "true");
							// };
							realm.write(() => {
								realm.create("Onboard", { _id: "1", state: true });
							});

							router.replace("/Login");
						}
					}}
				>
					<LinearGradient
						colors={[colors.d2Color, colors.d1Color]}
						style={{
							display: "flex",
							flexDirection: "row-reverse",
							gap: 10,

							justifyContent: "center",
							alignItems: "center",
							width: width * 0.4 > 150 ? 150 : width * 0.4,
							height: height / 14 > 50 ? 50 : height / 14,
							overflow: "hidden",
							borderRadius: 10,
							padding: 15,
						}}
					>
						<Animated.Text
							style={{
								transform: [{ translateX: textTransformIn }],
								position: "absolute",
								fontSize: width * 0.05,
								color: colors.wColor,
								fontFamily: "f2Bold",
							}}
						>
							Get Started
						</Animated.Text>
						<Animated.Text
							style={{
								transform: [{ translateX: textTransformOut }],
								position: "absolute",
								fontSize: width * 0.05,
								color: colors.wColor,
								textTransform: "capitalize",
								fontFamily: "f1Bold",
							}}
						>
							next
						</Animated.Text>
					</LinearGradient>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default Onboards;

const styles = StyleSheet.create({
	container: {
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "space-between",
		width: width,
		height: height,
		paddingBottom: height * 0.1,
		display: "flex",
		gap: 10,
	},
	title: {
		fontSize: width / 11,
		fontFamily: "f1Bold",
		marginBottom: 8,
		paddingHorizontal: width * 0.08,
		textAlign: "center",
		color: colors.d2Color,
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	main: {
		display: "flex",
		marginBottom: height * 0.06,
		justifyContent: "center",
		alignItems: "center",
	},
	discription: {
		paddingHorizontal: width * 0.1,
		flexWrap: "wrap",
		textAlign: "center",
		fontSize: width / 23,
		color: colors.bColor,
		fontFamily: "f1Regular",
	},
});
