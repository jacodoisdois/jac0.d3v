import React, { useEffect, useState, type ReactElement } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import Header from '../components/Header'
import MDEditor from '@uiw/react-md-editor'
import Footer from '../components/Footer'
import TagInput from '../components/TagInput'
import axiosInstance from '../libs/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { GlobalStyle } from '../styles'

const Container = styled.div`
  margin: 0.5%;
  display: flex;
  flex-direction: column;
`

const EditorStyle = styled.div`
  margin: 0 7% 3%;
`

const Title = styled.p`
  text-align: center;
  color: #f1f7f3;
  margin-top: 3%;
  font-size: 1em;
`

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #1a2c4b;
  border: 1px #1a2c4b solid;
  color: #f1f7f3;
  cursor: pointer;
  font-family: 'Press Start 2P', Arial;
  margin: 0 35% 1%;
  &:hover {
    background-color: #1b2127;
    border: 1px #f1f7f3 solid;
  }
`

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 8px 3px;
  border: none;
  border-bottom: 1px solid #c9d7d0;
  background-color: #1b2127;
  color: #f1f7f3;
  width: 300px;
  box-shadow: none;
  font-family: 'Press Start 2P', Arial;


  &:focus {
    outline: none;
  }

`
const EditorHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ToggleButton = styled.button`
  padding: 5px 10px;
  border: none;
  border-radius: 30px;
  width: 70px;
  height: 15px;
  font-size: 0.6em;
  background-color: #1a2c4b;
  border: 1px #1a2c4b solid;
  color: #f1f7f3;
  justify-self: center;
  align-self: center;
  padding-bottom: 3px;
  cursor: pointer;
  font-family: 'Press Start 2P', Arial;
  margin-right: 10px;
  &:hover {
    background-color: #1b2127;
    border: 1px #f1f7f3 solid;
  }
  display: flex; 
  align-items: center; 
  justify-content: center; 
`
const ToggleContainer = styled.div`
display: flex;
align-items: center;

`

interface formInput {
  title: string
  content: string
  tags: string[]
  visible: boolean
}

function EditPage (): ReactElement {
  const navigate = useNavigate()
  const [form, setForm] = React.useState<formInput>({
    title: '',
    content: '',
    tags: [],
    visible: false
  })
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsLoggedIn(!!token)
  }, [])

  const handleTags = (newTags: string[]): void => {
    setForm({ ...form, tags: newTags })
  }

  const handleCreatePost = async (): Promise<void> => {
    try {
      await axiosInstance().post('posts',
        {
          ...form
        }
      )

      console.log('Post created successfully')
      navigate('/')
    } catch (error) {
      console.log(error)
    }
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
        <Title >New Post</Title>
        {isLoggedIn
          ? (
            <>
              <EditorStyle>
                <EditorHeaderContainer>
                  <InputField placeholder='Post title' onChange={e => { setForm({ ...form, title: e.target.value }) }} />
                  <ToggleContainer>
                    <p style={{ fontSize: '0.7em', justifySelf: 'center', alignSelf: 'center' }}>Visible:</p>
                    <ToggleButton onClick={() => { setForm({ ...form, visible: !form.visible }) }} style={{
                      background: form.visible ? 'green' : 'white',
                      color: form.visible ? 'white' : 'black'
                    }}>{form.visible ? 'ON' : 'OFF'}</ToggleButton>
                  </ToggleContainer>
                </EditorHeaderContainer>
                <MDEditor
                  value={form.content}
                  onChange={(contentValue) => { setForm({ ...form, content: contentValue ?? '' }) }}
                  style={{
                    minHeight: 380,
                    background: '#12161a',
                    color: 'white'
                  }}
                />
                <div style={{ display: 'flex' }}>
                  <TagInput className='tagInput' onTagsChange={handleTags} />
                </div>
              </EditorStyle>
              <Button onClick={async () => { await handleCreatePost() }}>Save Post</Button>
            </>
            )
          : (<p>Not logged in</p>)
        }

        <Footer />
      </Container>
    </>
  )
}

export default EditPage
