import React from 'react'
import App from './App'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RecoilRoot } from 'recoil'
import MyPage from './pages/MyPage'
import Login from './pages/Login'
import Register from './pages/Register'
import { createRoot } from 'react-dom/client'
import DefinitiveRegister from './pages/DefinitiveRegister'
// import { AppLayout } from '@cloudscape-design/components'
import '@cloudscape-design/global-styles/index.css'

const container = document.getElementById('root')
const root = createRoot(container!)
root.render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/definitive_register" element={<DefinitiveRegister />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>
)
