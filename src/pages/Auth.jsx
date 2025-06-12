import React, { useState } from 'react'
import BottomMenu from '../components/BottomMenu'

import { useNavigate } from 'react-router-dom'

export default function Auth() {


  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const[message, setMessage] = useState("")

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const res = await fetch("http://localhost:3001/users", {
          method : "POST",
          headers : {"Content-Type":"application/json"},
          body : JSON.stringify({username, password})
        })
        const data = await res.json()
        
        if(!res.ok) return setMessage(data.error || "Login failed")
        
        localStorage.setItem("token", data.token)

        navigate("/newGame")

    }catch(error){
      setMessage("wrong")
    }
  }

  return (
     <div className='frame'>
        <form onSubmit={handleSubmit} action=""  className='auth flex flex-col items-center justify-center h-[60vh]  gap-3'>
          <input onChange={(e)=> setUsername( e.target.value ) } value={username} className=' pl-2 rounded-xl' type="text" placeholder='Prénom (ex : tarek) '/>
          <input onChange={(e)=> setPassword( e.target.value ) } value={password} className=' pl-2 rounded-xl' min={4} max={4} type="password" placeholder='Mot de passe (ex: 1234)'/>
          <input className='rounded-full bg-green-400 text-white px-2 '  type="submit" value="Entrer" />
        </form>
        <p className='text-center text-red-400'>{message}</p>
    </div>
  )
}
