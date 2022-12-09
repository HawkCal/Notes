function NoteDisplay({note, isEditing, handleChange, titleInputValue, textInputValue}) {
  return (
    <div className="noteDisplay">
      {isEditing ? <input className="titleInput" onChange={event => handleChange(event)} value={titleInputValue}></input> : <h1>{note.title}</h1>}
      {isEditing ? <textarea className="textInput" onChange={event => handleChange(event)} value={textInputValue}></textarea> : <p>{note.text}</p>}
    </div>
  )
}

export default NoteDisplay