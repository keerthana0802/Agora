// import {Images} from '../../../Themes'
import React from 'react';
import Box from '@material-ui/core/Box';
import './Styles/SessionPlanCardStyle.css'
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

function SessionPlanCard({name, id, ref}) {
  const [value, setValue] = React.useState(0);
  return (
    <Box flexDirection='column' className='SessionPlanCard-container'>
    
     SessionPlanCard
     <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction label="Roll Dice" />
      <BottomNavigationAction label="Students (6)" />
      <BottomNavigationAction label="Chat"  />
      <BottomNavigationAction label="Share Screen"  />
    </BottomNavigation>
    </Box>
  )
}

export default SessionPlanCard