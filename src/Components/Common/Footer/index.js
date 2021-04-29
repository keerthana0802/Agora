// import { useState, useCallback } from 'react';
import ButtonIcon from './ButtonIcon'

import './Styles/FooterStyle.css'
function Footer({btnList=[]}) {
  return (
    <div className='footer-card'>
    {
      btnList.map(data => <ButtonIcon {...data}/>)
    }
    </div>
  )
}

export default Footer