import {useState, useEffect} from 'react'
import '../styles/MainStyle.css'
import NoteDisplay from './NoteDisplay'
import editIcon from '../assets/edit_note_FILL0_wght400_GRAD0_opsz48.png'
import cancelIcon from '../assets/close_FILL0_wght400_GRAD0_opsz48.png'
import saveIcon from '../assets/save_FILL0_wght400_GRAD0_opsz48.png'
import deleteIcon from '../assets/delete_forever_FILL0_wght400_GRAD0_opsz48.png'

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
      if(!isEditing) return
      setTitleInputValue(note.title)
      setTextInputValue(note.text)
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
        <div className="main-controls">
          <button className='editBtn' onClick={event => handleClick(event)}>
            <img src={isEditing ? cancelIcon : editIcon} alt={isEditing ? 'cancel' : 'edit'} />
          </button>
          <button className='saveBtn' onClick={event => handleClick(event)}>
            <img src={saveIcon} alt='save' />
          </button>
          <button className='deleteBtn' onClick={event => handleClick(event)}>
            <img src={deleteIcon} alt='delete' />
          </button>
        </div>

        <NoteDisplay note={note} isEditing={isEditing} handleChange={handleChange} titleInputValue={titleInputValue} textInputValue={textInputValue} />
      </>
    }
    </div>
  )
}

export default Main