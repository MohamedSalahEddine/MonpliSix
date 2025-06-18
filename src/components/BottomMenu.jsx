import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import jwt from "jsonwebtoken"

export default function BottomMenu() {

    const[logged_id, setLoggedId] = useState(()=> {
        const token = localStorage.getItem("token")
        const {id} = JSON.parse(atob(token.split(".")[1]))
        return id
    })

    const {id} = useParams()
    

    useEffect(()=>{
        const loadGames = async ()=>{
            // const res = await fetch("http://localhost/games/gamesHistory/"+id)

        }
        loadGames()
    }, [])

    return (
        <div className='bottom_menu w-full  bottom-0'>
        
            <nav>
                <ul className='flex justify-around '>
                    <li>
                        <Link to="/rating/" className="h-9 w-9 flex items-center justify-center">
                            <img className='menu_icons' src="/images/star-solid.svg" alt="" />
                            <span className='text-red-400'>{logged_id}</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/statistics"  className="h-9 w-9 flex items-center justify-center">
                            <img className='menu_icons' src="/images/chart-simple-solid.svg" alt="" />
                        </Link>
                    </li>
                    <li>
                        <Link to="/spitting"  className="h-9 w-9 flex items-center justify-center">
                            <img className='menu_icons' src="/images/droplet-solid.svg" alt="" />
                        </Link>
                    </li>
                    <li>
                        <Link to={"/history/"+logged_id}  className="h-9 w-9 flex items-center justify-center">
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
