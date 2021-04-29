import { useState, useCallback } from 'react';
import AppHeader from '../AppHeader'

function AppDashboard(props) {
  const [ height, setHeight ] = useState(0)
  const {children} = props
  return (
    <div className="app-container">
      <AppHeader />
      {children}
    </div>
  )
}

export default AppDashboard