import React, { useEffect, useState, type ReactElement } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { GlobalStyle } from '../styles'
import { gitLogo, graphQLLogo, ishikawaImage, linkedinLogo, mysqlLogo, nodeLogo, oracleLogo, railsLogo, stackoverflowLogo, tsLogo } from '../assets/images/images'
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
  
  .section, p{
    font-family: "VT323";
    font-size: 1.5em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
`

const TechnologiesContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;

  a:hover img {
    filter: grayscale(60%);
}
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

  a:hover img {
    filter: grayscale(60%);
}
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
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" rel="stylesheet"></link>
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
              <Section className='section'>
                <h2>About Me</h2>
                <p>I am a technology professional with solid experience in the following technologies and languages: TypeScript, OracleQL, GraphQL, MySQL, Kafka, JavaScript, Ruby, and Rails. I have a background of 3 years providing N3 support for financial systems (Sinacor and brokertools by INOA) and participating in system homologation, including systems related to RSFN/SPB. During this period, I developed skills in handling fix messaging issues.</p>
                <p>In 2023, I switched careers to become a back-end software developer, focusing on development in TypeScript in a distributed system. My experience includes working with Kafka, GraphQL, microservices, monorepo, and CI/CD and Kubernetes technologies.</p>
                <p>I always enjoy finding technological ways to simplify daily tasks and solve arising problems using and researching for the best available tools.</p>
              </Section>
              <Section>
                <h2>Technologies</h2>
                <TechnologiesContainer>
                  <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
                    <TechnologyLogo src={tsLogo} alt="Typescript" title="Typescript" />
                  </a>
                  <a href="https://nodejs.org/" target="_blank" rel="noopener noreferrer">
                    <TechnologyLogo src={nodeLogo} alt="NodeJS" title="NodeJS" />
                  </a>
                  <a href="https://graphql.org/" target="_blank" rel="noopener noreferrer">
                    <TechnologyLogo src={graphQLLogo} alt="GraphQL" title="GraphQL" height="1000px" />
                  </a>
                  <a href="https://rubyonrails.org/" target="_blank" rel="noopener noreferrer">
                    <TechnologyLogo src={railsLogo} alt="Ruby" title="Ruby" />
                  </a>
                  <a href="https://www.oracle.com/" target="_blank" rel="noopener noreferrer">
                    <TechnologyLogo src={oracleLogo} alt="Oracle" title="Oracle" />
                  </a>
                  <a href="https://www.mysql.com/" target="_blank" rel="noopener noreferrer">
                    <TechnologyLogo src={mysqlLogo} alt="MySQL" title="MySQL" />
                  </a>
                </TechnologiesContainer>
              </Section>
              <Section>
                <h2>Social Networks</h2>
                <SocialNetworksContainer>
                  <a href="https://github.com/jacodoisdois" target="_blank" rel="noopener noreferrer">
                    <SocialNetworkLogo src={gitLogo} alt="Github" title="Github" />
                  </a>
                  <a href="https://stackoverflow.com/users/10754944" target="_blank" rel="noopener noreferrer">
                    <SocialNetworkLogo src={stackoverflowLogo} alt="Stackoverflow" title="Stackoverflow" />
                  </a>
                  <a href="https://www.linkedin.com/in/jacomaga" target="_blank" rel="noopener noreferrer">
                    <SocialNetworkLogo src={linkedinLogo} alt="LinkedIn" title="LinkedIn" />
                  </a>
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
