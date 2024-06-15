import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './components/Signup'
import './App.css'
import NavBar from './components/NavBar'

function App() {




  return <Router>
    <NavBar />
<Routes>
  <Route path='/signup' element={<Signup/>} /> 
</Routes>

  </Router>
}



export default App