import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import auth from "../firebase.init";

const AddTask = () => {
  const [user] = useAuthState(auth);

  const { register,formState: { errors }, handleSubmit } = useForm();
  const onSubmit = (data, e) => {
    console.log(data);
    const todo = {
      title: data.title,
      description: data.description,
      completed: false,
      email: user.email,
    };

    fetch(`http://localhost:5000/todos`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(todo),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Task Added",{
          autoClose: 2000
        });
        console.log(data);
        e.target.reset();
      });
  };

  return (
    <div>
      <input type="checkbox" id="add-task-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box text-center">
          <h3 className="font-bold text-lg">Add Task</h3>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center mt-6"
            >
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-medium">Title</span>
                </label>
                <input
                  type="text"
                  {...register("title",{ required: true})}
                  placeholder="Title"
                  className="border-2 rounded-lg border-primary p-2 w-full max-w-xs focus:outline-primary"
                />
                {errors?.title?.type === 'required' && <p className="text-red-500 text-left"><small>You Must Add A Title</small></p>}
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text font-medium">Description</span>
                </label>
                <div className="relative h-20">
                <textarea
                  type="text"
                  {...register("description")}
                  placeholder="Description"
                  className="border-2 rounded-lg border-primary p-2 w-full max-w-xs focus:outline-primary h-20"
                ></textarea>
                </div>
              </div>
              <div className="mt-4 flex space-x-2">
                <input
                  className="btn bg-primary text-base-100"
                  type="submit"
                  value="Add"
                />
                <label htmlFor="add-task-modal" className="btn text-base-100">
                  Cancel
                </label>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
