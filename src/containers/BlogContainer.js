import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostThunk } from '../modules/post';
import BlogTemplate from '../components/BlogTemplate';
import { useParams } from 'react-router-dom';
import { getUsersAsync, getUserAsync } from '../modules/users';

const BlogContainer = () => {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loading);
  const { post, postError } = useSelector(state => state.post);
  const { users, usersError } = useSelector(state => state.users);
  const { user, userError } = useSelector(state => state.users);
  const { postId } = useParams();

  const onSelect = useCallback((userId) => {
    dispatch(getUserAsync(userId))
  }, [dispatch]);

  useEffect(() => {
    dispatch(getPostThunk(postId || 1));
    dispatch(getUsersAsync());
  }, [dispatch, postId]);

  return (
    <div>
      <BlogTemplate post={post}
                    postError={postError}
                    loadingPost={loading['post/GET_POST']}
                    users={users}
                    usersError={usersError}
                    loadingUsers={loading['users/GET_USERS']}
                    user={user}
                    userError={userError}
                    loadingUser={loading['users/GET_USER']}
                    onSelect={onSelect}
      />
    </div>
  );
};

export default BlogContainer;