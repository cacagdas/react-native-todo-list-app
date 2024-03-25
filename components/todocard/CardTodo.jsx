import { Image, Text, TouchableOpacity } from "react-native";
import checkImg from "../../assets/check.png";
import { s } from "./CardTodo.style";

export function CardTodo({ todo, onPress }) {
	return (
		<TouchableOpacity style={s.card} onPress={() => onPress(todo)}>
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
