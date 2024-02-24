/** @format */

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Pressable,
	TouchableWithoutFeedback,
} from "react-native";
import React, { useRef, useState, useContext, createContext } from "react";
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

import Animated, {
	useSharedValue,
	withTiming,
	useAnimatedStyle,
	withSpring,
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import TabItem from "../../src/utils/hooks";

const { width, height } = Dimensions.get("screen");
const Context = createContext();

const _layout = () => {
	const realm = useRealm();
	const [user] = useQuery("User", (data) => {
		return data;
	});

	const route = useRouter();
	const [dark, setdark] = useState(false);
	const theme = useTheme(dark);

	const [activeIndex, setActiveIndex] = useState(0);

	const { t } = useTranslation();

	const items = {
		Home: 0,
		Calendar: 3,
		Classroom: 2,
		Search: 1,
	};

	return (
		<Context.Provider value={{ theme, dark, setdark, user }}>
			<Tabs
				screenListeners={{
					focus: (event) => {
						setActiveIndex(items[event.target.split("-")[0]]);
					},

					tabPress: (event) => {
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
										// setActiveIndex(0);
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
										// setActiveIndex(1);
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
										// setActiveIndex(2);
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
