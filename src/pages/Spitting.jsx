import React from 'react'
import SpittingItem from '../components/SpittingItem'
import BottomMenu from '../components/BottomMenu'
import { Link } from 'react-router-dom'

export default function Spitting() {
  return (
    <div className='frame'>
        <Link to={"../"}>
            <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>
        {
            [1,2,3].map(item =>{
                return <SpittingItem key={item}/>
            })
        }

        <BottomMenu />
    </div>
  )
}
