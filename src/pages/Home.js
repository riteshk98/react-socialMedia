import styles from '../styles/home.module.css';
import PropTypes from 'prop-types';
import { CreatePost, FriendsList, Loader } from '../components';

import { UseAuth, usePosts } from '../hooks';

import Post from '../components/Post';

const Home = () => {
  const auth = UseAuth();

  const posts = usePosts();

  if (posts.loading) {
    return <Loader />;
  }

  return (
    <div className={styles.home}>
      
      <div className={styles.postsList}>
      <CreatePost />
        {posts.data.map((post) => (
          <Post post={post} key={`post-${post._id}`} />
        ))}
      </div>
      {auth.user && <FriendsList />}
    </div>
    
  );
};

Home.propTypes = {
  posts: PropTypes.array,
};

export default Home;
