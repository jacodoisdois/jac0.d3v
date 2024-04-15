import { faGithubAlt } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { type ReactElement } from 'react'
import styled from 'styled-components'

const FooterCont = styled.div`
font-size: 11px;
color: #f2f7f3;
text-align: center;
justify-content: center;
align-items: center;
margin-top: 0.5%;
background-color: #292f3b;
min-height: 30px;
display: flex;
padding: 5px 0 5px;
svg{
  margin-left: 5px;
}
`

export default function Footer (): ReactElement {
  return (
      <>
       <FooterCont >
          <p>Developed by Jacó Magalhães</p>
          <FontAwesomeIcon icon={faGithubAlt} alignmentBaseline='central' fontSize={'25px'} />
        </FooterCont>
      </>
  )
}
