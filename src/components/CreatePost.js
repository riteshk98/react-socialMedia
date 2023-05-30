import { useState } from 'react';
import styles from '../styles/home.module.css';
import { toast } from 'react-hot-toast';
import { addPost } from '../api';
import { usePosts } from '../hooks';

const CreatePost = () => {
  const [post, setPost] = useState('');
  const [addingPost, setAddingPost] = useState(false);

  const posts = usePosts();

  const handleAddPost = async() => {
    setAddingPost(true);

    const response = await addPost(post);
    if(response.success){
        posts.addPostsToState(response.data.post);
        setPost('');
        toast.success("Post Created Successfully");
    }else{
        toast.error(response.message);
    }

    setAddingPost(false);
  };

  return (
    <div className={styles.createPost}>
      <textarea
        placeholder='Write here...'
        className={styles.addPost}
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <div>
        <button
          className={styles.addPostBtn}
          disabled={addingPost}
          onClick={handleAddPost}
        >
          Add Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;