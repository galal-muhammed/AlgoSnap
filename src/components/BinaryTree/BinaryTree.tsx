import { Box } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { Children, useEffect, useState } from 'react'
import * as Yup from "yup";
import BinaryTreeType from '../../types/BinaryTreeType';
import TNodeType from '../../types/TNodetype';
import TNode, { dataType } from './BinaryTreeMain';
import NumberBox from '../../Items/NumberBox/NumberBox';
import Tree, { RawNodeDatum } from 'react-d3-tree';



const BinaryTree = () => {
    const [tree, setTree] = useState<RawNodeDatum | RawNodeDatum[]>({
        name: 'Enter Number to start your tree',
        children: [
        ]
    })
    const [data, setData] = useState<TNode | null>(null);
    const [order, setOrder] = useState<number[] | null>([])
    const [isOrder, setIsOrder] = useState(false)
    const [isRoot, setIsRoot] = useState(true)
    const [isRemove, setIsRemove] = useState(true)
    const [remove, setRemove] = useState(false)
    useEffect(() => {
        formatData(data)
    }, [data]);

    const validationSchema = Yup.object({
        function: Yup.string(),
        num: Yup.number().required("Please Enter number").typeError('A number is required')
    });
    function traverse(obj: TNode | null): any[] | undefined | RawNodeDatum {
        if (obj == undefined) return [];

        if (obj.left) {
            traverse(obj.left);
        }

        if (obj.value) {
            let children: any[] = [];

            if (obj.left) {
                children = [...children, traverse(obj.left)];
            }

            if (obj.right) {
                children = [...children, traverse(obj.right)];
            }

            return {
                name: String(obj.value),
                children: children.length && [traverse(obj.left)].length ? children : undefined
            }

        }
        if (obj.right) {
            traverse(obj.right);
        }
    }
    const formatData = (data: TNode | null) => {
        const res: RawNodeDatum | any = data ? traverse(data) : tree
        console.log(data);
        setTree(res);

        console.log(tree);

    }


    let formik = useFormik({
        initialValues: {
            function: "add",
            num: 0
        },
        validationSchema,
        onSubmit: pathing,
    });

    function pathing(values: BinaryTreeType) {
        setIsOrder(false)
        setRemove(false)
        if (values.function == "add") {
            insert(values.num)
        }
        else if (values.function == "rm") {
            setRemove(true)
            removeNode(data, values.num)
        }
        else if (values.function == "In-O") {
            setIsOrder(true)
            inOrderTraversal(data)
        }
        else if (values.function == "Pre-O") {
            setIsOrder(true)
            preOrderTraversal(data)
        }
        else if (values.function == "Post-O") {
            setIsOrder(true)
            PostOrderTraversal(data)
        }
    }

    function removeNode(root: TNode | null, value: number | null): TNode | null {
        if (root == null || root.value == null || value == null) {
            setIsRemove(false)
            return null;
        }
        if (value < root.value) {
            root.left = removeNode(root.left, value);
        }
        else if (value > root.value) {
            root.right = removeNode(root.right, value);
        }
        else {
            if (!root.left && !root.right) {
                if (root.value == data?.value) {
                    setTree({
                        name: 'Enter Number to start your tree',
                        children: [
                        ]
                    })
                    setData(null)
                    setIsRoot(true)
                    return null;
                }
                formatData(data)
                return null;
            }
            if (!root.left) {
                formatData(data)
                return root.right;
            } 
            else if (!root.right) {
                formatData(data)
                return root.left;
            }
            const inorderSuccessor = findMin(root.right);
            root.value = inorderSuccessor.value;
            root.right = removeNode(root.right, inorderSuccessor.value);
        }
        setData(root)
        console.log("works", data);
        setIsRemove(true)
        formatData(data)
        return root;
    }

    function findMin(node: TNode): TNode {
        while (node.left) {
            node = node.left;
        }
        return node;
    }

    async function insert(value: number) {
        let node: TNode = new TNode(value);

        if (data == null) {
            console.log(data);
            setData(node)
            setIsRoot(true)
            formatData(node)
        }
        else {
            let current: TNode = data;
            while (current != null) {
                if (node.value == null || current.value == null) {
                    break;
                }
                if (node.value < current.value) {
                    if (!current.left) {
                        current.left = node;
                        break;
                    }
                    current = current.left;
                } else if (node.value > current.value) {
                    if (!current.right) {
                        current.right = node;
                        break;
                    }
                    current = current.right;
                } else {
                    break;
                }
            }
        }
        formatData(data)
    };

    function preOrderTraversal(root: TNode | null): number[] | [] {
        if (!root) {
            setIsRoot(false)
            return [];
        }
        const result: number[] = [];
        if (root.value != null) {
            result.push(root.value);
        }
        result.push(...preOrderTraversal(root.left));
        result.push(...preOrderTraversal(root.right));
        setOrder(result)
        setIsRoot(true)
        return result;
    }
    function inOrderTraversal(root: TNode | null): number[] | [] {
        if (!root) {
            setIsRoot(false)
            return [];
        }
        const result: number[] = [];
        result.push(...inOrderTraversal(root.left));
        if (root.value != null) {
            result.push(root.value);
        }
        result.push(...inOrderTraversal(root.right));
        setOrder(result)
        setIsRoot(true)
        return result;
    }
    function PostOrderTraversal(root: TNode | null): number[] | [] {
        if (!root) {
            setIsRoot(false)
            return [];
        }
        const result: number[] = [];
        result.push(...PostOrderTraversal(root.left));
        result.push(...PostOrderTraversal(root.right));
        if (root.value != null) {
            result.push(root.value);
        }

        setOrder(result)
        setIsRoot(true)
        return result;
    }
    return (
        <div className='h-screen py-10 text-black md:flex '>
            <div className='flex flex-col md:h-full w-full md:w-fit gap-8 justify-center md:items-start items-center  '>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-5'>
                        <label htmlFor="num" className="block mb-2 text-sm font-medium text-white">Enter number</label>
                        <input type="number" id="num" onChange={formik.handleChange} onBlur={formik.handleBlur} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200-500 focus:border-blue-500 block w-64 p-2.5 outline-none`} defaultValue={0} required />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="function" className="block mb-2 text-sm font-medium  text-white">Choose Searching Algorithm</label>
                        <select id="function" onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5  ">
                            <option value="add">Insert</option>
                            <option value="Pre-O">Pre-order Traversal</option>
                            <option value="In-O">In-order Traversal</option>
                            <option value="Post-O">Post-order Traversal</option>
                            <option value="rm">Remove Node</option>
                        </select>
                    </div>

                    <div className=''>
                        <button type='submit' className={` bg-blue-500 hover:bg-blue-700 text-white w- font-bold w-64  py-2 px-4 rounded-full`}>
                            Start
                        </button>
                    </div>
                </form>
                <div className='h-full max-w-64 block '>
                    {remove ?
                        (
                            !isRemove ?
                                <div className="text-red-600">the Node was not found</div>
                                :
                                <div className="text-green-600">the Node has been removed</div>
                        )
                        :
                        ""
                    }
                    {!isRoot ?
                        <div className="text-red-600">please Insert the root node first</div>
                        :
                        (isOrder ?
                            <div className='h-fit flex flex-row flex-wrap '>
                                {
                                    order?.map((numb) => {
                                        return <> <NumberBox
                                            num={numb}
                                            key={numb}
                                        />
                                        </>
                                    })
                                }

                            </div>
                            : "")

                    }
                </div >
            </div>
            <div className='h-full w-full md:px-20 md:flex md:justify-center md:items-center '>
                <div className='h-full w-full  md:mt-0 mt-2 bg-white' id='treeWrapper'>
                    <Tree data={tree}
                        translate={
                            {
                                x: 400,
                                y: 100
                            }}
                        orientation='vertical'
                        rootNodeClassName="node__root"
                        branchNodeClassName="node__branch"
                        leafNodeClassName="node__leaf" />
                </div>
            </div>
        </div >

    )
}

export default BinaryTree
