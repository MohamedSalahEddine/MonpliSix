import React from 'react'
import Player from './Player'

import players from '../db_players'



export default function GameHistory({game}) {
  
  // const [mine, dash, theirs] =  game.score.split("")
  const {game_id, date, team_score, opponent_score, start, end } = game

  const mine = parseInt(team_score)
  const theirs = parseInt(opponent_score)

  const gradient = mine === theirs ?  "from-[white] to-[#2A3C45]"  : (theirs > mine ? "from-[#FD6652] to-[#2A3C45]" : "from-[#96FD52] to-[#2A3C45]")
  const cn = `game_history 
              flex justify-around items-center 
              bg-gradient-to-r ${gradient} 
              rounded-[40px] mt-4 m-auto w-[90%] pb-2`
  return (
    <div className={cn} >
      <span className='text-4xl text-blue-600 font-bold'>{mine} - {theirs}</span>
      <div className='flex flex-[.7] justify-evenly items-center'>
      
        {
          !start && !end && "Commence bientot.."
        }
        {
          start && !end && "En cours.."
        }
        {
          start && end && (
            <>
              <span>{5.2}</span>
              <span>{7.1}</span>
              <Player size={40} player={players[0]}  />
            </>
            
            
          )
        }
      </div>
      <span>{date.split("T")[0]}</span>
    </div>
  )
}
