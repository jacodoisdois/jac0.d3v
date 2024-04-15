import React, { type ReactElement } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import Header from '../components/Header'
import MDEditor from '@uiw/react-md-editor'
import Footer from '../components/Footer'
import TagInput from '../components/TagInput'
// import axiosInstance from '../libs/axiosInstance'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Press Start 2P', Arial; 
    background-color: #1b2127;
    color: #f1f7f3;

  }
  
  a {
    color: #f1f7f3;
  }
  header, footer, div {
    border-radius: 5px !important; 
  }

  .w-md-editor-toolbar, .wmde-markdown {
  background-color: #12161a;
  font-family: 'Press Start 2P'
  }

  .tagInput{
    margin-top: 1%;
  }
`

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

interface formInput {
  title: string
  content: string
  tags: string[]
  visible: boolean
}

function EditPage (): ReactElement {
  const [form, setForm] = React.useState<formInput>({
    title: '',
    content: '',
    tags: [],
    visible: false
  })

  const handleTags = (newTags: string[]): void => {
    setForm({ ...form, tags: newTags })
  }

  const handleCreatePost = async (): Promise<void> => {
    try {
      // const response = await axiosInstance().post('auth/login',
      //   {
      //     ...form
      //   }
      // )

      console.log(form)
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
        <Header />
        <Title >New Post</Title>
        <EditorStyle>
          <InputField placeholder='Post title' onChange={e => { setForm({ ...form, title: e.target.value }) }} />
          <MDEditor
            value={form.content}
            onChange={(contentValue) => { setForm({ ...form, content: contentValue ?? '' }) }}
            style={{
              minHeight: 380,
              background: '#12161a',
              color: 'white'
            }}
          />
        <TagInput className='tagInput' onTagsChange={handleTags} />
        </EditorStyle>
        <Button onClick={async () => { await handleCreatePost() }}>Save Post</Button>
        <Footer />
      </Container>
    </>
  )
}

export default EditPage
