import styles from '../styles/home.module.css';
import React from 'react';
import { useEffect,useState } from 'react';
import {Comment,FriendsList} from '../components';
import { CreatePost ,Posts} from '../components';
import{Link} from 'react-router-dom';
import Loader from './Loader';
import { useAuth, usePosts } from '../hooks';


const Home = () => {
  const auth = useAuth();
  const posts=usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
    <div className={styles.postsList}>
    <CreatePost />
    {
     posts.data.map((post)=>(
      <Posts post={post} key={`post-${post._id}`}/>
     ))
      
    

     }
      
    
    </div>
    
   {auth.user && <FriendsList />} 
    </div>
      
  );
};

export default Home;
