import { Link } from "react-router-dom";


const Errorpage = () => {
    return (
        <div>
            <h1 className="text-4xl text-center mt-[300px] text-red-600 font-bold ">404- It is A ERROR!!!</h1><br />
            <h1 className="text-4xl text-center text-red-600 font-bold">Please Click in go to home button</h1>
            <Link to = {'/'}><button className="btn ml-[100px] md:ml-[350px] lg:ml-[760px] mt-[50px] bg-red-600 hover:bg-green-500">Go To Home</button></Link>
        </div>
    );
};

export default Errorpage;