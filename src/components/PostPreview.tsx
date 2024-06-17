import React, { useState, useEffect, type ReactElement } from 'react'
import styled from 'styled-components'
import { type Post } from '../common/types'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { format } from 'date-fns'

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

  .content-container * {
      font-size: 0.8em; 
  }
`

const Content = styled.div`
  margin-bottom: 40px; 
`

type FormatDateString = (dateString: string) => string

const formatDateString: FormatDateString = (dateString) => {
  const date = new Date(dateString)
  return format(date, 'dd-MM-yyyy - HH:mm:ss')
}

const GradientBanner = styled.div`
  background: linear-gradient(to top, rgba(27, 33, 39, 0.8), rgba(27, 33, 39, 0));
  color: #f2f7f3;
  padding-bottom: 20px;
  text-align: center;
  cursor: pointer;
  margin-top: -40px; /* Sobrepor ao espaço do Content */
  
  &:hover{
    color: #8e8e8e;
    background: linear-gradient(to top, rgba(66, 67, 82, 0.8), rgba(27, 33, 39, 0));
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
