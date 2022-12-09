import {useState, useEffect} from 'react'
import '../styles/SideBarStyle.css'
import SideBarControls from './SideBarControls'

function SideBar({notes, activeNoteId, createNote, deleteNote, selectNote, filter, updateFilter, isCollapsed, updateIsCollapsed}) {
  const [sortedNotes, setSortedNotes] = useState([])
  const[sortByValue, setSortByValue] = useState('dateAscending')

  useEffect(() => {
    sortNotes()
  }, [notes, sortByValue]) 

  function sortNotes() {
    let notesCopy = Array.from(notes)
    if(sortByValue === 'dateAscending') setSortedNotes(notesCopy)
    else if(sortByValue === 'dateDescending') setSortedNotes(notesCopy.sort((a, b) => a.dateCreated < b.dateCreated ? 1 : -1))
    else if(sortByValue === 'a-z') setSortedNotes(notesCopy.sort((a, b) => a.title.replace(/\s/g, "").toLowerCase() > b.title.replace(/\s/g, "").toLowerCase() ? 1 : -1))
    else if(sortByValue === 'z-a') setSortedNotes(notesCopy.sort((a, b) => a.title.replace(/\s/g, "").toLowerCase() < b.title.replace(/\s/g, "").toLowerCase() ? 1 : -1))
  }

  function handleChange(event) {
    if(event.target.id === 'searchInput') updateFilter(event.target.value)
    else if(event.target.id === 'sortBySelect') setSortByValue(event.target.value)
  }

  function handleClick(event, note) {
    if(event.target.className === 'deleteBtn') deleteNote(note.id)
    else if(event.target.className === 'toggleIsCollapsed') updateIsCollapsed(!isCollapsed)
    else selectNote(note)
  }

  function isNoteActive(noteId) {
    if(noteId) return noteId === activeNoteId
    else return false
  }

  return(
    <div className={isCollapsed ? "sideBar collapsed" : "sideBar"}>

      <button className="toggleIsCollapsed" onClick={(event) => handleClick(event)}>{isCollapsed ? ">" : "<"}</button>

      <div style={isCollapsed ? {display: 'none'} : {display: 'block'}}>
        
        <SideBarControls handleChange={handleChange} createNote={createNote} filter={filter}/>

        <ul>
          {
          sortedNotes.map((note, index) => {
            if(filter.length === 0) {
              return (
                <li className={isNoteActive(note.id) ? "activeNote" : ""} key={index} onClick={(event) => handleClick(event, note)}>
                  <div>
                    <h3>{note.title.length > 27 ? note.title.slice(0, 27) + "..." : note.title}</h3>
                    <p>{note.dateCreated}</p>
                  </div>
                  <button className="deleteBtn" onClick={(event) => handleClick(event, note)}>X</button>
                </li>
              )
            }
            else if(note.title.toLowerCase().includes(filter.toLowerCase())) {
              return (
                <li className={isNoteActive(note.id) ? "activeNote" : ""} key={index} onClick={(event) => handleClick(event, note)}>
                  <div>
                    <h3>{note.title.length > 27 ? note.title.slice(0, 27) + "..." : note.title}</h3>
                    <p>{note.dateCreated}</p>
                  </div>
                  <button className="deleteBtn" onClick={(event) => handleClick(event, note)}>X</button>
                </li>
              )
            }
          })
          }
          </ul>
        </div>

      </div>
  )

}

export default SideBar