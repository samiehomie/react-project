import React from 'react';
import styled from 'styled-components';

const UserBoxBlock = styled.div`
  flex: 1;
  position: sticky;
  height: 300px;
  box-shadow: 2px 2px 8px rgba(0,0,0,30%);
  border-radius: 10px;
  
`;

const UserInfo = styled.div`
  font-size: 1.2rem;
  padding: 30px;
`;

const UserBox = ({ user, loadingUser, userError }) => {
  if (loadingUser) {
    return (
      <UserBoxBlock>
        <h3>loading...</h3>
      </UserBoxBlock>
    );
  }

  if (userError) {
    return (
      <UserBoxBlock>
        <h3>Error</h3>
      </UserBoxBlock>
    );
  }

  return (
    <UserBoxBlock>
      {user ? (
        <UserInfo>
          <h4>{user.name}</h4>
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>{user.website}</div>
        </UserInfo>
      ) : (
        <UserInfo>
          <h4>SELECT USER</h4>
        </UserInfo>
      )}

    </UserBoxBlock>
  );
};

export default UserBox;