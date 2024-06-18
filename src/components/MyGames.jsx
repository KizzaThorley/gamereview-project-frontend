import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function MyGames() {

  const navigate = useNavigate()
  
  const [usersGames, setUsersGames] = React.useState([])

  React.useEffect(() => {
async function fetchMyGames() {
  const token = localStorage.getItem('token')
const { data }  = await axios.get('/api/my-games', {
  headers: { Authorization: `Bearer ${token}`}
})
setUsersGames(data)

}
fetchMyGames()
  }, [])


console.log(usersGames);
  return (
    <div className='container mx-auto px-4 md:container md:mx-auto flex'>
  
  My games
  </div>
  )
}
