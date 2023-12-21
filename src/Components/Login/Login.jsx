import { useContext, useState } from "react";
import {Link} from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
    const [ErrorMsg , setErrorMsg] = useState('')

    const location = useLocation();
     const navigate = useNavigate();

    const {loginUser,GoogleUser} = useContext(AuthContext);

    const handleGoogle = () =>{

        GoogleUser()
        .then(result => {
          navigate(location?.state ? location.state : "/");
             console.log(result.user)
             Swal.fire(
                  'success',
                  'Successfully added your account',
                  'success'
                )
             })
                .catch(error => {
                    console.log(error.message)
                    
               })
            }

    const handleLogin = e =>{

         

        e.preventDefault()


   const email = e.target.email.value;
   const password = e.target.password.value;

   loginUser(email,password)
       .then(result => {
          navigate(location?.state ? location.state : "/");
        console.log(result.user)
        Swal.fire(
             'success',
             'Successfully added your account',
             'success'
           )
        })
        .catch(error => {
             console.log(error.message)
             setErrorMsg("Your Email or Password is invalid please check your Email or Password")
        })
    };
    return (
        <div>
            <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-yellow-300 mb-[30px]">Login now!</h1>
          </div>
          <div className="card flex-shrink-0 w-[280px] md:w-[500px] lg:w-[500px] shadow-2xl bg-base-100 bg-yellow-300">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="email" name="email" placeholder="email" className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
              </div>
              {
                                   ErrorMsg && <p className=" text-red-600">
                                        {ErrorMsg}
                                   </p>
                              }
      
              <p className="mt-[10px]">First time in this website please<Link className="text-blue-500" to = {'/register'}> Register</Link></p>
              <div className="form-control mt-6">
                <button className="btn bg-purple-400">Login</button>
                <button onClick={handleGoogle} className="btn bg-blue-400">Google</button>
              </div>
            </form>
          </div>
        </div>
      </div>
        </div>
    );
};

export default Login;