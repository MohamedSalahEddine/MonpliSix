import React from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from '../components/BottomMenu'
import PlayerRating from "../components/PlayerRating"

import players from '../db_players'


export default function Rating() {

    const cn = `frame rating
                flex justify-center flex-col`
  return (
    <div className={cn}>
        <Link to={"../"}>
            <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>
    
        <div className='rating_container flex flex-wrap justify-center bor gap-2'>
            {
                players.filter(player => true ).map(player =>{
                    return <PlayerRating key={player.name} player={player}/>
                })
            }
        </div>
        <button className='mt-2 bg-green-400 text-white p-4'>confirmer</button>
        <BottomMenu />
    </div>
  )
}
