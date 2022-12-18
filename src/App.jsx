import {useState, useEffect} from 'react'
import {db} from './data/db'
import {useLiveQuery} from 'dexie-react-hooks'
import './styles/AppStyle.css'
import SideBar from './components/SideBar'
import Main from './components/Main'

function App() {
  const [sortByValue, setSortByValue] = useState('dateAscending')
  let notes = useLiveQuery(() => db.notes.toArray()) || [{title: 'Loading...', text: '', id: 'temp'}]
  const [activeNote, setActiveNote] = useState({title: 'Select a note', text: '', id: 'temp'})
  const [filter, setFilter] = useState('')
  const [isSideBarCollapsed, setIsSideBarCollapsed] = useState(false)

  useEffect(() => {
    if(activeNote.id === 'temp') return

    const note = notes.find(note => note.id === activeNote.id)
    if(note === undefined) setActiveNote({title: 'Select a note', text: '', id: 'temp'})
    else setActiveNote(note)
    
  }, [notes])

  function sortNotes() {
    let notesCopy = Array.from(notes)
    if(sortByValue === 'dateAscending') return notesCopy
    else if(sortByValue === 'dateDescending') return notesCopy.sort((a, b) => a.dateCreated < b.dateCreated ? 1 : -1)
    else if(sortByValue === 'a-z') return notesCopy.sort((a, b) => a.title.replace(/\s/g, "").toLowerCase() > b.title.replace(/\s/g, "").toLowerCase() ? 1 : -1)
    else if(sortByValue === 'z-a') return notesCopy.sort((a, b) => a.title.replace(/\s/g, "").toLowerCase() < b.title.replace(/\s/g, "").toLowerCase() ? 1 : -1)
  }

  function createNote() {
    const newNote = {title: '', text: '', tags: [], dateCreated: new Date().toLocaleDateString('en-GB') }

    db.notes
      .add(newNote)
      .then((result) => {
        setActiveNote({...newNote, id: result})
        if(window.innerWidth <= 560) setIsSideBarCollapsed(true)
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
    setIsSideBarCollapsed(false)
  }

  function selectNote(selectedNote) {
    setActiveNote(selectedNote)
    if(window.innerWidth <= 560) setIsSideBarCollapsed(true)
  }

  return (
    <div className='app'>

      <SideBar 
        notes={sortNotes()}
        activeNoteId={activeNote.id} 
        createNote={createNote} 
        deleteNote={deleteNote} 
        selectNote={selectNote} 
        filter={filter} 
        updateFilter={updateFilter} 
        isSideBarCollapsed={isSideBarCollapsed}
        setIsSideBarCollapsed={setIsSideBarCollapsed}
        setSortByValue={setSortByValue}
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