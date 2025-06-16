import React from 'react'
import Player from './Player'

import players from '../db_players'


// date
// : 
// "2025-06-16T07:44:44.000Z"
// game_id
// : 
// 47
// opponent_score
// : 
// "12"
// score_display
// : 
// "8 - 12"
// team_id
// : 
// 63
// team_score
// : 
// "8"

export default function GameHistory({game}) {

  // const [mine, dash, theirs] =  game.score.split("")
  const {game_id, date, team_score, opponent_score } = game

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
      <span>{game.player_rating}</span>
      <span>{game.game_rating}</span>
      <Player size={50} player={players[Math.floor(Math.random()*15)]}  />
      <span>{date.split("T")[0]}</span>
    </div>
  )
}
