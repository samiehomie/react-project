import React from 'react';
import styled from 'styled-components';
import UserBox from './UserBox';

const UserTemplate = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  
`;

const UserListBlock = styled.div`
  flex: 1;
  h1 {
    margin-top: 0;
    color: orangered;
    font-size: 2rem;
  }
`;

const UserItem = styled.div`
  color: black;
  cursor: pointer;
  &:hover {
    color: orangered;
  }
`;



const UserList = ({ error, loading, users,
                    user, userError, loadingUser, onSelect}) => {
  if (loading) {
    return (
      <UserTemplate>
        <h3>loading..</h3>
      </UserTemplate>
    );
  }

  if (error) {
    return (
      <UserTemplate>
        <h3>Error</h3>
      </UserTemplate>
    )
  }

  return (
    <UserTemplate>
      <UserListBlock>
        <h1>USERS</h1>
        <ul>
          {users && users.map(user => (
            <li key={user.id} onClick={() => onSelect(user.id)}>
              <UserItem>{user.name}</UserItem>
            </li>
          ))}
        </ul>
      </UserListBlock>
      <UserBox user={user} userError={userError} loadingUser={loadingUser} />
    </UserTemplate>
  );
};

export default React.memo(UserList);