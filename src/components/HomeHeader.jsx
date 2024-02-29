/** @format */

import { StyleSheet, Text, View, Dimensions, Animated } from "react-native";

import React, { useEffect, useRef, useState } from "react";
import { Link, useRouter } from "expo-router";

import { useTranslation } from "react-i18next";

import { State } from "../../app/(tabs)/_layout";

import { toTitleCase } from "../../src/utils";

import Skeleton from "react-native-reanimated-skeleton"; //// build

import { getAds, getQuote } from "../../src/utils/response";

const { width, height } = Dimensions.get("screen");

const HomeHeader = () => {
	const { t, i18n } = useTranslation();
	const { theme, user, SkeltonConfig } = State();
	const router = useRouter();

	const [lquote, setlquote] = useState(true);
	const [quote, setquote] = useState("");

	useEffect(() => {
		getQuote(user.token, setlquote, setquote);
	}, []);
	return (
		<View
			style={{
				alignItems: "flex-start",
				width,
				paddingHorizontal: 25,
				paddingVertical: 5,
			}}
		>
			<Skeleton
				layout={[
					{
						width: width * 0.6,
						height: height / 31,
						marginBottom: 5,
					},
					{
						marginTop: 5,
						width: width * 0.5,
						height: height / 43,
					},
				]}
				{...SkeltonConfig}
				isLoading={lquote}
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
					{quote} {/* to be changed */}
				</Text>
			</Skeleton>
		</View>
	);
};

export default HomeHeader;

const styles = StyleSheet.create({});
