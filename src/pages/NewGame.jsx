import React, { useEffect, useState } from 'react'
import BottomMenu from '../components/BottomMenu'
// import playersData from "../db_players"
import Player from '../components/Player'
import { Link } from 'react-router-dom'



export default function NewGame() {

  const [players, setPlayers] = useState(null)
  const [teamA, setTeamA] = useState(null)
  const [teamB, setTeamB] = useState(null)

  useEffect(()=>{
    const loadPlayers = async ()=>{

      const token = localStorage.getItem('token')
       const res = await fetch("http://localhost:3001/players", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error("Failed to fetch playersss");
      const data = await res.json()
      setPlayers(data)      
    }
    loadPlayers()
  },[])
 
  
  const handleAnnuler = ()=>{
    
  }
  const handleConfirmer = async (e)=>{
    e.preventDefault()
    console.log("btn confirmer clicked");
    
    const token = localStorage.getItem("token")
    const res = await fetch("http://localhost:3001/games",
      
      {
        method : "POST",
        headers : {
          "Content-Type" :"application/json",
          "Authorization" : `Bearer ${token}`
        },
        body : JSON.stringify({ 
          playersTeamA : players.slice(4, 14).map(player => player.id),
          playersTeamB : players.slice(14, 24).map(player => player.id),
        })
      }
    )
  }



  const cn = `new_game frame
              relative flex flex-col 
              text-white m-auto bor`

  if(players === null) return "loadng"

  return (
    <div className={cn}>
        <Link to={"../"}>
          <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>
        <div className='flex items-center justify-between'>
          {/* <p className='absolute right-2 top-2 text-right text-red-400 mr-20 text-xl'>Selectionnés : {players.filter(player => player.selected).length} </p> */}
          <p className='absolute right-2 top-2 text-right text-red-400 mr-20 text-xl'>Selectionnés : {players.filter(player => true).length} </p>
        </div>
        <div className='flex mt-8 gap-2 py-2 h-fit overflow-y-hidden overflow-x-scroll'>
          {
            players.map(player=>{
              return <Player size={55} key={player.id} player={player} />
            })
          }

        </div>
        <div className='feild relative h-[68vh] w-[90vw] m-auto'>
          <div className='team-A h-[34vh] flex flex-wrap'>
            
          </div>
          <div className='team-B h-[34vh] flex flex-wrap'>
            
          </div>
        </div>
        <div className='flex justify-center gap-6 mb-2'>
          <button onClick={handleAnnuler} className='btn rounded-lg px-4 bg-red-300'>annuler</button>
          <button onClick={handleConfirmer} className='btn rounded-lg px-4 bg-green-300'>confirmer</button>
        </div>
        <BottomMenu />
    </div>
  )
}
