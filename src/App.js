import React, { Component } from 'react';
import classes from './App.css';
import NewGame from './Components/Games/NewGame/newGame'
import Init from './Components/Initialization/init'
import Profile from './Components/Profile/profile'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import About from './Components/About/about'
import Questioning from './Components/Games/NewGame/Box/Questionnaire/questionnaire'
import Matching from './Components/Games/NewGame/Box/MatchingGame/matchingGameMain'
import AdminPage from "./Components/Admin page/admin_profile"

class App extends Component {
    render() {
        return (
            <div>
                <Router>
                <div>
                    <Route exact path="/" render={(props) => <About/>}/>
                    <Route path="/register" render={(props) => <Init status="register" user="Admin"/>}/>
                    <Route path="/newgame" render={(props) => <NewGame/>}/>
                    <Route path="/profile" render={(props) => <Profile status=""/>}/>
                    <Route path="/setting" render={(props) => <Profile status="setting"/>}/>
                    <Route path="/login" render={(props) => <Init status="login" user="User"/>}/>
                    <Route path="/leader_board" render={(props) => <Init status="leader_board"/>}/>
                    <Route path="/matching_game" render={(props) => <Matching/>}/>
                    <Route path="/questionnaire" render={(props) => <Questioning/>}/>
                    <Route path="/admin" render={(props) => <Init status="login" user="Admin"/>}/>
                    <Route path="/admin_page" render={(props) => <AdminPage status=""/>}/>
                    <Route path="/admin_leaders" render={(props) => <AdminPage status="leaders"/>}/>
                    <Route path="/admin_control" render={(props) => <AdminPage status="adminControl"/>}/>
                    <Route path="/upload" render={(props) => <AdminPage status="upload"/>}/>
                    <Route path="/statistics" render={(props) => <AdminPage status="statistics"/>}/>
                </div>
            </Router>
            </div>
        )
    }
}

export default App
