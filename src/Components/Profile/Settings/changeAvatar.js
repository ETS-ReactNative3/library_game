import React, { Component } from 'react';
import axios from "axios/index";
import avatar from '../avatar.jpg'
import {NUlibraryUser} from "../../../config";
import classes from './changeAvatar.css'

class ChangeAvatar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: localStorage.getItem(NUlibraryUser),
            visibleUpdateForm: false,
        }
    }

    componentDidMount(){
        if(this.state.user)axios.post('http://localhost:8000/user/change_avatar',{id:this.state.user})
            .then(res=>{console.log("This is the res data" + res.data);this.setState(res.data)})
            .then(()=>this.setState({loaded:true}))
    }

    render(){
        return(
            <div><button className={classes.button}>Change photo</button></div>
        )

    }
}

export default ChangeAvatar;