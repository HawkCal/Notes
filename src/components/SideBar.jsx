import {useState, useEffect} from 'react'
import '../styles/SideBarStyle.css'

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
    if(event.target.id === 'searchInput') updateFilter(target.value)
    else if(event.target.id === 'sortBySelect') setSortByValue(target.value)
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
        <div className="sidebar-controls">
          <div>
            <select id="sortBySelect" onChange={event => handleChange(event)}>
              <option value="dateAscending">Date Ascending</option>
              <option value="dateDescending">Date Descending</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
            <button onClick={() => createNote()}>New</button>    
          </div> 

          <div>
              <input type="text" placeholder="Search" onChange={event => handleChange(event)} value={filter} id="searchInput"></input>
          </div>
        </div>

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