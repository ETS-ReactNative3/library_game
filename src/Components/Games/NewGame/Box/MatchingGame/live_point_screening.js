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

    loadData() {
        axios.post('/user/get_user_points',{id:this.state.user}).then(res=> {
                this.setState(res.data);
                this.props.setUpdatePointsTo(false);
            }
        );
    }
    render() {
        if(this.props.toUpdate){
            this.loadData();
        }
        return <div className={classes.timer}>
            Score:
            <br/>
            {this.state.points}
        </div>
    }
}

export default card;