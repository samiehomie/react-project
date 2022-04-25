import { Link, useParams, Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';

const NavbarInPostBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  h1 {
    font-size: 2rem;
    color: orangered;
    padding-right: 10px;
  }
  
  a {
    text-decoration: none;
    font-size: 1.2rem;
  }
  
  a:hover {
    color: orangered;
  }
`;

const NavItem = styled(Link)`
  ${props => 
      props.to === props.isActive ?
              css` color: orangered; font-weight: bolder;` : 
              css` color: black; `
    }
  
  & + & {
    margin-left: 15px;  
  }
`;

const NavbarInPost = () => {
  const { postId } = useParams();
  return (
    <div>
      <NavbarInPostBlock>
        <h1>POST</h1>
        {[...Array(5).keys()].map(i => (
          <NavItem key={`nav_${i}`} to={`${i+1}`} isActive={postId || '1'}>
            {i+1}
          </NavItem>
        ))}
      </NavbarInPostBlock>
      <Outlet />
    </div>
  );
};

export default NavbarInPost;
