import React from "react"

type EditTitlePropsType = {
  title: string
  onChange: (newTitle: string) => void
}

const EditTitle: React.FC<EditTitlePropsType> = (props: EditTitlePropsType) => {
  let [editMode, setEditMode] = React.useState(false)
  let [editTitle, setEditTitle] = React.useState("")

  const activateEditMode = () => {
    setEditMode(true)
    setEditTitle(title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    props.onChange(editTitle)
  }

  const { title } = props

  return editMode ? (
    <input
      type="text"
      value={editTitle}
      onChange={e => setEditTitle(e.currentTarget.value)}
      onBlur={activateViewMode}
      autoFocus
    />
  ) : (
    <span onClick={activateEditMode}>{title}</span>
  )
}

export default EditTitle
