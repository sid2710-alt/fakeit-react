import { useParams, useNavigate } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

import  Loader  from './Loader';
import styles from '../styles/settings.module.css';
import { useAuth } from '../hooks';
import { useEffect, useImperativeHandle, useState } from 'react';
import { fetchUserProfile,addFriend,removeFriend} from '../components/api';

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [requestInProgress, setRequestInProgress] = useState(false);
  const { userId } = useParams();
  const { addToast } = useToasts();
  const Navigator = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);

      if (response.success) {
        setUser(response.data.user);
       
      } else {
        addToast(response.message, {
          appearance: 'error',
        });
        return Navigator.push('/');
      }

      setLoading(false);
    };

    getUser();
  }, [userId, Navigator, addToast]);

  if (loading) {
    return <Loader />;
  }

  const checkIfUserIsAFriend = () => {
    
    const friends = auth.user.friends;

    let friendIds = friends.map((friend) => friend.to_user);
    let index = friendIds.indexOf(userId);

    if (index !== -1) {
      
      return true;
    }
    friendIds=friends.map((friend)=>friend.from_user);
    index=friendIds.indexOf(userId);
    if (index !== -1) {
      
      return true;
    }
;
    return false;
  };

  const handleRemoveFriendClick = async () => {
    setRequestInProgress(true);

    const response = await removeFriend(auth.user._id,userId);

    if (response.success) {
      const friendship = auth.user.friends.filter(
        (friend) => friend.to_user === userId || friend.from_user===userId
      );
      

      auth.updateUserFriends(false, friendship[0]);
      addToast('Friend removed successfully!', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setRequestInProgress(false);
  };

  const handleAddFriendClick = async () => {
    setRequestInProgress(true);

    const response = await addFriend(auth.user._id,userId);

    if (response.success) {
      const  friendship  = response.data.friend;
      console.log(friendship,"7yhtgbhhrgvef");

      auth.updateUserFriends(true, friendship);
      addToast('Friend added successfully!', {
        appearance: 'success',
      });
    } else {
      addToast(response.message, {
        appearance: 'error',
      });
    }
    setRequestInProgress(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{user.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>

        <div className={styles.fieldValue}>{user.name}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsAFriend() ? (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleRemoveFriendClick}
          >
            {requestInProgress ? 'Removing friend...' : 'Remove friend'}
          </button>
        ) : (
          <button
            className={`button ${styles.saveBtn}`}
            onClick={handleAddFriendClick}
            disabled={requestInProgress}
          >
            {requestInProgress ? 'Adding friend...' : 'Add friend'}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;