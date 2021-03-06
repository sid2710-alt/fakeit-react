import { API_URLS,LOCALSTORAGE_TOKEN_KEY,getFormbody } from "../../utils";
const customFetch = async (url,{body,...customConfig}) => {
 const token=window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY );
 const headers={
   'content-type':'application/x-www-form-urlencoded',
 }
 if(token){
   headers.Authorization=`Bearer ${token}`
 } 
 const config={
   ...customConfig,
   headers:{
      ...headers,
      ...customConfig.headers, 
   }
 };
 if(body){
     config.body=getFormbody(body);

 }
 try{
const response =await fetch(url,config);
const data=await response.json();

if(data.success){
  return {

    data:data.data,
    success:true,
  }
}
throw new Error(data.message);
 }
 catch(error){
console.error('error');
return{
  message:error,
  success:false,
}
 }
 };
 
export const getPosts = (page=1, limit=5) => {
  return customFetch(API_URLS.posts(page,limit),{
    method:'GET',
  });
};
export const login = (email, password) => {
  return customFetch(API_URLS.login(), {
    method: 'POST',
    body: { email, password },
  });
};
export const register = async (name, email, password, confirmPassword) => {
  return customFetch(API_URLS.signup(), {
    method: 'POST',
    body: { name, email, password, confirm_password: confirmPassword },
  });
};
export const editProfile = async (userId, name, password, confirmPassword) => {
  return customFetch(API_URLS.editUser(), {
    method: 'POST',
    body: { id: userId, name, password, confirm_password: confirmPassword },
  });
};
export const fetchUserProfile = (userId) => {
  return customFetch(API_URLS.userInfo(userId), {
    method: 'GET',
  });
};
export const fetchUserFriends = (id) => {
  return customFetch(API_URLS.friends(id), {
    method: 'GET',
  });
};
export const addFriend = (userId,friend_id) => {
  return customFetch(API_URLS.createFriendship(userId,friend_id), {
    method: 'POST',
    
  });
};
export const removeFriend = (userId,friend_id) => {
  return customFetch(API_URLS.removeFriend(userId,friend_id), {
    method: 'POST',
    
  });
};
export const addPost = (content,userId) => {
  return customFetch(API_URLS.createPost(userId), {
    method: 'POST',
    body: {
      content,
    },
  });
};
export const createComment = (content,userId,postId) => {
  return customFetch(API_URLS.comment(userId), {
    method: 'POST',
    body: {
      post:postId,
      content:content,
    },
  });
};
export const toggleLike=(id,itemId,type)=>
{
  return customFetch(API_URLS.toggleLike(id,itemId,type),{
    method:'POST',
  })
}
export const searchUsers = (searchText) => {
  return customFetch(API_URLS.searchUsers(searchText), {
    method: 'GET',
  });
};