import { TODO_STATUS } from "@/constants/common";
import { create } from "zustand";

interface TodoItem {
  id: number;
  status: string;
  description: string;
}

interface TodoState {
  todoItems: TodoItem[];
  addTodo: (item: TodoItem) => void;
  removeTodo: (item: TodoItem) => void;
  updateTodoStatus: (item: TodoItem, status: string) => void;
}

const initialTodoItems: TodoItem[] = [
  {
    id: 1,
    status: TODO_STATUS.PENDING,
    description: "Setup GitHub repository",
  },
  {
    id: 2,
    status: TODO_STATUS.PENDING,
    description: "Initialize iOS and Android Simulator",
  },
  {
    id: 3,
    status: TODO_STATUS.PENDING,
    description: "Do BBL test",
  },
];

export const useTodoStore = create<TodoState>((set) => ({
  todoItems: initialTodoItems,
  addTodo: (todo: TodoItem) =>
    set((state) => ({ todoItems: [...state.todoItems, todo] })),
  removeTodo: (todo: TodoItem) =>
    set((state) => ({
      todoItems: [...state.todoItems].filter((item) => item.id !== todo.id),
    })),
  updateTodoStatus: (todo: TodoItem, status: string) =>
    set((state) => ({
      todoItems: [...state.todoItems].map((item) =>
        item.id === todo.id ? { ...item, status } : item
      ),
    })),
}));
