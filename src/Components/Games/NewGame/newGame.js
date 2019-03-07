import React from "react"
import Box from "./Box/box"
import classes from './newGame.css'

const NewGame =()=>{
    return(
        <div className={classes.base}>
            <Box body="Matching"/>
            <Box body="Questionnaire"/>
        </div>
    )
}

export default NewGame;