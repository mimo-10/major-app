/** @format */

import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Dimensions,
	TouchableOpacity,
	KeyboardAvoidingView,
	Button,
	ActivityIndicator,
	StatusBar,
	Keyboard,
	Pressable,
	TouchableWithoutFeedback,
} from "react-native";
import React, {
	useState,
	useRef,
	useEffect,
	useMemo,
	useCallback,
} from "react";
import { colors } from "../../src/constants/styles";
const { width, height } = Dimensions.get("screen");
import Email from "../../src/assets/email.svg";
import Password from "../../src/assets/password.svg";
import User from "../../src/assets/user.svg";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { validateEmail } from "../../src/utils/index.js";
import Danger from "../../src/assets/danger.svg";
import { checkUser } from "../../src/utils/response";
import { Toast } from "toastify-react-native";
import DatePicker from "react-native-date-picker";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

const Register = () => {
	const [RegisterInp, setRegisterInp] = useState({
		email: "",
		password: "",
		name: "",
		lastName: "",
		date: "",
	});
	const [CPassword, setCPassword] = useState("");
	const [loading, setloading] = useState(false);
	const [error, seterror] = useState({
		state: 0,
		message: "",
	});
	const [date, setdate] = useState(new Date());

	const bottomSheetRef = useRef(null);
	const snapPoints = useMemo(() => ["35%"], []);

	const handleSheetChanges = useCallback((index) => {
		console.log("handleSheetChanges", index);
	}, []);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetRef.current?.present();
	}, []);
	function checkPassword() {
		if (!validateEmail(RegisterInp.email) && RegisterInp.email) {
			seterror({ state: 1, message: "Your email is not valid." });
		} else if (RegisterInp.password.length < 8 && RegisterInp.password) {
			seterror({ state: 1, message: "Your password is under 8 chars." });
		} else if (RegisterInp.password != CPassword && CPassword) {
			seterror({
				state: 1,
				message: "Password confirmation did't match with password.",
			});
		} else {
			seterror({ state: 0, message: "" });
		}
	}
	useEffect(() => {
		checkPassword();
	}, [RegisterInp, CPassword]);

	function validateRegsiter() {
		if (!error.state) {
			if (
				RegisterInp.name &&
				RegisterInp.lastName &&
				RegisterInp.email &&
				RegisterInp.password &&
				CPassword &&
				RegisterInp.date
			) {
				return checkUser(setloading, RegisterInp, router, Toast);
			} else {
				seterror({
					state: 0,
					message: "Please fill of the fields.",
				});
			}
		} else if (
			!RegisterInp.name &&
			!RegisterInp.lastName &&
			!RegisterInp.email &&
			!RegisterInp.password &&
			!CPassword
		) {
			seterror({
				state: 0,
				message: "Please fill of the fields.",
			});
		}
	}

	return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}
		>
			<StatusBar barStyle={"dark-content"} />
			<BottomSheetModal
				ref={bottomSheetRef}
				index={0}
				snapPoints={snapPoints}
				onChange={handleSheetChanges}
				enableDismissOnClose
				style={{
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 12,
					},
					shadowOpacity: 0.58,
					shadowRadius: 16.0,

					elevation: 24,
				}}
			>
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<DatePicker
						mode='date'
						theme='light'
						date={date}
						onDateChange={(date) => {
							setdate(date);

							setRegisterInp((prevState) => {
								return { ...prevState, date: date.toLocaleDateString() };
							});
						}}
					/>
				</View>
			</BottomSheetModal>
			<TouchableWithoutFeedback
				style={{ width: width, flex: 1 }}
				onPress={Keyboard.dismiss}
			>
				<ScrollView bounces={false} contentContainerStyle={styles.container}>
					<View style={styles.logo_container}>
						<Text
							style={{
								fontFamily: "f1Bold",
								color: colors.bColor,
								fontSize: height / 35 > 20 ? 20 : height / 35,
							}}
						>
							Register
						</Text>
						<Image
							style={{ transform: [{ scale: (height * 0.15) / 700 }] }}
							source={require("../../src/assets/logo1.png")}
						/>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							height: height / 20 > 35 ? 35 : height / 20,
							borderWidth: 0.5,
							paddingHorizontal: 7,
							borderRadius: 10,
							flexDirection: "row",
							overflow: "hidden",

							backgroundColor: "#fff",
							opacity: error.message ? 1 : 0,
						}}
					>
						<Danger />

						<Text
							style={{
								fontFamily: "f2Bold",
								color: colors.danger,
								textAlign: "center",

								width: 0.7 * width,
							}}
						>
							{error.message}
						</Text>
					</View>
					<View style={styles.inputcontainer}>
						<View style={styles.inputStyle}>
							<View style={{ width: 30 }}>
								<User
									style={{ transform: [{ scale: (height * 0.75) / 700 }] }}
								/>
							</View>

							<TextInput
								style={{
									justifyContent: "center",
									alignItems: "center",
									flex: 1,
									fontFamily: "f2Bold",
									color: colors.bColor,
								}}
								placeholder='Name'
								value={RegisterInp.name}
								onChangeText={(name) => {
									setRegisterInp((prevState) => {
										return { ...prevState, name };
									});
								}}
							/>
						</View>
						<View style={styles.inputStyle}>
							<View style={{ width: 30 }}>
								<User
									style={{ transform: [{ scale: (height * 0.75) / 700 }] }}
								/>
							</View>

							<TextInput
								style={{
									justifyContent: "center",
									alignItems: "center",
									flex: 1,
									fontFamily: "f2Bold",
									color: colors.bColor,
								}}
								placeholder='Last name'
								value={RegisterInp.lastName}
								onChangeText={(lastName) => {
									setRegisterInp((prevState) => {
										return { ...prevState, lastName };
									});
								}}
							/>
						</View>
						<Pressable
							onPress={handlePresentModalPress}
							style={styles.inputStyle}
						>
							<View style={{ width: width / 13 }}>
								<User
									style={{ transform: [{ scale: (height * 0.75) / 700 }] }}
								/>
							</View>

							<Text
								style={{
									fontFamily: "f2Bold",
									textTransform: "capitalize",
									color: RegisterInp.date ? colors.bColor : colors.bAColor,
								}}
							>
								{RegisterInp.date ? date.toDateString() : "Date of birth"}
							</Text>
						</Pressable>

						<View style={styles.inputStyle}>
							<View style={{ width: 30 }}>
								<Email
									style={{ transform: [{ scale: (height * 0.75) / 700 }] }}
								/>
							</View>

							<TextInput
								style={{
									justifyContent: "center",
									alignItems: "center",
									flex: 1,
									fontFamily: "f2Bold",
									color: colors.bColor,
								}}
								placeholder='E-mail'
								value={RegisterInp.email}
								onChangeText={(email) => {
									setRegisterInp((prevState) => {
										return { ...prevState, email };
									});
								}}
							/>
						</View>
						<View style={styles.inputStyle}>
							<View style={{ width: 30 }}>
								<Password
									style={{ transform: [{ scale: (height * 0.75) / 700 }] }}
								/>
							</View>

							<TextInput
								style={{
									justifyContent: "center",
									alignItems: "center",
									flex: 1,
									fontFamily: "f2Bold",
									color: colors.bColor,
								}}
								secureTextEntry={true}
								placeholder='Password'
								value={RegisterInp.password}
								onChangeText={(password) => {
									setRegisterInp((prevState) => {
										return { ...prevState, password };
									});
								}}
							/>
						</View>
						<View style={styles.inputStyle}>
							<View style={{ width: 30 }}>
								<Password
									style={{ transform: [{ scale: (height * 0.75) / 700 }] }}
								/>
							</View>

							<TextInput
								style={{
									justifyContent: "center",
									alignItems: "center",
									flex: 1,
									fontFamily: "f2Bold",
									color: colors.bColor,
								}}
								secureTextEntry={true}
								placeholder='Confirm Password'
								value={CPassword}
								onChangeText={(CPassword) => {
									setCPassword(CPassword);
								}}
							/>
						</View>
						<View
							style={{
								color: colors.bAColor,
								justifyContent: "flex-end",
								paddingRight: width / 34,
								flexDirection: "row",
							}}
						></View>

						<TouchableOpacity
							style={{
								justifyContent: "center",
								alignItems: "center",
								marginVertical: 12,
							}}
							title='Register'
							activeOpacity={0.7}
							onPress={
								// () => {
								// 	router.push("Register2");
								// }
								validateRegsiter
							}
						>
							<LinearGradient
								colors={[colors.d2Color, colors.d1Color]}
								style={{
									display: "flex",
									flexDirection: "row-reverse",
									justifyContent: "center",
									alignItems: "center",
									width: width / 2.2,
									height: height / 13 > 55 ? 55 : height / 13,
									overflow: "hidden",
									borderRadius: height / 26,
								}}
							>
								{loading ? (
									<ActivityIndicator size={"small"} color={"#999999"} />
								) : (
									<Text
										style={{
											color: colors.wColor,
											fontFamily: "f1Bold",
											fontSize: height / 32 > 22 ? 22 : height / 32,
										}}
									>
										Next
									</Text>
								)}
							</LinearGradient>
						</TouchableOpacity>
						<View
							style={{
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<Text
								style={{
									marginHorizontal: 3,
									color: colors.bColor,
									fontFamily: "f1Regular",
									fontSize: height / 58 > 12 ? 12 : height / 58,
								}}
							>
								Already have an account ?
							</Text>

							<TouchableOpacity activeOpacity={0.4}>
								<Link replace href={"/Login"}>
									<Text
										style={{
											marginHorizontal: 2,
											color: colors.a1Color,
											fontFamily: "f1Bold",
											fontSize: height / 58 > 12 ? 12 : height / 58,
										}}
									>
										login
									</Text>
								</Link>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};

export default Register;

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-evenly",
		alignItems: "center",
		padding: width / 20,
		backgroundColor: "#f5f5f5",

		width: width,
		height: Dimensions.get("window").height - StatusBar.currentHeight,

		gap: height / 50,
	},
	logo_container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: 0.6,
	},
	inputcontainer: {
		display: "flex",

		gap: height / 72,
	},
	RegisterContainer: {
		justifyContent: "space-between",
		paddingVertical: height / 47,
		flex: 1,
	},
	inputStyle: {
		borderColor: colors.bAColor,
		borderWidth: 2,
		borderRadius: 10,
		width: width * 0.8,
		height: height / 14 > 50 ? 50 : height / 14,
		alignItems: "center",
		paddingHorizontal: width / 22,
		display: "flex",
		flexDirection: "row",
		gap: width / 22,
		// marginTop: height / 58 > 12 ? 12 : height / 58,
	},
	auth3: {
		borderRadius: 23,
		borderWidth: 2,
		height: height / 12,
		flexDirection: "row",
		paddingHorizontal: width / 11,
		alignItems: "center",
		width: width * 0.85,
		gap: 20,
		borderColor: colors.bColor,
		backgroundColor: "#fff",
	},
});
