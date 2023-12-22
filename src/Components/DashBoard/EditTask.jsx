import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";


const EditTask = () => {
    
    const editData = useLoaderData();

    console.log(editData);

    const {_id,TaskTitle,description,deadLine,Priority} = editData;

    const handleEdit = (e) => {
        
        e.preventDefault();
        const form = e.target;
        const TaskTitle = form.TaskTitle.value;
        const description =form.description.value;
        const deadLine = form.deadLine.value;
        const Priority =form.Priority.value;
       
        const editData = {TaskTitle,description,deadLine,Priority}

        console.log(editData);

        fetch(`https://task-management-server-mocha.vercel.app/addTask/${_id}`,{
            method: 'PATCH',
            headers: {
                "content-type":"application/json"
            },
            body: JSON.stringify(editData) 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount){
                Swal.fire(
                    'success',
                    'Successfully Updated your assignment',
                    'success'
                  )
            } 
           
        })

    }

    return (
        <div className="hero min-h-screen bg-slate-500">
        <div className="hero-content flex-col ">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold text-amber-900 mb-[30px]">Edit Your Task</h1>
          </div>
          <div className="card flex-shrink-0 w-[280px] md:w-[500px] lg:w-[500px]  shadow-2xl  bg-amber-900">
            <form onSubmit={handleEdit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Task Title</span>
                </label>
                <input type="text" name="TaskTitle" defaultValue={TaskTitle} className="input input-bordered"/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <input type="text" name="description" defaultValue={description} className="input input-bordered"/>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">DeadLine</span>
                </label>
                <input type="date" name="deadLine" defaultValue={deadLine} className="input input-bordered"  />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Priority</span>
                </label>
                <input type="text" name="Priority" defaultValue={Priority} className="input input-bordered" />
              </div>     
              <div className="form-control mt-6">
                <button className="btn bg-amber-800 text-white font-bold">Save</button>
              
              </div>
            </form>
          </div>
        </div>
      </div>
    );
};

export default EditTask;