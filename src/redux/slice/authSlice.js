import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:'auth',
    initialState:{user:null,token:null},
    reducers:{
        setCred: (state,action)=>{
            const {user,token} = action.payload;

            state.user=user;
            state.token=token;
        },

        logOut: (state,action)=>{
            state.user=null;
            state.token=null;
        },
    },
})

export const {setCred,logOut} = authSlice.actions;

export default authSlice.reducer;

export const selectUser = (state)=>state.auth.user;
export const selectToken = (state)=>state.auth.token;