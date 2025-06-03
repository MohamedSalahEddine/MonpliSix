import React from 'react'
import SpittingItem from '../components/SpittingItem'
import BottomMenu from '../components/BottomMenu'
import { Link } from 'react-router-dom'
import spitting_items from '../db_spitting_items.js'

export default function Spitting() {

  const cn = `frame flex items-center`
  return (
    <div className={cn}>
        <Link to={"../"}>
            <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>

        <div className='flex flex-col spitting_items h-[70vh] w-full text-slate-300 gap-5'>
          {
            spitting_items.map(item =>{
              return (
                <Link key={item.id} to={"/spittingItemDetails/"+item.id}>
                  <SpittingItem  spitting_item={item}/>
                </Link>

              )
            })
          }
        </div>

        <BottomMenu />
    </div>
  )
}
