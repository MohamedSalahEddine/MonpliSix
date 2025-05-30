import React from 'react'
import BottomMenu from '../components/BottomMenu'

import players from '../db_players'
import Player from '../components/Player'
import games from "../db_games"
import GameHistory from '../components/GameHistory'
import { Link } from 'react-router-dom'

export default function PlayerHistory() {
  return (
    // 96FD52   FD6652
    // 2A3C45
    <div className='container player_history relative flex flex-col gap-3 text-white items-center frame m-auto bor'>
          <Link to={"../"}>
            <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
          </Link>
        <Player player={players[1]}  />
        <div className='history_middle w-full h-[55vh] overflow-scroll '>
            {
              games.map(game => {
                  return <GameHistory key={game.id} game={game} />
              })
            }
        </div>
        <div className='history_bottom text-2xl flex justify-around w-full'>
            <div className='flex flex-col'>
              <span>ف - 2</span>
              <span>خ - 3</span>
              <span>ت - 1</span>
            </div>
            <div className='flex flex-col justify-between'>
              <span className='flex gap-3'> <span>21</span> <img src="/images/futbol-solid.svg" alt="" /> </span>
              <span>مباريات - 5</span>
            </div>
        </div>
        <BottomMenu />
    </div>
  )
}
