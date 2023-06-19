import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement,increment } from './mySlice'

interface mytypes {
    my:{
        value : number,
    }
}

export default function Counter(){
    const count = useSelector((state:mytypes)=>state.my.value);
    const dispatch = useDispatch();

    return(
        <div>
            <div>
                <button onClick={()=>dispatch(increment())}>increment</button>
                <span>{count}</span>
                <button onClick={()=>dispatch(decrement())}>decrement</button>
            </div>
        </div>
    );
}
