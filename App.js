import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/header/Header";
import { CardTodo } from "./components/todocard/CardTodo";

const TODO_LIST = [
  { id: 1, title: "Task #1", isCompleted: true },
  { id: 2, title: "Task #2", isCompleted: false },
  { id: 3, title: "Task #3", isCompleted: false },
];

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>
          <View style={s.body}>
            <CardTodo todo={TODO_LIST[0]} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>

      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
