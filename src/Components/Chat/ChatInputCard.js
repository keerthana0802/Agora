import React from 'react'
// import ClassNames from 'classnames'
import './Styles/ChatInputCardStyles.css'
class ChatInputCard extends React.Component {
  render() {
    let {handleKeyDown, handleChange, inputText, isStudent, handleInputClick, inputProps={}} = this.props
    return (
      <div className='chatInputCard'>
        <input
          placeholder='Type a message'
          value={inputText}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          onClick={() => { isStudent && handleInputClick(inputText) }}
          readOnly={isStudent}
          {...inputProps}
          />
      </div>
    )
  }
}

export default ChatInputCard