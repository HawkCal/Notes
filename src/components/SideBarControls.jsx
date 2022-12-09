function SideBarControls({handleChange, createNote, filter}) {
  return (
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
  )
}

export default SideBarControls