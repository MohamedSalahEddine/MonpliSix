import React, { useState } from 'react'
import players from '../db_players'
import Player from "../components/Player"


export default function PlayerRating({player}) {

  const [new_rating, setNewRating] = useState(player.rating || 5)

  const bg_green = "bg-[linear-gradient(to_bottom,_#81EE6B_0%,_#B9F6AD_40%,_#FFFFFF_100%)]"
  const bg_red   = "bg-[linear-gradient(to_top,_#ED6565_0%,_#F18686_40%,_#FFFFFF_100%)] "

  function handle_rating_down(){
    if( new_rating <= 0) return
    setNewRating(prev => prev - 0.5)
    
  }
  function handle_rating_up(){
    if(new_rating >= 10) return
    setNewRating(prev => prev + 0.5)
    
  }

  return (
    <div className='player_rating relative text-white flex items-center justify-center rounded-full overflow-hidden w-fit'>
        <Player size={50} player={player}/>
        <div onClick={handle_rating_down} className={`w-10 h-20 ${bg_red} rating_up`}>
          <img className='caret caret_down cursor-pointer' src="/images/caret-down-solid.svg" alt="" />
        </div>
        <div onClick={handle_rating_up} className={`w-10 h-20 ${bg_green} rating_down`}>
          <img className='caret caret_up cursor-pointer' src="/images/caret-up-solid.svg" alt="" />
        </div>
        <span className='new_rating absolute top-[-5px] bg-blue-400 rounded-full '>{new_rating}</span>
    </div>
  )
}
