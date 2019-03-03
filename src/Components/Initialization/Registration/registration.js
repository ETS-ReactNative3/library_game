import React, { Component } from "react";
import {
    FormGroup,
    FormControl,
    ControlLabel
} from "react-bootstrap";
// import LoaderButton from "../components/LoaderButton";
import classes from "./registration.css";
import Login from "../Login/login";
import axios from "axios/index";

class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            name: "test",
            second_name: "test",
            email: "test@mail.ru",
            password: "test",
            password2: "test",
            confirmationCode: "",
            newUser: null,
            university_id: "1"
        };
    }

    validateForm() {
        return (
            this.state.name.length > 0 &&
            this.state.second_name.length > 0 &&
            this.state.university_id.length > 0 &&
            this.state.email.length > 0 &&
            this.state.password.length > 0 &&
            this.state.password === this.state.password2
        );
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit =(event)=>{
        if(this.validateForm()){
            console.log("TRUE")
        }
        else{
            console.log("FALSE")
        }
        event.preventDefault();
        console.log("clicked")
        console.log(this.props.username)
        var dataForm = {
            "email": this.state.email,
            "username": this.props.username,
            "name": this.state.name,
            "second_name": this.state.second_name,
            "university_id": this.state.university_id,
            "password": this.state.password,
            "password2": this.state.password2
        }
        axios({
            method: "post",
            url: '/user/register',
            data: dataForm
        }).then(res=>{console.log(res)})
    }

    renderForm() {
        return (
            <form className={classes.signup} onSubmit={this.handleSubmit.bind(this)}>
                <FormGroup controlId="name" bsSize="large" className={classes.label}>
                    <ControlLabel>First name</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="First Name"
                        type="text"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="second_name" bsSize="large" className={classes.label}>
                    <ControlLabel>Second Name</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Second Name"
                        type="text"
                        value={this.state.second_name}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="university_id" bsSize="large" className={classes.label}>
                    <ControlLabel>ID</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Personal ID"
                        type="id"
                        value={this.state.university_id}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="email" bsSize="large" className={classes.label}>
                    <ControlLabel>Email</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Email Address"
                        type="email"
                        value={this.state.email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large" className={classes.label}>
                    <ControlLabel>Password</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Password"
                        value={this.state.password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <FormGroup controlId="password2" bsSize="large" className={classes.label}>
                    <ControlLabel>Confirm Password</ControlLabel>
                    <br/>
                    <FormControl
                        placeholder="Confirm Password"
                        value={this.state.password2}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <button className={classes.button}>Cancel</button>
                <button className={classes.button}>Register</button>
            </form>
        );
    }

    render() {
        return (
            <div>
                {this.state.newUser === null}
                {this.renderForm()}
            </div>
        );
    }
}

export default Registration