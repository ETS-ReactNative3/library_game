import classes from './admin_page.css'
import Navbar from './navbar'
import React, {Component} from "react";
import { Button, Form, FormGroup, Label, Input, FormText, Col,CustomInput } from 'reactstrap';
import Alert from 'react-s-alert';
import 'react-tabs/style/react-tabs.css';
import {NUlibraryAdmin} from "../../configAdmin";
import {NUlibraryUser} from "../../config";
import {  Redirect } from 'react-router'
import Statistics from './statistics.js'
import Profile_info from './profile_info'
import axios from "axios/index";
import Sound from "react-sound";

class AdminPage extends Component{
    constructor(props){
        super(props)
        this.state = {
            user: localStorage.getItem(NUlibraryAdmin),
            admins: null,
            errors:[],
            email:"",
            name:"",
            second_name:"",
            school:"",
            year:"",
            university_id:"",
            leaders: []
        }
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        if(this.state.user) {
            axios.post('/user/get_info', {id: this.state.user})
                .then(res => {
                    this.setState(res.data)
                    if(res.data.adminType=="mainAdmin"){
                        axios.post('/user/get_all_admins')
                            .then(response => {
                                this.setState({admins: response.data});
                            })
                    }
                })
                .catch(err => console.log(err));
            axios.get('/user/get_users_sorted_by_points')
                .then(res=>{
                    this.setState({leaders: res.data})
                })
        }
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

    handleChange(event)
    {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleCheck(event){
        console.log("ID is")
        console.log(event.target.value)
        var dataID = {
            "id": event.target.value
        }
        axios({
            method: "post",
            url: '/user/change_status',
            data: dataID
        }).then(res=>{
            console.log("=>",res);
        })
    }

    render(){
        const errors = this.state.errors;
        if(localStorage.getItem(NUlibraryAdmin)) {
            var profile_body = null
            if (this.props.status === "") {
                profile_body = <div className={classes.main}>
                    <div className={classes.left_side}>
                        <div className={classes.admin_info}>
                            <Profile_info {...(this.state)}/>
                        </div>
                    </div>
                    <div className={classes.right_side}>
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
                    </div>
                </div>
            }
            else if (this.props.status === "upload") {
                profile_body = <div className={classes.main}>
                    <div className={classes.upload_body}>
                        <div className={classes.upload_questions}>
                            <QuestionSubmissionForm name={this.state.name} second_name={this.state.second_name}/>
                        </div>
                        <div className={classes.upload_cards}>
                            <CardSubmissionForm name={this.state.name} second_name={this.state.second_name}/>
                        </div>
                    </div>
                </div>

            }
            else if(this.props.status==="leaders"){
                profile_body = <div className={classes.main}>
                    <div className={classes.leaders}>
                        <ol className={classes.listHeader}>
                            <p>Top List</p>
                            {this.state.leaders.map((el, index)=>{
                                    return <li className={classes.leadersList} key={index}>{el.name} {el.second_name} - {el.email} - Points: {el.points}</li>
                                }
                            )}
                        </ol>
                    </div>
                </div>
            }
            else if(this.props.status === "statistics"){
                profile_body = <div className={classes.main}>
                    <div className={classes.upload_body_admin}>
                        <Statistics/>
                    </div>
                </div>
            }
            else if (this.props.status === "adminControl") {
                console.log("Admins list")
                console.log(this.state.admins)
                profile_body = <div className={classes.main}>
                    <div className={classes.upload_body}>
                        <table className={classes.table}>
                            <tr>
                                <th>First Name</th>
                                <th>Second Name</th>
                                <th>User type</th>
                                <th>Active status</th>
                            </tr>
                            {this.state.admins ?
                                this.state.admins.map(el=>{
                                    return <tr>
                                            <td key='1'>{el.name} </td>
                                            <td key='2'>{el.second_name}</td>
                                            <td key='3'>{el.username}</td>
                                            <td key='4'><input type="checkbox" value={el._id} onChange={this.handleCheck.bind(this)} defaultChecked={el.status}/></td>
                                        </tr>
                                })
                                :<div>Loading...</div>}
                        </table>
                    </div>
                </div>
            }
            return (
                <div className={classes.base}>
                    <Sound
                        url="/back_sound.mp3"
                        playStatus={Sound.status.PLAYING}
                        volume = {50}
                        autoLoad = {true}
                    />
                    <Navbar userType={this.state.adminType}></Navbar>
                    {profile_body}
                </div>
            )
        }
        else if(localStorage.getItem(NUlibraryUser)){
            return <Redirect to = "/profile"/>
        }
        else{
            return <Redirect to ="/"/>
        }
    }
}

export default AdminPage

// class IssuesHeader extends React.Component{
//     render(){
//         return <Tabs className="container">
//
//             <TabList>
//                 <Tab>Create issue </Tab>
//                 <Tab>Email issues</Tab>
//                 <Tab>Chat issues</Tab>
//             </TabList>
//             <p className="h2">Support page</p>
//             <TabPanel>
//                 <SupportCreate />
//             </TabPanel>
//             <TabPanel>
//                 <EmailSupport />
//             </TabPanel>
//             <TabPanel>
//                 <ChatSupport />
//             </TabPanel>
//         </Tabs>
//     }
// }
// class AdminPage extends React.Component{
//     constructor(props)
//     {
//         super(props);
//         this.state={
//             add:"card"
//         }
//         this.changeHandler=this.changeHandler.bind(this);
//     }
//     changeHandler(event)
//     {
//         event.preventDefault();
//         const target = event.target;
//         const name = target.name;
//         const value = target.value;
//         this.setState({[name]:value});
//     }
//     render()
//     {
//         const add= this.state.add;
//         let addForm
//         if(add==="question") addForm=<QuestionSubmittionForm/>
//         else if(add==="card") addForm=<CardSubmittionForm />
//         return (
//             <div>
//                 <div className="container" onChange={this.changeHandler}>
//                     <p className="h1">AdminPage</p>
//                     <Input type="select" bsSize="lg" name="add">
//                         <option value="card" defaultValue>Card matching game </option>
//                         <option value="question" > Questioning game</option>
//
//                     </Input>
//                     <div className="container">
//                         {addForm}
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }
// class EmailSupport extends React.Component{
//     render(){
//         return <div className= "container">
//             <p>There is an email support</p>
//         </div>
//     }
// }
// class ChatSupport extends React.Component{
//     render(){
//         return <div className= "container">
//             <p>There is an chat support</p>
//         </div>
//     }
// }
//

class QuestionSubmissionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: "multiple-choice",
            name: this.props.name,
            second_name: this.props.second_name
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({[name]: value});
        console.log(this.state)
    }

    handleSubmit(e) {
        e.preventDefault();
        const question = e.target.question.value;
        const type = e.target.type.value;
        let newQuestion;
        if (type === "multiple-choice") {
            console.log("in handle submit props is equal to")
            console.log(this.state.name)
            const ans = e.target.A.value + "&&&" + e.target.B.value + "&&&" + e.target.C.value + "&&&" + e.target.D.value;
            let correct;
            if (e.target.correct.value === "A") {
                correct = e.target.A.value;
            }
            else if (e.target.correct.value === "B") {
                correct = e.target.B.value;
            }
            else if (e.target.correct.value === "C") {
                correct = e.target.C.value;
            }
            else if (e.target.correct.value === "D") {
                correct = e.target.D.value;
            }
            newQuestion =
                {
                    type: type,
                    question: question,
                    answers: ans,
                    correct: correct,
                    author: this.state.name+" "+this.state.second_name
                };

        }
        else if (type === "text-answer") {
            newQuestion =
                {
                    type: "text-answer",
                    question: question,
                    correct: e.target.textAnswer.value,
                    author: this.state.name+" "+this.state.second_name
                }
        }
        fetch("/game/5b4e8351e7179a508a8d525e/question", {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json ',
                'Accept': 'application/json'
            },
            body: JSON.stringify(newQuestion)
        }).then(res => {
            if (res.status === 200) {
                Alert.success('You successfully submitted question', {
                    timeout: 3000,
                    position: 'bottom-right',
                    effect: 'slide'
                });
            } else {
                Alert.error('You could not submit question,please look at complete logs', {
                    timeout: 3000,
                    position: 'bottom-right',
                    effect: 'slide'
                });
            }
        });
    }


    render() {
        const type = this.state.type;
        console.log("This props is equal to")
        console.log(this.props.name)
        let ans;
        if (type == "multiple-choice") {
            ans = (<div className="multiple-choice-answers">
                <h4>Please input possible answers</h4>
                <FormGroup row>
                    <Label className="input-group-prepend" for="A" sm={1}>A )</Label><Col sm={3}><Input type="radio"
                                                                                                        name="correct"
                                                                                                        value="A"
                                                                                                        required/><Input
                    type="text" id="A" required/></Col>
                </FormGroup>
                <FormGroup row>
                    <Label className="input-group-prepend" for="B" sm={1}>B )</Label><Col sm={3}><Input type="radio"
                                                                                                        name="correct"
                                                                                                        value="B"/><Input
                    type="text" id="B" required/></Col>
                </FormGroup>
                <FormGroup row>
                    <Label className="input-group-prepend" for="C" sm={1}>C )</Label><Col sm={3}><Input type="radio"
                                                                                                        name="correct"
                                                                                                        value="C"/><Input
                    type="text" id="C" required/></Col>
                </FormGroup>
                <FormGroup row>
                    <Label className="input-group-prepend" for="D" sm={1}>D )</Label><Col sm={3}><Input type="radio"
                                                                                                        name="correct"
                                                                                                        value="D"/><Input
                    type="text" id="D" required/></Col>
                </FormGroup>

            </div>)
        } else if (type === "text-answer") {
            ans = (<div>
                    <h4>Enter correct answer:</h4>
                    <FormText color="muted">
                        The answer would be normalized
                    </FormText>
                    <FormGroup>
                        <Label>Answer:</Label>
                        <Input type="textarea" name="answer" id="textAnswer" required/>
                    </FormGroup>
                </div>
            )
        }
        return (
            <form onSubmit={this.handleSubmit.bind(this)} className={classes.form}>
                <Alert stack={{limit: 1}}/>
                <h2>New question form</h2>
                <FormGroup row>
                    <Label for="type" sm={5}>Question type:</Label>
                    <Col sm={7}>
                        <select className="custom-select" id="type" name="type" onChange={this.handleChange}>
                            <option value="multiple-choice" defaultValue>Multiple choice question</option>
                            <option value="text-answer">Text answer</option>
                            <option value="#">Would be added soon</option>
                        </select>
                    </Col>
                </FormGroup>
                <FormGroup>
                    <Label for="question">Question:</Label>
                    <Input type="text" name="question" id="question" placeholder="There should be your question"
                           required/>
                </FormGroup>
                {ans}
                <Button type="Submit">Submit</Button>
            </form>
        )
    }
}

