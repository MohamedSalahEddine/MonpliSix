import React, { useEffect, useState } from 'react'
import BottomMenu from '../components/BottomMenu'
// import playersData from "../db_players"
import Player from '../components/Player'
import { Link } from 'react-router-dom'



export default function NewGame() {

  const [players, setPlayers] = useState(null)
  const [teamA, setTeamA] = useState(null)
  const [teamB, setTeamB] = useState(null)
  const [draggedPlayer, setDraggedPlayer] = useState(null)

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
      setTeamA(data.slice(0, 6))
      setTeamB(data.slice(6, 14))
    }
    loadPlayers()
  },[])

  const score = async (player) =>{
    fetch("http://localhost:3001/games/insertGoal/:")
    
  }

  const handleDragEnd = () => {

  }
 
  
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
          playersTeamA : players.filter(player =>  ["chapou","tarek","alilou","paylou","ghani","zak","jak","patach"].includes(player.name.toLowerCase())).map(player => player.id),
          playersTeamB : players.filter(player =>  ["lamine","tokoto","tech","houssem","karim","seif","kagawa","maitou"].includes(player.name.toLowerCase())).map(player => player.id)
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
        <div className='flex mt-8 gap-2 py-2 h-fit overflow-y-hidden overflow-x-scroll scrollbar-hide'>
          {
            players.map(player=>{
              return  (
                <div className=' h-fit' draggable onClick={()=> score( player)} key={player.id}>
                  <Player size={55}  player={player} />
                </div>
              )
            })
          }

        </div>
        <div className='feild relative h-[68vh] w-[90vw] m-auto'>
          <div onDragEnd={handleDragEnd} className='team-A borr h-[34vh] flex flex-wrap'>
            {
              teamA && teamA.length > 0 &&  teamA.map(player => {
                return (
                <div key={player.id}>
                  <Player key={player.id} player={player} size={40}/>
                </div>
                );
              })
            }
          </div>
          <div onDragEnd={handleDragEnd} className='team-B borr h-[34vh] flex flex-wrap'>
            {
              teamB && teamB.length > 0 &&  teamB.map(player => <Player key={player.id} player={player} size={40}/>)
            }
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
