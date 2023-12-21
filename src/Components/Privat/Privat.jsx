import { useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";


const Privet = ({children}) => {
    const {user , Loading} = useContext(AuthContext)
    const location = useLocation()


    if(Loading){
       return <span className="loading loading-spinner loading-lg"></span>
    }
  

   if(user){
       return children;
   }
   return (
       <Navigate state={location.pathname} to = {'/login'}></Navigate>
   );
};

export default Privet;