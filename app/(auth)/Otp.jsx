/** @format */

import {
	StyleSheet,
	Text,
	View,
	StatusBar,
	Dimensions,
	TextInput,
	Animated,
	TouchableWithoutFeedback,
	Pressable,
	TouchableOpacity,
	KeyboardAvoidingView,
	ScrollView,
	Keyboard,
	ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { colors } from "../../src/constants/styles";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router, useLocalSearchParams } from "expo-router";
import CountDown from "react-native-countdown-component-maintained";
import { sendOtp, VerifyOtp } from "../../src/utils/response";
import { Toast } from "toastify-react-native";
import { useRealm } from "@realm/react";

const { width, height } = Dimensions.get("screen");

const Otp = (n) => {
	const ref1 = useRef(null);
	const ref2 = useRef(null);
	const ref3 = useRef(null);
	const ref4 = useRef(null);
	// const [timeIndecator, settimeIndecator] = useState({
	// 	seconds: "00",
	// 	min: "00",
	// });
	const [selectedInp, setselectedInp] = useState(null);
	const [code, setcode] = useState(["", "", "", ""]);
	const params = useLocalSearchParams();
	const [optSent, setoptSent] = useState(true);
	const [loading, setloading] = useState(false);
	const [sent, setsent] = useState(false);
	const [restartTimer, setrestartTimer] = useState(true);
	const realm = useRealm();

	const pressHandler = (event, index) => {
		if (event.nativeEvent.key === "Backspace") {
			if (index == 1 && code[1] == "") {
				ref1.current.focus();
			} else if (index == 2 && code[2] == "") {
				ref2.current.focus();
			} else if (index == 3 && code[3] == "") {
				ref3.current.focus();
			}
		}
	};
	// let indecatorSeconds = 0;
	// let indecatorMin = 0;
	// let seconds, min;
	// setInterval((time = 60) => {
	// 	indecatorSeconds += 1;
	// 	seconds =
	// 		toString(indecatorSeconds).length > 1
	// 			? toString(indecatorSeconds)
	// 			: "0" + toString(indecatorSeconds);
	// 	min =
	// 		toString(indecatorMin).length > 1
	// 			? toString(indecatorMin)
	// 			: "0" + toString(indecatorMin);
	// 	// settimeIndecator({
	// 	// 	seconds:
	// 	// 		toString(indecatorSeconds).length > 1
	// 	// 			? toString(indecatorSeconds)
	// 	// 			: "0" + toString(indecatorSeconds),
	// 	// 	min:
	// 	// 		toString(indecatorMin).length > 1
	// 	// 			? toString(indecatorMin)
	// 	// 			: "0" + toString(indecatorMin),
	// 	// });
	// 	if (indecatorSeconds >= 5 && indecatorSeconds % 5 == 0) {
	// 		indecatorMin += 1;
	// 	}
	// 	console.log(seconds, min);
	// }, 1000);
	let i;
	useEffect(() => {
		sendOtp(setoptSent, params.email, Toast, setsent);
	}, []);
	let setotp = () => {
		i = "";
		code.forEach((c) => {
			i += c;
		});
		return i;
	};

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<StatusBar barStyle={"dark-content"} />
			<TouchableWithoutFeedback
				style={{ width: width, flex: 1 }}
				touchSoundDisabled
				onPress={() => {
					return Keyboard.isVisible ? Keyboard.dismiss : null;
				}}
			>
				{optSent ? (
					<View
						style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
					>
						<ActivityIndicator size={"large"} color={colors.d1Color} />
					</View>
				) : !sent ? (
					<View
						style={{
							flex: 1,
							justifyContent: "flex-end",
							alignItems: "center",
							paddingVertical: height * 0.07,
							gap: height * 0.05,
						}}
					>
						<Text
							style={{ fontFamily: "f2SBold", paddingHorizontal: width * 0.15 }}
						>
							Failed to send, due to an unknown problem, please try again
						</Text>
						<TouchableOpacity
							style={{
								justifyContent: "center",
								alignItems: "center",
								width: 0.85 * width,
								height: 55,
								borderRadius: 15,
								overflow: "hidden",
								alignSelf: "center",
							}}
							activeOpacity={0.8}
							onPress={() => {
								sendOtp(setoptSent, params.email, Toast, setsent);
							}}
						>
							<LinearGradient
								style={{
									justifyContent: "center",
									alignItems: "center",
									width: 0.85 * width,
									height: 55,
									borderRadius: 15,
									overflow: "hidden",
								}}
								colors={[colors.d2Color, colors.d1Color]}
							>
								<Text
									style={{
										color: colors.wColor,
										fontSize: 22,
										fontFamily: "f1Bold",
									}}
								>
									Retry
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					</View>
				) : (
					<ScrollView bounces={false} contentContainerStyle={styles.container}>
						<StatusBar barStyle={"dark-content"} />
						<View
							style={{
								justifyContent: "center",
								alignItems: "center",
								gap: height * 0.05,

								flex: 0.75,
							}}
						>
							<View style={{ alignItems: "center" }}>
								<Text
									style={{
										fontFamily: "f1Bold",
										fontSize: width / 19,
										marginBottom: 10,
									}}
								>
									Verify your email address
								</Text>
								<Text
									style={{
										fontFamily: "f1Regular",
										fontSize: width / 22,
										textAlign: "center",
										width: width * 0.9,
									}}
								>
									We sent you a 4 digit code to verify your email address{" "}
									<Text
										style={{
											fontFamily: "f1Bold",
											fontSize: width / 22,

											width: width * 0.9,
										}}
									>
										({params.email}){" "}
									</Text>
									<Text
										style={{
											fontSize: width / 22,

											width: width * 0.9,
										}}
									>
										Please fill the field below.
									</Text>
								</Text>
							</View>
							<View style={{ flexDirection: "row", gap: width * 0.02 }}>
								<Pressable
									style={{
										backgroundColor: selectedInp == 1 ? "#eeeddd" : "#ddd",
										padding: 5,
										borderRadius: 5,
										width: width * 0.18,
										height: width * 0.2,
										justifyContent: "center",
										alignItems: "center",
										borderColor:
											selectedInp == 1 ? colors.a2Color : colors.bAColor,
										borderWidth: 2,
									}}
									onPress={() => {
										ref1.current.focus();
									}}
								>
									<TextInput
										style={{ fontFamily: "f2Bold", fontSize: 35 }}
										placeholder='_'
										maxLength={1}
										ref={ref1}
										keyboardType='decimal-pad'
										onFocus={(index) => {
											setselectedInp(1);
										}}
										onChangeText={(text) => {
											setcode((prevState) => {
												prevState[0] = text;
												return prevState;
											});
											if (text) {
												ref2.current.focus();
											}
										}}
									/>
								</Pressable>
								<Pressable
									style={{
										backgroundColor: selectedInp == 2 ? "#eeeddd" : "#ddd",
										padding: 5,
										borderRadius: 5,
										width: width * 0.18,
										height: width * 0.2,
										justifyContent: "center",
										alignItems: "center",
										borderColor:
											selectedInp == 2 ? colors.a2Color : colors.bAColor,
										borderWidth: 2,
									}}
									onPress={() => {
										ref2.current.focus();
									}}
								>
									<TextInput
										style={{ fontFamily: "f2Bold", fontSize: 35 }}
										placeholder='_'
										maxLength={1}
										ref={ref2}
										key={"2"}
										keyboardType='decimal-pad'
										onFocus={(index) => {
											setselectedInp(2);
										}}
										onChangeText={(text) => {
											setcode((prevState) => {
												let arr = prevState;
												arr[1] = text;
												return arr;
											});
											if (text) {
												ref3.current.focus();
											}
										}}
										onKeyPress={(e) => pressHandler(e, 1)}
									/>
								</Pressable>
								<Pressable
									style={{
										backgroundColor: selectedInp == 3 ? "#eeeddd" : "#ddd",
										padding: 5,
										borderRadius: 5,
										width: width * 0.18,
										height: width * 0.2,
										justifyContent: "center",
										alignItems: "center",
										borderColor:
											selectedInp == 3 ? colors.a2Color : colors.bAColor,
										borderWidth: 2,
									}}
									onPress={() => {
										ref3.current.focus();
									}}
								>
									<TextInput
										style={{ fontFamily: "f2Bold", fontSize: 35 }}
										placeholder='_'
										maxLength={1}
										ref={ref3}
										key={"3"}
										keyboardType='decimal-pad'
										onFocus={(index) => {
											setselectedInp(3);
										}}
										onChangeText={(text) => {
											setcode((prevState) => {
												prevState[2] = text;
												return prevState;
											});
											if (text) {
												ref4.current.focus();
											}
										}}
										onKeyPress={(e) => pressHandler(e, 2)}
									/>
								</Pressable>
								<Pressable
									style={{
										backgroundColor: selectedInp == 4 ? "#eeeddd" : "#ddd",
										padding: 5,
										borderRadius: 5,
										width: width * 0.18,
										height: width * 0.2,
										justifyContent: "center",
										alignItems: "center",
										borderColor:
											selectedInp == 4 ? colors.a2Color : colors.bAColor,
										borderWidth: 2,
									}}
									onPress={() => {
										ref4.current.focus();
									}}
								>
									<TextInput
										style={{ fontFamily: "f2Bold", fontSize: 35 }}
										placeholder='_'
										maxLength={1}
										ref={ref4}
										keyboardType='decimal-pad'
										key={"4"}
										onFocus={(index) => {
											setselectedInp(4);
										}}
										onChangeText={(text) => {
											setcode((prevState) => {
												prevState[3] = text;
												return prevState;
											});
											console.log(code);
										}}
										onKeyPress={(e) => pressHandler(e, 3)}
									/>
								</Pressable>
							</View>
							<View style={{ justifyContent: "center", flexDirection: "row" }}>
								<Text
									style={{
										fontFamily: "f2Regular",
										fontSize: width / 22,
										textAlign: "center",
									}}
								>
									Didn’t get the code?
								</Text>
								<TouchableOpacity
									activeOpacity={0.8}
									onPress={() => {
										sendOtp(setoptSent, params.email, Toast, setsent);
									}}
								>
									<Text
										style={{
											fontFamily: "f2Bold",
											fontSize: width / 22,
											textAlign: "center",
											marginLeft: 3,
											color: colors.a1Color,
										}}
									>
										Resend
									</Text>
								</TouchableOpacity>
							</View>
							{restartTimer && (
								<CountDown
									size={20}
									until={120}
									onFinish={() => alert("The Opt is now invalid, resend")}
									digitStyle={{
										backgroundColor: "#FFF",
										borderWidth: 1.5,
										borderColor: colors.d1Color,
									}}
									digitTxtStyle={{
										color: colors.a1Color,
										fontFamily: "f1Bold",
									}}
									timeLabelStyle={{
										color: colors.bAColor,
										fontWeight: "bold",
										fontFamily: "f1Bold",
									}}
									separatorStyle={{
										color: colors.bAColor,
										fontFamily: "f1Bold",
									}}
									timeToShow={["M", "S"]}
									timeLabels={{ m: "Min", s: "Sec" }}
									showSeparator
								/>
							)}
						</View>

						<TouchableOpacity
							style={{
								justifyContent: "center",
								alignItems: "center",
								width: 0.85 * width,
								height: 55,
								borderRadius: 15,
								overflow: "hidden",
								alignSelf: "center",
							}}
							activeOpacity={0.8}
							onPress={() => {
								!loading &&
									setotp().length == 4 &&
									VerifyOtp(
										setloading,
										{
											userId: params.userId,
											otp: setotp(),
										},
										router,
										Toast,
										realm,
									);
							}}
						>
							<LinearGradient
								style={{
									justifyContent: "center",
									alignItems: "center",
									width: 0.85 * width,
									height: 55,
									borderRadius: 15,
									overflow: "hidden",
								}}
								colors={[colors.d2Color, colors.d1Color]}
							>
								{loading ? (
									<ActivityIndicator size={"small"} color={"#999999"} />
								) : (
									<Text
										style={{
											color: colors.wColor,
											fontSize: 22,
											fontFamily: "f1Bold",
										}}
									>
										Submit
									</Text>
								)}
							</LinearGradient>
						</TouchableOpacity>
					</ScrollView>
				)}
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default Otp;

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-evenly",
		alignItems: "center",
		// padding: Dimensions.get("window").height / 54,
		backgroundColor: "#f5f5f5",

		width: width,
		height: Dimensions.get("window").height - StatusBar.currentHeight,

		gap: height / 30,
	},
});
