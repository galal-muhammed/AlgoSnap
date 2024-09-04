import React, { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react'
import './pathfinder.css'
import PathNode from './PathNode';
import Coordinates from '../../types/coordinates';
import toast, { Toaster } from 'react-hot-toast';
import PathNodeType from '../../types/PathNodeType';

const Path = () => {

    const area = { x: 10, y: Math.floor((window.innerWidth - 128) / 40) };
    const [toggle, setToggle] = useState('s')
    const [funcction, setfuncction] = useState('BFS')
    const [Update, setIsUpdate] = useState<boolean>(false)
    const [start, setStart] = useState<Coordinates>({
        col: null,
        row: null,
    })
    const [end, setEnd] = useState<Coordinates>({
        row: null,
        col: null
    })
    const [nodes, setNodes] = useState<PathNodeType[][]>(((): PathNodeType[][] => {
        let demoNodes: PathNodeType[][] = [];
        for (let i = 0; i < area.x; i++) {
            let currentRow: PathNodeType[] = []
            for (let j = 0; j < area.y; j++) {
                currentRow.push({
                    row: i,
                    col: j,
                    isWall: false,
                    isPath: false,
                    isStart: i == start.row && j == start.col,
                    isEnd: i == end.row && j == end.col,
                    isVisted: false,
                    prevNode: null,
                    distance: 0
                })
            }
            demoNodes.push(currentRow)
        }

        return demoNodes
    }))
    useEffect(() => {
    }, [nodes, Update]);
    function updateNodes() {
        let demoNodes: PathNodeType[][] = [];
        for (let i = 0; i < area.x; i++) {
            let currentRow: PathNodeType[] = []
            for (let j = 0; j < area.y; j++) {
                currentRow.push({
                    row: nodes[i][j].row,
                    col: nodes[i][j].col,
                    isWall: nodes[i][j].isWall,
                    isPath: nodes[i][j].isPath,
                    isStart: nodes[i][j].isStart,
                    isEnd: nodes[i][j].isEnd,
                    isVisted: nodes[i][j].isVisted,
                    prevNode: nodes[i][j].prevNode,
                    distance: nodes[i][j].distance
                })
            }
            demoNodes.push(currentRow)
        }
        setNodes(demoNodes)
    }
    const changeToogleNode = (e: ChangeEvent<HTMLInputElement> | any) => {
        setToggle(e.target.value);
    }
    const changeSearchType = (e: ChangeEvent<HTMLInputElement> | any) => {
        setfuncction(e.target.value)

    }


    function clearNodes() {
        setStart({ row: null, col: null })
        setEnd({ row: null, col: null })
        let demoNodes: PathNodeType[][] = [];
        for (let i = 0; i < area.x; i++) {
            let currentRow: PathNodeType[] = []
            for (let j = 0; j < area.y; j++) {
                currentRow.push({
                    row: i,
                    col: j,
                    isWall: false,
                    isPath: false,
                    isStart: false,
                    isEnd: false,
                    isVisted: false,
                    prevNode: null,
                    distance: 0
                })
            }
            demoNodes.push(currentRow)
        }
        setNodes(demoNodes)
    }
    const toggleNode = (row: number, col: number) => {
        if (toggle == "w") {
            if ((row == start.row && col == start.col) || (row == end.row && col == end.col)) return toast.error("Couldn't wall the Node");
            setNodes(prevGrid => {
                const newGrid = [...prevGrid];
                const newRow = [...newGrid[row]];
                newRow[col] = { ...newRow[col], isWall: !newRow[col].isWall }
                newGrid[row] = newRow;
                return newGrid;
            })
        }
        else if (toggle == 's') {
            let gridCopy: PathNodeType[][] = nodes
            if (gridCopy[row][col].isWall == true || gridCopy[row][col].isEnd == true) return toast.error("Couldn't start on this Node");
            if (start.row != null && start.col != null) {
                gridCopy[start.row][start.col].isStart = false
                updateNodes()
            }
            setStart({ row, col })
            gridCopy[row][col].isStart = true
            setNodes(gridCopy)
            updateNodes()

        }
        else if (toggle == 'e') {
            let gridCopy: PathNodeType[][] = nodes
            if (gridCopy[row][col].isWall == true || gridCopy[row][col].isStart == true) return toast.error("Couldn't start on this Node");
            if (end.row != null && end.col != null) {
                gridCopy[end.row][end.col].isEnd = false
                setEnd({ row, col })
                gridCopy[row][col].isEnd = true
                setNodes(gridCopy)
                updateNodes()
            }
            else {
                setEnd({ row, col })
                gridCopy[row][col].isEnd = true
                setNodes(gridCopy)
                updateNodes()
            }
        }
    }


    const visualizeBFS = async () => {
        const gridCopy: PathNodeType[][] = nodes;
        const queue: PathNodeType[] = [];
        // console.log("found", start.row, start.col, end.row, end.col);

        if (start.row != null && start.col != null && end.row != null && end.col != null) {
            queue.push(gridCopy[start.row][start.col]);
            gridCopy[start.row][start.col].isVisted = true;
            let destinationReached = false;
            // console.log("found");

            while (queue.length > 0 && !destinationReached) {
                const currentNode: PathNodeType | undefined = queue.shift();

                const directions = [
                    [1, 0],
                    [-1, 0],
                    [0, 1],
                    [0, -1],
                ];
                await new Promise<void>((resolve) =>
                    setTimeout(() => {
                        resolve();

                    }, 100))
                console.log("update", Update);
                updateNodes()


                for (const dir of directions) {
                    if (currentNode == undefined) {
                        break
                    }
                    let newRow = currentNode.row + dir[0];
                    let newCol = currentNode.col + dir[1];

                    // console.log(currentNode.col);

                    if (
                        (newRow >= 0) &&
                        (newRow < area.x) &&
                        (newCol >= 0) &&
                        (newCol < area.y)
                    ) {
                        // console.log(newRow, newCol, area.y, area.x);

                        if (gridCopy[newRow][newCol].isVisted == false && gridCopy[newRow][newCol].isWall == false) {
                            queue.push(gridCopy[newRow][newCol]);
                            gridCopy[newRow][newCol].isVisted = true;
                            gridCopy[newRow][newCol].prevNode = currentNode;
                            // console.log(newRow, newCol);

                            // Check if the destination is reached
                            if (newRow == end.row && newCol == end.col) {
                                console.log("found", currentNode);
                                destinationReached = true;
                                break;
                            }
                        }
                    }
                    setIsUpdate(!Update)

                }
            }
            if (destinationReached) {
                let current = gridCopy[end.row][end.col];
                while (current !== null) {
                    console.log("working");

                    const row = current.row;
                    const col = current.col;
                    gridCopy[row][col].isPath = true;
                    if (!current.prevNode) break;
                    current = current.prevNode;
                }
                gridCopy[start.row][start.col].isPath = true
            } else {
                toast.error('Destination is unreachable!');
            }
            console.log("done");

            setNodes(gridCopy);
            updateNodes()
            setIsUpdate(!Update)
        }
        else {
            return toast.error("please select start point and end point")
        }
    };
    const visualizeDFS = async () => {
        const gridCopy: PathNodeType[][] = nodes;
        const stack: PathNodeType[] = [];

        if (start.row != null && start.col != null && end.row != null && end.col != null) {
            stack.push(gridCopy[start.row][start.col]);
            gridCopy[start.row][start.col].isVisted = true;
            let destinationReached = false;

            while (stack.length > 0 && !destinationReached) {
                const currentNode: PathNodeType | undefined = stack.pop();

                const directions = [
                    [1, 0],
                    [-1, 0],
                    [0, 1],
                    [0, -1],
                ];

                await new Promise<void>((resolve) => {
                    setTimeout(() => {
                        resolve();
                    }, 100);
                });

                updateNodes();

                for (const dir of directions) {
                    if (currentNode == undefined) {
                        break;
                    }

                    let newRow = currentNode.row + dir[0];
                    let newCol = currentNode.col + dir[1];

                    if (
                        (newRow >= 0) &&
                        (newRow < area.x) &&
                        (newCol >= 0) &&
                        (newCol < area.y)
                    ) {
                        if (
                            gridCopy[newRow][newCol].isVisted === false &&
                            gridCopy[newRow][newCol].isWall === false
                        ) {
                            stack.push(gridCopy[newRow][newCol]);
                            gridCopy[newRow][newCol].isVisted = true;
                            gridCopy[newRow][newCol].prevNode = currentNode;

                            // Check if the destination is reached
                            if (newRow === end.row && newCol === end.col) {
                                destinationReached = true;
                                break;
                            }
                        }
                    }
                }

                setIsUpdate(!Update);
            }

            if (destinationReached) {
                let current = gridCopy[end.row][end.col];
                while (current !== null) {
                    const row = current.row;
                    const col = current.col;
                    gridCopy[row][col].isPath = true;
                    if (!current.prevNode) break;
                    current = current.prevNode;
                }
                gridCopy[start.row][start.col].isPath = true;
            } else {
                toast.error('Destination is unreachable!');
            }

            setNodes(gridCopy);
            updateNodes();
            setIsUpdate(!Update);
        }
        else {
            return toast.error("please select start point and end point")
        }
    };
    return (
        <div className='min-h-screen flex-col text-white flex md:flex-col py-5 justify-center'>
            <Toaster />
            <div className='flex flex-row '>
                <div className='mx-5'>
                    <label htmlFor="toggleType" className="block mb-2 text-sm font-medium  text-white">What do you want to select?</label>
                    <select id="toggleType" onChange={(event) => { changeToogleNode(event) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5  ">
                        <option value="s">Start Point</option>
                        <option value="e">End point</option>
                        <option value="w">wall</option>
                    </select>
                </div>
                <div className='mx-5'>
                    <label htmlFor="toggleType" className="block mb-2 text-sm font-medium  text-white">What do you want to select?</label>
                    <select id="toggleType" onChange={(event) => { changeSearchType(event) }} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5  ">
                        <option value="BFS">BFS</option>
                        <option value="DFS">DFS</option>
                    </select>
                </div>
                <div className='mt-6'>
                    <button onClick={() => {
                        if (funcction == "BFS") visualizeBFS()
                        else if (funcction == "DFS") visualizeDFS()
                    }} type='submit' className={` bg-blue-500 hover:bg-blue-700 text-white w- font-bold w-64  py-2 px-4 rounded-full`}>
                        Start Searching
                    </button>
                </div>
                <div className='mt-6 mx-5'>
                    <button onClick={() => { clearNodes() }} type='submit' className={` bg-red-600 hover:bg-red-600 text-white w- font-bold w-64  py-2 px-4 rounded-full`}>
                        clearNodes
                    </button>
                </div>
            </div>
            <div className="nodeswrapper customwidth">
                {
                    nodes.map((rows) => {
                        return <> {rows.map(obj => {
                            return <div className='cursor-pointer' onClick={() => { toggleNode(obj.row, obj.col) }}>
                                <PathNode row={obj.row} col={obj.col} isEnd={obj.isEnd} isStart={obj.isStart} isVisted={obj.isVisted} isWall={obj.isWall} prevNode={obj.prevNode} distance={obj.distance} isPath={obj.isPath} />
                            </div>
                        })}
                        </>
                    })
                }
            </div>
        </div >
    )
}

export default Path