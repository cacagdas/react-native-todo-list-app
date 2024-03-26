import { Alert, ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/header/Header";
import { CardTodo } from "./components/todocard/CardTodo";
import { useEffect, useState } from "react";
import { BottomNavBar } from "./components/bottomnavbar/BottomNavBar";
import { AddButton } from "./components/addbutton/AddButton";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
	const [todoList, setTodoList] = useState([]);
	const [selectedTabName, setSelectedTabName] = useState("all");
	const [isAddDialogDisplayed, setIsAddDialogDisplayed] = useState(false);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		loadTodoList();
	}, []);

	useEffect(() => {
		if (!isLoadUpdate) {
			if (!isFirstRender) {
				saveTodoList();
			} else {
				isFirstRender = false;
			}
		} else {
			isLoadUpdate = false;
		}
	}, [todoList]);

	async function loadTodoList() {
		try {
			setTodoList(JSON.parse(await AsyncStorage.getItem("@todoList")) || []);
		} catch (error) {
			alert(error);
		}
	}

	async function saveTodoList() {
		try {
			isLoadUpdate = true;
			await AsyncStorage.setItem("@todoList", JSON.stringify(todoList));
		} catch (error) {
			alert(error);
		}
	}

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
				<CardTodo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
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

	function deleteTodo(todo) {
		Alert.alert("Delete todo", "Are you sure you want to delete this todo?", [
			{
				text: "Delete",
				style: "destructive",
				onPress: () => {
					setTodoList(todoList.filter((t) => t.id !== todo.id));
				},
			},
			{ text: "Cancel", style: "cancel" },
		]);
	}

	function addTodo() {
		const newTodo = {
			id: uuid.v4(),
			title: inputValue,
			isCompleted: false,
		};
		setTodoList([...todoList, newTodo]);
		setIsAddDialogDisplayed(false);
		setInputValue("");
	}

	function renderAddDialog() {
		return (
			<Dialog.Container
				visible={isAddDialogDisplayed}
				onBackdropPress={() => setIsAddDialogDisplayed(false)}
			>
				<Dialog.Title>Add todo</Dialog.Title>
				<Dialog.Description>Type name for todo</Dialog.Description>
				<Dialog.Input onChangeText={setInputValue} placeholder="Todo title" />
				<Dialog.Button
					label="Cancel"
					color="grey"
					onPress={() => setIsAddDialogDisplayed(false)}
				/>
				<Dialog.Button
					disabled={inputValue.length === 0}
					label="Save"
					onPress={addTodo}
				/>
			</Dialog.Container>
		);
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
					<AddButton onPress={() => setIsAddDialogDisplayed(true)} />
				</SafeAreaView>
			</SafeAreaProvider>

			<View style={s.footer}>
				<BottomNavBar
					todoList={todoList}
					onPress={setSelectedTabName}
					selectedTabName={selectedTabName}
				/>
			</View>
			{renderAddDialog()}
		</>
	);
}
