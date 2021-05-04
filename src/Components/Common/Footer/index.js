// import { useState, useCallback } from 'react';
import ButtonIcon from './ButtonIcon'

import './Styles/FooterStyle.css'
function Footer({btnList=[]}) {
  return (
    <div className='footer-card'>
    {
      btnList.map(data => {
        const {isDisplay=true} = data
        if(isDisplay) return <ButtonIcon key={data.key} {...data}/>
        return null
      })
    }
    </div>
  )
}

export default Footer