import { useParams, useNavigate } from 'react-router-dom';
import styles from '../styles/settings.module.css';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { addFriend, fetchUserProfile, removeFriend } from '../api';
import { Loader } from '../components';
import { UseAuth } from '../hooks';
const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [request, setRequest] = useState(false);
  const navigate = useNavigate();
  const auth = UseAuth();

  useEffect(() => {
    const getUser = async () => {
      const response = await fetchUserProfile(userId);
      if (response.success) {
        setUser(response.data.user);
      } else {
        toast.error('Error Occurred ' + response.message);
        navigate('/');
      }
      setLoading(false);
    };
    getUser();
  }, [navigate, userId]);

  const checkIfUserIsFriend = () => {
    const friends = auth.user.friends;
    const friendIds = friends.map((friend) => friend.to_user._id);

    const index = friendIds.indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };

  if (loading) {
    <Loader></Loader>;
  }

  const handleAddFriend = async () => {
    setRequest(true);
    const response = await addFriend(userId);
    if (response.success) {
      const { friendship } = response.data;
      auth.updateUserFriends(true, friendship);
      toast.success('Added Successfully');
    } else {
      toast.error(response.message);
    }
    setRequest(false);
  };

  const handleRemoveFriend = async () => {
    setRequest(true);
    const response = await removeFriend(userId);
    if (response.success) {
      const friendship  = auth.user.friends.filter((friend)=> friend.to_user._id === userId);
      auth.updateUserFriends(false, friendship[0]);
      toast.success('Removed Successfully');
    } else {
      toast.error(response.message);
    }
    setRequest(false);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img src="https://picsum.photos/200/300" alt="" />
      </div>
      <div className={styles.field}>
        <div className={styles.fieldName}>Name</div>
        <div className={styles.fieldValue}>{user?.name}</div>
      </div>
      <div className={styles.field}>
        <div className={styles.fieldName}>Email</div>
        <div className={styles.fieldValue}>{user?.email}</div>
      </div>

      <div className={styles.btnGrp}>
        {checkIfUserIsFriend() ? (
          <button className={`button ${styles.editBtn}`} onClick={handleRemoveFriend} disabled={request}>Remove Friend</button>
        ) : (
          <button disabled={request}
            className={`button ${styles.editBtn}`}
            onClick={handleAddFriend}
          >
            Add Friend
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
