import React from 'react'
import StatisticsEntry from './StatisticsEntry'

export default function StatisticsSet({title, set}) {
  // console.log(title, set);
  
  if( set.length === 0 || set.some(entry =>  Object.keys(entry).includes(null) ||  Object.values(entry).includes(null) ) ) return "no data"
  // if( set.length === 0 || set.some(entry =>  Object.keys(entry).includes(null) ||  Object.values(entry).includes(null) ) ) return "no data"
  
  return (
    <div className=' w-fit px-2 mt-2 flex flex-col justify-center'>
        <div className='flex justify-evenly bg-white rounded-md'>
            <span className=''>{title}</span>
        </div>
        {
          set.map((entry, i) => {
            return <StatisticsEntry key={i} order={i+1} entry={entry}  />
          })
        }
    </div>
  )
}
