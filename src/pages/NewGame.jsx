import React, { useEffect, useState } from 'react'
import BottomMenu from '../components/BottomMenu'
// import playersData from "../db_players"
import Player from '../components/Player'
import { Link } from 'react-router-dom'



export default function NewGame() {

  const [players, setPlayers] = useState(null)

  useEffect(()=>{
    const loadPlayers = async ()=>{
      const res = await fetch("http://localhost:3001/players")
      if (!res.ok) throw new Error("Failed to fetch playersss");
      const data = await res.json()
      setPlayers(data)      
    }
    loadPlayers()
  },[])
 
  


  function handleClick(clickedPlayer){
    // setPlayers(prevPlayers => prevPlayers.map(player=>{
    //   return player.name === clickedPlayer.name ? {...player, selected : !player.selected} : player
    // }))
    
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
              return <Player size={55} key={player.id} player={player} onClick={handleClick}/>
            })
          }

        </div>
        <div className='feild relative h-[68vh]'>
          {
            players.map(player=>{
              return  <Player size={55} key={player.id} player={player}/>
            })
          }
        </div>
        <BottomMenu />
    </div>
  )
}
