import React, { useEffect, useState, type ReactElement } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axiosInstance from '../libs/axiosInstance'
import { type ErrorType, type getPostResponse, type Post } from '../common/types'
import { GlobalStyle } from '../styles'
import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { formatDateString } from '../utils/formatDateString'
import { toast, Bounce } from 'react-toastify'
import stringify from 'safe-stable-stringify'

const Container = styled.div`
  margin: 0.5%;
`
const Section = styled.div`
  background-color: #292f3b;
  color: #f2f7f3;
  padding: 10px;
  flex-grow: 1;
  font-size: 0.9em;

  .post-title {
    font-size: 2.1em;
    margin: 0px;
    font-family: 'VT323';
    }
    
    .publish-date {
      font-size: 1.2em;
      margin: 0px;
      margin-top: 10px;
      font-family: 'VT323';
  }

  p{
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  ul{
    padding: 0;
    padding-left: 5px;
  }
`

const ContentContainer = styled.div`
  margin-top: 0.5%;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: '  Montserrat', 'Arial';

  .content-container {
    h1 {
      font-size: 1.8em;
      margin-bottom: 0.5em;
    }
    
    h2 {
      font-size: 1.5em;
      margin-bottom: 0.5em;
    }
    
    h3 {
      font-size: 1.2em;
      margin-bottom: 0.5em;
    }
    
    h4 {
      font-size: 1.05em;
      margin-bottom: 0.5em;
    }
    
    p {
      font-size: 0.8em;
      margin-bottom: 1em;
      line-height: 1.5;
    }
    
    ul, ol {
      margin-left: 2em;
      margin-bottom: 1em;
      
      li {
        margin-bottom: 0.5em;
      }
    }
    
    pre {
      background-color: #f6f8fa;
      padding: 1em;
      border-radius: 5px;
      overflow: auto;
      margin-bottom: 1em;
      
      code {
        background: none;
        color: #333;
        text-shadow: none;
        font-family: "Cutive Mono", monospace;
        font-weight: 600;
        font-style: normal;
      }
    }
    
    blockquote {
      border-left: 4px solid #ccc;
      padding-left: 1em;
      margin-left: 0;
      color: #f2e022;
      font-style: italic;
      font-family: "Parisienne", cursive;
      font-weight: 400;
      font-size: 2em;
      text-shadow: none;
      text-decoration: underline;
      text-decoration-color: #a89b0f;
      text-decoration-thickness: 1px;
      text-decoration-style: solid;
    }

    blockquote, p {
      border-bottom: 1px, #dccb11, solid !important;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 1em;
      
      th, td {
        border: 1px solid #ddd;
        padding: 0.5em;
        text-align: left;
        text-shadow: none;
      }
      
      th {
        background-color: #ffffff;
        color: #2a2e3b;
        text-shadow: none;
      }
    }
    
    img {
      max-width: 100%;
      height: auto;
      margin-bottom: 1em;
    }
    
    a {
      color: #0366d6;
      text-decoration: none;
      
      &:hover {
        text-decoration: underline;
      }
    }
    
    hr {
      border: none;
      border-top: 1px solid #eee;
      margin: 2em 0;
    }
  }
`

function FullPost (): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [post, setPost] = useState<Post>()
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [content, setContent] = useState('')

  const { postId } = useParams()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    const fetchData = async (): Promise<void> => {
      try {
        const response = (await axiosInstance().get(`/posts/${postId}`)) as unknown as getPostResponse
        if (response.data) {
          setPost(response.data)
          setContent(DOMPurify.sanitize(marked.parse(response.data.content) as string))
        }
      } catch (e) {
        const errorObj = e as ErrorType
        toast.error(stringify(errorObj?.message ?? 'Something got wrong when tried to login').replace(/"/g, ''), {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'dark',
          transition: Bounce
        })
      }
    }
    void fetchData()
  }, [])

  return (
    <>
      <Helmet>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=VT323&display=swap" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playwrite+MX:wght@100..400&display=swap" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css2?family=Cutive+Mono&family=Montserrat:ital,wght@0,100..900;1,100..900&family=Parisienne&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Playwrite+MX:wght@100..400&display=swap" rel="stylesheet"></link>
      </Helmet>
      <GlobalStyle />
      <Container>
        <Header isLoggedIn={isLoggedIn} />
        <ContentContainer>
          {!post
            ? (<p>Failed to get post data</p>)
            : (
              <Section>
                <div>
                 <p className='post-title'>{post.title}</p>
                  <h6 className='publish-date'>{formatDateString(post.createdAt)}</h6>
                </div>
                <hr></hr>
                <div dangerouslySetInnerHTML={{ __html: content }} className='content-container'></div>
              </Section>
              )
          }
        </ContentContainer>
        <Footer />
      </Container>
    </>
  )
}

export default FullPost
