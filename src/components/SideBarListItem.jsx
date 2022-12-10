import deleteIcon from '../assets/delete_forever_FILL0_wght400_GRAD0_opsz48.png'

function SideBarListItem({isNoteActive, handleClick, note}) {
  return (
    <li className={isNoteActive(note.id) ? "activeNote" : ""} onClick={(event) => handleClick(event, note)}>
      <div>
        <h3>{note.title.length > 27 ? note.title.slice(0, 27) + "..." : note.title}</h3>
        <p>{note.dateCreated}</p>
      </div>
      <button className="deleteBtn">
        <img src={deleteIcon} alt='delete' />
      </button>
    </li>
  )
}

export default SideBarListItem