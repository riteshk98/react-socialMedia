import { Link } from 'react-router-dom';
import styles from '../styles/home.module.css';
import Comment from './Comment';
import like from '../assets/like.png';
import user from '../assets/user.png';
import commentpic from '../assets/comment.png';
import { useState } from 'react';
import { usePosts } from '../hooks';
import { createComment, toggleLike } from '../api';
import { toast } from 'react-hot-toast';

const Post = ({ post }) => {


  const [comment, setComment] = useState();
  const [creatingComment, setCreatingComment] = useState();
  const posts = usePosts();

  const handleAddComment = async (e) => {
    if (e.key === 'Enter') {
      setCreatingComment(true);
      const response = await createComment(comment, post._id);
      if (response.success) {
        posts.addComment(response.data.comment, post._id);
        toast.success('Commented');
      } else {
        toast.error(response.message);
      }
      setComment('');
      setCreatingComment(false);
    }
  };
  const handleLikeClick = async() => {
    // console.log(post);
    const response = await toggleLike(post._id);
    // console.log(response.data.deleted);
    if (response.success) {
        posts.addLike(response.data.deleted, post._id);
        toast.success(response.data.deleted? 'UnLiked': 'Liked');
      } else {
        toast.error(response.message);
      }
    };

  return (
    <div className={styles.postWrapper} key={`post-${post._id}`}>
      <div className={styles.postHeader}>
        <div className={styles.postAvatar}>
          <img src={user} alt="user-pic" />
          <div>
            <Link
              to={{
                pathname: `/user/${post.user._id}`,
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
            <img
              className={styles.likeBtn}
              src={like}
              alt="likes-icon"
              onClick={handleLikeClick}
            />
            <span>{post.likes.length}</span>
          </div>

          <div className={styles.postCommentsIcon}>
            <img src={commentpic} alt="comments" />

            <span>2</span>
          </div>
        </div>
        <div className={styles.postCommentBox}>
          <input
            disabled={creatingComment}
            placeholder="Start typing a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleAddComment}
          />
        </div>

        <div className={styles.postCommentsList}>
          {post.comments.map((comment) => {

            return <Comment comment={comment} key={comment._id} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Post;
