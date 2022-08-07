import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {
  RecoilRoot,
  // atom,
  // selector,
  // useRecoilState,
  // useRecoilValue,
} from 'recoil'
// import MyPage from './pages/MyPage'
import Login from './pages/Login'
import Register from './pages/Register'

ReactDOM.render(
  <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById('root')
)
