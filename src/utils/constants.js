const API_ROOT = 'http://codeial.codingninjas.com:8000/api/v2';

// doc url - https://www.notion.so/aakashcn/Codeial-API-docs-3a4d0b5a42c54f0a94d951a42aabc13f
export const API_URLS = {
  login: () => `http://localhost:3000/api/v1/users/create-session`,
  signup: () => `http://localhost:3000/api/v1/users/create-user`,
//   posts: (page, limit) => `${API_ROOT}/posts?page=${page}&limit=${limit}`,
  posts : (page=1 , limit=5) => `http://localhost:3000/api/v1/posts`,
  createPost: (content) => `${API_ROOT}/posts/create`,
  createFriendship: (userId,friend_id) =>
    `http://localhost:3000/api/v1/users/add-friend/${userId}/${friend_id}`, 
  friends: (id) => `http://localhost:3000/api/v1/users/user-friends/${id}`,
  removeFriend: (userId,friend_id) =>
    `http://localhost:3000/api/v1/users/remove-friend/${userId}/${friend_id}`,
  toggleLike: (itemId, itemType) =>
    `${API_ROOT}/likes/toggle?likeable_id=${itemId}&likeable_type=${itemType}`, // itemType is 'Post'/'Comment'
  getLikes: (itemId, itemType) =>
    `${API_ROOT}/likes?likeable_id=${itemId}&likeable_type=${itemType}`,
  comment: () => `${API_ROOT}/comments`, // POST - create, GET - list of comments
  deleteComment: (commentId) => `${API_ROOT}/comments?comment_id=${commentId}`,
  editUser: () => `http://localhost:3000/api/v1/users/update`,
  userInfo: (userId) => `http://localhost:3000/api/v1/users/detail/${userId}`,
  searchUsers: (searchText) => `${API_ROOT}/users/search?text=${searchText}`,
};
export const LOCALSTORAGE_TOKEN_KEY='__codeial_token__'; 