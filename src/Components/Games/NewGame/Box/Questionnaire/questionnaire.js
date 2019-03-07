import React, {Component} from 'react'
import axios from "axios/index";
import {NUlibraryUser} from "../../../../../config";
import {Button} from 'reactstrap'
import classes from './questionnaire.css'
import ReactModal from 'react-modal';
import { Link } from 'react-router-dom'

class Questionnaire extends Component{
    constructor(props) {
        super(props)
        this.state = {
            user: localStorage.getItem(NUlibraryUser),
            loaded: false,
            game_status: null,
            correct_answers: 0,
            game_body: null,
            isOpen:true,
            input: null
        }
    }

    handleStartGame(e){
        console.log("Clicked")
        axios({
            method:'post',
            url:"/game/5b4e8351e7179a508a8d525e/start",
        }).then(res=> {
            console.log(res.data);
            this.setState({game_status:"started", game_body: res.data, isOpen: false});
            console.log(this.state.game_body);
        })
    }

    clickAnswer(question, answer){
        if(question.correct===answer){
            this.state.game_body.correctly_answered.push(question);
            this.state.game_body.questions.splice(0, 1)
            this.setState({correct_answer: 1})
        }
        else{
            this.state.game_body.answered.push(question);
            this.state.game_body.questions.splice(0, 1)
            if(this.state.game_body.questions.length===0){
                console.log("Correct Answered: ", this.state.game_body.correctly_answered)
                console.log("Incorrect Answered: ", this.state.game_body.answered)
                this.setState({game_status: "finished"})
                this.setState({isOpen:true})
            }
            this.setState({correct_answer: 1})
        }
    }

    handleChange = (e)=> {
        this.setState({input: e.target.value})
    }

    handleClick=()=>{
        if(this.state.input===this.state.game_body.questions[0].correct){
            this.state.game_body.correctly_answered.push(this.state.game_body.questions[0]);
            this.state.game_body.questions.splice(0, 1)
            this.setState({input: ""})
        }
        else{
            this.state.game_body.answered.push(this.state.game_body.questions[0]);
            this.state.game_body.questions.splice(0, 1)
            if(this.state.game_body.questions.length===0){
                console.log("Correct Answered: ", this.state.game_body.correctly_answered)
                console.log("Incorrect Answered: ", this.state.game_body.answered)
                this.setState({game_status: "finished"})
                this.setState({isOpen:true})
            }
            this.setState({input: ""})
        }
    }

    render(){
        if (this.state.game_status==null) return <ReactModal isOpen={this.state.isOpen} ariaHideApp={false} className={classes.start}>
                                        <Button onClick={this.handleStartGame.bind(this)} className={classes.start_button}>Start</Button>
                                    </ReactModal>
        else if(this.state.game_status==="started"){
            console.log("Start the game")
            console.log(this.state.game_body.questions[0].type)
            var body=null;
            if(this.state.game_body.questions[0].type=="multiple-choice"){
                console.log("It is a multiple choice question")
                body=<div className={classes.ans}>
                    <Button className={classes.answers} onClick={(e)=>this.clickAnswer(this.state.game_body.questions[0], this.state.game_body.questions[0].answers[0])}>
                        A: {this.state.game_body.questions[0].answers[0]}
                    </Button>
                    <Button className={classes.answers} onClick={(e)=>this.clickAnswer(this.state.game_body.questions[0], this.state.game_body.questions[0].answers[1])}>
                        B: {this.state.game_body.questions[0].answers[1]}
                    </Button>
                    <Button className={classes.answers} onClick={(e)=>this.clickAnswer(this.state.game_body.questions[0], this.state.game_body.questions[0].answers[2])}>
                        C: {this.state.game_body.questions[0].answers[2]}
                    </Button>
                    <Button className={classes.answers} onClick={(e)=>this.clickAnswer(this.state.game_body.questions[0], this.state.game_body.questions[0].answers[3])}>
                        D: {this.state.game_body.questions[0].answers[3]}
                    </Button>
                </div>
            }
            else if(this.state.game_body.questions[0].type=="text-answer"){
                console.log("It is a text-answer question")
                body=<div className={classes.ans2}>
                    <input className={classes.input} placeholder="Type your answer here" value={this.state.input} onChange={this.handleChange} type="text"/>
                    <input type="button" className={classes.but} onClick={this.handleClick} value="Submit"/>
                </div>
            }
            return (
                <div className={classes.main}>
                    <div className={classes.base}>
                        <div className={classes.question_base}>
                            <div className={classes.question_box}>
                                <p className={classes.questions}>{this.state.game_body.questions[0].question}</p>
                            </div>
                        </div>
                        <div className={classes.answers_base}>
                            {body}
                        </div>
                    </div>
                </div>
            )
        }
        else if(this.state.game_status==="finished"){
            console.log(this.state.game_body)
            return(
                <ReactModal isOpen={this.state.isOpen} ariaHideApp={false} className={classes.start2}>
                    <p className={classes.text}>Correct answers:</p>
                    <ul className={classes.text}>
                        {this.state.game_body.correctly_answered.map(questions=><li className={classes.li1}>{questions.question}</li>)}
                    </ul>
                    <p className={classes.text}>Incorrect answers:</p>
                    <ul className={classes.list}>
                        {this.state.game_body.answered.map(questions=><li className={classes.li2}>{questions.question}</li>)}
                    </ul>
                    <Button onClick={this.handleStartGame.bind(this)}>Start new game</Button>
                    <Button><Link to="/" className={classes.link}>Back to the main menu</Link></Button>
                </ReactModal>
            )
        }
    }
}

export default Questionnaire