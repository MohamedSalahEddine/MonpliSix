import React from 'react'

export default function Player({player, onClick}) {

  const img = player.img !==""? `/images/joueurs/${player.img}.jpg` : '/images/camera-solid.svg'

  function color_rating(){
    const rating = player.rating;
    if(rating > 9){
      return "bg-red-600"
    }
    else if(rating > 8){
      return "bg-orange-600"
    }
    else if(rating > 7){
      return "bg-pink-600"
    }
    else if(rating > 6){
      return "bg-yellow-600"
    }
    else if(rating > 5){
      return "bg-yellow-600"
    }else{
      return "bg-black"
    }
  }

  const shadow = player.selected ? "shadow-md shadow-green-400":""
 

  return (
        <div onClick={ ()=> onClick && onClick(player)}  className={`${shadow} cursor-pointer select-none player flex flex-col items-center px-2 text-black min-w-20 w-20 h-20 rounded-full  ${player.coor}`}>
            <span className='text-white'>{player.name}</span>
            <img className='rounded-full  player_img' src={img } alt='player img'/>
            <span className={`w-6 h-6 rounded-full text-white ${color_rating()} text-center self-end mt-[-10px]`}>{player.rating}</span>
        </div>
  )
}
