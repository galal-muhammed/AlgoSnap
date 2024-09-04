interface PathNodeType {
    row: number,
    col: number,
    isVisted:boolean,
    isStart:boolean,
    isEnd:boolean,
    isPath:boolean,
    isWall:boolean,
    prevNode:null|PathNodeType,
    distance:number
};

export default PathNodeType