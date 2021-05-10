import React from 'react';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import PanToolRoundedIcon from '@material-ui/icons/PanToolRounded';
import ClassNames from 'classnames'
// import {Images} from '../Themes'
// import _get from 'lodash/get'

// import SpeakerIcon from '@material-ui/icons/Speaker';
import speakingIcon from '@material-ui/icons/RecordVoiceOver'
import './Styles/RemoteStreamStyle.css'

const RemoteStream = (props) => {
  const { id, stream, onAVChange, isTute = false, speaking = false, tuteControls = {}, teacherView } = props;
  const { audioState, videoState, pin=false } = stream;

  return (
    <div className={ClassNames("remoteStreamItem",{teacherView: teacherView})}>
      <div className={speaking ? "remoteStream speaking" : "remoteStream"} id={id}>
        {speaking && <div className="speakerIcon"><img className="sicon" src={speakingIcon} alt="" /></div>}
      </div>
      {pin && <PanToolRoundedIcon onClick={() => isTute ? onAVChange(id, 'pin', tuteControls.pin) : null} className='pin-icon' fontSize="small" />}
      {isTute ? <div className="controlsGroup">
            <div className={ClassNames("controlIcon", 'cursor')} onClick={() => onAVChange(id, 'video', tuteControls.video)}>{videoState ? <VideocamIcon fontSize="small" /> : <VideocamOffIcon fontSize="small" />}</div>
            <div className={ClassNames("controlIcon", 'cursor')} onClick={() => onAVChange(id, 'audio', tuteControls.audio)}>{audioState ? <MicIcon fontSize="small" /> : <MicOffIcon fontSize="small" />}</div>
        </div>  : <div className="controlsGroup">
        <div className="controlIcon" >{videoState ? <VideocamIcon fontSize="small" /> : <VideocamOffIcon fontSize="small" />}</div> 
        <div className="controlIcon" >{audioState ? <MicIcon fontSize="small" /> : <MicOffIcon fontSize="small" />}</div>
      </div>}
      <div className="rmtControls">
        <div className="controlIcon">{id}</div>
      </div>
      {/*isTute && <div className="tuteControls">
        <button className="controlIcon" onClick={() => onAVChange(id, 'video', tuteControls.video)} >{tuteControls.video ? "Mute Video" : "Unmute Video"}</button>
        <button className="controlIcon" onClick={() => onAVChange(id, 'audio', tuteControls.audio)}>{tuteControls.audio ? "Mute Audio" : "Unmute Audio"}</button>
      </div>*/}
    </div>
  );
};

export default RemoteStream;