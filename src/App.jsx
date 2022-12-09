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
  const [isCollapsed, setIsCollapsed] = useState(false)

  useEffect(() => {
    if(activeNote.id === 'temp') return

    const note = notes.find(note => note.id === activeNote.id)
    if(note === undefined) setActiveNote({title: 'Select a note', text: '', id: 'temp'})
    else setActiveNote(note)
    
  }, [notes])

  function createNote() {
    const newNote = {title: '', text: '', tags: [], dateCreated: new Date().toLocaleDateString('en-GB') }

    db.notes
      .add(newNote)
      .then((result) => {
        setActiveNote({...newNote, id: result})
        if(window.innerWidth <= 560) setIsCollapsed(true)
      })
  }

  function updateFilter(value) {
    setFilter(value)
  }

  function updateNote(updatedNote, noteId) {
    db.notes.put(updatedNote, noteId)
  }

  function deleteNote(noteId) {
    db.notes.delete(noteId)
    setIsCollapsed(false)
  }

  function selectNote(selectedNote) {
    setActiveNote(selectedNote)
    if(window.innerWidth <= 560) updateIsCollapsed(true)
  }

  function updateIsCollapsed(value) {
    setIsCollapsed(value)
  }

  return (
    <div className='app'>

      <SideBar 
        notes={notes}
        activeNoteId={activeNote.id} 
        createNote={createNote} 
        deleteNote={deleteNote} 
        selectNote={selectNote} 
        filter={filter} 
        updateFilter={updateFilter} 
        isCollapsed={isCollapsed}
        updateIsCollapsed={updateIsCollapsed}
      />

      <Main 
        note={activeNote} 
        updateNote={updateNote} 
        deleteNote={deleteNote} 
      />

    </div>
  )

}

export default App