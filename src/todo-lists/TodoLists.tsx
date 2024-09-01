import React, { ChangeEvent, useState } from "react"
import { TaskType } from "../redux/tasks/types"
import { useAppDispatch } from "../app/hooks"
import {
  deleteTask,
  changeTaskStatus,
  addTask,
  updateTaskStatus,
  changeFilter,
} from "../redux/tasks/slices"
import EditTitle from "../edit-title/EditTitle"
import { Checkbox, IconButton, Button, TextField } from "@mui/material"
import { DeleteSharp } from "@mui/icons-material"
import AddCircleIcon from "@mui/icons-material/AddCircle"

type PropsType = {
  title: string
  tasks: Array<TaskType>
  filter: string
}

const TodoLists: React.FC<PropsType> = (props: PropsType) => {
  let [taskTitle, setTaskTitle] = useState<string>("")
  const handleTaskTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTaskTitle(e.currentTarget.value)
  }
  const handleAddTask = () => {
    addTaskTitle()
  }
  const addTaskTitle = () => {
    if (taskTitle.trim() !== "") {
      dispatch(addTask({ taskTitle }))
      setTaskTitle("")
    }
  }
  const { title, tasks } = props
  const dispatch = useAppDispatch()
  return (
    <div>
      <h3 style={{ fontSize: "1.5rem", fontFamily: "Roboto" }}>{title}</h3>
      <div>
        <TextField
          variant="outlined"
          onChange={handleTaskTitleChange}
          value={taskTitle}
        />
        <IconButton onClick={handleAddTask}>
          <AddCircleIcon color="primary" />
        </IconButton>
      </div>
      <ul>
        {tasks.map(task => {
          const handleCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(
              changeTaskStatus({
                taskId: task.id,
                isDone: e.currentTarget.checked,
              }),
            )
          }
          const onChangeTitleHandler = (newTitle: string) => {
            dispatch(
              updateTaskStatus({
                taskId: task.id,
                taskTitle: newTitle,
              }),
            )
          }
          return (
            <li key={task.id}>
              <Checkbox
                color="secondary"
                checked={task.isDone}
                onChange={handleCheckbox}
              />
              <EditTitle title={task.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={() => dispatch(deleteTask(task.id))}>
                <DeleteSharp color="primary" />
              </IconButton>
            </li>
          )
        })}
      </ul>
      <div>
        <Button
          variant={props.filter === "all" ? "outlined" : "text"}
          onClick={() => dispatch(changeFilter({ filter: "all" }))}
        >
          All
        </Button>
        <Button
          variant={props.filter === "active" ? "outlined" : "text"}
          onClick={() => dispatch(changeFilter({ filter: "active" }))}
        >
          Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "outlined" : "text"}
          onClick={() => dispatch(changeFilter({ filter: "completed" }))}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}

export default TodoLists
