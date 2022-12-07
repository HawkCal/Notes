import {useState} from 'react'
import '../styles/SideBarStyle.css'

function SideBar({notes, activeNoteId, createNote, deleteNote, selectNote, filter, updateFilter}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  function handleChange(event) {
    if(event.target.id = 'searchInput') {
      updateFilter(event.target.value)
    }
  }

  function handleClick(event, note) {
    event.preventDefault()
    if(event.target.className === 'deleteBtn') return
    else if(event.target.className === 'toggleIsCollapsed') setIsCollapsed(!isCollapsed)
    else {
      selectNote(note)
      //setIsCollapsed(true)
    }
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
          <button onClick={() => createNote()}>New</button>   
          <div>
              <input type="text" placeholder="Search" onChange={(event) => handleChange(event)} value={filter} id="searchInput"></input>
          </div>
        </div>

        <ul>
          {notes.map((note, index) => {
            if(filter.length === 0) {
              return (
                <li className={isNoteActive(note.id) ? "activeNote" : ""} key={index} onClick={(event) => handleClick(event, note)}>
                  <div>
                    <h3>{note.title.length > 27 ? note.title.slice(0, 27) + "..." : note.title}</h3>
                    <p>{note.dateCreated}</p>
                  </div>
                  <button className="deleteBtn" onClick={() => deleteNote(note.id)}>X</button>
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
                  <button className="deleteBtn" onClick={() => deleteNote(note.id)}>X</button>
                </li>
              )
            }
          })}
          </ul>
        </div>

      </div>
  )

}

export default SideBar