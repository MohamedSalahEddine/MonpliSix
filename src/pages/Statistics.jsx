import React from 'react'
import BottomMenu from '../components/BottomMenu'

export default function Statistics() {
  return (
    <div className='statistics frame flex flex-col'> 
      <div className='container bor flex-1 flex items-center justify-center'>
        <span className='text-white'>Statictics</span>
      </div>
      <BottomMenu />
    </div>
  )
}
