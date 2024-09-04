import React from 'react'
import style from './NumberBox.module.css'
import NumberboxType from '../../types/NumberboxType'
const NumberBox: React.FC<NumberboxType> = ({ num }) => {
    return (
        <div className="relative">
            <div className={`box  px-2 pb-0 m-1 `}>
                <p className='p-0 m-0'>{num}</p>
            </div>
        </div>
    )
}

export default NumberBox