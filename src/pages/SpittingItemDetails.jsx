import React from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from '../components/BottomMenu'
import players from '../db_players'
import { useParams } from 'react-router-dom'
import spitting_items from '../db_spitting_items'
import Player from "../components/Player"

export default function SpittingItemDetails() {
    const {id : id_url} = useParams()
    const {id, title, img, price, date, current_accumulated} =  spitting_items.find(element => element.id ===  Number(id_url))
    const nbr_perm_players = players.filter(player => player.status==="permanent").length

    // rounding up to tens
    const price_per_player =  parseInt( price / nbr_perm_players ) +  (10 -  parseInt( price / nbr_perm_players ) % 10)
    
    
  return (
    <div className='frame text-white'>
         <Link to={"/spitting"}>
            <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>
        
        <div className='spitting_item_details_top flex flex-col items-center gap-4'>
            <span className='text-right w-full'>{date}</span>
            <img src={`/images/${img}.svg`} alt="" />
            <span className='text-4xl flex items-center gap-1'> 
                <span className='text-2xl'>DA </span> 
                {price} / {nbr_perm_players}
            </span>
            {/* <span className={color+" text-4xl"}>DA {parseInt(price / nbr_perm_players)}</span> */}
            <span className={"text-blue-500 text-4xl"}>DA {  price_per_player }</span>
        </div>
        <div className='spitting_item_details_bottom flex h-[60vh] mt-4'>
            <div className='paid w-[49%] border-r-2 border-gray-400 overflow-scroll flex flex-wrap content-start justify-center gap-2'>
                <p className="text-[#35e455] text-center w-full self-start text-4xl">DA { price_per_player * players.filter(player => player.paid).length}</p>
                {
                    players.filter(player => player.status === "permanent" && player.paid).map(player=>{
                        return <Player key={player.id} display_rating={false} player={player}/>
                    })
                }
            </div>
            <div className='paid w-[49%] overflow-scroll flex flex-wrap content-start justify-center gap-2'>
                <p className="text-[#f46464] text-center w-full self-start text-4xl">DA { price_per_player * players.filter(player => player.status=== "permanent" && !player.paid).length}</p>
                {
                    players.filter(player => player.status === "permanent" && !player.paid).map(player=>{
                        return <Player key={player.id} display_rating={false} player={player}/>
                    })
                }
            </div>
            
        </div>

        <BottomMenu />
    </div>
  )
}

