import React from 'react'
import Header from './Header'
import ChatMesageViewCard from './ChatMesageViewCard'
import ChatInputCard from './ChatInputCard'
// import _get from 'lodash/get'
import './Styles/ChatCardStyles.css'
class ChatCard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      inputText: ''
    }
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount = () => {
    this.props.onRef(undefined)
  }

  onKeyDownInputChat = (e) => {
    if (e.key === 'Enter') {
      this.sendChatMessage()
    }
  }

  sendChatMessage = () => {
    let chatBox = this.props.chatBox
    let text = this.state.inputText.trim()
    if(!text) {
      return
    }

    let todayDate = new Date()
    todayDate = todayDate.getTime()
    let data = {
      name: this.props.name,
      text: this.state.inputText,
      color: '#00ccde',
      dateAt: todayDate,
      userId: this.props.userId}
    chatBox.push(data)
    this.props.sendMessage({data: JSON.stringify(data), type: 'chat', received_at: todayDate})
    this.props.onUpdateChat(chatBox)
    this.setState({inputText: ''}, ()=> {
      this.scrollBottomChat()
    })
  }
  scrollBottomChat = () => {
    if(this.chatMsgRef && this.chatMsgRef.scrollHeight) {
      this.chatMsgRef.scrollTop = this.chatMsgRef.scrollHeight + 1000
    }
  }

  changeInputText = (inputText) => {
    this.setState({
      inputText
    })
  }

  submitStudentChatMessage = (inputText) => {
    this.setState({
      inputText
    }, () => {
      this.sendChatMessage()
    })
  }
  

  onChangeInput = (event) => {
    this.setState({inputText: event.target.value})
  }
 
  handleChatMsgRef =(ref) => {
    this.chatMsgRef = ref
  }



  render() {
    // let params = parseUrl() || {}
    let {inputText} = this.state
    let {chatBox} = this.props
    return (
      <div className='chatContainer'>
        <Header />
        <ChatMesageViewCard chatBox={chatBox} OnChatMsgRef={this.handleChatMsgRef} userId={this.props.userId}/>
        <ChatInputCard
          handleKeyDown={this.onKeyDownInputChat}
          inputText={inputText}
          handleChange={this.onChangeInput}
        />
      </div> 
    )
  }
}

export default ChatCard