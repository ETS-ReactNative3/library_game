import React, {Component} from 'react'
import {NUlibraryUser} from "../../../../../config";
import {Button} from 'reactstrap'
import axios from "axios/index";
import ReactModal from 'react-modal';
import Timer from './timer'
import classes from './matching.css'
import Live_point_screening from './live_point_screening';
import Card from './Card';
import gif from './NEW.gif';

class MatchingGame extends Component{
    constructor(props){
        super(props)
        this.state={
            user: localStorage.getItem(NUlibraryUser),
            loaded:false,
            imageLoaded: false,
            endGame: true,
            leaders:[]
        }
        this.handleCardClick = this.handleCardClick.bind(this);
        this.handleFinishGame = this.handleFinishGame.bind(this);
        this.timeoutAlert = this.timeoutAlert.bind(this);
    }
    componentWillMount(){
        if(this.state.remaining<=0){
            this.setState({loaded:true, button: "Timeout", endGame: true});
        }
        else this.setState({loaded: true, button: "Continue game"});
    }
    AlertQuestion(text,res){
	    // console.log(localStorage.getItem(NUlibraryUser));
        axios.post('/user/add_points',{userID:localStorage.getItem(NUlibraryUser),points:1});
        console.log("The text is ", text);
        this.setState({question:text.question, answers:text.answers, idd:text.idd, correct: text.correctAnswer},this.CloseQuestion(res));

    }
    CloseQuestion(res){
        // console.log(res);
        this.setState({game:res.data,question:null,answers:null});
        this.forceUpdate();
    }
    handleCardClick(index){
        // console.log("CLICKED");
        if(this.state.clickedCard===true){
            // console.log("CLICKED ALREADY");
            return ;
        }
        this.setState({clickedCard:true})
        axios("/game/5b4e2de2fb6fc069480ddf54/open_card", {
            method: "post",
            data: {index:index},
            withCredentials: true
        }).then(res=>
            {
                if(this.state.game.found.length !== res.data.found.length || res.data.status === "completed"){
                    console.log("Battlefield is ", res.data.battlefield[res.data.found[res.data.found.length -1]])
                    this.AlertQuestion(res.data.battlefield[res.data.found[res.data.found.length -1]],res);
                }
                else{
                    this.setState({game:res.data,clickedCard:false});
                    this.forceUpdate();
                    // console.log(this.state.game)
                    }
            }
        )
    }
    handleLoadGame(e){
        axios({
            method:'get',
            url:"/game/5b4e2de2fb6fc069480ddf54/load",
        }).then(res=> {
            console.log("Loading 2")
            this.setState({game:res.data})
            console.log("KJMMKJNHBGVFCBHNJ")
            console.log(this.state.game)
        })
        {this.handleGetLeaders()}
    }

    handleStartGame(e){
        this.setState({remaining: 120, imageLoaded: true, endGame: false})
    }

