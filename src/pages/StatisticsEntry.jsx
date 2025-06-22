import React from 'react'
import Player from "../components/Player"

export default function StatisticsEntry({order, player, value}) {
  return (
    <div>
        <img src={`${order}.svg`} alt="" />
        <Player player={player} size={40}/>
        <span>{value}</span>
    </div>
  )
}
