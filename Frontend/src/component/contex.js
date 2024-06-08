import React,{useContext,useReducer,useEffect} from "react";
import reducer from "./reducer.js";
const initialstate={
  question:[]
}

const AppContext=React.createContext();
const AppProvider=({children})=>{
const [state,dispatch]=useReducer(reducer,initialstate)
let Api1="http://localhost:5000/getquestion"
//console.log(state)
const fetchApidata=async (url)=>{
  try{
const response1=await fetch(url);
const data1=await response1.json();
//console.log(data1)

dispatch({
  type:"GET_Question",
  payload:{
    question:data1, 
    // nbpages:data.nbpages
  }
})

  } catch(e){
    console.log(e)
  }
}

useEffect(()=>{
fetchApidata(`${Api1}`)
},[])

console.log(state)
return <AppContext.Provider value={{...state}}>{children}</AppContext.Provider>
}

const useGlobalcontext=()=>{
       return useContext(AppContext);
   }
export {AppContext,AppProvider,useGlobalcontext}
