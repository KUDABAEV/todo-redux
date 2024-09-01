import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { TaskType } from "./types"
import { v1 } from "uuid"

const tasks: Array<TaskType> = [
  { id: v1(), title: "CSS", isDone: true },
  { id: v1(), title: "JS", isDone: true },
  { id: v1(), title: "React", isDone: false },
]

let filter = "all"

const initialState = {
  tasks,
  filter,
}

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ taskTitle: string }>) => {
      const { taskTitle } = action.payload
      const newTask = { id: v1(), title: taskTitle, isDone: false }
      state.tasks.unshift(newTask)
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload)
    },
    changeTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; isDone: boolean }>,
    ) => {
      const { taskId, isDone } = action.payload
      const task = state.tasks.find(task => task.id === taskId)
      if (task) {
        task.isDone = isDone
      }
    },
    updateTaskStatus: (
      state,
      action: PayloadAction<{ taskId: string; taskTitle: string }>,
    ) => {
      const { taskId, taskTitle } = action.payload
      const task = state.tasks.find(task => task.id === taskId)
      if (task) {
        task.title = taskTitle
      }
    },
    changeFilter: (state, action: PayloadAction<{ filter: string }>) => {
      state.filter = action.payload.filter
    },
  },
})

export const {
  deleteTask,
  changeTaskStatus,
  addTask,
  updateTaskStatus,
  changeFilter,
} = tasksSlice.actions
export default tasksSlice.reducer
