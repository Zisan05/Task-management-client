import { NavLink,Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useContext,useState,useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const Navbar = () => {

  const {LogoutUser,user} = useContext(AuthContext);

  const [annData,setannData] = useState([]);

  useEffect( () => {
      fetch('https://final-effort-server-puce.vercel.app/announces')
      .then(res => res.json())
      .then(data => setannData(data))
  } ,[])
  
  console.log(annData.length);


  const handleLogout = () =>{
    LogoutUser()
    .then(result => {
      console.log(result)
      Swal.fire(
           'success',
           'Successfully logout from your account',
           'success'
         )

  })
  .catch(error => {
    console.log(error)
  })
  
  }

    const navItem = <ul className="lg:flex gap-[10px]">
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/register">Register</NavLink></li>
      <li><NavLink to="/login">Login</NavLink></li>
    </ul>
  
    return (
        <div>
            <div className="navbar bg-orange-300 w-full">
  <div className="navbar-start">
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          {navItem}
      </ul>
    </div>
    <Link to = {"/"}><img className="w-[70px] h-[70px] rounded-[50%]" src="https://i.ibb.co/ggZhycG/task-management-process.png" alt="" /></Link>
    <Link to = {"/"}><a className="btn btn-ghost text-xl text-cyan-400 text-[25px] md:text-[30px] lg:text-[30px]">Job Task</a></Link>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
            {navItem}
    </ul>
  </div>
  
  <div className="navbar-end">
    
    <div>
    
        {
          user ? <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className=" w-20 rounded-full">
              <img src={user.photoURL} />
            </div>
          </label>
          <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 bg-purple-300">
            
              <p className="justify-between font-bold ml-[13px]">
              {user.displayName}
               
              </p>
            
            <Link to = {`/dashboard/userprofile`}><li><a className="font-bold">DashBoard</a></li></Link>
            <li><a onClick={handleLogout} className="font-bold">Logout</a></li>
          </ul>
        </div> :
          <button className="btn bg-purple-400"><Link to ={'/login'}>Log in </Link></button>
        }
      
    </div>
  </div>
</div>
        </div>
    );
};

export default Navbar;

