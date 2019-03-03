import React, { Component } from 'react';
import classes from './about.css'
import {NUlibraryUser} from "../../config";
import gif from '../../gif.gif'
import { Link } from 'react-router-dom'
import {NUlibraryAdmin} from "../../configAdmin";
import jpg from './paper.jpg'

class About extends Component{
    constructor(props) {
        super(props);
        if(localStorage.getItem(NUlibraryUser) || localStorage.getItem(NUlibraryAdmin)){
            this.state = {isLoggedIn: true}
        }
        else{
            this.state = {isLoggedIn: false}
        }
    };

    logOut = () =>{
        if(localStorage.getItem(NUlibraryUser)) {
            localStorage.removeItem(NUlibraryUser)
        }
        else if(localStorage.getItem(NUlibraryAdmin)){
            localStorage.removeItem((NUlibraryAdmin))
        }
    }

    render() {
        var menuItems = null;
        console.log(this.state.isLoggedIn)
        if (this.state.isLoggedIn === true) {
            console.log("I am trying to log in")
            if(localStorage.getItem(NUlibraryUser)) {
                console.log("Logged in")
                menuItems = <div className={classes.menu}>
                    <Link to='/newGame' className={classes.list}>Start new game</Link>
                    <br/>
                    <Link to='/profile' className={classes.list}>Profile</Link>
                    <br/>
                    <Link to='/login' onClick={this.logOut.bind(this)} className={classes.list}>Log out</Link>
                </div>
            }
            else if(localStorage.getItem(NUlibraryAdmin)){
                menuItems = <div className={classes.menu}>
                    <Link to='/admin_page' className={classes.list}>Profile</Link>
                    <br/>
                    <Link to='/login' onClick={this.logOut.bind(this)} className={classes.list}>Log out</Link>
                </div>
            }
        }
        else {
            console.log("I am new")
            menuItems = <div className={classes.menu}>
                <Link to='/register' className={classes.list}>New Profile</Link>
                <br/>
                <Link to='/login' className={classes.list}>Log in</Link>
            </div>
        }
        return(
            <div className={classes.main}>
                <div className={classes.men}>
                    {/*<img className={classes.paper} src={jpg}/>*/}
                    <div className={classes.up}>{menuItems}</div>
                </div>
                <div className={classes.myGifDiv}><img className={classes.myGif} src={gif}/></div>
            </div>
        )
    }
}

export default About