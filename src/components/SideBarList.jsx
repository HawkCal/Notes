import SideBarListItem from "./SideBarListItem"

export default function SideBarList({notes, filter, isNoteActive, handleClick}) {
  return (
    <ul>
      {notes.map((note, index) => {
        if(note.title.toLowerCase().includes(filter.toLowerCase())) {
          return <SideBarListItem key={index} isNoteActive={isNoteActive} handleClick={handleClick} note={note} />
        }
      })}         
    </ul>
  )
}