    handleGetLeaders(e){
        axios({
            method:'get',
            url:'/user/get_users_sorted_by_points',
        }).then(res=>{
            this.setState({leaders:res.data})
            console.log("Leaders ", res.data)
        })
    }
    handleFinishGame(e){
        axios({
            method:'get',
            url:"/game/5b4e2de2fb6fc069480ddf54/finish_game",
        }).then(res=> {
            console.log(res.data);
            this.setState({loaded:true,button:"Start game",game:null, endGame: true});
            this.forceUpdate();
        });
    }
    timeoutAlert(){
        console.log("ALERT")
        axios.get("/game/5b4e2de2fb6fc069480ddf54/timeout");
        this.setState({game:{status:"timeout"}});
    }
    render()
    {
        console.log("mkbv", this.state)
        if(!this.state.loaded)return <div><h1 className={classes.loading}>Loading...</h1></div>
        else if(!this.state.game){
            {this.handleLoadGame()}
            return <div><h1 className={classes.loading}>Loading...</h1></div>
        }
        else if (this.state.game.status==="loaded")
        {
            return (
                <div>
                    <ReactModal isOpen={this.state.endGame}>
                        <Button onClick={this.handleStartGame.bind(this)} className={classes.startButton}>Start</Button>
                    </ReactModal>
                    <div className={classes.foundation}>
                        <div className={classes.left_side}>
                            <div className={classes.timer_div}>
                                <div>
                                    {this.state.imageLoaded ?(
                                        <Timer remaining = {this.state.remaining} timeoutAlert={this.timeoutAlert}/>)
                                        :<div className={classes.timer}></div>
                                    }
                                </div>
                            </div>
                            <div className={classes.score}>
                                <Live_point_screening />
                            </div>
                            <div className={classes.bot}>
                                <img src={gif} className={classes.gif}/>
                            </div>
                        </div>
                        <div className={classes.game_base}>
                            <GameContainer {...this.state} handleCardClick={this.handleCardClick}/>
                            {this.state.question ? (
                                <Question {...this.state} isOpen={true} question={this.state.question} idd= {this.state.idd}answers={this.state.answers}/>
                            ): null}
                            <GameEnded handleFinishGame={this.handleFinishGame} />
                        </div>
                        }
                        <div className={classes.right_side}>
                            <div className={classes.leaders}>
                                <p className={classes.board}>Leader Board</p>
                                <ul>
                                    {this.state.leaders.map((el, index)=>{
                                        return <li className={classes.leadersList} key={index}>{el.points} - {el.name} {el.second_name}</li>
                                    }
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className={classes.blow}></div>
                </div>
            )
        }
        else if (this.state.game.status==="completed") return <div>{this.state.question?<Question isOpen={true } question={this.state.question} idd= {this.state.idd}answers={this.state.answers}/>:null}<GameEnded handleFinishGame={this.handleFinishGame}/></div>
        else if (this.state.game.status==="timeout")   return <GameEnded handleFinishGame={this.handleFinishGame} />
    }
}

class Question extends Component{
    constructor(props){
        super(props);
        this.state={
            isOpen:this.props.isOpen
        }
    }
    give_answer(e){
        e.preventDefault();
        var formdata={
            idd:this.props.idd,
            correctAnswer:e.target.value
        }
        axios.post('/game/5b4e2de2fb6fc069480ddf54/answer_card_question',formdata)
             .then(res =>{if(res.data ==="CORRECT"){
                 axios.post('user/add_points',{userID:localStorage.getItem(NUlibraryUser),points:2});
             }}).then(()=>{this.setState({isOpen:false}); })
        // if(this.props.correct===e.target.value){
        //     console.log("Correct answer")
        //     axios.post('user/add_points',{userID:localStorage.getItem(NUlibraryUser),points:2})
        //     .then(()=>{this.setState({isOpen:false}); })
        // }
        // else{
        //     console.log("Incorrect answer, ", this.props.correct)
        //     axios.post('user/add_points',{userID:localStorage.getItem(NUlibraryUser),points:1})
        //         .then(()=>{this.setState({isOpen:false}); })
        // }
    }
    render(){
        // console.log(this.props.game.battlefield)
        return<ReactModal isOpen={this.state.isOpen} contentLabel="Minimal Modal Example">
                <div className={classes.question_main}>
                    <div className={classes.question_div}>
                        <p className={classes.question}>Question:{this.props.question}</p>
                        <Button className={classes.button_question} onClick={this.give_answer.bind(this)} value ={this.props.answers[0]}>A: {this.props.answers[0]}</Button>
                        <br/>
                        <Button className={classes.button_question} onClick={this.give_answer.bind(this)} value ={this.props.answers[1]}>B: {this.props.answers[1]}</Button>
                        <br/>
                        <Button className={classes.button_question} onClick={this.give_answer.bind(this)} value ={this.props.answers[2]}>C: {this.props.answers[2]}</Button>
                        <br/>
                        <Button className={classes.button_question} onClick={this.give_answer.bind(this)} value ={this.props.answers[3]}>D: {this.props.answers[3]}</Button>
                    </div>
                </div>
            </ReactModal>
    }
}

class GameEnded extends Component{
    render(){
        return <div className={classes.start}><Button onClick={this.props.handleFinishGame}>Finish game</Button></div>
    }
}

class GameContainer extends Component{
    constructor(props){
        super(props)
        this.state={
            rendered: false
        }
    }
    componentDidMount(){
        this.setState({rendered:true})
    }
    render(){
        console.log(this.props.battlefield)
        return <div className={classes.matching_base}>{this.props.game.battlefield.map((element,index)=>{
            return <Card {...element} key={index} index={index} click={this.props.handleCardClick} found={this.props.game.found.includes(index)}/>
        })}</div>
    }
}
//
// class Card extends Component{
//     constructor(props){
//         super(props)
//     }
//
// }

export default MatchingGame