// import { useState } from 'react';
import React  from 'react';
import {Images} from '../../Themes'
import Button from '../Common/Button'
import './Styles/AppHeaderStyles.css'

function AppHeader({btnList={}}) {
  
  return (
    <div className='app-header'>
      <img className='logo' alt='' src={Images.logo} />
      <div className='btn-card'>
        <div className='btn-row-group'>
          {
            btnList.map(data => {
              const {isDisplay=true} = data
              if(isDisplay) return <Button key={data.key} {...data}/>
              return null
            })
          }
        </div>
      </div>
    </div>
  )
}

export default AppHeader