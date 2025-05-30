import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomMenu() {
  return (
    <div className='w-full absolute bottom-0'>
        <nav>
            <ul className='flex justify-around'>
                <li>
                    <Link to="/">
                        <img src="/images/star-solid.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        <img src="/images/chart-simple-solid.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/spitting">
                        <img src="/images/list-solid.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/history">
                        <img src="/images/clock-rotate-left-solid.svg" alt="" />
                    </Link>
                </li>
                <li>
                    <Link to="/newGame">
                        <img src="/images/circle-plus-solid.svg" alt="" />
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}
