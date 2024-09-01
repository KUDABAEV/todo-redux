import React from "react"
import { useSelector, TypedUseSelectorHook } from "react-redux"
import TodoLists from "./todo-lists/TodoLists"
import { RootState } from "./app/store"

const App = () => {
  const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector
  const tasks = useTypedSelector(state => state.tasks.tasks)

  const filter = useTypedSelector(state => state.tasks.filter)
  let filteredTasks = tasks

  if (filter === "completed") {
    filteredTasks = tasks.filter(task => task.isDone)
  }
  if (filter === "active") {
    filteredTasks = tasks.filter(task => !task.isDone)
  }

  return (
    <div className="App">
      <TodoLists
        title="Виталик ты меня заебал"
        tasks={filteredTasks}
        filter={filter}
      />
    </div>
  )
}

export default App
