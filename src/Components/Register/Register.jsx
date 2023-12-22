import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";



const Register = () => {

    const {CreateUser,UpdateProfile,GoogleUser} = useContext(AuthContext);

const [ErrorMsg , setErrorMsg] = useState('') 

const navigate = useNavigate()

const handleGoogle = () =>{

    GoogleUser()
    .then(result => {
      navigate(location?.state ? location.state : "/");
         console.log(result.user)
         const name = result.user.displayName;
         const photo = result.user.photoURL;
         const email = result.user.email;
         const newUser = {email,photo,name,role : 'user'}
         console.log(newUser); 
         fetch('https://task-management-server-mocha.vercel.app/users',{
          method:"POST",
          headers: {
              "content-type":"application/json"
          },
          body: JSON.stringify(newUser)
      })
      .then(res => res.json())
      .then(data => {
          console.log(data)
          if(data.acknowledged)
          {
              Swal.fire(
                  'success',
                  'Successfully added your account',
                  'success'
                )
          }
      })
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

    const handleRegister = e => {


        e.preventDefault()
       const form = e.target;
       const name = form.name.value;
       const email = form.email.value;
       const photo = form.photo.value;
       const password = form.password.value;
       
    
       if (password.length < 6) {
        Swal.fire(
            'Error',
            'Please enter atleast 6 length password',
            'error'
            
          )
        return;
    }
      
         
       CreateUser(email,password)
       .then(result => {
        UpdateProfile(name,photo)
        .then(() => {
    
        })
        .catch(error => {
            console.log(error)
        })
        navigate(location?.state ? location.state : "/");
        console.log(result.user)
        Swal.fire(
            'success',
            'Successfully added your account',
            'success'
            
          )
    
       })
       .catch( error => {
        console.log(error.message)
        setErrorMsg(error.message)
       } )

       const newUser = {name,email,photo,role : 'user'};

       fetch('https://task-management-server-mocha.vercel.app/users',{
        method:"POST",
        headers: {
            "content-type":"application/json"
        },
        body: JSON.stringify(newUser)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        if(data.acknowledged)
        {
            Swal.fire(
                'success',
                'Successfully added your account',
                'success'
              )
        }
        form.reset();
    })
    
         
    }

    return (
        <div className="hero min-h-screen bg-blue-300">
  <div className="hero-content flex-col ">
    <div className="text-center lg:text-left">
      <h1 className="text-5xl font-bold text-green-300 mb-[30px]">Register now!</h1>
    </div>
    <div className="card flex-shrink-0 w-[280px] md:w-[500px] lg:w-[500px]  shadow-2xl bg-base-100 bg-green-300">
      <form onSubmit={handleRegister} className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Your Name</span>
          </label>
          <input type="text" name="name" placeholder="your name" className="input input-bordered"/>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Photo URL</span>
          </label>
          <input type="text" name="photo" placeholder="photo URL" className="input input-bordered" required />
        </div>
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

        <p className="mt-[10px]">Already Have an account please<Link className="text-blue-500" to = {'/login'}> Login</Link></p>
        <div className="form-control mt-6">
          <button className="btn bg-purple-400">Register</button>
          <button onClick={handleGoogle} className="btn bg-blue-400">Google</button>
        </div>
      </form>
    </div>
  </div>
</div>
    );
};

export default Register;