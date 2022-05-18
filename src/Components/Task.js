import { TrashIcon } from '@heroicons/react/outline';
import { CheckIcon } from '@heroicons/react/solid';
import React from 'react';
import { toast } from 'react-toastify';

const Task = ({ task }) => {

    const { _id, title, description, completed } = task;

    const handleCompleted = id => {
        console.log(id);
        fetch(`http://localhost:5000/todos/${id}`,{
        method: 'PUT'
    })
    .then(res => res.json())
    .then(data => {
        toast.info('Task Completed',{
            autoClose: 2000,
          })
        console.log(data)
    })
    }

    const handleDelete = id => {
        console.log(id);
        fetch(`http://localhost:5000/todos/${id}`,{
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        toast.error('Task Deleted',{
            autoClose: 2000
          })
        console.log(data)
    })
    }

    return (
        <div className='border-2 w-full max-w-md mx-auto p-4 flex justify-between items-center'>
           <div>
           <h3 className={`text-lg font-medium ${completed ? 'line-through text-gray-300': ''}`}>{title}</h3>
            <p className={`text-sm  ${completed ? 'line-through text-gray-300': 'text-gray-500'}`}>{description}</p>
           </div>

            <div className='flex items-center space-x-2'>
                { !completed ?  <button
                onClick={() => handleCompleted(_id)}
                 className='bg-green-500 text-base-100 font-medium px-2 py-2 rounded' ><CheckIcon className='w-5'/></button>  : <></>}
                
                <button onClick={() => handleDelete(_id)} className='bg-red-500 text-base-100 font-medium px-2 py-2 rounded' ><TrashIcon className='w-5'/></button>
            </div>
        </div>
    );
};

export default Task;