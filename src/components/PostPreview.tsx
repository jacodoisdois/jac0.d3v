import React, { useState, useEffect, type ReactElement } from 'react'
import styled from 'styled-components'
import { type Post } from '../common/types'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { formatDateString } from '../utils/formatDateString'

const PostContainer = styled.div`
  text-justify: newspaper;
  text-align: justify;
  background-color: #292f3b; 
  color: #f2f7f3;
  padding: 10px;
  flex-grow: 6;
  
  &:not(:last-child) {
    margin-bottom: 0.5%;
  }
  
  .post-title{
    text-decoration: none;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }
  .post-title:hover{
    color: #8e8e8e;
  }

  .publish-date {
    font-weight: 300;
    font-size: 0.15em;
  }

  .content-container {
    padding-right: 10px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .content-container {
    h1 {
      font-size: 1.7em;
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

const Content = styled.div`
  margin-bottom: 40px; 
`

const GradientBanner = styled.div`
  background: linear-gradient(to top, rgba(27, 33, 39, 0.2), rgba(27, 33, 39, 0));
  color: #f2f7f3;
  padding-bottom: 1%;
  text-align: center;
  cursor: pointer;
  margin-top: -40px;
  
  &:hover{
    color: #d0d0d0;
    background: linear-gradient(to top, rgba(58, 67, 86, 0.6), rgba(27, 33, 39, 0));
  }
`

interface PostPreviewProps {
  post: Post
}

export function PostPreview ({ post }: PostPreviewProps): ReactElement {
  const [isLongPost, setIsLongPost] = useState(false)

  useEffect(() => {
    const lineCount = post.content.split('\n').length
    setIsLongPost(lineCount > 10)
  }, [post.content])

  const sanitizedHtml = DOMPurify.sanitize(marked.parse(post.content) as string)
  const previewContent = `${sanitizedHtml.slice(0, 300)}`

  return (
    <PostContainer>
      <div>
        <a href={`/posts/${post.id}`} className='post-title'><h3>{post.title}</h3></a>
        <h6 className='publish-date'>{formatDateString(post.createdAt)}</h6>
      </div>
      <hr></hr>
      <Content dangerouslySetInnerHTML={{ __html: previewContent }} className='content-container'/>
      {isLongPost && (
        // eslint-disable-next-line no-return-assign
        <GradientBanner onClick={() => window.location.href = `/posts/${post.id}`}>
          Go to Post
        </GradientBanner>
      )}
    </PostContainer>
  )
}

export default PostPreview
