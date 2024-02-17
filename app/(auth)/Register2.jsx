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
	Pressable,
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
import { Link, router, useLocalSearchParams } from "expo-router";
import { validateEmail } from "../../src/utils/index.js";
import Danger from "../../src/assets/danger.svg";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import Teacher from "../../src/assets/student.svg";
import Student from "../../src/assets/teacher.svg";
import { register } from "../../src/utils/response.js";
import { Toast } from "toastify-react-native";
import { Dropdown } from "react-native-element-dropdown";
import cities from "../../src/constants/cities.js";
import levels from "../../src/constants/levels.js";
function dataCreate(data) {
	let rs = [];
	for (let i = 0; i < data.level.length; i++) {
		console.log(data.major[data.level[i]]);
		for (let j = 0; j < data.major[data.level[i]].length; j++) {
			rs.push({
				label:
					data.level[i] + ", " + data.major[data.level[i]][j].toUpperCase(),
				value:
					data.level[i] + ", " + data.major[data.level[i]][j].toUpperCase(),
			});
		}
	}
	return rs;
}
// import data_w from "../../src/constants/cities(reduit).js";

// const Function = (text, type, Svg) => {
// 	return (
// 		<TouchableOpacity
// 			style={{
// 				borderWidth: 2,
// 				width: width * 0.4,
// 				height: height * 0.3,
// 				borderRadius: 25,
// 			}}
// 			activeOpacity={0.6}
// 		>
// 			<Svg height={100} />
// 			<Text>{text}</Text>
// 			<View>{type}</View>
// 		</TouchableOpacity>
// 	);
// };
let selelected_wilaya;
let wilayas = cities.map((wilaya) => {
	return wilaya.wilaya_name;
});
let communes = cities.map((commune) => {
	return {
		label: commune.commune_name,
		value: commune.commune_name,
		wilaya: commune.wilaya_name,
	};
});
wilayas = wilayas.filter((wilaya, index) => wilayas.indexOf(wilaya) === index);

data_w = wilayas.map((wilaya) => {
	return { label: wilaya, value: wilaya };
});

