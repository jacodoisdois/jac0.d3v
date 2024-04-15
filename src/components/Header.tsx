import React from 'react'
import { type ReactElement } from 'react'
import styled from 'styled-components'

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
}
`

export default function Header (): ReactElement {
  return (
        <HeaderContainer>
            <div>
                <p>J2two</p>
            </div>
            <HeaderMenu >
                <a href="" className='bt-menu'>Home</a>
                <a href="" className='bt-menu'>About me</a>
                <a href="" className='bt-menu'>Login</a>
            </HeaderMenu>
        </HeaderContainer>
  )
}
