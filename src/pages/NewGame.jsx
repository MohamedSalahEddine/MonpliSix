import React, { useState } from 'react'
import BottomMenu from '../components/BottomMenu'
import playersData from "../db_players"
import Player from '../components/Player'
import { Link } from 'react-router-dom'
export default function NewGame() {

  
  const [players, setPlayers] = useState(playersData)


  function handleClick(clickedPlayer){
    setPlayers(prevPlayers => prevPlayers.map(player=>{
      return player.name === clickedPlayer.name ? {...player, selected : !player.selected} : player
    }))
    console.log(clickedPlayer);
    
  }

  const cn = `new_game frame
              relative flex flex-col 
              text-white m-auto bor`

  return (
    <div className={cn}>
        <Link to={"../"}>
          <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>
        <div className='flex items-center justify-between'>
          <p className='absolute right-2 top-2 text-right text-red-400 mr-20 text-xl'>Selectionnés : {players.filter(player => player.selected).length} </p>
        </div>
        <div className='flex mt-8 gap-2 py-2 h-fit overflow-y-hidden overflow-x-scroll'>
          {
            players.map(player=>{
              return <Player size={55} key={player.name} player={player} onClick={handleClick}/>
            })
          }

        </div>
        <div className='feild relative h-[68vh]'>
          {
            players.map(player=>{
              return player.selected && <Player size={55} key={player.name} player={player}/>
            })
          }
        </div>
        <BottomMenu />
    </div>
  )
}
