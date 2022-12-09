import {useState, useEffect} from 'react'
import '../styles/MainStyle.css'
import NoteDisplay from './NoteDisplay'

function Main({note, updateNote, deleteNote}) {
  const [isEditing, setIsEditing] = useState(false)
  const [titleInputValue, setTitleInputValue] = useState('')
  const [textInputValue, setTextInputValue] = useState('')

  useEffect(() => {
    setTitleInputValue(note.title)
    setTextInputValue(note.text)
    setIsEditing(false)
  }, [note])

  function handleChange(event) {
    if(event.target.className === 'titleInput') setTitleInputValue(event.target.value)
    else if(event.target.className === 'textInput') setTextInputValue(event.target.value)
  }

  function handleClick(event) {
    if(event.target.className === 'editBtn') {
      if(!isEditing) return
      
      setTitleInputValue(note.title)
      setTextInputValue(note.text)
      setIsEditing(!isEditing)
    }
    else if(event.target.className === 'saveBtn') {
      setIsEditing(false)
      updateNote({...note, title: titleInputValue, text: textInputValue}, [note.id])
    }
    else if(event.target.className === 'deleteBtn') {
      setIsEditing(false)
      deleteNote(note.id)
    }
  }

  return (
    <div className="main">
    {
    note.id === 'temp' ? <h1>Select a note</h1> : 
      <>
        <div onClick={event => handleClick(event)} className="main-controls">
          <button className='editBtn'>{isEditing ? "Cancel" : "Edit"}</button>
          <button className='saveBtn'>Save</button>
          <button className='deleteBtn'>Delete</button>
        </div>

        <NoteDisplay note={note} isEditing={isEditing} handleChange={handleChange} titleInputValue={titleInputValue} textInputValue={textInputValue} />
      </>
    }
    </div>
  )
}

export default Main