export interface iPieces {
    name: string;
    value: number;
    color: string;
    shape: number[][]
}


export const pieces: iPieces[] = [
    {
        name: "I",
        value: 1,
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
        value: 2,
        color: "blue",
        shape:[
                [0,2,0],
                [0,2,0],
                [2,2,0]
            ]
    },
    {
        name: "L",
        value: 3,
        color: "orange",
        shape:[
                [0,3,0],
                [0,3,0],
                [0,3,3]
            ]
    },
    {    
        name: "O",
        value: 4,
        color: "yellow",
        shape:[
                [4,4],
                [4,4]
            ]
    },
    {
        name: "S",
        value: 5,
        color: "green",
        shape:[
                [0,5,5],
                [5,5,0],
                [0,0,0]
        ]
    },
    {

        name: "Z",
        value: 6,
        color: "red",
        shape:[
                [6,6,0],
                [0,6,6],
                [0,0,0]
            ]
    },
    {
        name: "T",
        value: 7,
        color: "purple",
        shape:[
                [7,7,7],
                [0,7,0],
                [0,0,0]
            ]
    }
]

