// import {Images} from '../../../Themes'
import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '../../Common/Button'
import {Images} from '../../../Themes'
import _get from 'lodash/get'
import './Styles/StudentCardStyle.css'

function StudentsCard(props) {
  //const [value, setValue] = React.useState(0);
  const {students={}} = props
  const studentsKeys = Object.keys(students)
 return (
    <Box flexDirection='column' className='students-container'>
      <Box flexDirection='row' justifyContent='space-between' className='card-container'>
        <div  className='title'>Everyone</div>
        <Button title='Mute All'/>
      </Box>
      <Box flexDirection='column' className='students-control'>
        {studentsKeys.map((id) => <Box key={id} flexDirection='row' justifyContent='space-between'>
          <div>
            <img src={Images.mute}/>
            <div>
              {_get(students,`${id}.uid`)}
            </div>
          </div>
          <div>
          </div>
        </Box>)}
      </Box>
    </Box>
  )
}

export default StudentsCard