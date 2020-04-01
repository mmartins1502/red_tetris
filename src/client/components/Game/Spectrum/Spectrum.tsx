import React from 'react'
import { iRoom } from '../../../../Shared/models/Room';
import { iPlayer } from '../../../../Shared/models/Player';
import "./Spectrum.css"

interface Props {
    player: iPlayer
    room: iRoom
}


const Spectrum = (props: Props) => {
    const {players} = props.room
    const {player} = props
    const spectre = players.map((Rplayer: iPlayer) => {
        if (player.id !== Rplayer.id) {
            return (
            <div className="PlayerSpectre">
                <div className="NameSpectre">{Rplayer.name}</div>
                <div  className="ScoreSpectre">Score: {Rplayer.account.points}</div>
                <div className="GridSpectre">
                    {Rplayer.board.grid.map((rows, y) => {
                        return <div key={y} className="LineSpectre" >{rows.map((value, x) => {
                            return <div key={x} className="CaseSpectre" style={value ? {backgroundColor: "black"} : null}></div>
                        })}</div>;
                    })}
                </div>
            </div>
            )
        } else {
            return null 
        }
    })



    return (
        <div>
            {spectre}
        </div>
    )
}

export default Spectrum
