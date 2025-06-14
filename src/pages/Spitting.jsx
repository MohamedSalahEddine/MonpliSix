import React, { useEffect, useState } from 'react'
import SpittingItem from '../components/SpittingItem'
import BottomMenu from '../components/BottomMenu'
import { Link } from 'react-router-dom'
// import spitting_items from '../db_spitting_items.js'

export default function Spitting() {

  const [spitting_items, setSpittingItem] = useState(null)

  useEffect(()=>{
    const loadData = async ()=>{
        const  resItems = await fetch ("http://localhost:3001/spittingItems")
        if (!resItems.ok) throw new Error("Failed to fetch spitting Item");
        const dataItems = await resItems.json()
        setSpittingItem(dataItems)      
    }
    loadData()
  },[])

  if(spitting_items === null) return "loading.."

  const cn = `frame flex items-center flex-col justify-between`
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
