import React from "react"
import classes from "./matching.css"

const Matching =()=>{
    return(
        <div>
            <div className={classes.foundation}>
                <div className={classes.left_side}>
                    <div className={classes.timer_div}>
                        <div className={classes.timer}>

                        </div>
                    </div>
                    <div className={classes.score}>

                    </div>
                </div>
                <div className={classes.game_base}></div>
                <div className={classes.right_side}>
                    <div className={classes.leaders}>

                    </div>
                </div>
            </div>
            <div className={classes.blow}></div>
        </div>
    )
}

export default Matching;