class CardSubmissionForm extends Component{
    constructor(props){
        super(props);
        this.state={}
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        let correct;
        if (e.target.correct.value==="A")
        {
            correct=e.target.A.value;
        }
        else if (e.target.correct.value==="B")
        {
            correct=e.target.B.value;
        }
        else if (e.target.correct.value==="C")
        {
            correct=e.target.C.value;
        }
        else if (e.target.correct.value==="D")
        {
            correct=e.target.D.value;
        }
        let answerssss=e.target.A.value + "&&&" + e.target.B.value + "&&&" + e.target.C.value + "&&&" + e.target.D.value;
        var formdata = new FormData();
        formdata.append("card",e.target.image.files[0]);
        formdata.append("question",e.target.Question.value);
        formdata.append("answers",answerssss);
        formdata.append("correct",correct);
        formdata.append("explanation",e.target.Explanation.value)
        formdata.append("author", this.props.name+" "+this.props.second_name)
        fetch("/game/5b4e2de2fb6fc069480ddf54/create_card",{
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formdata
        }).then(res=>
        {
            if(res.status===200)
            {
                Alert.success('You successfully submitted Card', {
                    timeout:3000,
                    position: 'bottom-right',
                    effect: 'slide'
                });
            }else
            {
                Alert.error('You could not submit card,please look at complete logs', {
                    timeout:3000,
                    position: 'bottom-right',
                    effect: 'slide'
                });
            }
        });

    }
    render(){
        return(
            <div>
                <Alert stack={{limit: 1}} />
                <Form onSubmit={this.handleSubmit} className={classes.form} >
                    <h2>New Card form</h2>
                    <FormGroup >
                        <Label for="question">Question:</Label>
                        <Input type="text" id="Question" placeholder="Question" required></Input>
                    </FormGroup>
                    <h4>Please input possible answers</h4>
                    <FormGroup row>
                        <Label className="input-group-prepend" for="A" sm={1}>A )</Label><Col sm={3}><Input type="radio" name="correct" value="A" required/><Input type="text" id="A" required/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="input-group-prepend" for="B" sm={1}>B )</Label><Col sm={3}><Input type="radio" name="correct" value="B"/><Input type="text" id="B" required/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="input-group-prepend" for="C" sm={1}>C )</Label><Col sm={3}><Input type="radio" name="correct" value="C" /><Input type="text" id="C" required/></Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label className="input-group-prepend" for="D" sm={1}>D )</Label><Col sm={3}><Input type="radio" name="correct" value="D"/><Input type="text" id="D" required/></Col>
                    </FormGroup>
                    <FormGroup>
                        <Label for="image">Card image</Label>
                        <CustomInput type="file" id="image" name="image" required/>
                    </FormGroup>
                    <FormGroup >
                        <Label for="Explanation">Question:</Label>
                        <Input type="text" id="Explanation" placeholder="Explanation" required></Input>
                    </FormGroup>
                    <Button type="Submit">Add question</Button>
                </Form>
            </div>
        )
    }
}



