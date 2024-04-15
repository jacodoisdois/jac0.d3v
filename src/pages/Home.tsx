import React, { type ReactElement } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import Post from '../components/Post'
import Header from '../components/Header'
import Footer from '../components/Footer'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', Arial; 
    background-color: #1b2127;
  }
  
  a {
    color: #f2f7f3;
  }
`

const Posts = styled.div`
  background-color: #292f3b; 
  color: #f2f7f3;
  padding: 10px;
  flex-grow: 4;
  max-width: 1080px;
`

const Section = styled.div`
  background-color: #292f3b;
  color: #f2f7f3;
  padding: 10px;
  flex-grow: 1;
  margin-left: 0.5%;
`

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  margin-top: 0.5%;
`

const Container = styled.div`
  margin: 0.5%;
`

function Home (): ReactElement {
  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=VT323&display=swap" />
      </Helmet>
      <GlobalStyle />
      <Container>
        <Header />
        <ContentContainer>
          <Posts >
            <Post />
          </Posts>
          <Section >section</Section>
        </ContentContainer>
        <Footer/>
      </Container>
    </>
  )
}

export default Home
