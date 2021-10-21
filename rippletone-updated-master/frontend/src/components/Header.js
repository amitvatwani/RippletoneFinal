import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

import { logout } from '../actions/UserActions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        bg='dark'
        variant='dark'
        expand='lg'
        sticky='top'
        className='cs-container'
        collapseOnSelect
      >
        <Container>
          {userInfo ? (
            <LinkContainer to='/listen'>
              <img
                src='/rippletone.png'
                className='d-inline-block align-top rp-logo'
                alt='Rippletone-logo'
              />
            </LinkContainer>
          ) : (
            <LinkContainer to='/'>
              <img
                src='/rippletone.png'
                className='d-inline-block align-top rp-logo'
                alt='Rippletone-logo'
              />
            </LinkContainer>
          )}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {userInfo ? (
              <Route
                render={({ history }) => <SearchBox history={history} />}
              />
            ) : (
              <div></div>
            )}
            <Nav className='ml-auto'>
              {userInfo ? (
                <div></div>
              ) : (
                <LinkContainer to='/signup'>
                  <Nav.Link className='custom-link'>
                    <i class='far fa-user'></i> Sign up
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.role == 'user' ? (
                <LinkContainer to='/playlist'>
                  <Nav.Link className='custom-link'>
                    <i class='fas fa-compact-disc'></i> My Playlist
                  </Nav.Link>
                </LinkContainer>
              ) : (
                <div></div>
              )}
              {userInfo ? (
                <NavDropdown
                  className='custom-link'
                  title={userInfo.username}
                  id='username'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link className='custom-link'>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.role == 'admin' && (
                <NavDropdown
                  className='custom-link'
                  title='Admin'
                  id='adminmenu'
                >
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/songlist'>
                    <NavDropdown.Item>Songs</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
