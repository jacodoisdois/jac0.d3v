import React, { useEffect, useState, type ReactElement } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { PostPreview } from '../components/PostPreview'
import Header from '../components/Header'
import Footer from '../components/Footer'
import axiosInstance from '../libs/axiosInstance'
import { type ErrorType, type Post, type getPostsResponse } from '../common/types'
import { GlobalStyle } from '../styles'
import stringify from 'safe-stable-stringify'
import { Bounce, toast } from 'react-toastify'

const Posts = styled.div`
  color: #f2f7f3;
  flex-grow: 4;
  min-width: 60%;
  max-width: 80%;
`

const Section = styled.div`
  background-color: #292f3b;
  color: #f2f7f3;
  padding: 10px;
  flex-grow: 1;
  margin-left: 0.5%;
  min-width: 20%;
  max-width: 20%;
  font-size: 0.9em;

  p{
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  }

  ul{
    padding: 0;
    padding-left: 5px;
  }
`

const ContentContainer = styled.div`
  display: flex;
  margin-top: 0.5%;
`

const Container = styled.div`
  margin: 0.5%;
`

const YearSummaryItem = styled.li`
  list-style: none;
  padding: 0;

  details summary {
    cursor: pointer;
  }

  details ul {
    padding-left: 20px;
  }
  
  summary:hover {
    color: #8e8e8e;
  }
`

const MonthSummaryItem = styled.li`
  cursor: pointer;
  text-decoration: none;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);

  &:hover {
    color: #8e8e8e;
  }
`

const TextButton = styled.p`
  cursor: pointer;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  &:hover {
    color: #8e8e8e;
  }

`

function Home (): ReactElement {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([])
  const [archives, setArchives] = useState<Record<string, Record<string, Post[]>>>({})

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
    const fetchData = async (): Promise<void> => {
      try {
        const response = (await axiosInstance().get('/posts')).data as unknown as getPostsResponse
        if (response.data) {
          setPosts(response.data)
          setFilteredPosts(response.data)
          groupPostsByDate(response.data)
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

  const groupPostsByDate = (posts: Post[]): void => {
    const grouped: Record<string, Record<string, Post[]>> = {}
    posts.forEach(post => {
      const date = new Date(post.createdAt)
      const year = date.getFullYear().toString()
      const month = date.toLocaleString('default', { month: 'long' })
      if (!grouped[year]) grouped[year] = {}
      if (!grouped[year][month]) grouped[year][month] = []
      grouped[year][month].push(post)
    })
    setArchives(grouped)
  }

  const filterPosts = (year: string, month: string): void => {
    const data = !year || !month ? posts : archives[year][month]
    setFilteredPosts(data)
  }

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
          <Posts>
            {filteredPosts.length
              ? filteredPosts.map((post): ReactElement => (
                  <PostPreview key={post.id} post={post} />
              ))
              : (<p>Failed to load posts</p>)
            }
          </Posts>
          <Section>
            <p>Archives</p>
            <TextButton onClick={() => { filterPosts('', '') }} style={{ fontSize: '0.2em' }}>clean filters</TextButton>
            <ul>
              {Object.keys(archives).map(year => (
                <YearSummaryItem key={year}>
                  <details>
                    <summary>{year}</summary>
                    <ul>
                      {Object.keys(archives[year]).map(month => (
                        <MonthSummaryItem key={month} onClick={() => { filterPosts(year, month) }}>
                          {month}
                        </MonthSummaryItem>
                      ))}
                    </ul>
                  </details>
                </YearSummaryItem>
              ))}
            </ul>
          </Section>
        </ContentContainer>
        <Footer />
      </Container>
    </>
  )
}

export default Home
