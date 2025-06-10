import React from 'react'

export default function SpittingItem({spitting_item}) {
  
  const {img, title, price, date, current_accumulated} = spitting_item
  const border = current_accumulated >= price ? "border-green-200" : "border-red-200"
  return (
    <div className={'flex justify-around border-8 p-2 rounded-xl '+border}>
      <img className='w-16 h-16 m-auto' src={img == "" ? "/images/joueurs/camera-solid.svg" : "/images/"+img } alt="" />
      <div className='flex flex-col w-[60%]'>
        <span className='text-xl'>{title}</span>
        <span className='font-bold text-xl'>DA {price}</span>
        <span className='text-right'>{date.toString().split("T")[0]}</span>
      </div>
    </div>
  )
}
