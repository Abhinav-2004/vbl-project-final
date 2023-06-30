import { Link } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [employeeID, setEmployeeID] = useState("");
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  async function registerUser(ev){
    ev.preventDefault();
    try{
    await axios.post('/register',{
        name,
        email,
        password,
        employeeID,
        department,
        designation
    });
    alert('Registration Successful. Now you can Log in');
    }
    catch(e){
      alert('Registration Failed. Please Try Again Later');
    }
    }
  
  return (
    <div className="mt-4 grow flex items-center justify-around">
      <div className="mb-32">
        <h1 className="text-4xl text-center mb-4">Register</h1>
        <form className="max-w-md mx-auto" onSubmit ={registerUser}>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(ev) => setName(ev.target.value)}
          />
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(ev) => setEmail(ev.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(ev) => setDesignation(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Employee ID"
            value={employeeID}
            onChange={(ev) => setEmployeeID(ev.target.value)}
          />
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(ev) => setDepartment(ev.target.value)}
          />
          <button className="primary">Register Now</button>
          <div className="text-center py-2 text-gray-500">
            Already have an Account ?{" "}
            <Link className="underline text-black" to={"/login"}>
              Login Now
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
