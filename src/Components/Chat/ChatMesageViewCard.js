import React from 'react'
import ClassNames from 'classnames'
import {Images} from '../../Themes'
import moment from 'moment'
import _get from 'lodash/get'
import { Virtuoso } from 'react-virtuoso'
import './Styles/ChatMesageViewCardStyles.css'
class ChatMesageViewCard extends React.Component {

  render() {
    let {chatBox, userId} = this.props
    let lastMsgUserId = ''
    console.log(Images)
    return (
      <div className='chatMessageContainer'>
        <Virtuoso
          className="chatMessageView"
          ref={(chatMesg) => this.props.OnChatMsgRef(chatMesg)}
          totalCount={chatBox.length}
          overscan={200}
          followOutput={true}
          item={(index)=>{
            let chat = chatBox[index]
            let isSameUser = lastMsgUserId === chat.userId
            if(!isSameUser) {
              lastMsgUserId = chat.userId
            }
            if(index === 0) {
              isSameUser = false
            }
            return (
              <div key={`chat-${index}`} className={ClassNames('chatCard', {isMe:userId === chat.userId, isSameUser})}>
                <div className={ClassNames('icon')}> 
                  <img src={_get(Images,'vector.default')} alt=''/>
                </div>
                <div className={ClassNames('message')} >
                  <div className='name'> {window.decodeURI(chat.name)} </div>
                  <div className='chatTextTimeBox'>
                    <div className='text'> {chat.text} </div>
                    <div className='time'> {chat.dateAt ? moment(chat.dateAt).format('h:mm a') : ''} </div>
                  </div>
                </div>
              </div>)
          }
          }
          
        />
      </div>
    )
  }
}

export default ChatMesageViewCard