import { useTodoStore } from "@/store/useTodoStore";
import { useState } from "react";
import { Button, StyleSheet, TextInput, View } from "react-native";

export default function TodoInputForm() {
  const { addTodo, todoItems } = useTodoStore();
  const [todoDescription, setTodoDescription] = useState("");

  const addTodoItem = () => {
    if (todoDescription) {
      addTodo({
        id: todoItems.length + 1,
        description: todoDescription,
        status: "pending",
      });

      setTodoDescription("");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter to-do description"
        onChangeText={setTodoDescription}
        value={todoDescription}
        style={styles.input}
      />
      <Button title="Add To-do" onPress={addTodoItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginTop: 24,
    justifyContent: "flex-end",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    marginBottom: 8,
    borderRadius: 4,
    width: "100%",
  },
});
