import { useDispatch, useSelector } from "react-redux";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import {  addTask, deleteTask,  editTask,  fetchValue } from "../Redux/Store";
export const Todo=()=>{
  //it is used to get the data from the react-store that is in the state variable in the store.jsx
  //basically it return the whole react-store.
  const [task,setTask]=useState("");
  const [editIndex,setEditIndex]=useState(null);
  const state=useSelector((state) =>state.task);
  const dispatch=useDispatch();
  console.log( "react-state:", state);
 const handleClick=()=>{
      // if(task.trim()!==""){
      //     dispatch({type:ADD_TASK,payload: task});
      // setTask("");
      // }
      if(task.trim()==="") return;
      if(editIndex!==null){
        // dispatch({type:EDIT_TASK, payload:{newTask:task, index:editIndex}});
        dispatch(editTask(task,editIndex));
        setEditIndex(null);
      }else{
        // dispatch({type:ADD_TASK, payload:task});
        dispatch(addTask(task));
      }
      setTask("");
 };

 const handleDelete=(index)=>{
    //  dispatch({type:DELETE_TASK,payload:index});
    dispatch(deleteTask(index));
 };
 
 const handleEdit=(curElem,index)=>{
        setTask(curElem);
        setEditIndex(index);
 }
 //this function handle the thunk that helps to fetch the value in the redux.
 const handleFetch=()=>{
    dispatch(fetchValue());
      //this is same as:
      // const action=fetch();
      // action(dispatch);
 }
  return (
  
  <div className="min-h-screen bg-gray-900 flex justify-center items-center text-white px-4">
  <section className="bg-gray-800 p-10 rounded-2xl w-full max-w-2xl shadow-xl">
    <h1 className="text-4xl font-bold text-center mb-6">To-Do List</h1>

    <section className="flex gap-4">
      <input 
        type="text"
        placeholder="Add new task..."
        onChange={(e)=>setTask(e.target.value)}
        value={task}
        className="flex-1 px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition duration-200" onClick={handleClick} >
        {editIndex !== null ? "Update Task" : "Add Task"}
      </button>
    </section>
         <button className="bg-blue-600 hover:bg-blue-700 mt-2 rounded px-4 py-1" 
         onClick={handleFetch}>Fetch</button>
    <ul className="mt-6 space-y-3">
      {/* Example list items */}
      {/* <li className="bg-gray-700 p-3 rounded-md">Learn React</li>
      <li className="bg-gray-700 p-3 rounded-md">Finish Redux Task</li> */}
      {
        state.map((curElem,index)=>{
          return(
               <li key={index} className="text-xl flex justify-between " >
                <p> {index+1}: {curElem}</p> 
                <div className="flex gap-5">
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded"
                onClick={()=>handleEdit(curElem,index)}>Edit</button>
                 <button className="text-red-500" onClick={()=>handleDelete(index) } ><MdDeleteForever /></button>
                 </div>
            </li>
          );
          
        })
      }  
    </ul>
  </section>
</div>
  )
};