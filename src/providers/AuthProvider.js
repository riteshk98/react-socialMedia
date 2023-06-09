import { createContext } from "react";
import {useProvideAuth} from "../hooks";

const initialState=  {
    user: null,
    login:()=>{},
    register:()=>{},
    logout:()=>{},
    updateUser:()=>{},
    loading:true,
    updateUserFriends:()=>{}
    
};


export const AuthContext = createContext(initialState);

export const AuthProvider=({children})=>{
    const auth = useProvideAuth();

    return <AuthContext.Provider value={auth}>
        {children}
        </AuthContext.Provider>
}