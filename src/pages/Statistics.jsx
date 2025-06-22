import React, { useEffect } from 'react'
import BottomMenu from '../components/BottomMenu'

export default function Statistics() {

  // useEffect(()=>{
  //   const loadData = async () => {
  //     const res = await fetch("https://monplisix.onrender.com/")
  //   }
  //   loadData()
  // }, [])

  return (
    <div className='statistics frame flex flex-col'> 
      <div className='container flex-1 flex flex-col gap-2 justify-center'>
        <div className='last_game bor flex-[.3] w-full bg-red-300'>
          <span className='text-white'>Last Game</span>
        </div>
        <div className='all_time bor flex-[.3] w-full bg-green-300'>
          <span className='text-white'>All time</span>
          
        </div>
        <div className='all_time bor flex-[.3] w-full bg-blue-300'>
          <span className='text-white'>Avg</span>
          
        </div>
      </div>
      <BottomMenu />
    </div>
  )
}
