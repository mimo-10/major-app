/** @format */

export const fonts = {
	f1Black: "../assets/fonts/Metropolis-Black.otf",
	f1Bold: "../assets/fonts/Metropolis-Bold.otf",
	f1Regular: "../assets/fonts/Metropolis-Regular.otf",
	f1Medium: "../assets/fonts/Metropolis-Medium.otf",
	f1Thin: "../assets/fonts/Metropolis-Thin.otf",
	f2Black: "../assets/fonts/Gilroy-Black.ttf",
	f2Bold: "../assets/fonts/Gilroy-Bold.ttf",
	f2Regular: "../assets/fonts/Gilroy-Regular.ttf",
	f2Medium: "../assets/fonts/Gilroy-Medium.ttf",
	f2Thin: "../assets/fonts/Gilroy-Thin.ttf",
};

export const colors = {
	d1Color: "#591842",
	d2Color: "#732056",
	a1Color: "#F29F05",
	a2Color: "#F2B705",
	g1: ["#731456", "#9D215C"],
	bgColor1: "#D9CCC5",
	bColor: "#1E1E1E",
	bAColor: "rgba(30, 30, 30, 0.6)",
	wColor: "#DDDDDD",
	info: "#0d6efd",
	danger: "#dc3545",
	warning: "#fd7e14",
	warning2: "#ffc107",
	success: "#198754",
};

export const useTheme = (dark) => {
	return !dark
		? {
				bg: "#F2F2F2",
				main: "#FCFCFC",
				g: ["#731456", "#9D215C"],
				secondary: "#666666",
				opp: "#1E1E1E",
				boneColor: "#E1E9EE",
				highlightColor: "#F2F8FC",
		  }
		: {
				bg: "#2D2D30",
				main: "#1E1E1E",
				g: ["#F29F05", "#F2B705"],
				opp: "#E1E1E1",
				secondary: "#A0A0A0",
				boneColor: "#38444d",
				highlightColor: "#10171E",
		  };
};
