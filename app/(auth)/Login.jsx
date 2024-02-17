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
	StatusBar,
	Keyboard,
	TouchableWithoutFeedback,
	ActivityIndicator,
} from "react-native";

import React, {
	useState,
	useCallback,
	useMemo,
	useRef,
	useEffect,
} from "react";
import { colors } from "../../src/constants/styles";
const { width, height } = Dimensions.get("screen");
const WindowHight = Dimensions.get("window").height;
import Email from "../../src/assets/email.svg";
import Password from "../../src/assets/password.svg";
import Facebook from "../../src/assets/loginF.svg";
import Google from "../../src/assets/loginG.svg";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Link, router } from "expo-router";
import { useRealm } from "@realm/react";
import { validateEmail } from "../../src/utils/index.js";
import Danger from "../../src/assets/danger.svg";
import { Toast } from "toastify-react-native";
import { login } from "../../src/utils/response.js";

const Login = () => {
	const [loginInp, setloginInp] = useState({
		email: "",
		password: "",
	});
	const [error, seterror] = useState({
		state: 0,
		message: "",
	});
	const [Loading, setLoading] = useState(false);

	const realm = useRealm();

	// const bottomSheetRef = useRef(null);

	// const snapPoints = useMemo(() => ["50%", "80%"], []);

	// const handleSheetChanges = useCallback((index) => {
	// 	console.log("handleSheetChanges", index);
	// }, []);
	// const handlePresentModalPress = useCallback(() => {
	// 	bottomSheetRef.current?.present();
	// }, []);

	/* <BottomSheetModal
								ref={bottomSheetRef}
								index={1}
								snapPoints={snapPoints}
								onChange={handleSheetChanges}
							>
								<View style={styles.contentContainer}>
									<Text>Awesome 🎉</Text>
								</View>
							</BottomSheetModal> */

	function validateLogin() {
		if (!error.state) {
			if (!loginInp.email || !loginInp.password) {
				seterror({
					state: 0,
					message: "Please fill of the fields.",
				});
			} else {
				console.log("ttext");
				return login(setLoading, loginInp, router, Toast, realm);
			}
		} else if (!loginInp.email || !loginInp.password) {
			seterror({
				state: 0,
				message: "Please fill of the fields.",
			});
		} else {
			return login(setLoading, loginInp, router, Toast, realm);
		}
	}
	useEffect(() => {
		if (!validateEmail(loginInp.email) && loginInp.email) {
			seterror({ state: 1, message: "Your email is not valid." });
		} else if (loginInp.password.length < 8 && loginInp.password) {
			seterror({ state: 1, message: "Your password is under 8 chars." });
		} else {
			seterror({ state: 0, message: "" });
		}
	}, [loginInp]);
	console.log(WindowHight, height);

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
				<ScrollView bounces={false} contentContainerStyle={styles.container}>
					<View style={styles.logo_container}>
						<Text
							style={{
								fontFamily: "f1Bold",
								color: colors.bColor,
								fontSize: height / 35,
							}}
						>
							Login
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
							height: height / 28,
							borderWidth: 0.5,
							borderRadius: 10,
							paddingHorizontal: 3,
							flexDirection: "row",
							overflow: "hidden",
							backgroundColor: "#fff",
							opacity: error.message ? 1 : 0,
						}}
					>
						<Danger />

						<Text
							style={{
								fontFamily: "f2SBold",
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
								value={loginInp.email}
								onChangeText={(email) => {
									setloginInp((prevState) => {
										return { ...prevState, email };
									});
								}}
							/>
						</View>
						<View style={styles.inputStyle}>
							<View style={{ width: 30 }}>
								<Password style={{ transform: [{ scale: 0.75 }] }} />
							</View>

							<TextInput
								style={{
									justifyContent: "center",
									alignItems: "center",
									flex: 1,
									fontFamily: "f2Bold",
									color: colors.bColor,
								}}
								placeholder='Password'
								value={loginInp.password}
								secureTextEntry={true}
								onChangeText={(password) => {
									setloginInp((prevState) => {
										return { ...prevState, password };
									});
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
						>
							<TouchableOpacity onPress={() => {}}>
								<Link href={"/ForegetPassword"}>
									<Text
										style={{
											marginHorizontal: 3,
											color: colors.a1Color,
											fontFamily: "f1Medium",
											fontSize: height / 58 > 12 ? 12 : height / 58,
										}}
									>
										Forgot password?
									</Text>
								</Link>
							</TouchableOpacity>
						</View>
						<TouchableOpacity
							style={{
								alignSelf: "center",
								marginVertical: height / 58,
								backgroundColor: "red",
								borderRadius: height / 26,
								width: width / 2.2,
							}}
							title='Login'
							activeOpacity={0.7}
							onPress={() => {
								if (!Loading) {
									validateLogin();
								}
							}}
						>
							<LinearGradient
								colors={[colors.d2Color, colors.d1Color]}
								style={{
									display: "flex",
									flexDirection: "row-reverse",
									justifyContent: "center",
									alignItems: "center",
									width: width / 2.2,
									height: height / 13,
									overflow: "hidden",
									borderRadius: height / 26,
								}}
							>
								{Loading ? (
									<ActivityIndicator size={"small"} color='#999999' />
								) : (
									<Text
										style={{
											color: colors.wColor,
											fontFamily: "f1Bold",

											fontSize: height / 32 > 22 ? 22 : height / 32,
										}}
									>
										Login
									</Text>
								)}
							</LinearGradient>
						</TouchableOpacity>
					</View>
					<View
						style={{
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "row",
							gap: 10,
						}}
					>
						<View
							style={{
								width: width * 0.3,
								borderRadius: 1,
								height: 2,
								backgroundColor: colors.bColor,
							}}
						/>
						<Text style={{ fontFamily: "f2SBold" }}>Or</Text>
						<View
							style={{
								width: width * 0.3,
								borderRadius: 1,
								height: 2,
								backgroundColor: colors.bColor,
							}}
						/>
					</View>
					<View style={styles.loginContainer}>
						<View style={{ gap: height / 50 }}>
							<TouchableOpacity onPress={() => {}} activeOpacity={0.75}>
								<View style={styles.auth3}>
									<Google
										style={{
											transform: [
												{
													scale:
														(height * 1) / 700 > 1 ? 1 : (height * 1) / 700,
												},
											],
										}}
									/>
									<Text style={{ fontFamily: "f1Bold", color: colors.bColor }}>
										Log in with Google
									</Text>
								</View>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => {}} activeOpacity={0.75}>
								<View style={styles.auth3}>
									<Facebook
										style={{
											transform: [
												{
													scale:
														(height * 1) / 700 > 1 ? 1 : (height * 1) / 700,
												},
											],
										}}
									/>
									<Text style={{ fontFamily: "f1Bold", color: colors.bColor }}>
										Log in with Facebook
									</Text>
								</View>
							</TouchableOpacity>
						</View>
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
									marginVertical: 3,
									color: colors.bColor,
									fontFamily: "f1Regular",
									fontSize: height / 58 > 12 ? 12 : height / 58,
								}}
							>
								Don’t have an account ?
							</Text>

							<TouchableOpacity activeOpacity={0.4}>
								<Link href={"/Register"}>
									<Text
										style={{
											marginHorizontal: 2,
											color: colors.d2Color,
											fontFamily: "f1Bold",
											fontSize: height / 58 > 12 ? 12 : height / 58,
										}}
									>
										register here
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

export default Login;

const styles = StyleSheet.create({
	container: {
		justifyContent: "space-evenly",
		alignItems: "center",
		padding: Dimensions.get("window").height / 54,
		backgroundColor: "#f5f5f5",

		width: width,
		height: Dimensions.get("window").height - StatusBar.currentHeight,

		gap: height / 30,
	},
	logo_container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: 0.6,
	},
	inputcontainer: {
		display: "flex",
		gap: height / 48,
	},
	loginContainer: {
		justifyContent: "space-between",
		paddingVertical: height / 54,

		flex: 1,
	},
	inputStyle: {
		width: width / 16,
		borderColor: colors.bAColor,
		borderWidth: 2,
		borderRadius: 10,
		width: width * 0.8,
		height: height / 14 < 50 ? height / 14 : 50,
		alignItems: "center",
		paddingHorizontal: width / 22,
		display: "flex",

		flexDirection: "row",
		gap: width / 25,
		// marginTop: width / 30,
	},
	auth3: {
		borderRadius: 23,
		borderWidth: 1.25,
		height: height / 12 < 160 ? height / 12 : 60,
		flexDirection: "row",
		paddingHorizontal: width / 11,
		alignItems: "center",
		width: width * 0.85,
		gap: height / 35 < 20 ? height / 35 : 20,
		borderColor: colors.bColor,
		backgroundColor: "#fff",
	},
});
