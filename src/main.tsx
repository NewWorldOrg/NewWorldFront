import React from 'react'
import App from './App'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  RecoilRoot,
  // atom,
  // selector,
  // useRecoilState,
} from 'recoil'
// import MyPage from './pages/MyPage'
import Login from './pages/Login'
import Register from './pages/Register'
import { createRoot } from 'react-dom/client'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
)
