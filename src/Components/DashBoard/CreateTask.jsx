import { useContext } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";


const CreateTask = () => {

    const { user } = useContext(AuthContext);
         const { register, handleSubmit, reset } = useForm();
        
         const onSubmit = async (data) => {
              console.log(data);
              
              const createATask = {
                   TaskTitle: data.name,
                   Priority: data.tag,
                   email: user?.email,
                   deadLine: data.date,
                   description: data.description,
                   status: "todo",
              };
              console.log(createATask);
              const contextRes = await axios.post(
                   "http://localhost:5000/addTask",
                   createATask
              );
              console.log(contextRes.data);
              console.log("object");
              if (contextRes.data.insertedId) {
                   Swal.fire({
                        title: "Good job!",
                        text:`${data.name} Task added Successfully`,
                        icon: "success",
                   });
              }
              reset();
            }
    return (
        <div className="bg-[#2a2c39]">
            <h1 className="text-[35px] text-white text-center font-bold underline">Create A Task</h1>
            <div className="p-2 h-[510px] md:h-[400px] lg:h-[400px]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-3 font-medium">
                        <div className="grid md:grid-cols-2 md:gap-5">
                            {/* Task name */}
                            <div className="form-control w-full ">
                                <label className="label">
                                    <span className="label-text text-white">
                                        Task Title*
                                    </span>
                                </label>
                                <input
                                    {...register("name", {
                                        required: true,
                                    })}
                                    type="text"
                                    placeholder="Context Name"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/*Priority tags */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">
                                        Priority Type/Tags*
                                    </span>
                                </label>

                                <select
                                    {...register("tag", {
                                        required: true,
                                    })}
                                    className="select select-bordered w-full"
                                >
                                    <option value="low">
                                        Low
                                    </option>
                                    <option value="medium">
                                        Medium
                                    </option>
                                    <option value="high">
                                        High
                                    </option>
                                </select>
                            </div>
                            {/* Task deadLine */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">
                                        Task deadLine*
                                    </span>
                                </label>
                                <input
                                    {...register("date", {
                                        required: true,
                                    })}
                                    type="date"
                                    placeholder="Price Money"
                                    className="input input-bordered w-full"
                                />
                            </div>
                            {/* Task Description*/}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text text-white">
                                        Task Description*
                                    </span>
                                </label>
                                <textarea
                                    {...register("description", {
                                        required: true,
                                    })}
                                    className="textarea textarea-bordered"
                                    placeholder="Description"
                                ></textarea>
                            </div>
                        </div>
                    </div>


                    {/* +++++++++++ */}
                    <div className="text-center">
                        <button className="btn mt-2 w-full text-center red">
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTask;