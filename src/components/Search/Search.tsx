import React, { useEffect, useState } from 'react'
import NumberBox from '../../Items/NumberBox/NumberBox'
import * as Yup from "yup";
import { Field, useFormik } from 'formik';
import SearchValuesTypes from '../../types/SearchValuesTYpes';

const Search = () => {
    // !states
    const [nums, setNums] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);
    const [found, setFound] = useState(false);
    const [done, setDone] = useState(false)
    const [isRunning, setIsRunning] = useState(false);


    // ?inPUTS VALIDATION
    const validationSchema = Yup.object({
        SearchAlgo: Yup.string(),
        size: Yup.number().min(1, 'Please enter number bettween 1 and 101').max(101, "Please enter number bettween 1 and 101").required("Please Enter Size").typeError('A number is required'),
        searchN: Yup.number().required("Please Enter the number you want to serch for").typeError('A number is required'),

    });
    let formik = useFormik({
        initialValues: {
            SearchAlgo: "Linear",
            size: 15,
            searchN: 7,
        },
        validationSchema,
        onSubmit: startSearching,
    });


    useEffect(() => {
        let boxes = document.querySelectorAll(".box");
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].classList.remove("active", "found", "ptr", "disabled");
        }
        if (formik.values.size > 0 && formik.values.size <= 101) {
            let temp = []
            for (let i = 1; i <= formik.values.size; i++) {
                temp.push(i)
            }
            // console.log(temp);

            setNums(temp)
        }
        clearBoxes()
    }, [formik.values.SearchAlgo, formik.values.size]);

    // *functions
    const clearBoxes = () => {
        let boxes = document.querySelectorAll(".box");
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].classList.remove("active", "found", "ptr", "da");
        }
    }
    //----------------------------------------------------------------------------------------//
    async function linearSearch(target: number) {
        setFound(false);
        setDone(false);
        let boxes = document.querySelectorAll(".box");
        clearBoxes();
        // console.log(boxes);
        for (let i = 0; i < nums.length; i++) {
            let num: number = Number(boxes[i].textContent);
            // console.log(boxes[i].textContent);

            boxes[i].classList.add("active", "ptr");

            if (num === target) {
                boxes[i].classList.add("found");
                setFound(true);
                setDone(true);
                setIsRunning(false)
                return;
            }

            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 500))

            boxes[i].classList.remove("active", "ptr");
            boxes[i].classList.add("da")
        }
        setDone(true)
        setIsRunning(false)
    }
    //----------------------------------------------------------------------------------------//
    async function binarySearch(target: number) {
        setFound(false);
        setDone(false);
        let boxes = document.querySelectorAll(".box");
        clearBoxes();

        let low = 0;
        let high = nums.length - 1;

        while (low <= high) {
            let mid = Math.floor((low + high) / 2);
            boxes[mid].classList.add("active", "ptr");
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 800))
            if (Number(boxes[mid].textContent) === target) {
                boxes[mid].classList.add("found", "ptr");
                setFound(true)
                setDone(true)
                setIsRunning(false)
                return;
            }
            else if (Number(boxes[mid].textContent) < target) {
                // boxes[mid].classList.add("active", "ptr");
                for (let i = 0; i <= mid; i++) {
                    boxes[i].classList.remove("active", "ptr");
                    boxes[i].classList.add("da")
                }
                low = mid + 1;
                // boxes[mid].classList.add("active", "ptr");
            }
            else {
                for (let i = mid; i <= nums.length - 1; i++) {
                    boxes[i].classList.remove("active", "ptr");
                    boxes[i].classList.add("da")
                }
                high = mid - 1;
                // boxes[mid].classList.add("active", "ptr");
            }
        }
        setDone(true)
        setIsRunning(false)
    }
    //----------------------------------------------------------------------------------------//
    async function jumpSearch(target: number) {
        setFound(false);
        setDone(false);
        let boxes = document.querySelectorAll(".box");
        clearBoxes();

        let jump = Math.floor(Math.sqrt(nums.length)) - 1
        let prev = 0;

        boxes[jump].classList.add("active", "ptr");
        await new Promise<void>((resolve) =>
            setTimeout(() => {
                resolve();
            }, 800))

        while (prev < nums.length && Number(boxes[Math.min(jump, nums.length - 1) - 1].textContent) < target) {
            // console.log(prev);
            prev = jump;
            for (let i = 0; i < Math.min(prev, nums.length); i++) {
                boxes[i].classList.remove("active", "ptr");
                boxes[i].classList.add("da")
            }
            boxes[Math.min(prev, nums.length - 1)].classList.remove("active", "ptr");
            jump += Math.floor(Math.sqrt(nums.length));
            if (jump < nums.length) {
                boxes[jump].classList.add("active", "ptr");
            }
            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 800))
        }

        if (jump < nums.length) {
            boxes[jump].classList.remove("active", "ptr");
        }


        while (prev < nums.length && Number(boxes[Math.min(prev, nums.length - 1)].textContent) < target) {
            console.log("prev", prev);
            boxes[prev].classList.add("active", "ptr");
            boxes[prev - 1].classList.add("da");

            await new Promise<void>((resolve) =>
                setTimeout(() => {
                    resolve();
                }, 800))
            boxes[prev].classList.remove("active", "ptr");
            prev++;

        }

        if (prev < nums.length && Number(boxes[Math.min(prev, nums.length - 1)].textContent) <= target) {

            boxes[prev - 1].classList.add("da");
            boxes[prev].classList.add("found", "ptr");
            setFound(true);
            setDone(true);
            setIsRunning(false)
            return;
        }
        setDone(true)
        setIsRunning(false)
        setFound(false)
    }
    //----------------------------------------------------------------------------------------//
    function startSearching(values: SearchValuesTypes) {
        let temp = []
        for (let i = 1; i <= values.size; i++) {
            temp.push(i);
        }
        setNums(temp)
        setIsRunning(true)

        if (values.SearchAlgo == "Linear") {
            linearSearch(values.searchN)
        }
        else if (values.SearchAlgo == "BS") {
            binarySearch(values.searchN)
        }
        else if (values.SearchAlgo == "JumpS") {
            jumpSearch(values.searchN)
        }
    }

    return (
        <div className='min-h-screen md:h-screen py-10 text-black md:flex  '>
            <div className='flex flex-col h-fit md:h-full w-full md:w-fit gap-8 justify-center md:items-start items-center'>
                <form onSubmit={formik.handleSubmit}>
                    <div className='mb-5'>
                        <label htmlFor="SearchAlgo" className="block mb-2 text-sm font-medium  text-white">Choose Searching Algorithm</label>
                        <select disabled={isRunning} id="SearchAlgo" onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-64 p-2.5  ">
                            <option value="Linear">Linear Search</option>
                            <option value="BS">Binary Search</option>
                            <option value="JumpS">Jump Search</option>
                        </select>
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="size" className="block mb-2 text-sm font-medium text-white">Enter size</label>
                        <input type="number" disabled={isRunning} id="size" onChange={formik.handleChange} onBlur={formik.handleBlur} className={`${isRunning ? `bg-gray-400` : ""}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200-500 focus:border-blue-500 block w-64 p-2.5 outline-none`} defaultValue={15} required />
                        {formik.errors.size && formik.touched.size ? (
                            <div className="text-red-600 p-5">{formik.errors.size}</div>
                        ) : (
                            ""
                        )}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="searchN" className="block mb-2 text-sm font-medium text-white">Enter number to search</label>
                        <input type="number" id="searchN" disabled={isRunning} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`${isRunning ? `bg-gray-400` : ""}bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-200-500 focus:border-blue-500 block w-64 p-2.5 outline-none`} defaultValue={7} required />
                    </div>
                    <div className=''>
                        <button type='submit' disabled={isRunning} className={`${isRunning ? `bg-gray-400 hover:bg-gray-400` : ""} bg-blue-500 hover:bg-blue-700 text-white w- font-bold w-64  py-2 px-4 rounded-full`}>
                            Start Searching
                        </button>
                    </div>
                </form>
                <p className='block min-h-7'>
                    {
                        done ? (found ? <p className='text-green-600 font-bold '>Your number has been found</p> : <p className='text-gray-400 text-xl font-bold '>Your number was not found</p>) : ""
                    }
                </p>
            </div>
            <div className='h-full flex justify-center items-center md:mx-20'>
                <div className='flex flex-row md:justify-start justify-center flex-wrap gap-2'>
                    {
                        nums.map((numb) => {
                            return <> <NumberBox
                                num={numb}
                                key={numb}
                            />
                                <br />
                            </>
                        })
                    }
                </div>
            </div>
        </div >
    )
}

export default Search