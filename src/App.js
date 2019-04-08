import React, { Component } from "react";
import "./App.css";
import { Switch, Route, Redirect } from "react-router-dom";
import LoginForm from "./components/login";
import Dashboard from "./components/dashboard";
import Logout from "./components/logout";
import NotFound from "./components/notFound";

class App extends Component {
  render() {
    return (
      <div id="container">
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/logout" component={Logout} />
          <Route path="/notFound" component={NotFound} />
          <Redirect to="/notFound" />
        </Switch>
      </div>
    );
  }
}

export default App;
