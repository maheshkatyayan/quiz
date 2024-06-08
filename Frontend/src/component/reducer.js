const reducer=(state,action)=>{
    switch(action.type){
      case "GET_Question":
        return {
          ...state,
          question:action.payload.question,
        }
        default:
          return state
    }
  }
  export default reducer