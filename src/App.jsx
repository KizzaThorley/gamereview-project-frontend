import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import React from 'react'
import Signup from './components/Signup'
import Home from './components/Home'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import New from './components/New'
import MyGames from './components/MyGames'
import Edit from './components/Edit'
import AllGames from './components/AllGames'
import SingleGame from './components/SingleGame'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [isLoggedIn, setIsLoggedIn] = React.useState(localStorage.getItem('token'))





  return <Router>
    <NavBar 
    isLoggedIn={isLoggedIn}
    setIsLoggedIn={setIsLoggedIn}
    />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="dark"
      transition: Slide
/>
    <Routes>
      <Route path='/signup' element={<Signup />} />
      <Route path="/" element={<Home 
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      />} />
      <Route path="/login" element={<Login 
          setIsLoggedIn={setIsLoggedIn}
      />} />
      <Route path='/new-game' element={<New />} />
      <Route path='/my-games' element={<MyGames />} />
      <Route path='/my-games/edit/:gameId' element={<Edit />} />
      <Route path='/all-games' element={<AllGames />} />
      <Route path='/game/:gameId' element={<SingleGame 
      isLoggedIn={isLoggedIn}
      />} />
    </Routes>

  </Router>
}



export default App