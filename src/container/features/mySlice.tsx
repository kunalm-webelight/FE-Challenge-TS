import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

export const mySlice = createSlice({
    name:'myslice',
    initialState:{
        value:0,
    },
    reducers:{
        increment : (state)=>{
            state.value+=1;
        },
        decrement : (state)=>{
            state.value-=1;
        },
    },
})

export const {increment,decrement}=mySlice.actions
export default mySlice.reducer