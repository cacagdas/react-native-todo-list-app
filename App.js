import { ScrollView, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/header/Header";
import { CardTodo } from "./components/todocard/CardTodo";
import { useState } from "react";

export default function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Task #1", isCompleted: true },
    { id: 2, title: "Task #2", isCompleted: false },
    { id: 3, title: "Task #3", isCompleted: false },
    { id: 4, title: "Task #1", isCompleted: true },
    { id: 5, title: "Task #2", isCompleted: false },
    { id: 6, title: "Task #3", isCompleted: false },
    { id: 7, title: "Task #1", isCompleted: true },
    { id: 8, title: "Task #2", isCompleted: false },
    { id: 9, title: "Task #3", isCompleted: false },
  ]);

  function renderTodoList() {
    return todoList.map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <CardTodo todo={todo} />
      </View>
    ));
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
        <Text>Footer</Text>
      </View>
    </>
  );
}
