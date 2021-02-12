import update from 'react-addons-update';
import {
  SEND_MESSAGE,
  START_MESSAGES_LOADING,
  SUCCESS_MESSAGES_LOADING,
  ERROR_MESSAGES_LOADING,
} from '../actions/messageActions';
import {
  ADD_CHAT,
  START_CHATS_LOADING,
  SUCCESS_CHATS_LOADING,
  ERROR_CHATS_LOADING,
} from '../actions/chatActions';

const initialStore = {
  chats: {},
  messages: {},
  isLoading: false,
};
export default function chatReducer(store = initialStore, action) {
  switch (action.type) {
    case SEND_MESSAGE: {
      return update(store, {
        chats: {
          $merge: {
            [action.chatId]: {
              title: store.chats[action.chatId].title,
              messageList: [
                ...store.chats[action.chatId].messageList,
                action.messageId,
              ],
            },
          },
        },
        messages: {
          $merge: {
            ...store.messages,
            [action.messageId]: {
              text: action.text,
              sender: action.sender
            }
          }
        }
      });
    }
    case ADD_CHAT: {
      const chatId = Object.keys(store.chats).length + 1;
      return update(store, {
        chats: {
          $merge: {
            [chatId]: {
              title: action.title,
              messageList: [],
            },
          },
        },
      });
    }
    case START_MESSAGES_LOADING: {
      return update(store, {
        isLoading: { $set: true },
      });
    }
    case SUCCESS_MESSAGES_LOADING: {
      const messages = {};
      action.payload.forEach(msg => {
        const { text, sender } = msg;
        messages[msg.id] = { text, sender };
      });
      const chats = { ...store.chats };
      action.payload.forEach(msg => {
        const { id, chatId } = msg;
        chats[chatId].messageList.push(id);
      });
      return update(store, {
        messages: { $set: messages },
        chats: { $set: chats },
        isLoading: { $set: false },
      });
    }
    case ERROR_MESSAGES_LOADING: {
      return update(store, {
        isLoading: { $set: false },
      });
    }
    case START_CHATS_LOADING: {
      return update(store, {
        isLoading: { $set: true },
      });
    }
    case SUCCESS_CHATS_LOADING: {
      return update(store, {
        messages: { $set: action.payload.entities.messages },
        chats: { $set: action.payload.entities.chats },
        isLoading: { $set: false },
      });
    }
    case ERROR_CHATS_LOADING: {
      return update(store, {
        isLoading: { $set: false },
      });
    }
    default:
      return store;
  }
}
