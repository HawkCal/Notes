import {useState, useEffect} from 'react'
import {db} from './data/db'
import {useLiveQuery} from 'dexie-react-hooks'
import './styles/AppStyle.css'
import SideBar from './components/SideBar'
import Main from './components/Main'

function App() {
  let notes = useLiveQuery(() => db.notes.toArray()) || [{title: 'Loading...', text: '', id: 'temp'}]
  const [activeNote, setActiveNote] = useState({title: 'Select a note', text: '', id: 'temp'})
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if(activeNote.id !== 'temp') {
      let note = notes.find(note => note.id === activeNote.id)
      if(note === undefined) setActiveNote({title: 'Select a note', text: '', id: 'temp'})
      else setActiveNote(note)
    }
  }, [notes])

  function createNote() {
    try {
      db.notes.add({
        title: '',
        text: '',
        tags: [],
        dateCreated: new Date().toLocaleDateString('en-GB')
      })
    }
    catch(error) {
      console.error(`Error: ${error}`)
    }
  }

  function updateFilter(value) {
    setFilter(value)
  }

  function updateNote(updatedNote, noteId) {
    db.notes.put(updatedNote, noteId)
  }

  function deleteNote(noteId) {
    db.notes.delete(noteId)
  }

  function selectNote(selectedNote) {
    setActiveNote(selectedNote)
  }

  return (
    <div className="app">

      <SideBar notes={notes} activeNoteId={activeNote.id} createNote={createNote} deleteNote={deleteNote} selectNote={selectNote} filter={filter} updateFilter={updateFilter} />
      <Main note={activeNote} updateNote={updateNote} deleteNote={deleteNote} />

    </div>
  )

}

export default App