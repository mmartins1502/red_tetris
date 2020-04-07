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
    const spectreComplet = players.map((Rplayer: iPlayer) => {
        if (player.id !== Rplayer.id) {
        // Display spectre for you    
        // if (player.id === Rplayer.id) {

            // SPECTRE COMPLET
            let spectre = (
                 Rplayer.board.grid.map((rows, y) => {
                     return <div key={y} className="LineSpectre" >{rows.map((value, x) => {
                        return <div key={x} className="CaseSpectre" style={value ? {backgroundColor: "black"} : null}></div>
                     })}</div>;
                 })
            )
            
            return (
                <div className="PlayerSpectre">
                <div className="NameSpectre">{Rplayer.name}</div>
                <div  className="ScoreSpectre">Score: {Rplayer.account.points}</div>
                <div className="GridSpectre">
                    {spectre}
                </div>
            </div>
            )
        } else {
            return null 
        }
    })


    // SPECTRE HORIZON
    const spectreHorizon = players.map((Rplayer: iPlayer) => {
        if (player.id !== Rplayer.id) {
            let columns = []
            let spectre = (
                Rplayer.board.grid.map((rows, y) => {
                    return <div key={y} className="LineSpectre" >{rows.map((value, x) => {
                        if (columns.includes(x)) {
                            return <div key={x} className="CaseSpectre"></div>
                        } else if (value !== 0 && !columns.includes(x)) {
                            columns.push(x)
                            return <div key={x} className="CaseSpectre" style={ {backgroundColor: "black"}}></div>
                        } else {
                            return <div key={x} className="CaseSpectre"></div>
                        }
                    })}</div>;
                })
            
            )
            return (
                <div className="PlayerSpectre">
                <div className="NameSpectre">{Rplayer.name}</div>
                <div  className="ScoreSpectre">Score: {Rplayer.account.points}</div>
                <div className="GridSpectre">
                    {spectre}
                </div>
            </div>
            )
        } else {
            return null 
        }
    })

    
    let spectrum = props.room.settingsRoom.spectrum ? spectreComplet : spectreHorizon

    return (
        <div className="Spectrum">
            {spectrum}
        </div>
    )
}

export default Spectrum
