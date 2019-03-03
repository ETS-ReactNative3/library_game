import React, {Component} from 'react'
import {Form, Label, Input,Col,Button} from 'reactstrap'
import axios from "axios/index";
import {NUlibraryUser} from "../../../config";
import classes from './settings.css'

class Settings extends Component{
    constructor(props){
        super(props);
        this.state = {
            errors:[],
            user:localStorage.getItem(NUlibraryUser),
            email:"",
            name:"",
            second_name:"",
            school:"",
            year:"",
            university_id:""
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event)
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    updateUser(e){
        e.preventDefault();
        if(this.state.new_password!==this.state.confirmation){
            this.state.errors.push("Passwords do not match")
        }
        axios.post('/user/update_user',this.state)
            .then(res=>
            {
                if(res.data.errors)
                {
                    this.setState({errors:res.data.errors});
                    setTimeout(this.cleanErrors,5000);
                }
                else
                {
                    localStorage.setItem("user",res.data);
                    this.setState({logged_in:true});
                    this.forceUpdate();
                }
            })
    }

    render(){
        const errors = this.state.errors;
        return (
            <div className={classes.set}>
                <Form  className={classes.form} onSubmit={this.updateUser.bind(this)}>
                    <p className={classes.text}>Profile Settings</p>
                    {errors.map(function(name, index){
                        console.log("ERROR")
                    })}
                    <div className={classes.row}>
                        <Label className={classes.label}>Email</Label>
                        <Col className={classes.col}>
                            <Input className={classes.input} id="email" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                        </Col>
                    </div>
                    <div className={classes.row}>
                        <Label className={classes.label}>Name</Label>
                        <Col className={classes.col}>
                            <Input   id="name" className={classes.input} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </Col>
                    </div>
                    <div className={classes.row}>
                        <Label className={classes.label}>Second Name</Label>
                        <Col className={classes.col}>
                            <Input   id="" className={classes.input} type="text" name="second_name" value={this.state.second_name} onChange={this.handleChange} />
                        </Col>
                    </div>
                    <div className={classes.row}>
                        <Label className={classes.label}>University id</Label>
                        <Col className={classes.col}>
                            <Input className={classes.input} id="university_id" type="text" name="university_id" value={this.state.university_id} onChange={this.handleChange}/>
                        </Col>
                    </div>
                    <div className={classes.row}>
                        <Label className={classes.label}>School</Label>
                        <Col className={classes.col}>
                            <Input   id="" className={classes.input} type="text" name="school" value={this.state.school} onChange={this.handleChange} />
                        </Col>
                    </div>
                    <div className={classes.row}>
                        <Label className={classes.label}>Year</Label>
                        <Col className={classes.col}>
                            <Input  id="" className={classes.input} type="text" name="year" value={this.state.year} onChange={this.handleChange} />
                        </Col>
                    </div>
                    <div className={classes.row}>
                        <Label className={classes.label}>New Password</Label>
                        <Col className={classes.col}>
                            <Input  id=""  className={classes.input} type="password" name="new_password" value={this.state.new_password} onChange={this.handleChange} />
                        </Col>
                    </div>
                    <div className={classes.row}>
                        <Label className={classes.label}>Confirmation</Label>
                        <Col className={classes.col}>
                            <Input  id="" className={classes.input} type="password" name="confirmation" value={this.state.confirmation} onChange={this.handleChange} />
                        </Col>
                    </div>
                    <div className={classes.row}>
                        <Label className={classes.label}    >Old password</Label>
                        <Col className={classes.col}>
                            <Input   id="" className={classes.input} type="password" name="old_password" value={this.state.old_password} onChange={this.handleChange} />
                        </Col>
                    </div>
                    <br/>
                    <div className={classes.row}>
                        <Col className={classes.col}><Button  color="success" type="submit" >Save changes</Button></Col>
                    </div>
                </ Form>
            </div>
        )
    }
}

export default Settings