import { PencilAltIcon } from '@heroicons/react/outline';
import React, { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import AddTask from './AddTask';
import Task from "./Task";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [user] = useAuthState(auth)

  useEffect(() => {
    fetch(`https://shielded-cove-74968.herokuapp.com/todos?email=${user?.email}`,{
        method: 'GET',
        headers: {
            'authorization': `bearer ${localStorage.getItem('accessToken')}`
        }
    })
      .then((res) => res.json())
      .then((data) => setTasks(data));
  }, [tasks]);

  return (
    <section>
     <h1 className="text-center text-2xl my-6">My Tasks</h1>
      <div className="max-w-5xl mx-auto">
      {tasks.length > 0 ? 
      <>
      <label htmlFor='add-task-modal' className="btn modal-button bg-primary  text-base-100 font-medium rounded flex items-center w-fit mx-auto md:mr-0 md:ml-6 mb-4 mt-8">Add Task <PencilAltIcon className="w-5 ml-2"/></label>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"> {tasks?.map((task) => (
          <Task key={task._id} task={task}></Task>
        ))}
      </div>
      </>
      :
      <div className='h-60 flex flex-col items-center justify-center'>
          <p>No Task Added</p>
          <label htmlFor='add-task-modal' className="btn modal-button bg-primary  text-base-100 font-medium rounded flex items-center w-fit mx-auto my-4">Add Task <PencilAltIcon className="w-5 ml-2"/></label>
      </div>
}
      </div>
      <AddTask></AddTask>
    </section>
  );
};

export default MyTask;
