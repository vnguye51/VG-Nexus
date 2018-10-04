import React, { Component } from 'react';
import Form from './components/UploadForm/Form'
import Game from './components/Game/Game'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import DirectMessage from './pages/Chat/DirectMessage'
import NavTabs from "./components/NavTabs";
import {Container} from "./components/Grid";
import Chatroom from "./components/Chat/practicechat"
import Chatroom2 from "./components/Chat/testchat"
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import ChooseGame from "./components/pages/ChooseGame";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

class App extends Component {

  render() {
    return (
      <Router>
      <div>
        <NavTabs />
        <Container>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route path="/all" component={ChooseGame} />
          <Route exact path="/upload" component={Form} />
          <Route exact path="/game" component={Game} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/chat' component={DirectMessage} />
          <Route exact path="/chatRoom" component={Chatroom} />
          <Route exact path="/chatroom2" component={Chatroom2} />
        </Container>
      </div>
    </Router>

    );
  }
}

export default App;

