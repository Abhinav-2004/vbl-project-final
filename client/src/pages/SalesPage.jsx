import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
export default function SalesPage(){
    const [employeeID,setEmployeeID]=useState('');
    const [redirect, setRedirect] = useState(false);
    async function handleSalesSubmit(ev){
        ev.preventDefault();
        try{
        await axios.post('/sales',{
            employeeID
        });
        alert('Verification Successfull');
        setRedirect(true)
        }
        catch(e){
          alert('Attempt Failed. Please Try Again Later');
        }
      }
    if(redirect){
        return window.location.replace('https://varunbeverages.com/our-products/');
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
          <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Confirm EmployeeID</h1>
            <form className="max-w-md mx-auto" onSubmit={handleSalesSubmit}>
              <input type="text"
                     placeholder="Employee Identification Number"
                     value={employeeID}
                     onChange={ev => setEmployeeID(ev.target.value)} />
              <button className="primary">Verify</button>
            </form>
          </div>
        </div>
      );
    }