/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-void */
import React, { type ReactElement } from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { Helmet } from 'react-helmet'
import { type SubmitHandler, useForm } from 'react-hook-form'
import axiosInstance from '../libs/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { GlobalStyle } from '../styles'
import { labels } from '../common/labels'

const Header = styled.div`
  background-color: #282e3b;
  color: #f1f7f3;
  padding: 10px;
  text-align: center;
`

const Container = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`

const HeaderMenu = styled.div`
  margin-top: 5px;
  font-family: 'Press Start 2P', Arial;
  a {
    margin: 0 5px 0 0px;
  }
`

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
`

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #c9d7d0;
  border-radius: 4px;
  background-color: #2d508b;
  color: #f1f7f3;
  font-family: 'Press Start 2P', Arial;
`

const LoginButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #233f6e;
  color: #f1f7f3;
  cursor: pointer;
  font-family: 'Press Start 2P', Arial;

  &:hover {
    background-color: #1b2127;
  }
`
interface Inputs {
  username: string
  password: string
}

function Login (): ReactElement {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm<Inputs>()

  const navigate = useNavigate()

  const handleLogin: SubmitHandler<Inputs> = async (data): Promise<void> => {
    try {
      const response = await axiosInstance().post('auth/login',
        {
          emailOrUsername: data.username,
          password: data.password
        }
      )

      const token = response.data.token

      localStorage.setItem('token', JSON.stringify(token))

      console.log('Login successful!')

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
        <Header className="square">
          <div>
            <a href="/" className='logo-text'>{labels.LOGO_NAME}</a>
          </div>
          <HeaderMenu>
            <FormContainer onSubmit={(event) => void handleSubmit(handleLogin)(event)}>
              <InputField {...register('username')} placeholder="Username" />
              <InputField {...register('password')} type="password" placeholder="Password" />
              <LoginButton type="submit">Login</LoginButton>
            </FormContainer>
          </HeaderMenu>
        </Header>
      </Container>
    </>
  )
}

export default Login
