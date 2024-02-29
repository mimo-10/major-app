/** @format */

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	TouchableOpacity,
	PanResponder,
} from "react-native";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Clock from "../assets/clock.svg";
import Star from "../assets/star.svg";
import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	withSpring,
	runOnJS,
} from "react-native-reanimated";
import {
	Gesture,
	GestureDetector,
	Simultaneous,
} from "react-native-gesture-handler"; //Here

const { width, height } = Dimensions.get("screen");
let h = 0;
const ClassComp = ({ classData, theme, mainRef }) => {
	const swipeX = useSharedValue(0);
	const animatedswipeX = useAnimatedStyle(() => {
		return { transform: [{ translateX: swipeX.value }] };
	});
	const { t } = useTranslation();
	const week = () => {
		return 6;
	};

	const tap = Gesture.Tap().onStart(() => {
		console.log("000");
	});
	const [oldPos, setoldPos] = useState(0);
	const panGesture = Gesture.Pan()
		.simultaneousWithExternalGesture(mainRef)
		.onStart((event) => {})
		.onUpdate((e) => {
			swipeX.value = oldPos + e.translationX;
		})
		.onEnd((e) => {
			h = e.translationX;
			if (h > 100) {
				// redirect to pay
				h = 60;
				swipeX.value = withTiming(h);
			} else {
				h = 0;
				swipeX.value = withTiming(0);
			}
			runOnJS(setoldPos)(h);
		});

	const composed = Gesture.Simultaneous(tap, panGesture);

	return (
		<TouchableOpacity
			activeOpacity={0.85}
			onPress={() => {}}
			style={{
				backgroundColor: classData.color,
				width: width * 0.9,
				overflow: "hidden",
				borderRadius: height / 70,
				justifyContent: "flex-end",
				alignItems: "flex-end",
				flexDirection: "row",
			}}
		>
			<Animated.View>
				<View
					style={{
						width: 20,
						height: 30,
						backgroundColor: "red",
						position: "absolute",
						top: 0,
						left: 0,
						zIndex: 2,
					}}
				></View>
			</Animated.View>
			<GestureDetector gesture={composed}>
				<Animated.View
					style={[
						{
							backgroundColor: theme.main,
							width: width * 0.88,
							borderRadius: 5,
							padding: height / 70,
							gap: height / 100,
						},
						animatedswipeX,
					]}
					// {...config}
				>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",

							// alignItems: "center",
						}}
					>
						<View>
							<Text
								style={{
									fontFamily: "f2SBold",
									fontSize: height / 58,
									color: theme.opp,
									flex: 1,
									// alignSelf: "flex-end",
									// backgroundColor: "red",
								}}
							>
								{classData.title}
							</Text>
						</View>

						<View
							style={{
								flexDirection: "row",
								alignItems: "center",
								gap: width * 0.02,
							}}
						>
							<View
								style={{
									backgroundColor: theme.opp,
									paddingHorizontal: 5,
									paddingVertical: 1.5,
									borderRadius: height / 68 / 2 + 10,
								}}
							>
								<Text
									style={{
										fontFamily: "f1Bold",
										fontSize: height / 68,
										color: theme.main,
									}}
								>
									{classData.level}
								</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Clock
									style={{
										transform: [{ scale: (height / 700) * 0.75 }],
										marginRight: 1,
									}}
									color={theme.opp}
								/>
								<Text
									style={{
										fontFamily: "f1Bold",
										fontSize: height / 68,
										color: theme.opp,
									}}
								>
									{week().toString() + t("Hrs")}
								</Text>
								<Text
									style={{
										fontFamily: "f1Regular",
										fontSize: height / 70,
										color: theme.secondary,
									}}
								>
									/{t("week")}
								</Text>
							</View>
							<View style={{ flexDirection: "row", alignItems: "center" }}>
								<Star />
								<Text
									style={{
										fontFamily: "f1Bold",
										fontSize: height / 68,
										color: theme.opp,
									}}
								>
									{classData.rating.toString()}
								</Text>
							</View>
						</View>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							alignItems: "center",
							gap: width / 100,
						}}
					>
						<Image
							style={{ width: height / 50, height: height / 50 }}
							source={{
								uri: classData.schoolImg,
							}}
						/>
						<Text
							style={{
								fontFamily: "f1Bold",
								fontSize: height / 68,
								color: theme.opp,
							}}
						>
							{classData.school}
						</Text>
					</View>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							alignItems: "center",

							alignSelf: "flex-end",
							backgroundColor: theme.bg,
							paddingHorizontal: 5,
							paddingVertical: 1.5,
							borderRadius: height / 68 / 2 + 10,
							gap: 2,
						}}
					>
						<Text
							style={{
								fontFamily: "f1Bold",
								fontSize: height / 45,

								color: theme.opp,
							}}
						>
							{classData.price}
						</Text>
						<Text
							style={{
								fontFamily: "f1Bold",
								fontSize: height / 68,
								color: theme.opp,
								textTransform: "capitalize",
							}}
						>
							{t("da")}
						</Text>
					</View>
				</Animated.View>
			</GestureDetector>
		</TouchableOpacity>
	);
};

export default ClassComp;

const styles = StyleSheet.create({});
