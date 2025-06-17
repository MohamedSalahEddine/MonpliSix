import React from 'react'
import BottomMenu from './BottomMenu'

export default function NotFound() {
  return (
    <div className='frame flex flex-col m-auto'>
        <div className='h-[90vh]'>
          <img className='' src="/images/404.svg" alt="" />

        </div>
        <BottomMenu />
    </div>
  )
}
