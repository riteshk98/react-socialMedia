import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import {
  editProfile,
  fetchFriends,
  getPosts,
  login as userLogin,
  register as userRegister,
} from '../api';
import {
  LOCALSTORAGE_TOKEN_KEY,
  getItemFromLocalStorage,
  removeItemFromLocalStorage,
  setIteminLocalStorage,
} from '../utils';
import jwt from 'jwt-decode';
import { PostContext } from '../providers/PostsProvider';

export const UseAuth = () => {
  return useContext(AuthContext);
};

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userToken = getItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    const getUser = async () => {
      if (userToken) {
        const user = jwt(userToken);
        const response = await fetchFriends();
        let friends = [];
        if (response.success) {
          friends = response.data.friends;
        }
        setUser({ ...user, friends });
      }
      setLoading(false);
    };
    getUser();
  }, []);

  const updateUser = async (userId, name, password) => {
    const response = await editProfile(userId, name, password, password);
    if (response.success) {
      setUser(response.data.user);
      setIteminLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const login = async (email, password) => {
    const response = await userLogin(email, password);
    if (response.success) {
      setUser(response.data.user);
      setIteminLocalStorage(
        LOCALSTORAGE_TOKEN_KEY,
        response.data.token ? response.data.token : null
      );
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };
  const register = async (name, email, password, confirmPassword) => {
    const response = await userRegister(name, email, password, confirmPassword);
    if (response.success) {
      return {
        success: true,
      };
    } else {
      return {
        success: false,
        message: response.message,
      };
    }
  };

  const logout = () => {
    removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    setUser(null);
  };

  const updateUserFriends = (addFriend, friend) => {
    if (addFriend) {
      setUser({ ...user, friends: [...user.friends, friend] });
    } else {
      const newFriends = user.friends.filter(
        (f) => f.to_user._id !== friend.to_user._id
      );
      setUser({ ...user, friends: newFriends });
    }
    return;
  };

  return {
    user,
    login,
    logout,
    register,
    updateUser,
    loading,
    updateUserFriends,
  };
};

export const usePosts = () => {
  return useContext(PostContext);
};

export const useProvidePost = () => {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getPosts();
      if (response.success) {
        setPosts(response.data.posts);
      }
      setLoading(false);
    };
    fetchPosts();
  }, []);

  const addPostsToState = (post) => {
    const newPosts = [post, ...posts];

    setPosts(newPosts);
  };
  const addComment = (comment, postId) => {
    const newPosts = posts.map((post) => {
      if (post._id === postId) {
        return { ...post, comments: [...post.comments, comment] };
      }
      return post;
    });

    setPosts(newPosts);
  };
  const addLike = (deleted, postId) => {
    let newPosts;
    if(deleted){
      newPosts = posts.map((post) =>{
        if(post._id === postId){
          console.log(post);
          return {...post, likes:post.likes.filter((post)=>{return post !== postId;})}
        }
        return post;
      })
      console.log(newPosts);
      setPosts(newPosts);
      
      

    }else{
      newPosts = posts.map((post) =>{
        if(post._id === postId){
          console.log(post);
          return {...post, likes:[...post.likes, postId]}
        }
        return post;
      })
      console.log(newPosts);
      setPosts(newPosts);
    }
    
  };

  return {
    data: posts,
    loading,
    addPostsToState,
    addComment,
    addLike
  };
};
