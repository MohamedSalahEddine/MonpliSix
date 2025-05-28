import React, { useState } from 'react'
import BottomMenu from '../components/BottomMenu'
import playersData from "../db_players"
import Player from '../components/Player'
export default function Main() {

  
  const [players, setPlayers] = useState(playersData)


  function handleClick(clickedPlayer){
    setPlayers(prevPlayers => prevPlayers.map(player=>{
      return player.name === clickedPlayer.name ? {...player, selected : !player.selected} : player
    }))
    console.log(clickedPlayer);
    
  }

  return (
    <div className='container relative flex flex-col justify-between text-white frame m-auto bor'>
        <div className='flex items-center justify-between'>
          <img src="/images/arrow-left-solid.svg" alt="" />
          <p className='text-right text-red-400 mr-20 text-xl'>Selectionnés : {players.filter(player => player.selected).length} </p>

        </div>
        <div className='flex gap-2 py-2 h-fit  overflow-y-hidden overflow-x-scroll'>
          {
            players.map(player=>{
              return <Player key={player.name} player={player} onClick={handleClick}/>
            })
          }

        </div>
        <div className='feild relative h-[60vh]'>
          {
            players.map(player=>{
              return player.selected && <Player key={player.name} player={player}/>
            })
          }
        </div>
        <BottomMenu />
    </div>
  )
}
