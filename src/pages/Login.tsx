import React, { useState, type ReactElement } from 'react'
import styled from 'styled-components'
import { Helmet } from 'react-helmet'
import { type SubmitHandler, useForm } from 'react-hook-form'
import axiosInstance from '../libs/axiosInstance'
import { useNavigate } from 'react-router-dom'
import { GlobalStyle } from '../styles'
import { labels } from '../common/labels'
import { Bounce, toast } from 'react-toastify'
import stringify from 'safe-stable-stringify'
import { type ErrorType } from '../common/types'

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

interface InputProps {
  shake: boolean
}

const InputField = styled.input<InputProps>`
  @keyframes shake {
    0% { transform: translateX(0); }
    20% { transform: translateX(-1px); }
    40% { transform: translateX(1px); }
    60% { transform: translateX(-1px); }
    80% { transform: translateX(1px); }
    100% { transform: translateX(0); }
  }

  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #c9d7d0;
  border-radius: 4px;
  background-color: #2d508b;
  color: #f1f7f3;
  font-family: 'Press Start 2P', Arial;

  ${({ shake }) => shake && 'animation: shake 0.3s ease-in-out;'}
`

const LoginButton = styled.button`
  border: none;
  border-radius: 4px;
  background-color: #233f6e;
  color: #f1f7f3;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  &:hover {
    background-color: #1b2127;
    &>p{
      transform: scale(1.05);
    }
  }
`

const ButtonText = styled.p`
  color: #f1f7f3;
  font-family: 'Press Start 2P', Arial;
  transition: transform 0.2s ease-in;
`

interface Inputs {
  username: string
  password: string
}

function Login (): ReactElement {
  const { register, handleSubmit } = useForm<Inputs>()
  const navigate = useNavigate()
  const [shakeUsername, setShakeUsername] = useState(false)
  const [shakePassword, setShakePassword] = useState(false)

  const handleChange = (field: 'username' | 'password'): void => {
    if (field === 'username') {
      setShakeUsername(true)
      setTimeout(() => { setShakeUsername(false) }, 100)
    } else {
      setShakePassword(true)
      setTimeout(() => { setShakePassword(false) }, 100)
    }
  }

  const handleLogin: SubmitHandler<Inputs> = async (data, e): Promise<void> => {
    e?.preventDefault()
    try {
      const response = await axiosInstance().post('auth/login', {
        emailOrUsername: data.username,
        password: data.password
      })

      const token = response?.data.token

      if (!token) throw new Error('Invalid credentials')

      localStorage.setItem('token', JSON.stringify(token))

      toast.success('Login successful!', {
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

      navigate('/')
    } catch (error) {
      console.log(data)
      const errorObj = error as ErrorType
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
            <FormContainer onSubmit={(e) => {
              e.preventDefault()
              void handleSubmit(handleLogin)(e)
            }}>
              <InputField
                {...register('username')}
                placeholder="Username"
                onChange={(e) => {
                  void register('username').onChange(e)
                  handleChange('username')
                }}
                shake={shakeUsername}
              />
              <InputField
                {...register('password')}
                type="password"
                placeholder="Password"
                onChange={(e) => {
                  void register('password').onChange(e)
                  handleChange('password')
                }}
                shake={shakePassword}
              />
              <LoginButton type="submit"><ButtonText>Login</ButtonText></LoginButton>
            </FormContainer>
          </HeaderMenu>
        </Header>
      </Container>
    </>
  )
}

export default Login
