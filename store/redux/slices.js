import { createSlice } from "@reduxjs/toolkit";
const slice=createSlice({
     name:'slice',
     initialState:{
          tasks:[],
          isAuth:false,
          token:null,
          email:null,

     },
     reducers:{
          addTask:(state,action)=>{
               state.tasks.push(action.payload);
          },
          deleteTask:(state,action)=>{
               state.tasks=state.tasks.filter((task)=>task.id!==action.payload);
          },
          editTask:(state,action)=>{
               state.tasks=state.tasks.map((task)=>task.id===action.payload.id?action.payload:task);
          },
          // login:(state,action)=>{
          //      state.token=action.payload.token;
          // },
          logout:(state,action)=>{
               state.token=null;
               state.email=null;
          },
          authenticate:(state,action)=>{
               state.isAuth=true;
               state.token=action.payload.token;
               state.email=action.payload.email;
               // console.log("Slice.js: authenticate: ", state.email, "state.isAuth",state.token)
               // console.log("Slice.js: set arguements: ", action.payload.email, "state.isAuth", action.payload.token)
          },
          unauthenticate:(state,action)=>{
               state.isAuth=false;
               state.token=null;
          },
          setTasksList:(state,action)=>{
               state.tasks=action.payload;
          },

     }
});
export default slice.reducer;
export const {addTask,deleteTask,editTask,logout,authenticate,unauthenticate,setTasksList}=slice.actions;