//
// class SupportCreate extends React.Component{
//     constructor(props){
//         super(props);
//         this.state={
//             type:"",
//             Monday:{
//                 name:"Monday",
//                 selected:false,
//                 available_from:"",
//                 available_to:""
//             },
//             Tuesday:{
//                 name:"Tuesday",
//                 selected:false,
//                 available_from:"",
//                 available_to:""
//             },
//             Wednesday:{
//                 name:"Wednesday",
//                 selected:false,
//                 available_from:"",
//                 available_to:""
//             },
//             Thursday:{
//                 name:"Thursday",
//                 selected:false,
//                 available_from:"",
//                 available_to:""
//             },
//             Friday:{
//                 name:"Friday",
//                 selected:false,
//                 available_from:"",
//                 available_to:""
//             },
//             Saturday:{
//                 name:"Saturday",
//                 selected:false,
//                 available_from:"",
//                 available_to:""
//             },
//             Sunday:{
//                 name:"Sunday",
//                 selected:false,
//                 available_from:"",
//                 available_to:""
//             },
//             description:"",
//             lastSelected:"dsa"
//         }
//     }
//     handleChange(event){
//         const target = event.target;
//         const value = target.type === 'checkbox' ? target.checked : target.value;
//         const name = target.name;
//         this.setState({
//             [name]: value
//         });
//         console.log(this.state)
//     }
//     changeTime(x,event){
//         console.log(event)
//         console.log(x);
//         if(x==="from"){
//             let temp = this.state[this.state.lastSelected];
//             temp["available_from"]=event;
//             this.setState({[temp.name]:temp});
//         }else if (x==="to"){
//             let temp = this.state[this.state.lastSelected];
//             temp["available_to"]=event;
//             this.setState({[temp.name]:temp});
//         }
//
//     }
//     changeDay(e){
//         e.preventDefault();
//         console.log(e.target)
//         let temp  = this.state[e.target.id];
//         temp.selected=!temp.selected;
//         this.setState({lastSelected:e.target.id,temp});
//         console.log(this.state)
//     }
//     handleSubmit(e){
//         e.preventDefault();
//         var form = new FormData();
//         var type = this.state.type;
//         var description = this.state.description;
//         var available=[];
//         var time={}
//         if(this.state.Monday.selected){
//             available.push("Monday");
//             time.Monday_from = this.state.Monday.available_from;
//             time.Monday_to = this.state.Monday.available_to;
//         }
//         if(this.state.Tuesday.selected){
//             available.push("Tuesday");
//             time.Tuesday_from = this.state.Tuesday.available_from;
//             time.Tuesday_to = this.state.Tuesday.available_to;
//         }
//         if(this.state.Wednesday.selected){
//             available.push("Wednesday");
//             time.Wednesday_from = this.state.Wednesday.available_from;
//             time.Wednesday_to = this.state.Wednesday.available_to;
//         }
//         if(this.state.Thursday.selected){
//             available.push("Thursday");
//             time.Thursday_from = this.state.Thursday.available_from;
//             time.Thursday_to = this.state.Thursday.available_to;
//         }
//         if(this.state.Friday.selected){
//             available.push("Friday");
//             time.Friday_from = this.state.Friday.available_from;
//             time.Friday_to = this.state.Friday.available_to;
//         }
//         if(this.state.Saturday.selected){
//             available.push("Saturday");
//             time.Saturday_from = this.state.Saturday.available_from;
//             time.Saturday_to = this.state.Saturday.available_to;
//         }
//         if(this.state.Sunday.selected){
//             available.push("Sunday");
//             time.Sunday_from = this.state.Sunday.available_from;
//             time.Sunday_to = this.state.Sunday.available_to;
//         }
//         form.append("type",type);
//         form.append("description",description);
//         form.append("available",available);
//         form.append("time",time);
//         console.log(form.get("type"))
//         axios.post("http://localhost:8000/support/new", form).then((response) => {
//             console.log(response); // do something with the response
//         });
//     }
//     render(){
//         console.log(this.state.Monday.selected)
//         var classNames = require('classnames');
//         return <Form className="container">
//             <center>Create new support type</center>
//             <FormGroup onChange = {this.handleChange.bind(this)}>
//                 <Label> Name:</Label>
//                 <Input type="text" placeholder="Name of the support" name="type" value={this.state.type}/>
//             </FormGroup>
//             <FormGroup onChange = {this.handleChange.bind(this)}>
//                 <Label> Description:</Label>
//                 <Input type="text" placeholder="Support description" name="description" value={this.state.description} />
//             </FormGroup>
//             <FormGroup className = "row">
//                 <Day {...this.state.Monday} changeDay={this.changeDay.bind(this	)}/>
//                 <Day {...this.state.Tuesday} changeDay={this.changeDay.bind(this	)}/>
//                 <Day {...this.state.Wednesday} changeDay={this.changeDay.bind(this	)}/>
//                 <Day {...this.state.Thursday} changeDay={this.changeDay.bind(this	)}/>
//                 <Day {...this.state.Friday} changeDay={this.changeDay.bind(this	)}/>
//                 <Day {...this.state.Saturday} changeDay={this.changeDay.bind(this	)}/>
//                 <Day {...this.state.Sunday} changeDay={this.changeDay.bind(this	)}/>
//                 <TimeSelector    {...this.state[this.state.lastSelected]} changeTime={this.changeTime.bind(this)}/>
//                 <Button onClick={this.handleSubmit.bind(this)} >Create new support </Button>
//             </FormGroup>
//         </Form>
//     }
// }
// class Day extends React.Component{
//     render(){
//         var classNames = require('classnames');
//         return<div className = { this.props.selected ?    classNames("Day_selector", "not_selected") : classNames("Day_selector", "selected") }  id={this.props.name}    name={this.props.name}   value={this.props.name}     onClick={this.props.changeDay}>{this.props.name}<br/>From:{this.props.available_from} to {this.props.available_to}</div>
//     }
// }
// class TimeSelector extends React.Component{
//     render() {
//         if(this.props.name==="" || !this.props.name) return null
//         return (
//             <div>
//                 <TimePicker
//                     onChange={(e)=>this.props.changeTime("from",e)}
//                     value={this.props.available_from}
//                     name="from"
//                 />
//                 <TimePicker
//                     onChange={(e)=>this.props.changeTime("to",e)}
//                     value={this.props.available_to}
//                     name="to"
//                 />
//             </div>
//         );
//     }
// }
// export default Header
