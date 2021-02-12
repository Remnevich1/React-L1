import React from 'react';
import { TextField, FloatingActionButton } from 'material-ui';
import SendIcon from 'material-ui/svg-icons/content/send';
import CircularProgress from 'material-ui/CircularProgress';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { loadChats } from '../actions/chatActions';
import Message from './Message/index.jsx';
import connect from 'react-redux/es/connect/connect';
import '../styles/styles.css';

class MessageField extends React.Component {
  static propTypes = {
    chatId: PropTypes.number.isRequired,

    messages: PropTypes.object.isRequired,
    chats: PropTypes.object.isRequired,
    sendMessage: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };
  state = {
    input: '',
  };
  static defaultProps = {
    chatId: 1,
  };
  componentDidMount() {
    this.props.loadChats();
  }

  handleSendMessage = (message, sender) => {
    this.props.sendMessage(message, sender);
    if (sender === 'me') {
      this.setState({ input: '' });
    }
  };
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleKeyUp = (event) => {
    if (event.keyCode === 13) {
      // Enter
      this.handleSendMessage(this.state.input, 'me');
    }
  };
  render() {
    if (this.props.isLoading) {
      return <CircularProgress />
    }
    const { messages, chats, chatId } = this.props;
    if(!chats[
      chatId
    ]) {
      return 'Loading...'
    }
    const messageElements = chats[
      chatId
    ].messageList.map((messageId, index) => (
      <Message
        key={index}
        text={messages[messageId].text}
        sender={messages[messageId].sender}
      />
    ));
    return [
      <div key="messageElements" className="message-field">
        {messageElements}
      </div>,
      <div key="textInput" style={{ width: '100%', display: 'flex' }}>
        <TextField
          name="input"
          fullWidth={true}
          hintText="Введите сообщение"
          style={{ fontSize: '22px' }}
          onChange={this.handleChange}
          value={this.state.input}
          onKeyUp={this.handleKeyUp}
        />
        <FloatingActionButton
          onClick={() => this.handleSendMessage(this.state.input, 'me')}
        >
          <SendIcon />
        </FloatingActionButton>
      </div>,
    ];
  }
}

const mapStateToProps = ({ chatReducer }) => ({
  chats: chatReducer.chats,
  messages: chatReducer.messages,
  isLoading: chatReducer.isLoading,
});
const mapDispatchToProps = dispatch => bindActionCreators({
  loadChats
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MessageField);