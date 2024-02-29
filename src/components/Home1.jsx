/** @format */

import { StyleSheet, View, Dimensions, Animated } from "react-native";

import React, { useRef, useState, useEffect } from "react";
import { Link, useRouter } from "expo-router";

import { State } from "../../app/(tabs)/_layout";

import Skeleton from "react-native-reanimated-skeleton"; //// build
import LottieView from "lottie-react-native";
import HorizontalClass from "../../src/components/HorizontaleClass";
import { getStudentClassrooms } from "../utils/response";

const { width, height } = Dimensions.get("screen");
const Home1 = ({ mainRef }) => {
	const scrolledX = useRef(new Animated.Value(0)).current;

	const { theme, SkeltonConfig, user } = State();
	const router = useRouter();
	const [upClasses, setupClasses] = useState([]);
	// const upClasses = [
	// 	{
	// 		title: "Math AS3",
	// 		nextSection: "2021-03-29T05:50",
	// 		leftedSections: "2",
	// 		location: "Rouina",
	// 		id: Math.random().toString(),
	// 		color: "#FEE8AF",
	// 	},
	// 	{
	// 		title: "Math AS3",
	// 		nextSection: "2021-03-29T05:50",
	// 		leftedSections: "3",
	// 		location: "Rouina",
	// 		id: Math.random().toString(),
	// 		color: "#FEE8AF",
	// 	},
	// 	{
	// 		title: "Math AS3",
	// 		nextSection: "2021-03-29T05:50",
	// 		leftedSections: "1",
	// 		location: "Rouina",
	// 		id: Math.random().toString(),
	// 		color: "#FEE8AF",
	// 	},
	// 	{
	// 		title: "Math AS3",
	// 		nextSection: "2021-03-29T05:50",
	// 		leftedSections: "4",
	// 		location: "Rouina",
	// 		id: Math.random().toString(),
	// 		color: "#FEE8AF",
	// 	},
	// 	{
	// 		title: "Math AS3",
	// 		nextSection: "2021-03-29T05:50",
	// 		leftedSections: "3",
	// 		location: "Rouina",
	// 		id: Math.random().toString(),
	// 		color: "#FEE8AF",
	// 	},
	// 	{
	// 		title: "Math AS3",
	// 		nextSection: "2021-03-29T05:50",
	// 		leftedSections: "2",
	// 		location: "Rouina",
	// 		id: Math.random().toString(),
	// 		color: "#FEE8AF",
	// 	},
	// 	{
	// 		title: "Math AS3",
	// 		nextSection: "2021-03-29T05:50",
	// 		leftedSections: "3",
	// 		location: "Rouina",
	// 		id: Math.random().toString(),
	// 		color: "#FEE8AF",
	// 	},
	// ];
	const [loadingUp, setloadingUp] = useState(true);

	const animationUp = useRef(null);

	useEffect(() => {
		getStudentClassrooms(user.token, setloadingUp, setupClasses);
	}, []);

	return (
		<View style={{ height: height / 3.35, justifyContent: "center" }}>
			{!loadingUp ? (
				upClasses != [] ? (
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
										mainRef={mainRef}
										key={item.id}
										title={item.title}
										nextSession={item.nextSession}
										leftedSession={item.leftedSession}
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
					<LottieView
						ref={animationUp}
						loop={true}
						autoPlay={true}
						style={{
							width: 200,
							height: 200,
							backgroundColor: "red",
						}}
						useNativeLooping
						source={require("../assets/animated/emptyUP.json")}
					/>
				)
			) : (
				<Skeleton
					containerStyle={{ flexDirection: "row", gap: width * 0.05 }}
					layout={[
						{
							height: height / 3.5,
							borderRadius: 20,
							width: width * 0.4,
							padding: height / 40,
							backgroundColor: theme.main,
							justifyContent: "space-between",
							alignItems: "center",
						},
						{
							height: height / 3.5,
							borderRadius: 20,
							width: width * 0.4,
							padding: height / 40,
							backgroundColor: theme.main,
							justifyContent: "space-between",
							alignItems: "center",
						},
						{
							height: height / 3.5,
							borderRadius: 20,
							width: width * 0.4,
							padding: height / 40,
							backgroundColor: theme.main,
							justifyContent: "space-between",
							alignItems: "center",
						},
					]}
					{...SkeltonConfig}
					isLoading={loadingUp}
				>
					{/* <ActivityIndicator size={"large"} color={theme.opp} /> */}
				</Skeleton>
			)}
		</View>
	);
};

export default Home1;

const styles = StyleSheet.create({});
