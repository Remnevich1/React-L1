import React from 'react';
import PushToggle from '../components/PushToggle';
import PropTypes from 'prop-types';
export default class Header extends React.Component {
  static propTypes = {
    chatId: PropTypes.number,
  };
  static defaultProps = {
    chatId: 1,
  };
  render() {
    return (
      <div className="header">
        <PushToggle />
        <span style={{ fontSize: '20px' }}>Чат {this.props.chatId}</span>
      </div>
    );
  }
}
