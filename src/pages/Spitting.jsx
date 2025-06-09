import React, { useEffect, useState } from 'react'
import SpittingItem from '../components/SpittingItem'
import BottomMenu from '../components/BottomMenu'
import { Link } from 'react-router-dom'
import spitting_items from '../db_spitting_items.js'

export default function Spitting() {

  const [users, setUsers] = useState(null)
  const [spitting_items, setSpittingItem] = useState(null)

  useEffect(()=>{
          const loadData = async ()=>{
              const [resUsers, resItems] = await Promise.all([
                  fetch ("http://localhost:3001/users/spittingUsers"),
                  fetch ("http://localhost:3001/spittingItems")
              ])
              // const res = await fetch("http://localhost:3001/users/spittingUsers")
              if (!resUsers.ok) throw new Error("Failed to fetch spitting usersss");
              if (!resItems.ok) throw new Error("Failed to fetch spitting Item");
              const[dataUsers, dataItems] = await Promise.all([
                  resUsers.json(),
                  resItems.json()
                ])
  
              // const data = await res.json()
              console.log(dataUsers);
              console.log(dataItems);
              setUsers(dataUsers)      
              setSpittingItem(dataItems)      
          }
  
          loadData()
      },[])

      if(users  === null ||spitting_items === null) return "loading.."

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
