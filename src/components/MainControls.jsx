import editIcon from '../assets/edit_note_FILL0_wght400_GRAD0_opsz48.png'
import cancelIcon from '../assets/close_FILL0_wght400_GRAD0_opsz48.png'
import saveIcon from '../assets/save_FILL0_wght400_GRAD0_opsz48.png'
import deleteIcon from '../assets/delete_forever_FILL0_wght400_GRAD0_opsz48.png'

export default function MainControls({isEditing, handleClick}) {
  return (
    <>
      <div className="main-controls">

        <button className='editBtn' onClick={event => handleClick(event)}>
          <img src={isEditing ? cancelIcon : editIcon} alt={isEditing ? 'cancel' : 'edit'} />
        </button>

        <button className='saveBtn' onClick={event => handleClick(event)}>
          <img src={saveIcon} alt='save' />
        </button>

        <button className='deleteBtn' onClick={event => handleClick(event)}>
          <img src={deleteIcon} alt='delete' />
        </button>
        
      </div>
    </>
  )
}