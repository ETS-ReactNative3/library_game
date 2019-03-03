import React, { Component } from 'react';
import classes from './profile_info.css'
import axios from "axios/index";
import avatar from './avatar.jpg'
import {NUlibraryAdmin} from "../../configAdmin";

class ProfileInfo extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: localStorage.getItem(NUlibraryAdmin),
            visibleUpdateForm:false,
        }
    }

    componentDidMount(){
        axios.post("/user/get_image",{id:this.state.user},{
                responseType: 'arraybuffer'
            },
        )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({ source: "data:;base64," + base64, loaded:true });
            }).catch((res)=>{console.log("Changed photo"); this.setState({source:avatar,loaded:true})});
    }

    render(){
        // console.log(this.props)
        return (
            <div className={classes.avatar}>
                <img src={this.state.source} className={classes.image}/>
                <p className={classes.text}>{this.props.name} {this.props.second_name}</p>
            </div>
        )
    }
}

export default ProfileInfo;