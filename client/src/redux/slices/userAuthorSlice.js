//create redux slice
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

//make http req using redux thunk middleware
export const userAuthorLoginThunk=createAsyncThunk('user-author-login',async(userCredObj,thunkApi)=>{
    try{
        console.log(userCredObj)
    if(userCredObj.userType==='user'){
        
        const res=await axios.post('http://localhost:4000/user-api/login',userCredObj)
        if(res.data.message=='login success'){
                //store token in local/session storage
                localStorage.setItem('token',res.data.token)
                
                //return data

        }else{
            return thunkApi.rejectWithValue(res.data.message)
        }
        return res.data
    }
    if(userCredObj.userType==='author'){
        const res=await axios.post('http://localhost:4000/author-api/login',userCredObj)
        if(res.data.message==='login success'){
            //store token in local/session storage
            localStorage.setItem('token',res.data.token)
                
            //return data
        }else{
            return thunkApi.rejectWithValue(res.data.message)
        }
        return res.data
    }}catch(err){
        return thunkApi.rejectWithValue(err.res.data.message)
                }
            
})



export const userAuthorSlice=createSlice({
    name:"user-author-login",
    initialState:{
        isPending:false,
        loginUserStatus:false,
        currentUser:{},
        errOccurred:false,
        errMsg:''
    },
    //reducers deal with local state
    reducers:{
        resetState:(state,action)=>{
            state.isPending=false;
            state.currentUser={};
            state.loginUserStatus=false;
            state.errOccurred=false;
            state.errMsg='';

        }
    },
    //extra reducers deal with external state
    extraReducers:(builder)=>builder
    .addCase(userAuthorLoginThunk.pending,(state,action)=>{ 
            state.isPending=true;
    })
    .addCase(userAuthorLoginThunk.fulfilled,(state,action)=>{
            state.isPending=false;
            if(action.payload.user)
                {
                    state.currentUser=action.payload.user;
                }else{
                state.currentUser=action.payload.author;
                }
            
            state.loginUserStatus=true;
            state.errMsg='';
            state.errOccurred=false;
    })
    .addCase(userAuthorLoginThunk.rejected,(state,action)=>{
        state.isPending=false;
            state.currentUser={};
            state.loginUserStatus=false;
            state.errMsg=action.payload;
            state.errOccurred=true;

    }),
})

//export action creater functions
export const {resetState}=userAuthorSlice.actions;
//export root reducer of this slice
export default userAuthorSlice.reducer;