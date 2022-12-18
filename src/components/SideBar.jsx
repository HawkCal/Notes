import {useState, useEffect} from 'react'
import '../styles/SideBarStyle.css'
import SideBarControls from './SideBarControls'
import SideBarList from './SideBarList'
import SideBarListItem from './SideBarListItem'
import collapseIcon from '../assets/keyboard_double_arrow_left_FILL0_wght400_GRAD0_opsz48.png'
import expandIcon from '../assets/keyboard_double_arrow_right_FILL0_wght400_GRAD0_opsz48.png'

function SideBar({notes, setSortByValue, activeNoteId, createNote, deleteNote, selectNote, filter, updateFilter, isSideBarCollapsed, setIsSideBarCollapsed}) {
  function handleChange(event) {
    if(event.target.id === 'searchInput') updateFilter(event.target.value)
    else if(event.target.id === 'sortBySelect') setSortByValue(event.target.value)
  }

  function handleClick(event, note) {
    if(event.target.parentElement.className === 'deleteBtn') deleteNote(note.id)
    else if(event.currentTarget.className === 'toggleIsSideBarCollapsed') setIsSideBarCollapsed(!isSideBarCollapsed)
    else selectNote(note)
  }

  function isNoteActive(noteId) {
    if(noteId) return noteId === activeNoteId
    else return false
  }

  return(
    <div className={isSideBarCollapsed ? "sideBar collapsed" : "sideBar"}>

      <button className="toggleIsSideBarCollapsed" onClick={(event) => handleClick(event)}>
        <img src={isSideBarCollapsed ? expandIcon : collapseIcon} alt='collapse/expand' />
      </button>

      {!isSideBarCollapsed && <>
        <SideBarControls handleChange={handleChange} createNote={createNote} filter={filter}/>
        <SideBarList notes={notes} filter={filter} isNoteActive={isNoteActive} handleClick={handleClick}/>
      </>}

    </div>
  )

}

export default SideBar