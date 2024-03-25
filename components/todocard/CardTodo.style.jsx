import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
	card: {
		backgroundColor: "white",
		height: 112,
		shadowColor: "black",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 4,
		borderRadius: 12,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 24,
	},
	img: {
		height: 24,
		width: 24,
	},
});
