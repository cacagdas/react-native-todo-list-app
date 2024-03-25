import { Image, Text, TouchableOpacity } from "react-native";
import checkImg from "../../assets/check.png";
import { s } from "./CardTodo.style";

export function CardTodo({ todo, onPress, onLongPress }) {
	return (
		<TouchableOpacity
			style={s.card}
			onPress={() => onPress(todo)}
			onLongPress={() => onLongPress(todo)}
		>
			<Text
				style={[
					s.title,
					todo.isCompleted && { textDecorationLine: "line-through" },
				]}
			>
				{todo.title}
			</Text>
			{todo.isCompleted && <Image style={s.img} source={checkImg} />}
		</TouchableOpacity>
	);
}
