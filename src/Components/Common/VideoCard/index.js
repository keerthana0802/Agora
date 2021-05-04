import {Images} from '../../../Themes'
import './Styles/VideoCardStyle.css'

function VideoCard({name, id, ref}) {
  return (
    <div className='video-container'>
     <div className={"video-remoteStream"} id={id} ref={ref} />
      <div className='video-name'>
        {name}
      </div>
    </div>
  )
}

export default VideoCard