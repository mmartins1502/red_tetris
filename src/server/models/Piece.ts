const pieces = [
    {
        nb: 1,
        color: "cyan",
        rotation:[
            [
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0],
                [0,1,0,0]
            ],
            [
                [1,1,1,1],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ]
        ]
    },
    {
        nb: 2,
        color: "blue",
        rotation:[
            [
                [0,2,0],
                [0,2,0],
                [2,2,0]
            ],
            [
                [2,0,0],
                [2,2,2],
                [0,0,0]
            ],
            [
                [0,2,2],
                [0,2,0],
                [0,2,0]
            ],
            [
                [0,0,0],
                [2,2,2],
                [0,0,2]
            ]
        ]
    },
    {
        nb: 3,
        color: "orange",
        rotation:[
            [
                [0,3,0],
                [0,3,0],
                [0,3,3]
            ],
            [
                [0,0,0],
                [3,3,3],
                [3,0,0]
            ],
            [
                [3,3,0],
                [0,3,0],
                [0,3,0]
            ],
            [
                [0,0,3],
                [3,3,3],
                [0,0,0]
            ]
        ]
    },
    {    
        nb: 4,
        color: "yellow",
        rotation:[
            [
                [4,4,0],
                [4,4,0],
                [0,0,0],
            ]
        ]
    },
    {
        nb: 5,
        color: "green",
        rotation:[
            [
                [0,5,5],
                [5,5,0],
                [0,0,0]
            ],
            [
                [0,5,0],
                [0,5,5],
                [0,0,5]
            ],
        ]
    },
    {

        nb: 6,
        color: "red",
        rotation:[
            [
                [6,6,0],
                [0,6,6],
                [0,0,0]
            ],
            [
                [0,6,0],
                [6,6,0],
                [6,0,0]
            ]
        ]
    },
    {
        nb: 7,
        color: "purple",
        rotation:[
            [
                [7,7,7],
                [0,7,0],
                [0,0,0]
            ],
            [
                [0,7,0],
                [7,7,0],
                [0,7,0]
            ],
            [
                [0,7,0],
                [7,7,7],
                [0,0,0]
            ],
            [
                [0,7,0],
                [0,7,7],
                [0,7,0]
            ],
        ]
    }
]

const random = (nb: number) => { 
    return Math.floor(Math.random() * nb)
};

interface iRotate {
    Rlength: number;
    current: number;
}

interface iPos {
    x: number;
    y: number;
}

export class Piece {
    rotate: iRotate;
    shape: Array<Array<number>>;
    color: string;
    width: number;
    height: number;
    nb: number;
    pos: iPos;
    
    constructor(i = 0, rot = 0, pos = {x: 4, y: 0}) {
        this.nb =  i === 0 ? random(7) : i;
        this.rotate = {
            Rlength: pieces[this.nb].rotation.length - 1,
            current: rot
        }
        this.shape = pieces[this.nb].rotation[this.rotate.current];
        this.color = pieces[this.nb].color;
        this.width = this.shape[0].length;
        this.height = this.shape.length;
        this.pos = pos;
    }

    public currentPieceRotation() {
        if (this.rotate.current < this.rotate.Rlength) {
            this.rotate.current++
        } else if (this.rotate.current === this.rotate.Rlength) {
            this.rotate.current = 0
        }
        this.shape = pieces[this.nb].rotation[this.rotate.current];
    }

  }

//   export default Piece