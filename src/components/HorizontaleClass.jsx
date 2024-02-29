/** @format */
/** @format */

import {
	Text,
	View,
	Dimensions,
	Animated,
	TouchableOpacity,
} from "react-native";

import React from "react";

import { I18nManager } from "react-native";

import { colors } from "../../src/constants/styles";
import Clock from "../../src/assets/clock.svg";
import Day from "../../src/assets/day.svg";
import Classroom from "../../src/assets/class.svg";
import Skeleton from "react-native-reanimated-skeleton"; //// build
import { State } from "../../app/(tabs)/_layout";

const { width, height } = Dimensions.get("screen");

export default HorizontalClass = ({
	title,
	nextSession,
	leftedSession,
	location,
	id,
	color,
	focused,
	theme,
	router,
	index,
	len,
	mainRef,
}) => {
	const { SkeltonConfig } = State();
	const labelTranslate = focused.interpolate({
		inputRange: I18nManager.isRTL
			? [
					(((len - index - 4) * width) / 2) * 0.85,
					(((len - index - 3) * width) / 2) * 0.85,
					((len - index - 2) * width * 0.85) / 2,
					((len - index - 1) * width * 0.85) / 2,
					((len - index) * width * 0.85) / 2,
			  ]
			: [
					((index - 2) * width * 0.85) / 2,
					((index - 1) * width * 0.75) / 2,
					(index * width * 0.85) / 2,
					((index + 1) * width * 0.85) / 2,
					((index + 2) * width * 0.85) / 2,
			  ],
		outputRange: [
			0,
			(width * 0.33 * leftedSession) / 4,
			(width * 0.33 * leftedSession) / 4,
			(width * 0.33 * leftedSession) / 4,
			0,
		],
		extrapolate: "clamp",
	});

	return (
		<TouchableOpacity
			activeOpacity={0.85}
			style={{
				height: height / 3.5,
				borderRadius: 20,
				width: width * 0.4,
				padding: height / 40,
				backgroundColor: theme.main,
				justifyContent: "space-between",
				alignItems: "center",

				shadowColor: "#000",

				shadowOffset: {
					width: 0,
					height: 3,
				},
				shadowOpacity: 0.27,
				shadowRadius: 2.65,

				elevation: 4,
			}}
			onPress={() => {
				// router.push({ name: "", id });
			}}
		>
			<Text
				style={{
					fontFamily: "f1Bold",
					fontSize: height / 50,
					color: theme.opp,
				}}
			>
				{title}
			</Text>

			<View
				style={{
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "flex-start",
					gap: width * 0.05,
				}}
			>
				<View
					style={{ justifyContent: "center", alignItems: "center", gap: 2 }}
				>
					<Day color={theme.opp} />

					<Text
						style={{
							fontFamily: "f1Bold",
							fontSize: height / 58,
							color: theme.opp,
							width: width / 8,
						}}
					>
						{nextSession.split("T")[0]}
					</Text>
				</View>
				<View
					style={{ justifyContent: "center", alignItems: "center", gap: 2 }}
				>
					<Clock color={theme.opp} />
					<Text
						style={{
							fontFamily: "f1Bold",
							fontSize: height / 58,
							color: theme.opp,
						}}
					>
						{nextSession.split("T")[1]}
					</Text>
				</View>
			</View>

			<View
				style={{
					justifyContent: "flex-start",
					width: width * 0.33,
					height: 8,
					borderRadius: 4,
					backgroundColor: theme.secondary,
				}}
			>
				<Animated.View
					style={{
						width: labelTranslate,
						height: height / 87,
						borderRadius: height / 87 / 2,
						backgroundColor: color,
					}}
				/>
			</View>

			<View
				style={{
					justifyContent: "space-between",
					alignItems: "center",
					flexDirection: "row",
					width: width * 0.32,
				}}
			>
				<View
					style={{
						alignItems: "flex-end",
						flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
					}}
				>
					<Text
						style={{
							fontFamily: "f2SBold",
							fontSize: height / 24,
							color: theme.opp,
						}}
					>
						{leftedSession}
					</Text>
					<Text
						style={{
							fontFamily: "f2SBold",
							fontSize: height / 50,
							color: theme.opp,
						}}
					>
						/4
					</Text>
				</View>

				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						// console.log(location);
					}}
					style={{ backgroundColor: color, padding: 10, borderRadius: 30 }}
				>
					<Classroom
						style={{ transform: [{ scale: (height / 700) * 0.9 }] }}
						color={colors.bColor}
					/>
				</TouchableOpacity>
			</View>
		</TouchableOpacity>
	);
};
