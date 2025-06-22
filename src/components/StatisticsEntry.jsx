import React from 'react'
import Player from "./Player"

export default function StatisticsEntry({order, entry}) {
  const {name, value} = entry
  
  return (
    <div className='flex justify-between w-fit  min-w-28 mt-2'>
        <img src={`images/${order}.svg`} alt="" width={20} />
        <span>{name ?? "name"}</span>
        <span>{value ?? "0"}</span>
    </div>
  )
}
