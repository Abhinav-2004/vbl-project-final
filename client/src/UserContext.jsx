import axios from "axios";
import { createContext, useEffect } from "react";
import { useState } from "react";
export const UserContext = createContext({});

export function UserContextProvider({children}){
    useEffect(()=>{
        if(!user){
            const {data} = axios.get('/profile').then(({data})=>{
                setUser(data);
                setReady(true);
            });
        }
    }, []);
    const [user,setUser] = useState(null);
    const [ready,setReady]= useState(false);
    return(
        <UserContext.Provider value = {{user, setUser,ready}}>
            {children}
        </UserContext.Provider>
    );
}
