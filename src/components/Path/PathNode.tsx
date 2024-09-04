import React from 'react'
import PathNodeType from '../../types/PathNodeType'

const PathNode: React.FC<PathNodeType> = ({ col, row, isVisted, isEnd, isStart, isWall, isPath, distance, prevNode }) => {
    // const tart=isStart
    // const finish=isEnd
    const extraClass =
        isVisted
            ? 'visted'
            : isWall
                ? 'wall' :
                '';
    return (
        < div className={`gridbox ${extraClass} ${isPath ? 'path' : isEnd ? 'end' : ""}  ${isPath ? 'path' : isStart ? 'start' : ""} `} > ({row}, {col})</ div>

    )
}

export default PathNode