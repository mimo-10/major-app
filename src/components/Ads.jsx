/** @format */

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	Animated,
	TouchableOpacity,
} from "react-native";

import React, { useEffect, useRef, useState } from "react";
import { Link, useRouter } from "expo-router";

import { useTranslation } from "react-i18next";
import { I18nManager } from "react-native";

import { State } from "../../app/(tabs)/_layout";

import { colors } from "../../src/constants/styles";

import { ScrollView, TouchableHighlight } from "react-native-gesture-handler";

import Skeleton from "react-native-reanimated-skeleton"; //// build

import { getAds, getQuote } from "../../src/utils/response";

const { width, height } = Dimensions.get("screen");
const Ads = () => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const { t, i18n } = useTranslation();
	const { theme, user, SkeltonConfig } = State();
	const router = useRouter();
	const [loadingad, setloadingad] = useState(true);

	const [ads, setads] = useState([]);
	useEffect(() => {
		getAds(3, user.token, setloadingad, setads);
	}, []);
	return (
		<View style={{ alignItems: "center", gap: height / 70 }}>
			<Skeleton {...SkeltonConfig} isLoading={loadingad}>
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
									<View style={{ flex: 1 }}>
										<Image
											source={{ uri: item.illustration }}
											width={(0.85 / 2) * width}
											height={height / 5.5}
										/>
									</View>
								</View>
							);
						}}
					/>
				</View>
			</Skeleton>
			<Skeleton
				layout={[{ width: width * 0.1, height: 12, borderRadius: 6 }]}
				{...SkeltonConfig}
				isLoading={loadingad}
			>
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
			</Skeleton>
		</View>
	);
};

export default Ads;

const styles = StyleSheet.create({});
