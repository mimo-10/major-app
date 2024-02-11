/** @format */
import "react-native-gesture-handler";
import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
	TransitionPresets,
	CardStyleInterpolators,
	StackCardStyleInterpolator,
} from "@react-navigation/stack";
import { ParamListBase, StackNavigationState } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { withLayoutContext, Slot } from "expo-router";
import { useRealm } from "@realm/react";
import Realm from "realm";
import { RealmProvider } from "@realm/react";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import ToastManager from "toastify-react-native";

class User extends Realm.Object {
	static schema = {
		name: "User",
		primaryKey: "_id",
		properties: {
			_id: "string",
			name: "string",
			// birth: "date",
			last: "string",
			verified: "bool",
			pic: "string",
			username: "string",
			// function: "string",
			email: "string",
			// about: "string",
			token: "string",
		},
	};
}

class Onboard extends Realm.Object {
	static schema = {
		name: "Onboard",
		primaryKey: "_id",
		properties: {
			_id: "string",
			state: "bool",
		},
	};
}

const { Navigator } = createStackNavigator();
const ConstumStack = withLayoutContext(Navigator);
export default function Layout() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<ToastManager
				duration={3800}
				textStyle={{ width: 160, fontFamily: "f1Bold", fontSize: 12 }}
			/>
			<SafeAreaView style={{ flex: 1 }}>
				<BottomSheetModalProvider>
					<RealmProvider
						schema={[Onboard, User]}
						deleteRealmIfMigrationNeeded={true}
						schemaVersion={0}
					>
						<ConstumStack
							screenOptions={{
								animationTypeForReplace: "pop",
								gestureEnabled: true,
								headerShown: false,
								gestureResponseDistance: 100,
								...TransitionPresets.SlideFromRightIOS,
							}}
						>
							<Stack.Screen
								name='index'
								options={{
									...TransitionPresets.ModalFadeTransition,
									animationDuration: 5,
									// animation: "none",
									// animationTypeForReplace: "pop",
								}}
							/>
							<Stack.Screen name='Home' />
							<Stack.Screen
								name='(auth)/Login'
								options={{
									gestureEnabled: false,
								}}
							/>
							<Stack.Screen name='(auth)/Register' />
							<Stack.Screen name='(auth)/Register2' />
							<Stack.Screen name='(auth)/Otp' />
							<Stack.Screen
								name='Onboards'
								options={{
									gestureEnabled: false,
								}}
							/>
						</ConstumStack>
					</RealmProvider>
				</BottomSheetModalProvider>
			</SafeAreaView>
		</GestureHandlerRootView>
	);
}
