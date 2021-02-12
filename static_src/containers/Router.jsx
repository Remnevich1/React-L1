import React from 'react';
import { Switch, Route } from 'react-router'
import Layout from './Layout.jsx';
export default class Router extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact={true} path="/" component={Layout} />
        <Route
          exact
          path="/chat/:chatId"
          render={(obj) => <Layout chatId={Number(obj.match.params.chatId)} />}
        />
      </Switch>
    );
  }
}
