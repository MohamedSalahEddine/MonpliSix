import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomMenu() {
  return (
    <div className='bottom_menu w-full  bottom-0'>
        <nav>
            <ul className='flex justify-around '>
                <li>
                    <Link to="/rating" className="h-9 w-9 flex items-center justify-center">
                        <img className='menu_icons' src="/images/star-solid.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/"  className="h-9 w-9 flex items-center justify-center">
                        <img className='menu_icons' src="/images/chart-simple-solid.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/spitting"  className="h-9 w-9 flex items-center justify-center">
                        <img className='menu_icons' src="/images/droplet-solid.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/history"  className="h-9 w-9 flex items-center justify-center">
                        <img className='menu_icons' src="/images/clock-rotate-left-solid.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/newGame"  className="h-9 w-9 flex items-center justify-center">
                        <img className='menu_icons' src="/images/circle-plus-solid.svg" alt="" />
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
