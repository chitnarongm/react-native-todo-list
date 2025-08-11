import TodoInputForm from "@/components/TodoInputForm";
import { TODO_STATUS } from "@/constants/common";
import { useTodoStore } from "@/store/useTodoStore";
import { Checkbox, Icon, List, Tag } from "@ant-design/react-native";
import { ScrollView, StyleSheet, Text } from "react-native";

export default function HomeScreen() {
  const { todoItems, removeTodo, updateTodoStatus } = useTodoStore();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>To-do List</Text>
      <List>
        {todoItems.map((item) => {
          return (
            <List.Item
              thumb={
                <Checkbox
                  onChange={(event) => {
                    updateTodoStatus(
                      item,
                      event.target.checked
                        ? TODO_STATUS.DONE
                        : TODO_STATUS.PENDING
                    );
                  }}
                />
              }
              key={item.id}
              extra={<Icon name="delete" onPress={() => removeTodo(item)} />}
              styles={{
                Content: styles.todoItemContent,
              }}
            >
              <Tag selected={item.status === TODO_STATUS.DONE}>
                {item.status}
              </Tag>
              <Text>{item.description}</Text>
            </List.Item>
          );
        })}
      </List>
      <TodoInputForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    paddingBottom: 8,
  },
  todoItemContent: {
    gap: 4,
    justifyContent: "flex-start",
  },
});
