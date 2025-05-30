import React from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from '../components/BottomMenu'

export default function Home() {
  return (
    <div className='frame'>
        <Link to={"./"}>
            <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>
        <div className='flex justify-center text-white'>
            Home

        </div>

        <BottomMenu />
    </div>
  )
}
