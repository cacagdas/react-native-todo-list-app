import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/header/Header";
import { CardTodo } from "./components/todocard/CardTodo";
import { useState } from "react";
import { BottomNavBar } from "./components/bottomnavbar/BottomNavBar";

export default function App() {
	const [todoList, setTodoList] = useState([
		{ id: 1, title: "Task #1", isCompleted: true },
		{ id: 2, title: "Task #2", isCompleted: false },
		{ id: 3, title: "Task #3", isCompleted: false },
		{ id: 4, title: "Task #4", isCompleted: true },
		{ id: 5, title: "Task #5", isCompleted: false },
		{ id: 6, title: "Task #6", isCompleted: false },
		{ id: 7, title: "Task #7", isCompleted: true },
		{ id: 8, title: "Task #8", isCompleted: false },
		{ id: 9, title: "Task #9", isCompleted: false },
	]);

	const [selectedTabName, setSelectedTabName] = useState("all");

	function getFilteredList() {
		switch (selectedTabName) {
			case "all":
				return todoList;
			case "inProgress":
				return todoList.filter((todo) => !todo.isCompleted);
			case "done":
				return todoList.filter((todo) => todo.isCompleted);
		}
	}

	function renderTodoList() {
		return getFilteredList().map((todo) => (
			<View key={todo.id} style={s.cardItem}>
				<CardTodo onPress={updateTodo} todo={todo} />
			</View>
		));
	}

	function updateTodo(todo) {
		const updatedTodo = {
			...todo,
			isCompleted: !todo.isCompleted,
		};
		const updatedTodoList = [...todoList];
		const index = updatedTodoList.findIndex((t) => t.id == updatedTodo.id);
		updatedTodoList[index] = updatedTodo;
		setTodoList(updatedTodoList);
	}

	return (
		<>
			<SafeAreaProvider>
				<SafeAreaView style={s.app}>
					<View style={s.header}>
						<Header />
					</View>
					<View style={s.body}>
						<ScrollView>{renderTodoList()}</ScrollView>
					</View>
				</SafeAreaView>
			</SafeAreaProvider>

			<View style={s.footer}>
				<BottomNavBar
					todoList={todoList}
					onPress={setSelectedTabName}
					selectedTabName={selectedTabName}
				/>
			</View>
		</>
	);
}
