import React from 'react'
import styled from 'styled-components'
import { labels } from '../common/labels'

const HeaderContainer = styled.header`
  background-color: #292f3b;
  color: #f2f7f3;
  padding: 10px;
  text-align: center;
`

const HeaderMenu = styled.div`
  margin-top: 5px;
  font-family: 'VT323', Arial;
  
  .bt-menu {
    margin: 0 5px 0 0px;
    font-size: 0.3em;
    font-family: 'Press Start 2P';
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  .bt-menu:hover{
    color: #8e8e8e;
  }
  
`

interface HeaderProps {
  isLoggedIn: boolean
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
  const handleLogout = (): void => {
    localStorage.removeItem('token')
  }

  return (
    <HeaderContainer>
      <div>
        <a href="/" className='logo-text'>{labels.LOGO_NAME}</a>
      </div>
      <HeaderMenu>
        <a href="/" className='bt-menu'>Posts</a>
        <a href="/about" className='bt-menu'>About me</a>
        {isLoggedIn
          ? (<>
          <a href="/edit" className='bt-menu'>Edit</a>
          <a onClick={() => { handleLogout() }} href='/' className='bt-menu'>Logout</a>
        </>)
          : (<a href="/login" className='bt-menu'>Login</a>)}
      </HeaderMenu>
    </HeaderContainer>
  )
}

export default Header
