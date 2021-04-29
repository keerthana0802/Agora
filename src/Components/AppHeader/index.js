import { useState, useCallback } from 'react';
import {Images} from '../../Themes'
import Button from '../Common/Button'
import './Styles/AppHeaderStyles.css'

function AppHeader() {
  const [ height, setHeight ] = useState(0)
  
  return (
    <div className='app-header'>
      <img className='logo' src={Images.logo} />
      <div className='btn-card'>
        <div className='btn-row-group'>
          <Button title='Support'/>
          <Button title='25 minutes'/>
          <Button title='Leave'/>
        </div>
      </div>
    </div>
  )
}

export default AppHeader