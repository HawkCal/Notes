import {useState, useEffect} from 'react'
import '../styles/MainStyle.css'
import MainControls from './MainControls'
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
    if(event.currentTarget.className === 'editBtn') {
      setIsEditing(!isEditing)
      if(isEditing) {
        setTitleInputValue(note.title)
        setTextInputValue(note.text)
      }
    }
    else if(event.currentTarget.className === 'saveBtn') {
      setIsEditing(false)
      updateNote({...note, title: titleInputValue, text: textInputValue}, [note.id])
    }
    else if(event.currentTarget.className === 'deleteBtn') {
      setIsEditing(false)
      deleteNote(note.id)
    }
  }

  return (
    <div className="main">
    {
    note.id === 'temp' ? <h1>Select a note</h1> : 
      <>
        <MainControls isEditing={isEditing} handleClick={handleClick} />
        <NoteDisplay note={note} isEditing={isEditing} handleChange={handleChange} titleInputValue={titleInputValue} textInputValue={textInputValue} />
      </>
    }
    </div>
  )
}

export default Main