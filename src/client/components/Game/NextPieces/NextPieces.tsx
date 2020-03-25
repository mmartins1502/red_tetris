import React from 'react'
import { pieces } from '../../../assets/models/Pieces'
import { Piece } from '../../../assets/models/Piece'

import './NextPieces.css'

interface Props {
    index: number;
    list: string[]
}

const NextPieces = (props: Props) => {
    const {index, list } = props
    const displayList: string[] = list.slice(index+1, index+4)
    console.log('displayList', displayList)
    const displayed = (
        displayList.map((piece) => {
            let p = new Piece(piece)
            return p.shape.map((row, y) => {
                return <div key={y} className="" >{row.map((value, x) => {
                    return <div key={x} className="" style={value ? {backgroundColor: pieces[value -1].color} : null}></div> 
                })}</div>;
            })
        })
    )

    console.log('displayed', displayed)


    return (
        <div>
            <div className="Next">
                <h3>Next</h3>
            {
                displayList.map((piece) => {
                    let p = new Piece(piece)
                    return <div className="piece"> {p.shape.map((row, y) => {
                        return <div key={y} className="row" >{row.map((value, x) => {
                        return <div key={x} className="case" style={value ? {backgroundColor: pieces[value -1].color, border: `solid 3px darken(${pieces[value -1].color}, 20)` , boxShadow: `inset 0 0 1px 1px lighten(${pieces[value -1].color},20)`} : null}></div> 
                        })}</div>;
                    })}</div>
                })
            }
            </div>
        </div>
    )
}

export default NextPieces
