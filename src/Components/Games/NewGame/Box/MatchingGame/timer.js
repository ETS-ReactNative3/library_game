import React, { Component } from 'react';
import classes from './matching.css'

class card extends Component {
    constructor(props){
        super(props);
        this.state={remaining:this.props.remaining}
    }
    componentDidMount() {
        this.intervalId=setInterval(()=>this.tick(),1000);
    }
    tick(){
        console.log('tick');
        if(this.state.remaining <1){
            this.props.timeoutAlert();
        }
        else{
            this.setState((prevState, props) => ({
                remaining: prevState.remaining -1
            }));
        }

    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }
    render() {
        return <div className={classes.timer}>
            Time: {this.state.remaining}
        </div>
    }
}

export default card;