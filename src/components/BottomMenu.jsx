import React from 'react'

export default function BottomMenu() {
  return (
    <div>
        <nav>
            <ul className='flex justify-around'>
                <li>
                    <img src="/images/star-solid.svg" alt="" />
                </li>
                <li>
                    <img src="/images/chart-simple-solid.svg" alt="" />
                </li>
                <li>
                    <img src="/images/list-solid.svg" alt="" />
                </li>
                <li>
                    <img src="/images/clock-rotate-left-solid.svg" alt="" />
                </li>
                <li>
                    <img src="/images/circle-plus-solid.svg" alt="" />
                </li>
            </ul>
        </nav>
    </div>
  )
}
