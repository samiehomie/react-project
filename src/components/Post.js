import styled from 'styled-components';


const PostBlock = styled.div`
  p {
    white-space: pre;
  }
  padding-bottom: 50px;
  border-bottom: 1px solid orangered;
`;

const Post = ({ post, loading, error }) => {
  if (loading) {
    return (
      <PostBlock>
        <h3>loading...</h3>
      </PostBlock>
    );
  }

  if (error) {
    return (
      <PostBlock>
        <h3>Error</h3>
      </PostBlock>
    );
  }
  return (
    <PostBlock>
      <h3>{post && post.title}</h3>
      <p>{post && post.body}</p>
    </PostBlock>
  );
};

export default Post;