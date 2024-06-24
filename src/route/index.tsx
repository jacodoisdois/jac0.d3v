import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from '../pages/Login'
import Home from '../pages/Home'
import EditPage from '../pages/EditPage'
import About from '../pages/About'
import FullPost from '../pages/FullPost'

function Router (): React.JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/posts/:postId" element={<FullPost />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
