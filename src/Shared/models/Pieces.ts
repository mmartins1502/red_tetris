export interface iPieces {
    name: string;
    color: string;
    shape: number[][]
}


export const pieces = [
    {
        name: "I",
        color: "cyan",
        shape:[
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0],
                [0,0,1,0]
            ]
    },
    {
        name: "J",
        color: "blue",
        shape:[
                [0,2,0],
                [0,2,0],
                [2,2,0]
            ]
    },
    {
        name: "L",
        color: "orange",
        shape:[
                [0,3,0],
                [0,3,0],
                [0,3,3]
            ]
    },
    {    
        name: "O",
        color: "yellow",
        shape:[
                [4,4],
                [4,4]
            ]
    },
    {
        name: "S",
        color: "green",
        shape:[
                [0,5,5],
                [5,5,0],
                [0,0,0]
        ]
    },
    {

        name: "Z",
        color: "red",
        shape:[
                [6,6,0],
                [0,6,6],
                [0,0,0]
            ]
    },
    {
        name: "T",
        color: "purple",
        shape:[
                [7,7,7],
                [0,7,0],
                [0,0,0]
            ]
    }
]

