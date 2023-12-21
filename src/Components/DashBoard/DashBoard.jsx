import { Link, NavLink, Outlet} from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { BiTask } from "react-icons/bi";



const DashBoard = () => {
    return (
        <div>
            <div className=" md:flex lg:w-[70%] mx-auto mt-[100px]">
            <div className="md:w-[256px] lg:w-[256px] min-h-full bg-orange-400 ">
                <Link to = {"/"}><h1 className="text-[30px] text-center font-bold text-blue-200">Jod Task</h1></Link>
                <ul className="menu">
                    {/* dashboard list */}

                    <li className="py-[15px]">
                    
                    <NavLink className=" py-[15px]" to ={"/dashboard/userprofile"}><ImProfile></ImProfile>user Profile</NavLink></li> 

                 <li className="py-[15px]">
                    
                    <NavLink className=" py-[15px]" to ={"/dashboard/addTask"}> <MdOutlinePostAdd></MdOutlinePostAdd>Create Task</NavLink></li>   
                 <li className="py-[15px]">
                    
                    <NavLink className=" py-[15px]" to ={"/dashboard/alltask"}> <BiTask></BiTask>My Task</NavLink></li>   
                 <li className="py-[15px]">
                    
                    <NavLink className=" py-[15px]" to ={"/"}><FaHome></FaHome> Home page</NavLink></li>
                        
                </ul>
            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
        </div>
    );
};

export default DashBoard;