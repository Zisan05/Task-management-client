import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import  { createContext, useEffect, useState } from 'react';
import auth from '../../Firebase.config';


export const AuthContext = createContext(null)

const provider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {

    const [user,setUser] = useState({})
    const [Loading,setLoading] = useState(true)

    // register
    const CreateUser = (email,password) =>{

      setLoading(true);
    
      return createUserWithEmailAndPassword(auth,email,password);
}

    // login

    const loginUser = (email,password) => {
      setLoading(true);
         return signInWithEmailAndPassword(auth,email,password);
         
    }

    // Google user
    const GoogleUser = (value) => {
        return signInWithPopup(auth, provider)
         
       }

       const LogoutUser = () => {
        setLoading(true);
      return signOut(auth);
    }

       const UpdateProfile = (name,photo) =>{
        return updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
        })
    
    
      }



       useEffect( () => {
        const unsubscribe =  onAuthStateChanged(auth , currentUser => {

          setUser(currentUser);
          
             
             setLoading(false);
             console.log(currentUser)
             

         })
    return () => {
     unsubscribe();
    }
    
     },[])

    const authInfo = {user,CreateUser,loginUser,GoogleUser,UpdateProfile,LogoutUser,Loading}
    
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};


export default AuthProvider;