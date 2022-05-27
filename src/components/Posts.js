import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import { createComment } from '../components/api';
import { useAuth, usePosts } from '../hooks';
import styles from '../styles/home.module.css';
import  Comment  from './Comment';
const Posts=({post})=>{
  
  const user=useAuth();
  const [comment, setComment] = useState('');
  const [creatingComment, setCreatingComment] = useState(false);
  const posts = usePosts();
  const { addToast } = useToasts();
  const handleAddComment=async(e)=>{
    if(e.key==='Enter'){
      console.log(comment,"^^^^^^^^");
      setCreatingComment(true);
      const response=await createComment(comment,user.user._id,post._id);
      if(response.success){
        setComment('');
        console.log(response);
        posts.addComment(response.data.comment,post._id);
        addToast('Comment created successfully!',{
          appearance:'success',
        });
      }
      else{
        addToast(response.message,{
          appearance:'error',
        });
      }
  setCreatingComment(false);
    }
    
  };
  const handlePostLikeClick
    return (
      <div className={styles.postWrapper}>
            <div className={styles.postHeader}>
              <div className={styles.postAvatar}>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  alt="user-pic"
                />
                <div>
                <Link
                      to={{
                        pathname: `/user/${post.user._id}`,
                        state: {
                          user: post.user,
                        },
                      }}
                      className={styles.postAuthor}
                    >
                      {post.user.name}
                    </Link>
                  <span className={styles.postTime}>a minute ago</span>
                </div>
              </div>
              <div className={styles.postContent}>{post.content}</div>
    
              <div className={styles.postActions}>
                <div className={styles.postLike}>
                  <button on onClick={handlepostlike}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/126/126473.png"
                    alt="likes-icon"
                  />
                  </button>
                  
                  <span>5</span>
                </div>
    
                <div className={styles.postCommentsIcon}>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/1380/1380338.png"
                    alt="comments-icon"
                  />
                  <span>2</span>
                </div>
              </div>
              <div className={styles.postCommentBox}>
                <input placeholder="Start typing a comment" 
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
                onKeyDown={handleAddComment}
                />
                
              </div>
    
              <div className={styles.postCommentsList}>
              {post.comments.map((comment) => (
                    <Comment comment={comment} />
                  ))}
                {/* <div className={styles.postCommentsItem}>
                  <div className={styles.postCommentHeader}>
                    <span className={styles.postCommentAuthor}>Bill</span>
                    <span className={styles.postCommentTime}>a minute ago</span>
                    <span className={styles.postCommentLikes}>22</span>
                  </div>
    
                  <div className={styles.postCommentContent}>Random comment</div>
                </div> */}
              </div>
            </div>
          </div>
    )
} 
export default Posts
