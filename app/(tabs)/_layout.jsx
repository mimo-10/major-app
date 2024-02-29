/** @format */

// to optimate transitions.

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Pressable,
	TouchableWithoutFeedback,
} from "react-native";
import React, {
	useRef,
	useState,
	useContext,
	createContext,
	useMemo,
	useCallback,
} from "react";
import { Tabs } from "expo-router/tabs";
import {
	TransitionPresets,
	CardStyleInterpolators,
	StackCardStyleInterpolator,
} from "@react-navigation/stack";
import { BlurView } from "expo-blur";
import Home from "../../src/assets/home.svg";
import Search from "../../src/assets/search.svg";
import Calendar from "../../src/assets/calendarH.svg";
import Classroom from "../../src/assets/class.svg";
import { colors, useTheme } from "../../src/constants/styles";
import { useTranslation } from "react-i18next";
import { LinearGradient } from "react-native-svg";
import Realm from "realm";
import { useRealm, useQuery } from "@realm/react";

import { useRouter } from "expo-router";
import TabItem from "../../src/utils/hooks";

const { width, height } = Dimensions.get("screen");
const Context = createContext();

const _layout = () => {
	// const realm = useRealm();
	// const [user] = useQuery("User", (data) => {
	// 	return data;
	// });
	// console.log(user);
	const user = {
		_id: "65d3f617c9102b16470ff893",
		email: "www.mimo2003.com@gmail.com",
		last: "Chicha",
		name: "Abdelalim",
		pic: "https://media.istockphoto.com/id/1223671392/vector/default-profile-picture-avatar-photo-placeholder-vector-illustration.jpg?s=612x612&w=0&k=20&c=s0aTdmT5aU6b8ot7VKm11DeID6NctRCpB755rA1BIP0=",
		token:
			"eyJhbGciOiJIUzI1NiJ9.NjVkM2Y2MTdjOTEwMmIxNjQ3MGZmODkz.w3FM4agkuQ_S3GNB-0x97HRjaSQTo7oGPFNtK0eu24g",
		username: "busingAbde",
		verified: true,
	};

	const route = useRouter();
	const [dark, setdark] = useState(true);
	const theme = useTheme(dark);

	const [activeIndex, setActiveIndex] = useState(0);

	const { t } = useTranslation();

	const items = useMemo(() => {
		return {
			Home: 0,
			Calendar: 3,
			Classroom: 2,
			Search: 1,
		};
	}, []);
	const SkeltonConfig = useMemo(() => {
		return {
			boneColor: theme.boneColor,
			highlightColor: theme.highlightColor,
			animationType: "pulse",
		};
	}, [theme]);

	return (
		<Context.Provider value={{ theme, dark, setdark, user, SkeltonConfig }}>
			<Tabs
				screenListeners={{
					focus: (event) => {
						if (items[event.target.split("-")[0]] != activeIndex) {
							setActiveIndex(items[event.target.split("-")[0]]);
							console.log("changd");
						}
					},
					tabPress: (event) => {
						// setActiveIndex(items[event.target.split("-")[0]]);
						// route.push("Search");
						event.preventDefault();
					},
				}}
				screenOptions={{
					headerShown: false,
					tabBarStyle: {
						position: "absolute",
						backgroundColor: "none",
						borderRadius: 22,
						bottom: 25,
						left: (width * 0.15) / 2,

						width: width * 0.85,
						height: 65,

						borderWidth: 0.01,
						overflow: "hidden",

						borderColor: colors.bAColor,
					},
					tabBarActiveTintColor: dark ? colors.a2Color : colors.d2Color,
					tabBarShowLabel: false,
					tabBarLabelStyle: {
						fontFamily: "f2SBold",
						fontSize: 11,

						textTransform: "capitalize",
					},

					tabBarBackground: () => {
						return (
							<BlurView
								style={{
									backgroundColor: dark
										? "rgba(20, 20, 20, 0.2)"
										: "rgba(220, 220, 220, 0.05)",
									...StyleSheet.absoluteFillObject,
									overflow: "hidden",
									borderRadius: 22,
									opacity: 1,
								}}
								intensity={80}
								tint={dark ? "dark" : "light"}
							></BlurView>
						);
					},
				}}
			>
				<Tabs.Screen
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TabItem
									key={"00"}
									style={styles.item}
									Icon={
										<Home
											color={
												0 == activeIndex
													? dark
														? colors.a1Color
														: colors.d2Color
													: dark
													? colors.wColor
													: colors.bColor
											}
										/>
									}
									label={t("home")}
									active={0 == activeIndex}
									onPress={() => {
										setActiveIndex(0);
										route.push("Home");
									}}
									dark={dark}
								/>
							);
						},

						tabBarLabel: t("home"),
					}}
					name={"Home"}
				/>
				<Tabs.Screen
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TabItem
									key={"01"}
									style={styles.item}
									Icon={
										<Search
											color={
												1 == activeIndex
													? dark
														? colors.a1Color
														: colors.d2Color
													: dark
													? colors.wColor
													: colors.bColor
											}
										/>
									}
									label={t("search")}
									active={1 == activeIndex}
									onPress={() => {
										setActiveIndex(1);
										route.push("Search");
									}}
									dark={dark}
								/>
							);
						},

						tabBarLabel: t("search"),
					}}
					name={"Search"}
					dark={dark}
				/>
				<Tabs.Screen
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TabItem
									key={"11"}
									style={styles.item}
									Icon={
										<Classroom
											color={
												2 == activeIndex
													? dark
														? colors.a1Color
														: colors.d2Color
													: dark
													? colors.wColor
													: colors.bColor
											}
										/>
									}
									label={t("classroom")}
									active={2 == activeIndex}
									onPress={() => {
										setActiveIndex(2);
										route.push("Classroom");
									}}
									dark={dark}
								/>
							);
						},

						tabBarLabel: t("classroom"),
					}}
					name={"Classroom"}
				/>
				<Tabs.Screen
					options={{
						tabBarIcon: ({ focused }) => {
							return (
								<TabItem
									key={"11"}
									style={styles.item}
									Icon={
										<Calendar
											color={
												3 == activeIndex
													? dark
														? colors.a1Color
														: colors.d2Color
													: dark
													? colors.wColor
													: colors.bColor
											}
										/>
									}
									label={t("calendar")}
									active={3 == activeIndex}
									onPress={() => {
										// setActiveIndex(3);
										route.push("Calendar");
									}}
									dark={dark}
								/>
							);
						},

						tabBarLabel: t("calendar"),
					}}
					name={"Calendar"}
				/>
			</Tabs>
			{/* <Tabs>
				<Tabs.Screen name='Home' />
				<Tabs.Screen name='Search' />
				<Tabs.Screen name='Classroom' />
				<Tabs.Screen name='Calendar' />
			</Tabs> */}
		</Context.Provider>
	);
};

export default _layout;

export const State = () => {
	return useContext(Context);
};

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	centered: {
		position: "absolute",
	},

	label: {
		fontSize: 12,
		fontWeight: "600",
	},
});
