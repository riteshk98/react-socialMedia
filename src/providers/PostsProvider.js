import { createContext } from "react";
import {useProvidePost} from "../hooks";

const initialState=  {
    user: [],
    loading:true,
    addPostsToState:()=>{},
    addComment:()=>{},
    addLike:()=>{}
    
};


export const PostContext = createContext(initialState);

export const PostProvider=({children})=>{
    const post = useProvidePost();

    return <PostContext.Provider value={post}>
        {children}
        </PostContext.Provider>
}