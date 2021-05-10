// import {Images} from '../../../Themes'
import React from 'react';
import Box from '@material-ui/core/Box';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SlidesCard from './SlidesCard'
import VideoCard from '../../Common/VideoCard'
import ClassNames from 'classnames'
import _get from 'lodash/get'
import ChatCard from '../../Chat'
import './Styles/SessionPlanCardStyle.css'

function SessionPlanCard(props) {
  const [value, setValue] = React.useState(_get(props, 'chatProps.openChat') ? 'chat': 'metronome');
  return (
    <Box flexDirection='column' className='sessionPlanCard-container'>
      <Box className={ClassNames('sessionPlanCard-item', {'slideShow': props.activeSlideId, 'videoProfile': !props.activeSlideId})}>
        <VideoCard id={props.uid} ref={props.localVideoView} {...props.videoControl} showcontrol/>
        {props.activeSlideId && <SlidesCard activeSlideId={props.activeSlideId || 1} onSlideChange={props.onSlideChange}/> }
      </Box>
      <Box className={ClassNames('sessionPlanCard-item','sessionPlanCard-chat-item')}>
        {value === 'chat' && <ChatCard 
          {...props.chatProps}
        />}
        {value === 'metronome' && <Box> metronome</Box>}
        {value === 'shareScreen' && <Box> shareScreen</Box>}
      </Box>
     <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels
    >
      <BottomNavigationAction classes={{selected: 'bn-selected'}} value='metronome' label="Metronome" />
      <BottomNavigationAction classes={{selected: 'bn-selected'}} value='students' label="Students" />
      <BottomNavigationAction classes={{selected: 'bn-selected'}} value='chat' label="Chat"  />
      <BottomNavigationAction classes={{selected: 'bn-selected'}} value='shareScreen' label="Share Screen"  />
    </BottomNavigation>
    </Box>
  )
}

export default SessionPlanCard