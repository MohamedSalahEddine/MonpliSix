import React, { useEffect, useState } from 'react'
import BottomMenu from '../components/BottomMenu'
// import playersData from "../db_players"
import Player from '../components/Player'
import { Link, Navigate, useNavigate } from 'react-router-dom'



export default function NewGame() {

  const [players, setPlayers] = useState(null)
  const [teamA, setTeamA] = useState(null)
  const [teamB, setTeamB] = useState(null)
  const [draggedPlayer, setDraggedPlayer] = useState(null)
  const [game_on, setGameOn] = useState(false)
  const [teams_confirmed, setTeamsConfirmed] = useState(false)
  const navigate = useNavigate()

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
      setTeamA(data.slice(4, 12))
      setTeamB(data.slice(12, 20))
    }
    loadPlayers()
  },[])

  
  const handleClick = (player) => {
    console.log(player.id+ " clicked upon");
    navigate("/history/"+player.id)
  }

  const handleDragEnd = () => {

  }
 
  
  const handleAnnuler = ()=>{
    console.log("handle annuler");
    
    setTeamA([])
    setTeamB([])
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
          playersTeamA : teamA.map(player => player.id),
          playersTeamB : teamB.map(player => player.id)
        })
      }
    )
    setTeamsConfirmed(true)
  }

  const handlePlayerClickedA = async (player) => {
    
    try{

      console.log(player.name+" scored");
      const res = await fetch("http://localhost:3001/games/score/"+player.id)
      console.log(res);
      const data = await res.json()
      
    }catch(error){
      console.log("error : "+error);
      
    }
  }
  
  const handlePlayerClickedB = async (player) => {
    try{
      
      console.log(player.name+" scored");
      const res = await fetch("http://localhost:3001/games/score/"+player.id)
      console.log(res);
      const data = await res.json()

      
    }catch(error){
      console.log("error : "+error);
      
    }
    
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
                <div className=' h-fit' draggable  key={player.id}>
                  <Player size={55}  player={player} onClick={() => handleClick(player)}/>
                </div>
              )
            })
          }

        </div>
        <div className='feild relative h-[68vh] w-[90vw] m-auto'>
          <div onDragEnd={handleDragEnd} className='team-A  h-[34vh] flex flex-wrap'>
            <span className='bg-white m-1 h-fit rounded-full px-1 text-blue-600 text-xs font-bold'>avg : {teamA.length > 0 && (teamA.reduce((acc, player) => player.rating + acc, 0) / teamA.length).toFixed(1)}</span>
            {
              teamA && teamA.length > 0 &&  teamA.map(player => {
                return (
                <div key={player.id} onClick={() => handlePlayerClickedA(player)}>
                  <Player key={player.id} player={player} size={40}/>
                </div>
                );
              })
            }
          </div>
          <div onDragEnd={handleDragEnd} className='team-B  h-[34vh] flex flex-wrap'>
            <span className='bg-white m-1 h-fit rounded-full px-1 text-blue-600 text-xs font-bold'>avg : {teamB.length > 0 && (teamB.reduce((acc, player) => player.rating + acc, 0) / teamB.length).toFixed(1)}</span>
            {
              teamB && teamB.length > 0 &&  teamB.map(player => {
                return (
                <div key={player.id} onClick={() => handlePlayerClickedB(player)}>
                  <Player key={player.id} player={player} size={40}/>
                </div>
                );
              })
            }
          </div>
        </div>
        <div className='flex justify-center gap-6 mb-2'>
          {   
            !game_on && !teams_confirmed && 
            <>
              <button disabled={teamA.length === 0 || teamA.length === 0 } onClick={handleAnnuler} className='btn rounded-lg px-4 bg-red-300'>annuler</button>
              <button disabled={teamA.length < 6   || teamA.length < 6  } onClick={handleConfirmer} className='btn rounded-lg px-4 bg-green-300'>confirmer</button>
            </>
          }
          {   
            !game_on && teams_confirmed &&
            <>
              <button onClick={()=> setGameOn(true)} className='bg-green-300 w-[50%] py-2 text-gray-500 text-xl rounded-md'>start game</button>
            </>
          }
          
        </div>
        <BottomMenu />
    </div>
  )
}
