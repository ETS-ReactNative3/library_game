import React, { Component } from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
import classes from './login.css'
import axios from 'axios';
import {NUlibraryUser} from "../../../config";
import {NUlibraryAdmin} from "../../../configAdmin";
import {  Redirect } from 'react-router';

class Login extends Component{
    constructor(props){
        super(props);

        this.state = {
            isLogged:false,
            email: "admin@mail.ru",
            password: "admin",
            activeUser: true,
            user: null
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var dataForm = {
            "email": this.state.email,
            "password": this.state.password,
            "user": this.props.username
        }
        axios({
            method: "post",
            url: '/user/login',
            data: dataForm
        }).then(res => {
            if (this.props.username === "Admin") {
                if(res.data.status==true) {
                    localStorage.setItem(NUlibraryAdmin, res.data.id);
                    this.setState({isLogged: true})
                }
                else{
                    this.setState({activeUser: false})
                }
            }
            else if (this.props.username === "User") {
                if(res.data.status==true) {
                    localStorage.setItem(NUlibraryUser, res.data.id);
                    this.setState({isLogged: true})
                }
                else{
                    this.setState({activeUser: false})
                }
            }
        })
    }

    renderForm() {
        return (
            <form className={classes.Signin} onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="email" bsSize="large" className={classes.label}>
                    <ControlLabel>Email</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Enter email"
                        autoFocus
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large" className={classes.label}>
                    <ControlLabel>Password</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Enter password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <button className={classes.button}>Cancel</button>
                <input type="submit" className={classes.button} value="Login"/>
            </form>
        );
    }

    render(){
        console.log(this.state.isLogged)
        if(this.state.isLogged===true){
            console.log("Redirecting to about")
            return <Redirect to = "/"/>
        }
        else {
            if(this.state.activeUser===false){
                console.log("Redirecting to not")
                return <Redirect to ="/"/>
            }
            else {
                return (
                    <div>
                        {this.renderForm()}
                    </div>
                );
            }
        }
    }
}

export default Login