import React from 'react'

export default function SpittingItem({spitting_item}) {
  
  const {img, title, price, date, current_accumulated} = spitting_item
  const border = current_accumulated >= price ? "border-green-200" : "border-red-200"
  return (
    <div className={'flex justify-around border-8 p-2 rounded-xl '+border}>
      <img className='w-9' src={"/images/"+img+".svg"} alt="" />
      <div className='flex flex-col w-[60%]'>
        <span className='text-xl'>{title}</span>
        <span className='font-bold text-xl'>DA {price}</span>
        <span className='text-right'>{date}</span>
      </div>
    </div>
  )
}