const Register = () => {
	const [RegisterInp, setRegisterInp] = useState({
		phone: "",
		ccp: "",
		location: { wilaya: "", commune: "" },
		level: "",
		Function: "",
	});
	data_c = communes.filter((commune) => {
		return commune.wilaya == selelected_wilaya;
	});

	const [error, seterror] = useState({
		state: 0,
		message: "",
	});
	const [Loading, setLoading] = useState(false);

	// function checkPassword() {
	// 	if (!validateEmail(RegisterInp.email) && RegisterInp.email) {
	// 		seterror({ state: 1, message: "Your email is not valid." });
	// 	} else if (RegisterInp.password.length < 8 && RegisterInp.password) {
	// 		seterror({ state: 1, message: "Your password is under 8 chars." });
	// 	} else if (RegisterInp.password != CPassword && CPassword) {
	// 		seterror({
	// 			state: 1,
	// 			message: "Password confirmation did't match with password.",
	// 		});
	// 	} else {
	// 		seterror({ state: 0, message: "" });
	// 	}
	// }
	// useEffect(() => {
	// 	checkPassword();
	// }, [RegisterInp, CPassword]);

	const bottomSheetRef = useRef(null);

	const snapPoints = useMemo(() => ["40%"], []);

	const handleSheetChanges = useCallback((index) => {
		console.log("handleSheetChanges", index);
	}, []);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetRef.current?.present();
	}, []);

	const params = useLocalSearchParams();

	// <BottomSheetModal
	// 	ref={bottomSheetRef}
	// 	index={1}
	// 	snapPoints={snapPoints}
	// 	onChange={handleSheetChanges}
	// >
	// 	<View style={styles.contentContainer}>
	// 		<Text>Awesome 🎉</Text>
	// 	</View>
	// </BottomSheetModal>;

	function validateRegsiter() {
		if (!error.state) {
			if (
				RegisterInp.name &&
				RegisterInp.lastName &&
				RegisterInp.email &&
				RegisterInp.password &&
				CPassword
			) {
				return register(setLoading, params, router, Toast);
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
						gap: 15,
						flexDirection: "row",
					}}
				>
					<TouchableOpacity
						style={{
							borderWidth: 2,
							width: width * 0.45,
							height: height * 0.3,
							borderRadius: 25,
							padding: height / 58,
							justifyContent: "space-between",
							alignItems: "center",
							borderColor:
								RegisterInp.Function == "teacher"
									? colors.a2Color
									: colors.d2Color,
							backgroundColor:
								RegisterInp.Function == "teacher" ? "#dddddd" : "#eeeeee",
						}}
						activeOpacity={0.6}
						onPress={() => {
							setRegisterInp((prevState) => {
								return { ...prevState, Function: "teacher" };
							});
						}}
					>
						<Teacher height={100} />
						<Text
							style={{
								fontFamily: "f2Bold",
								color: colors.bColor,
								textAlign: "center",
								fontSize: height / 58 > 12 ? 12 : height / 58,
							}}
						>
							Teachers University Students Freelancers
						</Text>
						<LinearGradient
							style={{
								paddingHorizontal: width / 22,
								paddingVertical: height / 100,
								borderRadius: 10,
							}}
							colors={
								RegisterInp.Function == "teacher"
									? [colors.a1Color, colors.a2Color]
									: [colors.d1Color, colors.d2Color]
							}
						>
							<Text style={{ fontFamily: "f1Bold", color: colors.wColor }}>
								Teacher
							</Text>
						</LinearGradient>
					</TouchableOpacity>
					<TouchableOpacity
						style={{
							borderWidth: 2,
							width: width * 0.45,
							height: height * 0.3,

							padding: height / 58 > 12 ? 12 : height / 58,
							justifyContent: "space-between",
							alignItems: "center",
							borderRadius: 25,
							borderColor:
								RegisterInp.Function == "student"
									? colors.a2Color
									: colors.d2Color,
							backgroundColor:
								RegisterInp.Function == "student" ? "#dddddd" : "#eeeeee",
						}}
						onPress={() => {
							setRegisterInp((prevState) => {
								return { ...prevState, Function: "student" };
							});
						}}
						activeOpacity={0.6}
					>
						<Student height={100} />
						<Text
							style={{
								fontFamily: "f2Bold",
								color: colors.bColor,
								textAlign: "center",

								fontSize: height / 58 > 12 ? 12 : height / 58,
							}}
						>
							Students from Highschool & middle school
						</Text>
						<LinearGradient
							style={{
								paddingHorizontal: 15,
								paddingVertical: 7,
								borderRadius: 10,
							}}
							colors={
								RegisterInp.Function == "student"
									? [colors.a1Color, colors.a2Color]
									: [colors.d1Color, colors.d2Color]
							}
						>
							<Text style={{ fontFamily: "f1Bold", color: colors.wColor }}>
								Student
							</Text>
						</LinearGradient>
					</TouchableOpacity>
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
								fontSize: 20,
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
							borderWidth: 1,
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
					<Pressable
						onPress={handlePresentModalPress}
						style={styles.inputStyle}
					>
						<View style={{ width: width / 13 }}>
							<User style={{ transform: [{ scale: (height * 0.75) / 700 }] }} />
						</View>

						<Text
							style={{
								fontFamily: "f2Bold",
								textTransform: "capitalize",
								color: RegisterInp.Function ? colors.bColor : colors.bAColor,
							}}
							value={RegisterInp.name}
							onChange={(name) => {
								setRegisterInp((prevState) => {
									return { ...prevState, name };
								});
							}}
						>
							{RegisterInp.Function ? RegisterInp.Function : "Function"}
						</Text>
					</Pressable>
					<View style={styles.inputcontainer}>
						{RegisterInp.Function ? (
							RegisterInp.Function == "student" ? (
								<Dropdown
									mode='default'
									style={[styles.inputStyle, { flexDirection: "column" }]}
									placeholderStyle={styles.placeholderStyle}
									selectedTextStyle={styles.selectedTextStyle}
									inputSearchStyle={styles.inputSearchStyle}
									iconStyle={styles.iconStyle}
									data={dataCreate(levels[0])}
									// search
									labelField='label'
									valueField='value'
									placeholder={
										RegisterInp.level
											? `${RegisterInp.level.level} ${RegisterInp.level.major}`
											: "Choose your major"
									}
									value={`${RegisterInp.level.level} ${RegisterInp.level.major}`}
									onChange={(item) => {
										setRegisterInp((prevState) => {
											return {
												...prevState,
												level: {
													level: item.value.split(",")[0],
													major: item.value.split(",")[1].trim(),
												},
											};
										});
									}}
									renderLeftIcon={() => (
										<User
											style={{
												transform: [{ scale: (height * 0.75) / 700 }],
												marginRight: 15,
											}}
										/>
									)}
									renderItem={(item) => {
										return (
											<View style={styles.item}>
												<Text style={styles.textItem}>{item.value}</Text>
											</View>
										);
									}}
								/>
							) : (
								<View style={styles.inputStyle}>
									<View style={{ width: width / 13 }}>
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
										editable={RegisterInp.Function == "teacher" ? true : false}
										maxLength={12}
										placeholder='CCP number '
										keyboardType='number-pad'
										value={
											RegisterInp.Function == "student" ? "" : RegisterInp.ccp
										}
										onChangeText={(ccp) => {
											setRegisterInp((prevState) => {
												return { ...prevState, ccp };
											});
										}}
									/>
								</View>
							)
						) : (
							<View
								style={[
									styles.inputStyle,
									{ justifyContent: "center", alignItems: "center" },
								]}
							>
								<Text
									style={{
										justifyContent: "center",
										alignItems: "center",
										flex: 1,
										fontFamily: "f2Bold",
										color: colors.bAColor,
									}}
								>
									Select your function
								</Text>
							</View>
						)}

						<View style={styles.inputStyle}>
							<View style={{ width: width / 13 }}>
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
								maxLength={10}
								placeholder='Phone number'
								value={RegisterInp.phone}
								keyboardType='number-pad'
								onChangeText={(phone) => {
									setRegisterInp((prevState) => {
										return { ...prevState, phone };
									});
								}}
							/>
						</View>

						<Dropdown
							mode='modal'
							style={[styles.inputStyle, { flexDirection: "column" }]}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							data={data_w}
							search
							labelField='label'
							valueField='value'
							placeholder='Select wilaya'
							searchPlaceholder='Search...'
							value={RegisterInp.location.wilaya}
							onChange={(item) => {
								setRegisterInp((prevState) => {
									selelected_wilaya = item.value;
									return {
										...prevState,
										location: { ...prevState.location, wilaya: item.value },
									};
								});
							}}
							renderLeftIcon={() => (
								<User
									style={{
										transform: [{ scale: (height * 0.75) / 700 }],
										marginRight: 15,
									}}
								/>
							)}
							renderItem={(item) => {
								return (
									<View style={styles.item}>
										<Text style={styles.textItem}>{item.label}</Text>
									</View>
								);
							}}
						/>
						<Dropdown
							mode='modal'
							style={[styles.inputStyle, { flexDirection: "column" }]}
							placeholderStyle={styles.placeholderStyle}
							selectedTextStyle={styles.selectedTextStyle}
							inputSearchStyle={styles.inputSearchStyle}
							iconStyle={styles.iconStyle}
							data={data_c}
							disable={RegisterInp.location.wilaya ? false : true}
							search
							labelField='label'
							valueField='value'
							placeholder='Select Municipal'
							searchPlaceholder='Search...'
							value={RegisterInp.location.commune}
							onChange={(item) => {
								setRegisterInp((prevState) => {
									return {
										...prevState,
										location: { ...prevState.location, commune: item.value },
									};
								});
							}}
							renderLeftIcon={() => (
								<User
									style={{
										transform: [{ scale: (height * 0.75) / 700 }],
										marginRight: 15,
									}}
								/>
							)}
							renderItem={(item) => {
								return (
									<View style={styles.item}>
										<Text style={styles.textItem}>{item.label}</Text>
									</View>
								);
							}}
						/>
						<View
							style={{
								color: colors.bAColor,
								justifyContent: "flex-end",
								paddingRight: 10,
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
								() => {
									register(
										setLoading,
										{ ...params, ...RegisterInp },
										router,
										Toast,
									);
								}
								// validateRegsiter
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
									height: height / 12 > 55 ? 55 : height / 12,
									overflow: "hidden",
									borderRadius: 27,
								}}
							>
								{Loading ? (
									<ActivityIndicator size={"small"} color='#999999' />
								) : (
									<Text
										style={{
											color: colors.wColor,
											fontFamily: "f1Bold",
											fontSize: height / 31 ? 22 : height / 31,
										}}
									>
										Finish
									</Text>
								)}
							</LinearGradient>
						</TouchableOpacity>
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
		padding: 12,
		backgroundColor: "#f5f5f5",

		width: width,
		height: Dimensions.get("window").height - StatusBar.currentHeight,

		gap: 20,
	},
	logo_container: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flex: 0.6,
	},
	inputcontainer: {
		display: "flex",

		gap: height / 46,
	},
	RegisterContainer: {
		justifyContent: "space-between",
		paddingVertical: height / 47 > 15 ? 15 : height / 47,
		flex: 1,
	},
	inputStyle: {
		width: width / 18,
		borderColor: colors.bAColor,
		borderWidth: 2,
		borderRadius: 10,

		width: width * 0.8,
		height: height / 14 > 50 ? 50 : height / 14,
		alignItems: "center",
		paddingHorizontal: width / 24,
		display: "flex",
		flexDirection: "row",
		gap: 15,
		// marginTop: height / 58,
	},

	// dropdown: {
	// 	margin: 16,
	// 	height: 50,
	// 	backgroundColor: "white",
	// 	borderRadius: 12,
	// 	padding: 12,
	// 	shadowColor: "#000",
	// 	shadowOffset: {
	// 		width: 0,
	// 		height: 1,
	// 	},
	// 	width: 0.7 * width,
	// 	shadowOpacity: 0.2,
	// 	shadowRadius: 1.41,

	// 	elevation: 2,
	// },
	icon: {
		marginRight: 5,
	},
	item: {
		padding: 15,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "rgba(230, 230, 230, 0.5)",
		// borderWidth: 0.25,
		// borderColor: colors.bAColor,
		borderRadius: 15,
		marginVertical: 2,
		marginHorizontal: 10,
	},
	textItem: {
		fontSize: 14,
		fontFamily: "f1Bold",
		color: colors.bColor,
	},
	placeholderStyle: {
		fontSize: 14,

		fontFamily: "f2Bold",
		color: colors.bAColor,
	},
	selectedTextStyle: {
		fontSize: 14,
		fontFamily: "f2Bold",
		color: colors.bColor,
	},
	iconStyle: {
		// width: 20,
		// height: 20,
		transform: [{ scale: 1 }],
	},
	inputSearchStyle: {
		width: width / 18,
		borderColor: colors.bAColor,

		borderRadius: 10,
		width: width * 0.75,

		alignItems: "center",
		fontFamily: "f2SBold",
	},
});
