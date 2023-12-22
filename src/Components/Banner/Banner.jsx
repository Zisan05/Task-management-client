import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";


const Banner = () => {

  const {user} = useContext(AuthContext);


    return (
        <div>
            <div>
                {/* <h1>You give your task to and we will solve it for you.It is our duty to solve you all tasks.</h1>
                <p></p> */}
                <div className="hero h-[600px]" style={{backgroundImage: 'url(https://i.ibb.co/ZT3pkKL/business-planning-task-management-concept-260nw-1987578881.webp)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-md">
      <h1 className="mb-5 text-5xl font-bold text-purple-400">You give your task to and we will solve it for you.It is our duty to solve you all tasks.</h1>
      <p className="mb-5 text-blue-400">Task management is the process of managing a task through its lifecycle. It involves planning, testing, tracking, and reporting. Task management can help either individual achieve goals, or groups of individuals collaborate and share knowledge for the accomplishment of collective goals.</p>
      { user ? <Link to ={'/dashboard/alltask'}>
      <button className="btn bg-lime-400 font-bold">Let’s Explore</button></Link> : <Link to ={'/login'}>
      <button className="btn bg-lime-400 font-bold">Let’s Explore</button></Link>}
    </div>
  </div>
</div>
            </div>
        </div>
    );
};

export default Banner;