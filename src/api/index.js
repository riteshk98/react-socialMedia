import { API_URLS ,LOCALSTORAGE_TOKEN_KEY, getFormBody } from "../utils";

const headers ={
    'content-type':'application/x-www-form-urlencoded',
}

const customFetch =async (url,{body, ...customconfig}) =>{
    const token =window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
    if(token){
        headers.Authorization=`Bearer ${token}`;

    }

    const config = {
        ...customconfig,
        headers:{
            ...headers,
            ...customconfig.headers,
        },
    }

    if(body){
        config.body = getFormBody(body);
    }
    try {
        const response =await fetch(url,config);
        const data   = await response.json();
        if(data.success){
            return {
                data:data.data,
                success:true
            };
        }
        throw new Error(data.message);
    } catch (error) {
        return {
            message:error.message,
            success:false
        };
    }
};

export const getPosts = (page=1, limit=5) =>{
    return customFetch(API_URLS.posts(page,limit),{
        method:'GET',
    }); 
};

export const login = (email, password)=>{
    return customFetch(API_URLS.login(), {
        method:'POST',
        body:{email,password}
    })
};

export const register = (name, email, password, confirmPassword)=>{
    return customFetch(API_URLS.signup(), {
        method:'POST',
        body:{name,email,password,confirm_password:confirmPassword}
    })
}

export const editProfile = (userId, name, password, confirmPassword)=>{
    return customFetch(API_URLS.editUser(), {
        method:'POST',
        body:{id: userId,name,password,confirm_password:confirmPassword}
    })
};

export const fetchUserProfile = (userId)=>{
    return customFetch(API_URLS.userInfo(userId), {
        method:'GET',
    })
};

export const fetchFriends = ()=>{
    return customFetch(API_URLS.friends(), {
        method:'GET',
    })
};

export const addFriend = (userId)=>{
    return customFetch(API_URLS.createFriendship(userId), {
        method:'POST',
    })
};

export const removeFriend = (userId)=>{
    return customFetch(API_URLS.removeFriend(userId), {
        method:'POST',
    })
};

export const addPost = (post)=>{
    return customFetch(API_URLS.createPost(), {
        method:'POST',
        body:{
            content: post
        }
    })
};

export const createComment = async(comment, postId)=>{
    return customFetch(API_URLS.comment(), {
        method:'POST',
        body:{
            post_id:postId,
            content:comment
        }
    })

};

export const toggleLike = async(itemId)=>{
    return customFetch(API_URLS.toggleLike(itemId, 'Post'), {
        method:'POST',
    })

};

export const searchUsers = (searchText)=>{
    return customFetch(API_URLS.searchUsers(searchText), {
        method:'GET',
    })

};