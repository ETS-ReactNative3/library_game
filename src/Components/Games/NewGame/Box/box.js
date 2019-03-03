import React, {Component} from "react"
import classes from  "./box.css"
import icon from "./icon.png"
import { Link } from 'react-router-dom'
import {Button} from 'reactstrap'

class Box extends Component{
    constructor(props){
        super(props)
    }

    render() {
        var but = null;
        if(this.props.body==="Matching"){
            but = <Link to="/matching_game" className={classes.link}><Button className={classes.button}>Start</Button></Link>
        }
        else if(this.props.body==="Questionnaire"){
            but = <Link to="/questionnaire" className={classes.link}><Button className={classes.button}>Start</Button></Link>
        }
        return (
            <div className={classes.found}>
                <div>
                    <img className={classes.icon} src={icon}/>
                </div>
                <h1 className={classes.text}>{this.props.body}</h1>
                {but}
            </div>
        )
    }
}

export default Box;