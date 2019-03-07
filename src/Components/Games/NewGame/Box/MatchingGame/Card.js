import React, { Component } from 'react';
import {  Redirect } from 'react-router'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import classes from './card.css'

const qs = require('query-string');
class Card extends Component {
    constructor(props){
        super(props);
        this.state={
            loaded:false
        }
        this.clickCard= this.clickCard.bind(this);
    }
    clickCard(e){
        console.log("Click the card")
        e.preventDefault();
        this.props.click(this.props.index);
    }
    componentWillMount(){
        axios.get('/game/5b4e2de2fb6fc069480ddf54/get-card-image/?url='+this.props.image,{responseType: 'arraybuffer'},)
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({ source: "data:;base64," + base64 });
            });
    }
    render()
    {
        console.log("I am in the cards")
        if(this.state.loaded) return <div className="card ">Loading....</div>
        else if(this.props.openned)return <div className={classes.card} style={this.props.styling} ref={this.getCardRef}><img className={classes.cardImage} src={this.state.source} /></div>;
        else if(this.props.found===true)return <div className={classes.frame} style={this.props.styling} ref={this.getCardRef}><img className={classes.cardImage} src={this.state.source} /></div>;
        else if(this.props.found===false) return(
            <div className={classes.card} onClick={this.clickCard.bind(this)}></div>
        )
    }
}

export default Card;
