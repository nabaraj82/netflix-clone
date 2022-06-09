import React from 'react'
import '../style/UnderConstruction.css'
import CloseIcon from '@mui/icons-material/Close';
const UnderConstruction = ({handleCloseClick}) => {
  return (
    <div className='container'>
        <h5 className='heading'>Hi, i am nabaraj, this netflix-clone is under Construction. stay tuned 🚀</h5>
        <button 
        onClick={handleCloseClick}
        className='button_close' >
          <CloseIcon className='close_closeIcon'/>
          </button>
    </div>
  )
}

export default UnderConstruction