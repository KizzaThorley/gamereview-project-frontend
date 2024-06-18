import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Home from './components/Home'
import './App.css'
import NavBar from './components/NavBar'
import Login from './components/Login'
import New from './components/New'
import MyGames from './components/MyGames'
import Edit from './components/Edit'
import AllGames from './components/AllGames'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {




  return <Router>
    <NavBar />
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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path='/new-game' element={<New />} />
      <Route path='/my-games' element={<MyGames />} />
      <Route path='/my-games/edit' element={<Edit />} />
      <Route path='/all-games' element={<AllGames />} />
    </Routes>

  </Router>
}



export default App