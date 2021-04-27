import React from 'react'
import ClassNames from 'classnames'
import moment from 'moment'
import LazyLoad from 'react-lazyload'
import Loading from '../Loading'
import './Styles/ChatMesageViewCardStyles.css'
class ChatMesageViewCard extends React.Component {

  render() {
    let {chatBox, userId} = this.props
    let lastMsgUserId = ''
    return (
      <div className='chatMessageContainer'>
        <div className='chatMessageView' ref={(chatMesg) => this.props.OnChatMsgRef(chatMesg)}>
          {chatBox.map((chat, index) => {
            let isSameUser = lastMsgUserId === chat.userId
            if(!isSameUser) {
              lastMsgUserId = chat.userId
            }
            return (<LazyLoad 
            height={100}
            once
            debounce={200}
            placeholder ={ <Loading center/>}
            key={`${chat.dateAt}-${index}`} >
              <div className={ClassNames('chatCard', {isMe:userId === chat.userId, isSameUser})}  key={`${chat.id}`} >
                <div className={ClassNames('icon')}> 
                  
                </div>
                <div className={ClassNames('message')} >
                  <div className='name'> {window.decodeURI(chat.name)} </div>
                  <div className='chatTextTimeBox'>
                    <div className='text'> {chat.text} </div>
                    <div className='time'> {chat.dateAt ? moment(chat.dateAt).format('h:mm a') : ''} </div>
                  </div>
                </div>
              </div>
          </LazyLoad>)})}
        </div>
      </div>
    )
  }
}

export default ChatMesageViewCard