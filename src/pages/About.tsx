import React, { useEffect, useState, type ReactElement } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { GlobalStyle } from '../styles'
import { gitLogo, ishikawaImage, linkedinLogo, mysqlLogo, nodeLogo, oracleLogo, railsLogo, stackoverflowLogo, tsLogo } from '../assets/images/images'
const Content = styled.div`
  background-color: #292f3b;
  color: #f2f7f3;
  padding: 10px;
  width: 100%;
  font-size: 0.9em;
  display: flex;
  flex-grow: 1;
`

const ContentContainer = styled.div`
  display: flex;
  margin-top: 0.5%;
  flex-grow: 1;
`

const Container = styled.div`
  margin: 0.5%;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const ImageContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 1%;
  width: 300px; 
  height: 300px; 
  border-radius: 50%; 
  flex-shrink: 0;
  align-self: center;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; 
  border-radius: 50%;
`
const SectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-grow: 1;
  padding: 5%;
`

const Section = styled.div`
  text-align: justify;
  margin-top: 20px;
  width: 100%;
`

const TechnologiesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`

const TechnologyLogo = styled.img`
  width: 50px;
  height: 50px;
`

const SocialNetworksContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`

const SocialNetworkLogo = styled.img`
  width: 50px;
  height: 50px;
`

function About (): ReactElement {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=VT323&display=swap" />
      </Helmet>
      <GlobalStyle />
      <Container>
        <Header isLoggedIn={isLoggedIn} />
        <ContentContainer>
          <Content>
          <ImageContainer>
            <Image src={ishikawaImage} alt="Ishikawa" />
          </ImageContainer>
          <SectionContainer>
            <Section>
              <h2>About Me</h2>
              <p>I am a software developer, born in 2000, with experience in the financial market. Over the past four years, I have been deeply involved with TypeScript and various financial technologies in Brazil. My journey includes developing robust and innovative solutions that meet the complex needs of the financial sector, always prioritizing security and efficiency. My passion for technology and commitment to excellence have driven me to deliver high-quality results and significantly contribute to the success of the projects I am involved in.</p>
            </Section>
            <Section>
              <h2>Technologies</h2>
              <TechnologiesContainer>
                <TechnologyLogo src={tsLogo} alt="Typescript" />
                <TechnologyLogo src={nodeLogo} alt="NodeJS" />
                <TechnologyLogo src={railsLogo} alt="Ruby" />
                <TechnologyLogo src={oracleLogo} alt="Oracle" />
                <TechnologyLogo src={mysqlLogo} alt="MySQL" />
              </TechnologiesContainer>
            </Section>
            <Section>
              <h2>Social Networks</h2>
              <SocialNetworksContainer>
                <SocialNetworkLogo src={gitLogo} alt="Github" />
                <SocialNetworkLogo src={stackoverflowLogo} alt="Stackoverflow" />
                <SocialNetworkLogo src={linkedinLogo} alt="Linkeding" />
              </SocialNetworksContainer>
            </Section>
          </SectionContainer>
          </Content>
        </ContentContainer>
        <Footer />
      </Container>
    </>
  )
}

export default About
