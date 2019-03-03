import React from "react"
import Box from "./Box/box"
import classes from './newGame.css'

const NewGame =()=>{
    return(
        <div className={classes.base}>
            <Box className={classes.box1} body="Matching">Matching game</Box>
            <Box className={classes.box2} body="Questionnaire">Questionnaire</Box>
        </div>
    )
}

export default NewGame;