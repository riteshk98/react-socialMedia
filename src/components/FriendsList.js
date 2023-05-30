import { Link } from 'react-router-dom';
import { UseAuth } from '../hooks';
import styles from '../styles/home.module.css';

const FriendsList = () => {
  const auth = UseAuth();

  const { friends = [] } = auth.user;

  return (
    <div className={styles.friendsList}>
      <div className={styles.header}>Friends</div>
      {friends && friends.length === 0 && (
        <div className={styles.noFriends}>No Friends Found..</div>
      )}

      {friends &&
        friends.map((friend) => {
          return (
            <div key={`friend-${friend._id}`}>
              <Link
                className={styles.friendsItem}
                to={`/user/${friend.to_user._id}`}
              >
                <div className={styles.friendsImg}>
                  <img
                    src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                    alt=""
                  />
                </div>
                <div className={styles.friendsName}>{friend.to_user.email}</div>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default FriendsList;
