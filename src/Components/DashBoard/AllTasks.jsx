import { useContext } from "react";
import { GiRunningNinja } from "react-icons/gi";
import { IoMdCloudDone } from "react-icons/io";
import { TiEdit } from "react-icons/ti";
import { AuthContext } from "../Provider/AuthProvider";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { MdPendingActions } from "react-icons/md";
import CountDown from "../CountDown/CountDown";
import { Link } from "react-router-dom";


const AllTasks = () => {

    const today = new Date().getTime();
     console.log("today", today);

    const { refetch, data: taskData = [] } = useQuery({
        queryKey: ["addTask"],
        queryFn: async () => {
            const res = await axios.get("https://task-management-server-mocha.vercel.app/addTask");
            return res.data;
        },
    });
    // update 
    const handleOngoingUpdate = (id, status) => {

        const updateValue = { status: status }
        console.log(updateValue);
        axios.put(`https://task-management-server-mocha.vercel.app/addTask/${id}`, updateValue)
            .then(res => {
                if (res.data.modifiedCount > 0)
                    Swal.fire(
                        'success',
                        'Successfully Updated your assignment',
                        'success'
                    )
                refetch();
            });
    }
    const handleCompleteUpdate = (id, status) => {

        const updateComplete = { status: status }
        console.log(updateComplete);

        axios.put(`https://task-management-server-mocha.vercel.app/addTask/${id}`, updateComplete)
            .then(res => {
                if (res.data.modifiedCount > 0)
                    Swal.fire(
                        'success',
                        'Successfully Updated your assignment',
                        'success'
                    )
                refetch();
            });
    }

    // delete 
    const handleRemoveTask = (id) => {
        console.log(id);
        Swal.fire({
            title: "Are you sure?",
            text: "This context will be remove the from the database",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Remove this context!",
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`https://task-management-server-mocha.vercel.app/addTask/${id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        Swal.fire({
                            title: "Deleted!",
                            text: "This context has been removed successfully.",
                            icon: "success",
                        });
                    }
                    refetch();
                });
            }
        });
    };

    const { user } = useContext(AuthContext);

    console.log(user.email);

    // const taskData = useLoaderData();
    // console.log(taskData);

    const filter = taskData.filter(data => data.email === user?.email)





    return (
        <div className="bg-[#2a2c39]">


            <div className=" overflow-hidden">
                <h1 className="my-5 text-2xl md:text-4xl font-bold text-center text-white">
                    Task Management
                </h1>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-screen overflow-y-auto p-2">
                    <div className="border rounded-[5px]">
                        <div className="flex justify-center gap-[5px]">
                            <h1 className="text-center font-bold text-xl text-white">Todo</h1>
                            <MdPendingActions className="text-white text-center text-[30px]"></MdPendingActions>
                        </div>
                        <div className="divider divider-secondary"></div>

                        {
                            filter.map(item => item?.status === 'todo' && <div className="text-white border p-[8px] m-2 rounded-xl" key={item._id}>

                                <p className="mt-[5px]"><span className="font-bold">Task Title</span> : {item.TaskTitle}</p>
                                <p className="mt-[5px]"><span className="font-bold">Description: </span> {item.description}</p>
                                <p className="mt-[5px]"><span className="font-bold">DeadLine: </span> {item.deadLine}</p>
                                <p className="mt-[5px]"><span className="font-bold">Priority: </span> {item.Priority}</p>
                                <div className="w-full bg-gray-700 rounded-full my-2">
                                    <CountDown
                                        deadLine={item.deadLine}
                                    ></CountDown>
                                </div>
                                <div className="flex items-center">
                                    <FaTrash onClick={() => handleRemoveTask(item._id)} className="text-white text-[28px] mx-auto"></FaTrash>

                                    {new Date(
                                        item.deadLine
                                    ).getTime() < today ? <button disabled onClick={() => handleOngoingUpdate(item._id, item.status)}>
                                        <GiRunningNinja className="text-white text-center text-[30px]"></GiRunningNinja>
                                    </button> : <button onClick={() => handleOngoingUpdate(item._id, item.status)}>
                                        <GiRunningNinja className="text-white text-center text-[30px]"></GiRunningNinja>
                                    </button>}
                                    <button className="text-white text-[28px] mx-auto">
                                    <Link to = {`/dashboard/edit/${item._id}`}>
                                    <TiEdit  ></TiEdit></Link>
                                    </button>
                                </div>

                            </div>)
                        }

                    </div>
                    <div className="border rounded-[5px]">
                        <div className="flex justify-center gap-[5px]">
                            <h1 className="text-center font-bold text-xl text-white">Ongoing</h1>
                            <GiRunningNinja className="text-white text-center text-[30px]"></GiRunningNinja>
                        </div>
                        <div className="divider divider-accent"></div>
                        {
                            filter.map(item => item?.status === 'ongoing' && <div className="text-white border p-[8px]  m-2 rounded-xl" key={item._id}>

                                <p className="mt-[5px]"><span className="font-bold">Task Title</span> : {item.TaskTitle}</p>
                                <p className="mt-[5px]"><span className="font-bold">Description: </span> {item.description}</p>
                                <p className="mt-[5px]"><span className="font-bold">DeadLine: </span> {item.deadLine}</p>
                                <p className="mt-[5px]"><span className="font-bold">Priority: </span> {item.Priority}</p>
                                <div className="w-full bg-gray-700 rounded-full my-2">
                                    <CountDown
                                        deadLine={item.deadLine}
                                    ></CountDown>
                                </div>
                                <div className="flex items-center">
                                    <FaTrash onClick={() => handleRemoveTask(item._id)} className="text-white text-[28px] mx-auto"></FaTrash>
                                    {new Date(
                                        item.deadLine
                                    ).getTime() < today  ? <button className="" disabled onClick={() => handleCompleteUpdate(item._id, item.status)}>
                                    <IoMdCloudDone className="text-white text-center text-[30px]"></IoMdCloudDone>
                                    </button> : <button onClick={() => handleCompleteUpdate(item._id, item.status)}>
                                    <IoMdCloudDone className="text-white text-center text-[30px]"></IoMdCloudDone>
                                    </button>}
                                    <button className="text-white text-[28px] mx-auto">
                                    <Link to = {`/dashboard/edit/${item._id}`}>
                                    <TiEdit ></TiEdit></Link>
                                    </button>
                                </div>
                            </div>
                            )
                        }

                    </div>
                    <div className="border rounded-[5px]">
                        <div className="flex justify-center gap-[5px]">
                            <h1 className="text-center font-bold text-xl text-white">Completed</h1>
                            <IoMdCloudDone className="text-white text-center text-[30px]"></IoMdCloudDone>
                        </div>
                        <div className="divider divider-warning"></div>
                        {
                            filter.map(item => item?.status === 'completed' && <div className="text-white border p-[8px]  m-2 rounded-xl" key={item._id}>

                                <p className="mt-[5px]"><span className="font-bold">Task Title</span> : {item.TaskTitle}</p>
                                <p className="mt-[5px]"><span className="font-bold">Description: </span> {item.description}</p>
                                <p className="mt-[5px]"><span className="font-bold">DeadLine: </span> {item.deadLine}</p>
                                <p className="mt-[5px]"><span className="font-bold">Priority: </span> {item.Priority}</p>
                                <div className="w-full bg-gray-700 rounded-full my-2">
                                    <CountDown
                                        deadLine={item.deadLine}
                                    ></CountDown>
                                </div>
                               
                                <div className="flex gap-[40px] justify-center">
                                <div>
                                <button onClick={() => handleRemoveTask(item._id)} className="text-white text-[28px] mx-auto ">
                                <FaTrash></FaTrash>
                                </button>
                                </div>

                                <div>
                                <button className="text-white text-[28px] mx-auto">
                                    <Link to = {`/dashboard/edit/${item._id}`}>
                                    <TiEdit></TiEdit></Link>
                                    </button>
                                </div>
                                </div>
                                
                            </div>)
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTasks;