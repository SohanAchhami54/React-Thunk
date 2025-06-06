// import {createStore} from "redux";

// const ADD_TASK="task/add";
// const DELETE_TASK="task/delete";

// const initialValue={
//   task:[],
// }

// const TaskReducer=(state=initialValue,action)=>{
//   switch(action.type){
//     case ADD_TASK:
//       return{
//         ...state,
//         task:[...state.task,action.payload],
//       }
//       case DELETE_TASK:
//         const updatedTask=state.task.filter((curTask,index)=>{
//          return curTask.id!==action.payload;
//         });
//         return{
//           ...state,  
//           task:[updatedTask],
//         }
//         default:
//           return state;
//   }
// }
// //Creates the central store (i.e., the global state container).
// //Holds the state of your entire application. 
// //hamro app ko data lai store garney kam garxa rw update garxa Taskreducer k help ley.
// //ani taskreducer ley chai value lai update garney kam garxa. redux ley vanxa yo line lai
//   const store=createStore(TaskReducer);
// console.log(store);
// //yesley chai initial state lai diney kam garxa.
// console.log(store.getState());
// const finalValue=store.dispatch({type:"ADD_TASK",payload:"React-Redux"});
// console.log(finalValue);

// export default TaskReducer;
import {createStore,applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
export const ADD_TASK="task/add";
 export const DELETE_TASK="task/delete";
 export const EDIT_TASK="task/edit";
 export const FETCH_TASK="task/fetch";
const initialState={
    big:[],//just for learning purpose.
    task:[],
}
 const TaskReducer=(state=initialState,action)=>{
    switch(action.type){
        case ADD_TASK:
            return {
                ...state,
                task:[...state.task,action.payload],
            };
            case DELETE_TASK:
                const filterTask=state.task.filter((curElem,index)=>{
                    return  index!==action.payload;
                });
                return{
                    ...state,
                    task:filterTask,
                }
                case EDIT_TASK:
                    const editTask=state.task.map((curElem,index)=>{
                        return index===action.payload.index?action.payload.newTask:curElem;
                    });
                    return{
                        ...state,
                        task:editTask,
                    };
                    
                    case FETCH_TASK:
                        return{
                            ...state,
                            task:[...state.task,...action.payload],
                        }
                   
                default:
                    return state;
                    
    }
 };

export const store=createStore(TaskReducer,
composeWithDevTools(applyMiddleware(thunk)));
console.log(store);
console.log(store.getState());
//this is the action function that creates the action objects.
 export const addTask=(data)=>{
    return {type:ADD_TASK,payload:data};
}

 export const deleteTask=(id)=>{
    return {type:DELETE_TASK, payload:id};
}
store.dispatch(addTask("React-Redux-Second-Part"));
// console.log("updated state",store.getState());
store.dispatch(addTask("React-Redux1"));

// console.log("updated State",store.getState());


store.dispatch(deleteTask(0));
console.log("deleted value",store.getState());

export const editTask=(task,editIndex)=>{
      return  ({type:EDIT_TASK,payload:{newTask:task,index:editIndex}});
}

// console.log(store.dispatch({type:ADD_TASK, payload:"React-redux"}));
// console.log(store.dispatch({type:ADD_TASK, payload:"Buy mango"}))
// console.log(store.dispatch({type:DELETE_TASK, payload:1}))
// console.log(store.getState());
export const fetchValue=()=>{
   return async (dispatch)=>{
        try{
            const res= await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
            const task=await res.json();
            dispatch({type:FETCH_TASK,payload:task.map(curElem=>curElem.title)});
        }catch(error){
            console.log(error);
        }
   }
}
 export default TaskReducer;
 
 
 