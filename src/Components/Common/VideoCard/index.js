// import {Images} from '../../../Themes'
import './Styles/VideoCardStyle.css'
import ButtonIcon from '../Footer/ButtonIcon'
import Box from '@material-ui/core/Box';
function VideoCard({name, id, ref, showcontrol=false, audio={}, video={}}) {
  return (
    <div className='video-container'>
     <div className={"video-remoteStream"} id={id} ref={ref} />
      {!!name && <div className='video-name'>
        {name}
      </div>}
      {showcontrol && <Box flexDirection='row' className='video-control'>
        <ButtonIcon {...audio} />
        <ButtonIcon {...video} />
      </Box>}
    </div>
  )
}

export default VideoCard