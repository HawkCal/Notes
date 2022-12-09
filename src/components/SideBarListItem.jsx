function SideBarListItem({isNoteActive, handleClick, note}) {
  return (
    <li className={isNoteActive(note.id) ? "activeNote" : ""} onClick={(event) => handleClick(event, note)}>
      <div>
        <h3>{note.title.length > 27 ? note.title.slice(0, 27) + "..." : note.title}</h3>
        <p>{note.dateCreated}</p>
      </div>
      <button className="deleteBtn" onClick={(event) => handleClick(event, note)}>X</button>
    </li>
  )
}

export default SideBarListItem