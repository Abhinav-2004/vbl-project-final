import { Navigate, useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function ProfileSetting() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState('');
  const[redirect,setRedirect] = useState(false);
  async function profileUpdater(ev){
    ev.preventDefault();
    try{
    await axios.post('/profileSetting',{
        name,
        department,
        designation
    });
    alert('Request made Successfully. Changes will be seen soon');
    setRedirect(true)
    }
    catch(e){
      alert('Attempt Failed. Please Try Again Later');
    }
  }
  if(redirect){
    return <Navigate to='/account/profile'/>;
  }
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Edit Profile</h1>
        <form className="max-w-md mx-auto" onSubmit ={profileUpdater}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(ev) => setDesignation(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(ev) => setDepartment(ev.target.value)}
          />
          <button className="primary">Save</button>
        </form>
      </div>
    </div>
  );
}
