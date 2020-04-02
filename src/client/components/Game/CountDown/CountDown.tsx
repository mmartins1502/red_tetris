import React, { useState, useEffect } from 'react'
// import { iRoom } from '../../../../Shared/models/Room'

interface Props {
    speedUp: () => void
}

const CountDown = (props: Props) => {
    const [timer, settimer] = useState(60)
    const {speedUp} = props


    useEffect(() => {
        let timeleft = timer
        let downloadTimer = setInterval(() => {
            timeleft--;
            settimer(timeleft)
            if(timeleft <= 0)
            speedUp()
            clearInterval(downloadTimer);
            // timeleft = 60
            // settimer(60)
        },1000)
    }, [timer, speedUp])
    
    if (timer <= 0) settimer(60)

    return (
        <div className="Score" style={{color: "black"}}>
            Countdown:
            {timer}s
        </div>
    )
}

export default CountDown
