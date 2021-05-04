import {Images} from '../../../Themes'
import './Styles/ButtonIconStyle.css'

function ButtonIcon({isActive, icon, inActiveIcon, onClick}) {
  return (
    <div className='btn-circle' onClick={onClick}>
      <img src={ isActive ? Images[icon] : Images[inActiveIcon]} alt=''/>
    </div>
  )
}

export default ButtonIcon