/** @format */

import {
	StyleSheet,
	Text,
	View,
	Dimensions,
	Pressable,
	TouchableWithoutFeedback,
} from "react-native";
import { colors } from "../constants/styles";

import { Animated } from "react-native";
import { useMemo, useEffect } from "react";

export const useSpring = (value, config) => {
	const animatedValue = useMemo(() => new Animated.Value(value.to), []);
	useEffect(() => {
		const animation = Animated.spring(animatedValue, {
			...config,
			toValue: value.to,
			useNativeDriver: false,
		});
		animation.start();
		return () => animation.stop();
	}, [value.to]);
	return animatedValue;
};

const activeColor = colors.d1Color;
const inactiveColor = "#000";

export default TabItem = ({ style, Icon, label, active, onPress, dark }) => {
	const animation = useSpring(
		{ to: active ? 1 : 0 },
		{
			mass: 1,
			damping: 80,
			stiffness: 500,
		},
	);
	const labelTranslate = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [15, 5],
	});
	const scale = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0.95],
	});
	const iconTranslate = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [8, 0],
	});
	const colorInterpolation = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [inactiveColor, activeColor],
	});
	const labelVisibility = animation;
	const iconVisibility = animation.interpolate({
		inputRange: [0, 1],
		outputRange: [1, 0],
	});
	const dotScale = animation;

	return (
		<TouchableWithoutFeedback onPress={onPress}>
			<Animated.View
				style={[
					styles.container,
					{ transform: [{ translateY: iconTranslate }] },
				]}
			>
				<Animated.View
					style={[
						styles.centered,
						{
							// opacity: iconVisibility,
							// transform: [{ translateY: iconTranslate }],
						},
					]}
				>
					{Icon}
				</Animated.View>
				<Animated.View
					style={[
						styles.centered,
						{
							opacity: labelVisibility,
							// transform: [{ translateY: labelTranslate }],
						},
					]}
				>
					<Text
						style={[
							styles.label,
							{
								color: active
									? dark
										? colors.a1Color
										: colors.d2Color
									: dark
									? colors.wColor
									: colors.bColor,
							},
						]}
					>
						{label}
					</Text>
				</Animated.View>

				{/* <Animated.View
					style={[styles.dot, { transform: [{ scale: dotScale }] }]}
				/> */}
			</Animated.View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	item: {
		flex: 1,
	},
	container: {
		alignItems: "center",
		justifyContent: "center",
		gap: 3,
	},
	// centered: {
	// 	position: "absolute",
	// },
	icon: {
		tintColor: inactiveColor,
	},
	label: {
		color: activeColor,
		fontFamily: "f1Bold",
		fontSize: 11,
		textTransform: "capitalize",
		letterSpacing: -0.2,
	},
	dot: {
		position: "absolute",
		bottom: 8,
		width: 5,
		height: 5,
		borderRadius: 2.5,
		backgroundColor: activeColor,
	},
});
