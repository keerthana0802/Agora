// import {Images} from '../../../Themes'
import React from 'react';
import Box from '@material-ui/core/Box';
import './Styles/SlidesCardStyle.css'

function SlidesCard(props) {
  //const [value, setValue] = React.useState(0);

  let slides = [{
      id: 1, image: 'http://passyworldofmathematics.com/Images/pwmImagesFour/PythagGuitarDiag1250wideJPG.jpg'},
      {id: 2, image: 'https://i.pinimg.com/564x/0e/99/e3/0e99e301ab31095fbed0f737f40870df.jpg'},
      {id: 3, image: 'https://techreviewpro-techreviewpro.netdna-ssl.com/wp-content/uploads/2017/12/Yousician-Guitar-learning-app-Android.jpg'},
      {id:  4, image: 'https://techreviewpro-techreviewpro.netdna-ssl.com/wp-content/uploads/2017/12/Guitar-Plus.png'}]
  return (
    <Box flexDirection='column' className='slides-container'>
      <div className='slide-img' style={{backgroundImage: `url(${slides[props.activeSlideId-1].image})`}} />
      <div className='btn-next-prev'>
        <button disabled={props.activeSlideId === 1} onClick={() => props.onSlideChange(props.activeSlideId-1)}> {'<'} </button>
        <button disabled={slides.length === props.activeSlideId} onClick={() => props.onSlideChange(props.activeSlideId+1)}> {'>'}</button>
      </div>
    </Box>
  )
}

export default SlidesCard