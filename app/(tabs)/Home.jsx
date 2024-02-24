/** @format */

import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	FlatList,
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
import Ad1 from "../../src/assets/girl.svg";
import Clock from "../../src/assets/clock.svg";
import Day from "../../src/assets/day.svg";
import Classroom from "../../src/assets/class.svg";
import { useSharedValue } from "react-native-reanimated";
import { useSpring } from "../../src/utils/hooks";
import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";
import { BlurView } from "expo-blur";
import ClassComp from "../../src/components/ClassComp";

const { width, height } = Dimensions.get("screen");

const HorizontalClass = ({
	title,
	nextSection,
	leftedSections,
	location,
	id,
	color,
	focused,
	theme,
	router,
	index,
	len,
}) => {
	// const Animatedprogress = useRef(new Animated.Value(0)).current;

	// const nn = focused.interpolate({
	// inputRange: [
	// 	((index - 2) * width * 0.85) / 2,
	// 	((index - 1) * width * 0.75) / 2,
	// 	(index * width * 0.85) / 2,
	// 	((index + 1) * width * 0.85) / 2,
	// 	((index + 2) * width * 0.85) / 2,
	// ],
	// 	outputRange: [0, 1, 1, 1, 0],
	// 	extrapolate: "clamp",
	// });
	// focused.value = 15;

	// console.log(focused);

	const nn = focused.interpolate({
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
		outputRange: [0, 1, 1, 1, 0],
		extrapolate: "clamp",
	});
	const labelTranslate = nn.interpolate({
		inputRange: [0, 1],
		outputRange: [0, (width * 0.33 * leftedSections) / 4],
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
						{nextSection.split("T")[0]}
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
						{nextSection.split("T")[1]}
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
						{leftedSections}
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

const Home = ({ navigation }) => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const scrolledX = useRef(new Animated.Value(0)).current;
	const { t, i18n } = useTranslation();
	const { theme, dark, setdark, user } = State();
	const router = useRouter();
	const [Index, setIndex] = useState(0);

	const ads = [
		{
			key: "133",
			illustartion: <Ad1 />,
			ar: {
				title: "هل تحتاج إلى المزيد؟",
				description: "ابحث عن دروس جديدة",
				buttonText: "رؤية المزيد",
			},
			en: {
				title: "Need more ?",
				description: "Search for new classes",
				buttonText: "see more",
			},

			onPress: () => {
				console.log("redirecting...");
			},
			backgroundColor: "#EAEAFF",
		},
		{
			key: "145",
			illustartion: <Ad1 />,

			onPress: () => {
				console.log("redirecting...");
			},
			ar: {
				title: "هل تحتاج إلى المزيد؟",
				description: "ابحث عن دروس جديدة",
				buttonText: "رؤية المزيد",
			},
			en: {
				title: "Need more ?",
				description: "Search for new classes",
				buttonText: "see more",
			},
			backgroundColor: "#EAEAFF",
		},

		{
			key: "188",
			illustartion: <Ad1 />,
			ar: {
				title: "هل تحتاج إلى المزيد؟",
				description: "ابحث عن دروس جديدة",
				buttonText: "رؤية المزيد",
			},
			en: {
				title: "Need more ?",
				description: "Search for new classes",
				buttonText: "see more",
			},
			onPress: () => {
				console.log("redirecting...");
			},
			backgroundColor: "#EAFF",
		},
	]; /* to be fetched */
	const upClasses = [
		{
			title: "Math AS3",
			nextSection: "2021-03-29T05:50",
			leftedSections: "2",
			location: "Rouina",
			id: Math.random().toString(),
			color: "#FEE8AF",
		},
		{
			title: "Math AS3",
			nextSection: "2021-03-29T05:50",
			leftedSections: "3",
			location: "Rouina",
			id: Math.random().toString(),
			color: "#FEE8AF",
		},
		{
			title: "Math AS3",
			nextSection: "2021-03-29T05:50",
			leftedSections: "1",
			location: "Rouina",
			id: Math.random().toString(),
			color: "#FEE8AF",
		},
		{
			title: "Math AS3",
			nextSection: "2021-03-29T05:50",
			leftedSections: "4",
			location: "Rouina",
			id: Math.random().toString(),
			color: "#FEE8AF",
		},
		{
			title: "Math AS3",
			nextSection: "2021-03-29T05:50",
			leftedSections: "3",
			location: "Rouina",
			id: Math.random().toString(),
			color: "#FEE8AF",
		},
		{
			title: "Math AS3",
			nextSection: "2021-03-29T05:50",
			leftedSections: "2",
			location: "Rouina",
			id: Math.random().toString(),
			color: "#FEE8AF",
		},
		{
			title: "Math AS3",
			nextSection: "2021-03-29T05:50",
			leftedSections: "3",
			location: "Rouina",
			id: Math.random().toString(),
			color: "#FEE8AF",
		},
	];
	const RClasses = [
		{
			id: "1536s8",
			color: "#FEE8AF",
			price: "2500",
			rating: 4.5,
			title: "MAth As2 technique",
			school: "BBC School",
			schoolImg:
				"data:image/png;base64,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",
			level: "AS2",
		},
		{
			id: "123s6",
			color: "#FEE8AF",
			price: "2500",
			rating: 4.5,
			title: "MAth As2 technique",
			school: "BBC School",
			schoolImg:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA15JREFUSEu9lTtsW2UUx3/nu37RdkEMOEUIMbQJQiK+HXgISNyoCFpBHQYKE2oHJKZOFaQ0fiROFNaKpWIJIES3ErdCAQXFMX0siCZmiV2JoQO1QahCAVIn8f0OudcEauEmqgr5pvs49/z+/3PO913RYyj/45JtBRTrUUq11cCPxWH3DuHt7jVKNSjWpeVTlGSXkHxQA+ujCxFOl1d5ussw9ISlL95ejjYH+YUomfmVtohP+0L8sNQkuwARIMAL1I/EOFNpkis36Y87lOoWg7J0NMJOaYls6bmtBxsAB0gnILcAWdfBqBcAhhNRHF1hpAw5F643djC5uEw+IeTKgqeWkX2Q6f1HY0eAX4z98RCz9SY5N4zoWgDoj0cxrFGsK3OHlPfmd3Gl9ju5hGFswdJcz5tL+KK2AGy8fnZ3lPHeJqVay8HGeqFLKByKceALw5X6HwEg7SpG/a5I0KctSiSkXSE3b8m6BqO2VSI3jCdNJq5qoHSmvpPLfwH8+lsgGYf+ri0BkN4XIne1SS4hCPp3D0KsBL3xATcaYT6srAUx+bLBU48xF06t929TB4LhgZjyS0PJuOAoAeCph2J8+2MjUJp3/VE2ZOctB+Iw+5NgVbn5Roj77/O70WGKZn7exeyNlj3BEqHB/rhhTRyma/5sQdRYot4q2YRixXDwS5itaVD6r140DHR5bWO+vTuZ7n60O9m+Fe/2rlpCqnOdS0QqDanRu03ZFq+FYaQwfgeA76Dn+XsCSKUE1Yt3APiPH3ly/aDw4Pp37SBt30AdVagQhN32B2hrsrdnAGdoBtRj+YPXid36FXn4cezMGZzJZexnx7GlsziPJuCxPriQh73P4e0dIHR+FCYVprLgX3ca05XEEZzjZ3HKBZg+jX2niLlWwqtcJJQaRquzUL2EpDJoZQ6pfoOmsujiHFQvYwZPbQ7woc1n3iT01sfcmjhI9OQ0HAuDGsxHS9jC+xg/yE861VIpgxn08xE8J0ro8NDmAH3pBLw2QWPuEyK/1ZDDJ5Hzeb9imFeHAoC/TCqDnRoHsZhUGj03hmcMoa0cKIK8kgUR+P4CXu/LeI5gzo0hg+8ilUvBQWl7kjhq0Gtfw54+xISx1SL0JDGLRaiWNpmiexrSf3+8zUfFf6zeT/cneNGeELmLNnQAAAAASUVORK5CYII=",
			level: "AS2",
		},
		{
			id: "3666s",
			color: "#FEE8AF",
			price: "2500",
			rating: 4.5,
			title: "MAth As2 technique",
			school: "BBC School",
			schoolImg:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA15JREFUSEu9lTtsW2UUx3/nu37RdkEMOEUIMbQJQiK+HXgISNyoCFpBHQYKE2oHJKZOFaQ0fiROFNaKpWIJIES3ErdCAQXFMX0siCZmiV2JoQO1QahCAVIn8f0OudcEauEmqgr5pvs49/z+/3PO913RYyj/45JtBRTrUUq11cCPxWH3DuHt7jVKNSjWpeVTlGSXkHxQA+ujCxFOl1d5ussw9ISlL95ejjYH+YUomfmVtohP+0L8sNQkuwARIMAL1I/EOFNpkis36Y87lOoWg7J0NMJOaYls6bmtBxsAB0gnILcAWdfBqBcAhhNRHF1hpAw5F643djC5uEw+IeTKgqeWkX2Q6f1HY0eAX4z98RCz9SY5N4zoWgDoj0cxrFGsK3OHlPfmd3Gl9ju5hGFswdJcz5tL+KK2AGy8fnZ3lPHeJqVay8HGeqFLKByKceALw5X6HwEg7SpG/a5I0KctSiSkXSE3b8m6BqO2VSI3jCdNJq5qoHSmvpPLfwH8+lsgGYf+ri0BkN4XIne1SS4hCPp3D0KsBL3xATcaYT6srAUx+bLBU48xF06t929TB4LhgZjyS0PJuOAoAeCph2J8+2MjUJp3/VE2ZOctB+Iw+5NgVbn5Roj77/O70WGKZn7exeyNlj3BEqHB/rhhTRyma/5sQdRYot4q2YRixXDwS5itaVD6r140DHR5bWO+vTuZ7n60O9m+Fe/2rlpCqnOdS0QqDanRu03ZFq+FYaQwfgeA76Dn+XsCSKUE1Yt3APiPH3ly/aDw4Pp37SBt30AdVagQhN32B2hrsrdnAGdoBtRj+YPXid36FXn4cezMGZzJZexnx7GlsziPJuCxPriQh73P4e0dIHR+FCYVprLgX3ca05XEEZzjZ3HKBZg+jX2niLlWwqtcJJQaRquzUL2EpDJoZQ6pfoOmsujiHFQvYwZPbQ7woc1n3iT01sfcmjhI9OQ0HAuDGsxHS9jC+xg/yE861VIpgxn08xE8J0ro8NDmAH3pBLw2QWPuEyK/1ZDDJ5Hzeb9imFeHAoC/TCqDnRoHsZhUGj03hmcMoa0cKIK8kgUR+P4CXu/LeI5gzo0hg+8ilUvBQWl7kjhq0Gtfw54+xISx1SL0JDGLRaiWNpmiexrSf3+8zUfFf6zeT/cneNGeELmLNnQAAAAASUVORK5CYII=",
			level: "AS2",
		},
		{
			id: "1s5222",
			color: "#FEE8AF",
			price: "2500",
			rating: 4.5,
			title: "MAth As2 technique",
			school: "BBC School",
			schoolImg:
				"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAA15JREFUSEu9lTtsW2UUx3/nu37RdkEMOEUIMbQJQiK+HXgISNyoCFpBHQYKE2oHJKZOFaQ0fiROFNaKpWIJIES3ErdCAQXFMX0siCZmiV2JoQO1QahCAVIn8f0OudcEauEmqgr5pvs49/z+/3PO913RYyj/45JtBRTrUUq11cCPxWH3DuHt7jVKNSjWpeVTlGSXkHxQA+ujCxFOl1d5ussw9ISlL95ejjYH+YUomfmVtohP+0L8sNQkuwARIMAL1I/EOFNpkis36Y87lOoWg7J0NMJOaYls6bmtBxsAB0gnILcAWdfBqBcAhhNRHF1hpAw5F643djC5uEw+IeTKgqeWkX2Q6f1HY0eAX4z98RCz9SY5N4zoWgDoj0cxrFGsK3OHlPfmd3Gl9ju5hGFswdJcz5tL+KK2AGy8fnZ3lPHeJqVay8HGeqFLKByKceALw5X6HwEg7SpG/a5I0KctSiSkXSE3b8m6BqO2VSI3jCdNJq5qoHSmvpPLfwH8+lsgGYf+ri0BkN4XIne1SS4hCPp3D0KsBL3xATcaYT6srAUx+bLBU48xF06t929TB4LhgZjyS0PJuOAoAeCph2J8+2MjUJp3/VE2ZOctB+Iw+5NgVbn5Roj77/O70WGKZn7exeyNlj3BEqHB/rhhTRyma/5sQdRYot4q2YRixXDwS5itaVD6r140DHR5bWO+vTuZ7n60O9m+Fe/2rlpCqnOdS0QqDanRu03ZFq+FYaQwfgeA76Dn+XsCSKUE1Yt3APiPH3ly/aDw4Pp37SBt30AdVagQhN32B2hrsrdnAGdoBtRj+YPXid36FXn4cezMGZzJZexnx7GlsziPJuCxPriQh73P4e0dIHR+FCYVprLgX3ca05XEEZzjZ3HKBZg+jX2niLlWwqtcJJQaRquzUL2EpDJoZQ6pfoOmsujiHFQvYwZPbQ7woc1n3iT01sfcmjhI9OQ0HAuDGsxHS9jC+xg/yE861VIpgxn08xE8J0ro8NDmAH3pBLw2QWPuEyK/1ZDDJ5Hzeb9imFeHAoC/TCqDnRoHsZhUGj03hmcMoa0cKIK8kgUR+P4CXu/LeI5gzo0hg+8ilUvBQWl7kjhq0Gtfw54+xISx1SL0JDGLRaiWNpmiexrSf3+8zUfFf6zeT/cneNGeELmLNnQAAAAASUVORK5CYII=",
			level: "AS2",
		},
	];

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
			>
				<View
					style={{
						alignItems: "flex-start",
						width,
						paddingHorizontal: 25,
						paddingVertical: 5,
					}}
				>
					<Text
						style={{
							fontFamily: "f1Bold",
							fontSize: height / 31,
							color: theme.opp,
						}}
					>
						{toTitleCase(t("hello")) + " " + toTitleCase(user.name) + "!"}
					</Text>
					<Text
						style={{
							fontFamily: "f2SBold",
							fontSize: height / 43,
							color: theme.secondary,
						}}
					>
						To be, or Not to be {/* to be changed */}
					</Text>
				</View>
				<View style={{ alignItems: "center", gap: height / 70 }}>
					<View
						style={{
							height: height / 5.5,
							width: width * 0.85,
							borderRadius: height / 30,
							// backgroundColor: "red",
							overflow: "hidden",
						}}
					>
						<Animated.FlatList
							bounces={false}
							bouncesZoom={false}
							horizontal
							// onViewableItemsChanged={({ changed, viewableItems }) => {
							// 	itemIndex = viewableItems[0].index;
							// 	console.log(itemIndex);
							// }}
							showsHorizontalScrollIndicator={false}
							scrollEventThrottle={32}
							onScroll={Animated.event(
								[{ nativeEvent: { contentOffset: { x: scrollX } } }],
								{ useNativeDriver: false },
							)}
							pagingEnabled
							keyExtractor={(item) => item.key}
							data={ads}
							renderItem={({ item, index }) => {
								return (
									<View
										style={{
											width: width * 0.85,
											flexDirection: "row",
											justifyContent: "space-between",
											backgroundColor: item.backgroundColor,
										}}
									>
										<View
											style={{
												justifyContent: "center",
												alignItems: "center",
												flex: 1,
												paddingHorizontal: height / 70,
												gap: height / 90,
											}}
										>
											<Text
												style={{
													fontFamily: "f1Bold",
													fontSize: height / 40,
													color: colors.bColor,
													marginHorizontal: height / 70,
												}}
											>
												{item[i18n.language].title}
											</Text>
											<Text
												style={{
													fontFamily: "f2SBold",
													fontSize: height / 56,
													color: colors.bColor,
												}}
											>
												{item[i18n.language].description}
											</Text>
											<TouchableOpacity
												activeOpacity={0.9}
												style={{
													backgroundColor: colors.bColor,
													padding: 6,
													borderRadius: 6,
													marginHorizontal: height / 70,
												}}
												onPress={item.onPress}
											>
												<Text
													style={{
														fontFamily: "f1Bold",
														fontSize: height / 45,
														textTransform: "capitalize",
														color: colors.wColor,
													}}
												>
													{item[i18n.language].buttonText}
												</Text>
											</TouchableOpacity>
										</View>
										<View style={{ flex: 1 }}>{item.illustartion}</View>
									</View>
								);
							}}
						/>
					</View>
					<View>
						<View
							style={{
								flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
								display: "flex",
								alignItems: "center",
								gap: 6,
							}}
						>
							{ads.map((_, index) => {
								const indecatorColor = scrollX.interpolate({
									inputRange: [
										(index - 1) * width,
										index * width,
										width * (index + 1),
									],
									outputRange: [theme.opp, theme.g[1], theme.opp],
									extrapolate: "clamp",
								});

								return (
									<Animated.View
										key={index * 2}
										style={{
											backgroundColor:
												//
												indecatorColor,
											borderRadius: 6,
											height: 12,
											opacity: 1,

											// transform: [{ scale: indecator }],
											width: 12,
										}}
									></Animated.View>
								);
							})}
						</View>
					</View>
				</View>
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
					<View style={{ height: height / 3.35, justifyContent: "center" }}>
						{upClasses ? (
							<Animated.FlatList
								bounces={true}
								bouncesZoom={true}
								horizontal
								contentOffset={{
									waitForInteraction: true,
									viewAreaCoveragePercentThreshold: 95,
								}}
								showsHorizontalScrollIndicator={false}
								scrollEventThrottle={32}
								onScroll={Animated.event(
									[{ nativeEvent: { contentOffset: { x: scrolledX } } }],
									{ useNativeDriver: false },
								)}
								// pagingEnabled

								keyExtractor={(item) => item.key}
								data={upClasses}
								renderItem={({ item, index }) => {
									return (
										<View
											style={{
												width: width * 0.44,
												alignItems: "center",
												height: height / 3.45,
												justifyContent: "center",
											}}
										>
											<HorizontalClass
												key={item.id}
												title={item.title}
												nextSection={item.nextSection}
												leftedSections={item.leftedSections}
												location={item.location}
												id={item.id}
												color={item.color}
												theme={theme}
												router={router}
												focused={scrolledX}
												len={upClasses.length}
												index={index}
											/>
										</View>
									);
								}}
							/>
						) : (
							<ActivityIndicator size={"large"} color={theme.opp} />
						)}
					</View>
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
					<View style={{ gap: height / 70 }}>
						{RClasses ? (
							RClasses.map((classItem, index) => {
								return (
									<ClassComp
										key={classItem.id}
										classData={classItem}
										theme={theme}
									/>
								);
							})
						) : (
							<ActivityIndicator />
						)}
					</View>
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
