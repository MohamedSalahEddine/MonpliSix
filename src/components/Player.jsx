import React from 'react'

export default function Player({player ={}, display_rating=true, size = 90, onClick}) {
  
  // console.log( "player :", player);
  const { img, id, name, rating, pos  } = player
  const img_src = img !==""? `/images/joueurs/${img}` : '/images/joueurs/camera-solid.svg'
  
  

  function color_rating(){
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

  function color_position(){
    if(pos === "fr"){
       return "border-red-400 border-4"
    }
    else if(pos === "df"){
      return "border-green-400 border-4"
    }
    else if(pos === "ct"){
      return "border-white-400 border-4"
    }else{
      return "border-black border-4"
      
    }
  }
 
  const border = display_rating && color_position()

  const cn = `player 
              flex flex-col items-center 
              cursor-pointer select-none rounded-full 
              z-4 ${border}`
  

  return (
        <div onClick={ ()=> onClick && onClick(player)} 
          style={{ width : size , height: size , minHeight : size, minWidth: size}} 
          // style={{ width : size , height: size, padding : `0px ${pad_x}px`}} 
          className={cn}
          >
            <span 
              style={{fontSize : "12px"}} 
              className={'player_name text-white text-center '}>{name}
            </span>
            <img 
              style={{width :  '70%'}} 
              // style={{width : `${size}px` , height:`${size}px`}} 
              className={`player_img rounded-full`} src={img_src} alt={'player img'}
              onContextMenu={(e) => e.preventDefault()}
              onTouchStart={(e) => {
                e.currentTarget.pressTimer = setTimeout(() => e.preventDefault(), 300);
              }}
              onTouchEnd={(e) => {
                clearTimeout(e.currentTarget.pressTimer);
              }}
              onTouchMove={(e) => {
                clearTimeout(e.currentTarget.pressTimer);
              }}
            />
            {
              display_rating && 
              <span style={{ height: size/3.5, width: size/3.5, 
                                            //  maxHeight: size/3, maxWidth: size/3
            }} className={` rounded-full text-white ${color_rating()} flex items-center justify-center self-end mt-[-15px]`}>{ rating}</span>}
        </div>
  )
}
