import React from 'react'
import BottomMenu from '../components/BottomMenu'

export default function Auth() {
  return (
     <div className='frame'>
        <div className='auth flex flex-col items-center justify-center h-[60vh]  gap-3'>
            <input className=' pl-2 rounded-xl' type="text" placeholder='Prénom (ex : tarek) '/>
            <input className=' pl-2 rounded-xl' type="password" placeholder='Mot de passe'/>
            <input className='rounded-full bg-green-400 text-white px-2 '  type="submit" value="Entrerrrrr" />
        </div>
        <BottomMenu />
    </div>
  )
}
