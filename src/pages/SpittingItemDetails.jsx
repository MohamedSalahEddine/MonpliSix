import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from '../components/BottomMenu'
import users from '../db_players.js'
import { useParams } from 'react-router-dom'
import spitting_items from '../db_spitting_items.js'
import PLayer from "../components/Player.jsx"

export default function SpittingItemDetails() {

    const [users, setUsers] = useState(null)

    const {id} = useParams()
    
    console.log(id);
    

    useEffect(()=>{
    const loadData = async ()=>{
        const  resItems = await fetch ("http://localhost:3001/users/spittingUsers/"+id)
        if (!resItems.ok) throw new Error("Failed to fetch spitting Item");
        const dataItems = await resItems.json()
        setUsers(dataItems)      
    }

    loadData()
    },[])
  
    
    // const {id : id_url} = useParams()
    // const {id, title, img, price, date, current_accumulated} =  spitting_items.find(element => element.id ===  Number(id_url))
    // const nbr_perm_users = users.filter(user => true).length
    // const nbr_perm_users = users.filter(user => user.status==="permanent").length

    // rounding up to tens
    // const price_per_user =  parseInt( price / nbr_perm_users ) +  (10 -  parseInt( price / nbr_perm_users ) % 10)
    
    if(users === null ) return "loading..."
    // if(users === null || spitting_item === null) return "loading..."
  return (
    <div className='frame text-white'>
         <Link to={"/spitting"}>
            <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>
        
        <div className='spitting_item_details_top flex flex-col items-center gap-4'>
            {/* <span className='text-right w-full'>{date}</span> */}
            {/* <img src={`/images/${img}.svg`} alt="" /> */}
            <span className='text-4xl flex items-center gap-1'> 
                <span className='text-2xl'>DA </span> 
                {/* {price} / {nbr_perm_users} */}
            </span>
            {/* <span className={color+" text-4xl"}>DA {parseInt(price / nbr_perm_users)}</span> */}
            {/* <span className={"text-blue-500 text-4xl"}>DA {  price_per_user }</span> */}
        </div>
        <div className='spitting_item_details_bottom flex h-[60vh] mt-4'>
            <div className='paid w-[49%] border-r-2 border-gray-400 overflow-scroll flex flex-wrap content-start justify-center gap-2'>
                {/* <p className="text-[#35e455] text-center w-full self-start text-4xl">DA { price_per_user * users.filter(user => user.paid).length}</p> */}
                {
                    users.filter(user => user.date_paid !== null).map(user=>{
                    // users.filter(user => user.status === "permanent" && user.paid).map(user=>{
                        return <PLayer key={user.id} display_rating={false} player={user}/>
                    })
                }
            </div>
            <div className='paid w-[49%] overflow-scroll flex flex-wrap content-start justify-center gap-2'>
                {/* <p className="text-[#f46464] text-center w-full self-start text-4xl">DA { price_per_user * users.filter(user => user.status=== "permanent" && !user.paid).length}</p> */}
                {
                    users.filter(user => user.date_paid === null).map(user=>{
                    // users.filter(user => user.status === "permanent" && !user.paid).map(user=>{
                        return <PLayer key={user.id} display_rating={false} player={user}/>
                    })
                }
            </div>
            
        </div>

        <BottomMenu />
    </div>
  )
}

