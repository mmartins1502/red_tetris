import React from 'react'
import './NextPieces.css'
import { Piece } from '../../../../Shared/models/Piece'
import { pieces } from '../../../../Shared/models/Pieces'

interface Props {
    index: number;
    list: string[]
}

const NextPieces = (props: Props) => {
    const {index, list } = props
    const displayList: string[] = list.slice(index+1, index+4)
    const displayed = (
        displayList.map((piece) => {
            let p = new Piece(piece)
            return <div className="piece"> {p.shape.map((row, y) => {
                return <div key={y} className="row" >{row.map((value, x) => {
                return <div key={x} className={value ? "case tetri" : "case"} style={value ? {backgroundColor: pieces[value -1].color, border: `solid 3px darken(${pieces[value -1].color}, 20)` , boxShadow: `inset 0 0 1px 1px lighten(${pieces[value -1].color},20)`} : null}></div> 
                })}</div>;
            })}</div>
        })
    )



    return (
        <div>
            <div className="Next">
                <h3>Next</h3>
            {displayed}
            </div>
        </div>
    )
}

export default NextPieces
