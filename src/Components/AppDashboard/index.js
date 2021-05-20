// import { useState, useCallback } from 'react';
import React  from 'react';
import AppHeader from '../AppHeader'
import './Styles/DashboardStyles.css'
function AppDashboard(props) {
  const {children, ...extraProps} = props
  return (
    <div className="app-container">
      <AppHeader {...extraProps}/>
      {children}
    </div>
  )
}

export default AppDashboard