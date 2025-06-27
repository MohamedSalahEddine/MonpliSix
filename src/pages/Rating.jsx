import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import BottomMenu from '../components/BottomMenu'
import PlayerRating from "../components/PlayerRating"

import players from '../db_players'



export default function Rating() {

    // SELECT * FROM players LEFT JOIN ratings ON players.id = ratings.rater_id WHERE players.id IN( SELECT team_players.player_id FROM team_players WHERE team_players.team_id IN( SELECT teams.id FROM teams INNER JOIN game ON teams.game_id = game.id WHERE game_id =( SELECT MAX(game.id) FROM game ) ) );


    // SELECT * FROM players LEFT JOIN ratings ON players.id = ratings.rater_id WHERE ratings.rated_id IN( SELECT team_players.player_id FROM team_players WHERE team_players.team_id IN( SELECT teams.id FROM teams INNER JOIN game ON teams.game_id = game.id WHERE game_id =( SELECT MAX(game.id) FROM game ) ) ) AND ratings.rater_id IN( SELECT team_players.player_id FROM team_players WHERE team_players.team_id IN( SELECT teams.id FROM teams INNER JOIN game ON teams.game_id = game.id WHERE game_id =( SELECT MAX(game.id) FROM game ) ) );

// SELECT * FROM players p RIGHT JOIN ratings r ON p.id = r.rater_id WHERE r.rated_id IN ( SELECT tp.player_id FROM team_players tp WHERE tp.team_id IN ( SELECT t.id FROM teams t WHERE t.game_id = (SELECT MAX(id) FROM game) ) ) ORDER BY r.rater_id, r.rated_id;

    // const [players, setPlayers] = useState(null)

    // useEffect(()=>{
    //     const loadData = async ()=>{
    //         const res = fetch(process.env.REACT_APP_API_URL+"/players")

    //     }
    //     loadData()
    // }, [])

    const cn = `frame rating
                flex justify-center flex-col justify-between`
  return (
    <div className={cn}>
        <Link to={"../"}>
            <img className='absolute left-2 top-2 icon_left' src="/images/arrow-left-solid.svg" alt="" />
        </Link>
    
        <div className='rating_container flex flex-wrap justify-center gap-2'>
            {
                players.filter(player => true ).map(player =>{
                    return <PlayerRating key={player.name} player={player}/>
                })
            }
        </div>
    
        <button className='mt-2 bg-green-400 text-white p-4'>confirmer</button>
        <BottomMenu />
    </div>
  )
}
