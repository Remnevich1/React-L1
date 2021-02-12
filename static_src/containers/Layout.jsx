import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import MessageField from './MessageField.jsx';
import ChatList from './ChatList.jsx';
import Header from './Header.jsx';
import { sendMessage } from '../actions/messageActions';
import '../styles/layout.css';

class Layout extends React.Component {
  static propTypes = {
    chatId: PropTypes.number,
    sendMessage: PropTypes.func.isRequired,
    messages: PropTypes.object.isRequired,
  };
  static defaultProps = {
    chatId: 1,
  };
  sendMessage = (message, sender) => {
    const { chatId, messages } = this.props;
    const messageId = Object.keys(messages).length + 1;
    this.props.sendMessage(messageId, message, sender, chatId);
  };

  render() {
    return (
      <div className="layout">
        <Header chatId={this.props.chatId} />
        <div className="layout-canvas">
          <div className="layout-left-side">
            <ChatList />
          </div>
          <div className="layout-right-side">
            <MessageField
              chatId={this.props.chatId}
              sendMessage={this.sendMessage}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  messages: chatReducer.messages,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ sendMessage }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
