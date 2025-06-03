import React from 'react'
import players from '../db_players'
import Player from "../components/Player"


export default function PlayerRating({player}) {
  return (
    <div className='player_rating relative text-white flex rounded-full overflow-hidden w-fit'>
        <Player player={player}/>
        <div className='w-10 h-20 bg-red-400 rating_up'>
          <img className='caret caret_down' src="/images/caret-down-solid.svg" alt="" />
        </div>
        <div className='w-10 h-20 bg-green-400 rating_down'>
          <img className='caret caret_up' src="/images/caret-up-solid.svg" alt="" />
        </div>
    </div>
  )
}
