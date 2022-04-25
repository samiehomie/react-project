import Post from './Post';
import UserList from './UserList';


const BlogTemplate = ({ post, postError, loadingPost,
                        users, usersError, loadingUsers,
                        user, userError, loadingUser, onSelect }) => {

  return (
    <div>
      <Post post={post}
            error={postError}
            loading={loadingPost}
      />
      <UserList
        users={users}
        error={usersError}
        loading={loadingUsers}
        user={user}
        userError={userError}
        loadingUser={loadingUser}
        onSelect={onSelect}
      />
    </div>
  );
};

export default BlogTemplate;