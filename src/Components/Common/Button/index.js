// import { useState, useCallback } from 'react';
import {Images} from '../../../Themes'
import './Styles/ButtonStyle.css'
function Button({title, icon, onClick=null}) {
  return (
    <div className='button-container' onClick={onClick}>
      <div className='btn-title'>
      	{title}
      </div>
      {icon && <img src={Images[icon]} alt=''/>}
    </div>
  )
}

export default Button