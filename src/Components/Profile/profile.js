import React, {Component} from 'react'
import NavbarProfile from './navbar'
import classes from './profile.css'
import ChangeAvatar from './Settings/changeAvatar'
import axios from "axios/index";
import Profile_info from './profile_info'
import Settings from './Settings/settings'
import {NUlibraryUser} from "../../config";
import { SwatchesPicker } from 'react-color';
import {NUlibraryAdmin} from "../../configAdmin";
import {  Redirect } from 'react-router'

class Profile extends Component{
    constructor(props) {
        super(props);
        this.state = {
            user: localStorage.getItem(NUlibraryUser),
            score: 0,
            loaded: false,
            reload: false,
            shouldUpdate: false,
            selected: "info",
            lastScrollPos: 0,
            setting: "set",
            colorTopper: "",
            colorProfile: "",
            leaders: []
        };
    }

    componentDidMount(){
        console.log("Initial user", this.state.user);
        if(this.state.user){
            axios.post('/user/get_info',{id:this.state.user})
                .then(res=>{console.log("This is the res data" + res.data);this.setState(res.data)})
                .catch(err=>console.log(err));
            axios.post('/user/get_user_points',{id:this.state.user})
                .then(res=>{console.log(res.data);this.setState({score:res.data})})
                .catch(err=>console.log(err));
            axios.post('/user/get_color1',{id:this.state.user})
                .then(res=>{console.log("This is the res data for color 1 ", res.data);this.setState({colorProfile:res.data})})
                .catch(err=>console.log(err));
            axios.post('/user/get_color2',{id:this.state.user})
                .then(res=>{console.log("This is the res data for color 2 ", res.data);this.setState({colorTopper:res.data})})
                .catch(err=>console.log(err));
            axios.get('/user/get_users_sorted_by_points',{id:this.state.user})
                .then(res=>{console.log("This is the list of users by order ", res.data);
                this.setState({leaders: res.data})})
                .catch(err=>console.log(err));
        }
    }

    handleSubmit(){
        var dataColor1 = {
            "user":this.state.user,
            "color1": this.state.colorProfile
        }
        axios({
            method: "post",
            url: '/user/save_color1',
            data: dataColor1
        }).then(res=>{
            console.log("=>",res);
        })

    }
    handleSubmit2(){
        var dataColor2 = {
            "user":this.state.user,
            "color2": this.state.colorTopper
        }
        axios({
            method: "post",
            url: '/user/save_color2',
            data: dataColor2
        }).then(res=>{
            console.log("=>",res);
        })
    }

    changeColor(color) {
        this.setState({
            colorProfile: color.hex
        })
    }

    changeColor2(color) {
        this.setState({
            colorTopper: color.hex
        })
    }

    changeSet(){
        if(this.state.setting==="set") {
            this.setState({
                setting: "colorChanger"
            })
        }else if(this.state.setting=="colorChanger"){
            this.setState({
                setting: "set"
            })
        }
    }

    render() {
        if(localStorage.getItem(NUlibraryUser)) {
            console.log("User", this.state.user)
            var set_body = null
            var button_body = null
            const stylesObj = {
                background: this.state.colorProfile
            };

            const styleObj2 = {
                background: this.state.colorTopper
            }
            var profile_body = null
            if (this.state.setting === "set") {
                button_body = "Change Color"
                set_body = <Settings/>
            } else if (this.state.setting === "colorChanger") {
                button_body = "Return to privacy settings"
                set_body = <div className={classes.set}>
                    <p className={classes.text}>Here you can change your profile design</p>
                    <p className={classes.text}> Choose new color for your profile info block</p>
                    <SwatchesPicker className={classes.switcher}
                                    color={this.state.colorProfile}
                                    onChange={this.changeColor.bind(this)}/>
                    <button onClick={this.handleSubmit.bind(this)} className={classes.button}>Save changes</button>
                    <SwatchesPicker className={classes.switcher}
                                    color={this.state.colorTopper}
                                    onChange={this.changeColor2.bind(this)}/>
                    <button onClick={this.handleSubmit2.bind(this)} className={classes.button}>Save changes</button>
                </div>
            }
            if (this.props.status === "") {
                profile_body = <div className={classes.bot}>
                    <div className={classes.profile_info} style={stylesObj}>
                        <Profile_info {...(this.state)}/>
                    </div>
                    <div className={classes.topper}>
                        <div>
                            <p className={classes.score} style={styleObj2}>Total score: Place: ... </p>
                        </div>
                        <div className={classes.info} style={styleObj2}>

                        </div>
                    </div>
                </div>
            } else if (this.props.status === "setting") {
                profile_body = <div className={classes.bot}>
                    <div className={classes.profile_info} style={stylesObj}>
                        <Profile_info {...(this.state)}/>
                        <ChangeAvatar/>
                        <button onClick={this.changeSet.bind(this)}
                                className={classes.buttonChanger}>{button_body}</button>
                    </div>
                    <div className={classes.topper2}>
                        <div className={classes.info2} style={styleObj2}>
                            {set_body}
                        </div>
                    </div>
                </div>
            } else if (this.props.status === "leader_board") {

            }
            return (
                <div className={classes.main}>
                    <NavbarProfile/>
                    {profile_body}
                </div>
            )
        }
        else if(localStorage.getItem(NUlibraryAdmin)){
            return <Redirect to = "/admin_page"/>
        }
        else{
            return <Redirect to = "/"/>
        }
    }
}

export default Profile;