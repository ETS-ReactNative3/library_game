import React, { Component } from 'react';
import axios from "axios/index";
import {NUlibraryAdmin} from "../../configAdmin";
import classes from './admin_page.css'
// var BarChart = require("react-chartjs").Bar;
import {Chart} from 'react-charts';


class Statistics extends Component{

    constructor(props){
        super(props)
        this.state = {
            user: localStorage.getItem(NUlibraryAdmin),
            data: null
        }
    }
    componentDidMount(){
        axios.get("/games/get_statistics",{id:this.state.user})
            .then(res => {
                console.log("This is the res data", res.data);
                this.setState({data:res.data});
            })
            .catch(err => console.log(err));
    }


    render(){
        // const options = {
        //     // Elements options apply to all of the options unless overridden in a dataset
        //     // In this case, we are setting the border of each bar to be 2px wide and green
        //     elements: {
        //         rectangle: {
        //             borderWidth: 2,
        //             borderColor: 'rgb(0, 255, 0)',
        //             borderSkipped: 'bottom'
        //         }
        //     },
        //     responsive: true,
        //     legend: {
        //         position: 'top'
        //     },
        //     title: {
        //         display: true,
        //         text: 'Example'
        //     }
        // }

        const data = [
            {
                label: "Series 1",
                data: [{ x: 10, y: 100 }, {x: 12, y: 200}, {x: 13, y: 50}]
            }
        ];
        if(this.state.data) {
            var online = this.state.data.map((index) => {
                if (index.name === "online") {
                    return index.value;
                }
            })
            var registered = this.state.data.map((index) => {
                if (index.name === "registered") {
                    return index.value;
                }
            })
        }
        if(this.state.data===null){
            return <div> Loading...</div>
        }
        else return(
            <div>
                <p className={classes.text1}>Total amount of registered users: {registered}</p>
                <p className={classes.text1}>Total amount of online users this month: {online}</p>
                <div>
                    <QuestionList/>
                </div>
            </div>
        )
    }
}

export default Statistics

class QuestionList extends Component{
    constructor(props){
        super(props)
    }

    componentDidMount(){
        console.log("Result thing")
        axios.get('/game/5b4e2de2fb6fc069480ddf54/get_card')
            .then(res => {
                console.log("This is the res data of Question list" + res.data);
                this.setState({data:res.data})
            })
            .catch(err => console.log("error",err));
    }

    render(){
        var listOfQuestions = null
        if(this.state) {
            console.log("This state is")
            console.log(this.state.data)
            listOfQuestions = this.state.data.map((question) =>
                <tr>
                    <td>{question.question}</td>
                    <td>A: {question.answers[0]}
                        <br/>
                        B: {question.answers[1]}
                        <br/>
                        C: {question.answers[2]}
                        <br/>
                        D: {question.answers[3]}
                        <br/>
                        Correct Answer: {question.correctAnswer}
                    </td>
                    <td>{question.author}</td>
                    <td>{question.incorrect_answers}</td>
                </tr>
            )
        }
        if(this.state){
            return(
                <div>
                    <table className={classes.table}>
                        <tr>
                            <th>Question</th>
                            <th>Answers</th>
                            <th>Author</th>
                            <th>Incorrect answers</th>
                        </tr>
                        {listOfQuestions}
                    </table>
                </div>
            )
        }
        else{
            return <div>Loading...</div>
        }

    }
}