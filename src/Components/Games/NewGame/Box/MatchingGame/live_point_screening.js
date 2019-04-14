import React, { Component } from 'react';
import axios from 'axios';
import classes from './matching.css'
import {NUlibraryUser} from "../../../../../config";

class card extends Component {
    constructor(props){
        super(props);
        this.state={user:localStorage.getItem(NUlibraryUser)};
        this.loadData= this.loadData.bind(this);
    }
    componentDidMount() {
        this.intervalId=setInterval(()=>this.loadData(),1000);
    }
    loadData() {
        // console.log("This is our current user")
        // console.log(this.state.user)
        axios.post('/user/get_user_points',{id:this.state.user}).then(res=> {
                console.log(res.data)
                this.setState(res.data)
            }
        );
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    render() {
        return <div className={classes.timer}>
            Score:
            <br/>
            {this.state.points}
        </div>
    }
}

export default card;