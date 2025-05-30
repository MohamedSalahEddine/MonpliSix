import React from 'react'

export default function Player({player, onClick, display_rating = true}) {

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
      return "bg-black "
    }
  }

  const shadow = player.selected ? "shadow-md shadow-green-400":""
 

  return (
        <div onClick={ ()=> onClick && onClick(player)}  className={`${shadow} cursor-pointer rounded-full select-none player flex flex-col items-center px-2 text-black w-fit h-fit  border-blue-400   ${player.coor}`}>
            <span className='text-white min-w-20 text-center'>{player.name}</span>
            <img className='rounded-full  player_img' src={img} alt={'player img'}/>
            {display_rating &&<span className={`w-6 h-6 rounded-full text-white ${color_rating()} text-center self-end mt-[-15px]`}>{ player.rating}</span>}
        </div>
  )
}
