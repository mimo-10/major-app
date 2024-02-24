/** @format */

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Image,
	TouchableOpacity,
} from "react-native";
import React from "react";
import { useTranslation } from "react-i18next";
import Clock from "../assets/clock.svg";
import Star from "../assets/star.svg";

const { width, height } = Dimensions.get("screen");

const ClassComp = ({ classData, theme }) => {
	const { t } = useTranslation();
	const week = () => {
		return 6;
	};
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
			}}
		>
			<View
				style={{
					backgroundColor: theme.main,
					width: width * 0.88,
					borderRadius: 5,
					padding: height / 70,
					gap: height / 100,
				}}
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
			</View>
		</TouchableOpacity>
	);
};

export default ClassComp;

const styles = StyleSheet.create({});
