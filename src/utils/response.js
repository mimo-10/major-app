/** @format */

const server_URi = "http://192.168.43.78:4000";

export async function login(setloading, loginObj, navigation, toast, realm) {
	setloading(true);
	console.log(server_URi);
	try {
		var res = await fetch(`${server_URi}/api/user/login`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(loginObj),
		});
		res = await res.json();
		data = res.data;

		if (res.status === "success") {
			toast.success("you are now logged in, redirecting after 4s.", "top");
			// localStorage.setItem("user", JSON.stringify(res.data));
			realm.write(() => {
				realm.create("User", {
					_id: data._id,
					name: data.name,
					birth: data.birth,
					last: data.last,
					verified: data.verified,
					pic: data.pic,
					username: data.username,
					function: data.function,
					email: data.email,
					about: data.about,
					token: data.token,
					phone: data.phone,

					// classrooms : []
				});
			});
			// const val = await AsyncStorage.setItem("user", JSON.stringify(res.data));

			setTimeout(() => {
				// navigation.dispatch(
				// 	CommonActions.reset({
				// 		index: 0,
				// 		routes: [{ name: "conversations" }],
				// 	}),
				// );
				navigation.replace("/Home");
			}, 4000);
		}
		if (res.status === "Pending") {
			// triggerNotifiaction(
			// 	"User exist but needs verification",
			// 	"you need to verify your email, 4s to redirect.",
			// 	"warning",
			// );
			toast.warn("you need to verify your email, 4s to redirect.", "top");
			setTimeout(() => {
				navigation.push({
					pathname: "/Otp",
					params: {
						email: loginObj.email,
						userId: data._id,
					},
				});
			}, 4000);
		}
		if (res.status == "error") {
			// triggerNotifiaction("Error", res.message, "danger");
			toast.error(res.message, "top");
		}

		setloading(false);

		//push
	} catch (err) {
		console.log(err);
		setloading(false);
		toast.error("Something went wrong, try again", "top");
	}
}

export async function VerifyOtp(setloading, data, navigation, toast, realm) {
	setloading(true);
	console.log(data);
	try {
		var res = await fetch(`${server_URi}/api/user/validate`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data),
		});
		res = await res.json();
		data = res.data;
		console.log(res, "fff");
		if (res.status === "success") {
			toast.success("you are now verified, redirecting after 4s", "top");
			// localStorage.setItem("user", JSON.stringify(res.data));
			realm.write(() => {
				realm.create("User", {
					_id: data._id,
					name: data.name,
					birth: data.birth,
					last: data.last,
					verified: data.verified,
					pic: data.pic,
					username: data.username,
					function: data.function,
					email: data.email,
					about: data.about,
					token: data.token,
					phone: data.phone,
				});
			});
			// const val = await AsyncStorage.setItem("user", JSON.stringify(res.data));

			setTimeout(() => {
				// navigation.dispatch(
				// 	CommonActions.reset({
				// 		index: 0,
				// 		routes: [{ name: "conversations" }],
				// 	}),
				// );
				navigation.replace("/Home");
			}, 4000);
		}

		if (res.status == "failed") {
			// triggerNotifiaction("Error", res.message, "danger");
			toast.error(res.message, "top");
		}

		setloading(false);

		//push
	} catch (err) {
		setloading(false);
		toast.error("Something went wrong, try again", "top");
	}
}

export async function sendOtp(setloading, email, toast, setsent) {
	console.log(email);
	setloading(true);
	try {
		var res = await fetch(`${server_URi}/api/user/sendOTP`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: email }),
		});
		res = await res.json();
		data = res.data;

		if (res.status == "success") {
			setsent(true);
		}

		if (res.status == "error") {
			// triggerNotifiaction("Error", res.message, "danger");
			toast.error(res.message, "top");
			setsent(false);
		}

		setloading(false);

		//push
	} catch (err) {
		console.log(err);
		setloading(false);
		toast.error("Something went wrong, try again", "top");
	}
}

export async function register(setloading, registerObj, navigation, toast) {
	setloading(true);
	let { email, name, last, password, phone, Function, ccp, level, location } =
		registerObj;
	if (!(name && email && last && Function && location && phone && password)) {
		toast.error("Please fill all the fields", "top");
		setloading(false);
		return;
	} else {
		if (Function == "student") {
			if (!level) {
				toast.error("Please enter your level", "top");
				setloading(false);
				return;
			}
		} else if (Function == "teacher") {
			if (!ccp) {
				toast.error("Please enter your CCP number", "top");
				setloading(false);
				return;
			}
		}
	}
	console.log(registerObj);
	try {
		var res = await fetch(`${server_URi}/api/user/registration`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(registerObj),
		});
		res = await res.json();
		data = res.data;

		if (res.status === "success") {
			// localStorage.setItem("user", JSON.stringify(res.data));

			// const val = await AsyncStorage.setItem("user", JSON.stringify(res.data));

			// setTimeout(() => {
			// 	// navigation.dispatch(
			// 	// 	CommonActions.reset({
			// 	// 		index: 0,
			// 	// 		routes: [{ name: "conversations" }],
			// 	// 	}),
			// 	// );
			// }, 4000);

			navigation.push({
				pathname: "/Otp",
				params: {
					email: data.email,
					userId: data._id,
				},
			});
		}
		if (res.status === "error") {
			// triggerNotifiaction(
			// 	"User exist but needs verification",
			// 	"you need to verify your email, 4s to redirect.",
			// 	"warning",
			// );
			toast.warn(res.message);
		}
		if (res.status == "error") {
			// triggerNotifiaction("Error", res.message, "danger");
			toast.error(res.message, "top");
		}

		setloading(false);

		//push
	} catch (err) {
		console.log(err);
		setloading(false);
		toast.error("Something went wrong, try again", "top");
	}
}

export async function checkUser(setloading, registerObj, navigation, toast) {
	setloading(true);

	try {
		var res = await fetch(`${server_URi}/api/user/checkUser`, {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: registerObj.email.trim() }),
		});

		res = await res.json();
		data = res.data;
		// console.log(res.status);
		if (res.status === "success") {
			// localStorage.setItem("user", JSON.stringify(res.data));

			// const val = await AsyncStorage.setItem("user", JSON.stringify(res.data));

			// setTimeout(() => {
			// 	// navigation.dispatch(
			// 	// 	CommonActions.reset({
			// 	// 		index: 0,
			// 	// 		routes: [{ name: "conversations" }],
			// 	// 	}),
			// 	// );
			// 	// navigation.push("/Register2");
			// }, 4000);
			navigation.push({
				pathname: "/Register2",
				params: {
					email: registerObj.email.trim(),
					name: registerObj.name.trim(),
					last: registerObj.lastName.trim(),
					password: registerObj.password.trim(),
				},
			});
		}
		if (res.status === "pending") {
			// triggerNotifiaction(
			// 	"User exist but needs verification",
			// 	"you need to verify your email, 4s to redirect.",
			// 	"warning",
			// );
			toast.warn(res.message, "top");
			// setTimeout(() => {
			// 	navigation.push({
			// 		pathname: "/Otp",
			// 		params: {
			// 			email: registerObj.email,
			// 			name: registerObj.name,
			// 			last: registerObj.last,
			// 			password: registerObj.password,
			// 		},
			// 	});
			// }, 4000);
		}
		if (res.status == "error") {
			// triggerNotifiaction("Error", res.message, "danger");
			toast.error(res.message, "top");
		}

		setloading(false);

		//push
	} catch (err) {
		console.log(err);
		setloading(false);
		toast.error("Something went wrong, try again", "top");
	}
}
