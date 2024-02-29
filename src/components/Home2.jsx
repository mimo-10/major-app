/** @format */

import { StyleSheet, View, Dimensions, Animated } from "react-native";

import React, { useEffect, useRef, useState } from "react";
import { Link, useRouter } from "expo-router";

import { useTranslation } from "react-i18next";

import { State } from "../../app/(tabs)/_layout";

import ClassComp from "../../src/components/ClassComp";
import Skeleton from "react-native-reanimated-skeleton"; //// build
import { getRecommendedClasses } from "../utils/response";

const { width, height } = Dimensions.get("screen");

const Home2 = ({ mainRef }) => {
	const { theme, SkeltonConfig, user } = State();

	const [loadingR, setloadingR] = useState(true);
	const [RClasses, setRClasses] = useState([]);

	useEffect(() => {
		getRecommendedClasses(5, user.token, setloadingR, setRClasses);
	}, []);

	return (
		<View style={{ gap: height / 70 }}>
			{!loadingR ? (
				RClasses ? (
					RClasses.map((classItem, index) => {
						return (
							<ClassComp
								mainRef={mainRef}
								key={classItem.id}
								classData={classItem}
								theme={theme}
							/>
						);
					})
				) : (
					""
				)
			) : (
				<Skeleton
					containerStyle={{ gap: height / 70 }}
					layout={[
						{
							width: width * 0.9,

							borderRadius: height / 70,
							height: height * 0.125,
						},
						{
							width: width * 0.9,

							borderRadius: height / 70,
							height: height * 0.125,
						},
						{
							width: width * 0.9,

							borderRadius: height / 70,
							height: height * 0.125,
						},
						{
							width: width * 0.9,

							borderRadius: height / 70,
							height: height * 0.125,
						},
					]}
					{...SkeltonConfig}
					isLoading={loadingR}
				></Skeleton>
			)}
		</View>
	);
};

export default Home2;

const styles = StyleSheet.create({});
